"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase, UserProfile } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  isAdmin: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verificar sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listener para mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await loadUserProfile(session.user.id);
      } else {
        setProfile(null);
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      // Tentar carregar de user_profiles primeiro (nova tabela com role)
      const { data: userProfileData, error: userProfileError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (userProfileData) {
        setProfile(userProfileData);
        setIsAdmin(userProfileData.role === "admin");
        setLoading(false);
        return;
      }

      // Se não encontrar em user_profiles, tentar profiles (tabela antiga)
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        // Se perfil não existe, criar um novo
        if (error.code === "PGRST116") {
          await createUserProfile(userId);
        } else {
          console.error("Erro ao carregar perfil:", error);
        }
      } else {
        setProfile(data);
        setIsAdmin(false); // profiles antigos não têm role
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  const createUserProfile = async (userId: string) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      // Tentar criar em user_profiles primeiro
      const { data: newProfile, error: newProfileError } = await supabase
        .from("user_profiles")
        .insert([
          {
            id: userId,
            email: userData.user?.email || "",
            full_name: userData.user?.user_metadata?.full_name || userData.user?.email || "",
            plan: "free",
            role: "user",
            xp: 0,
            level: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (!newProfileError && newProfile) {
        setProfile(newProfile);
        setIsAdmin(false);
        return;
      }

      // Fallback para profiles (tabela antiga)
      const { data, error } = await supabase
        .from("profiles")
        .insert([
          {
            id: userId,
            email: userData.user?.email || "",
            full_name: userData.user?.user_metadata?.full_name || "",
            plan: "free",
            xp: 0,
            level: 1,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      setIsAdmin(false);
    } catch (error) {
      console.error("Erro ao criar perfil:", error);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setIsAdmin(false);
    router.push("/auth");
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}
