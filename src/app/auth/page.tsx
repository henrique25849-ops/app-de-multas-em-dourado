"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Shield, Sparkles, Trophy, Zap, CheckCircle2 } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se usuário já está autenticado
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push("/");
      }
      setLoading(false);
    });

    // Listener para mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Animated Tech Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Branding */}
        <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
          <div className="max-w-xl mx-auto lg:mx-0">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                minnes.multas
              </span>
            </div>

            {/* Hero Text */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/30 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-400 font-medium">
                  Powered by AI Technology
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent mb-6">
                Recurso de Multas Inteligente
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Economize tempo e dinheiro com nossa plataforma premium de
                recursos automáticos.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {[
                {
                  icon: Zap,
                  title: "Geração Instantânea",
                  desc: "Recursos criados em segundos com IA",
                },
                {
                  icon: Trophy,
                  title: "Sistema de Gamificação",
                  desc: "Ganhe XP e desbloqueie recompensas",
                },
                {
                  icon: CheckCircle2,
                  title: "94% de Sucesso",
                  desc: "Taxa comprovada de aprovação",
                },
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="lg:w-1/2 p-8 lg:p-16 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-8 shadow-2xl">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Bem-vindo!
                </h2>
                <p className="text-gray-400">
                  Entre ou crie sua conta para começar
                </p>
              </div>

              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: "#06b6d4",
                        brandAccent: "#0891b2",
                        brandButtonText: "white",
                        defaultButtonBackground: "#1f2937",
                        defaultButtonBackgroundHover: "#374151",
                        defaultButtonBorder: "#374151",
                        defaultButtonText: "white",
                        dividerBackground: "#374151",
                        inputBackground: "#111827",
                        inputBorder: "#374151",
                        inputBorderHover: "#06b6d4",
                        inputBorderFocus: "#06b6d4",
                        inputText: "white",
                        inputLabelText: "#9ca3af",
                        inputPlaceholder: "#6b7280",
                        messageText: "#9ca3af",
                        messageTextDanger: "#ef4444",
                        anchorTextColor: "#06b6d4",
                        anchorTextHoverColor: "#0891b2",
                      },
                      space: {
                        inputPadding: "12px",
                        buttonPadding: "12px",
                      },
                      borderWidths: {
                        buttonBorderWidth: "1px",
                        inputBorderWidth: "1px",
                      },
                      radii: {
                        borderRadiusButton: "0.75rem",
                        buttonBorderRadius: "0.75rem",
                        inputBorderRadius: "0.75rem",
                      },
                    },
                  },
                  className: {
                    container: "auth-container",
                    button: "auth-button",
                    input: "auth-input",
                  },
                }}
                localization={{
                  variables: {
                    sign_in: {
                      email_label: "Email",
                      password_label: "Senha",
                      email_input_placeholder: "seu@email.com",
                      password_input_placeholder: "Sua senha",
                      button_label: "Entrar",
                      loading_button_label: "Entrando...",
                      social_provider_text: "Entrar com {{provider}}",
                      link_text: "Já tem uma conta? Entre",
                    },
                    sign_up: {
                      email_label: "Email",
                      password_label: "Senha",
                      email_input_placeholder: "seu@email.com",
                      password_input_placeholder: "Crie uma senha",
                      button_label: "Criar conta",
                      loading_button_label: "Criando conta...",
                      social_provider_text: "Cadastrar com {{provider}}",
                      link_text: "Não tem uma conta? Cadastre-se",
                    },
                    forgotten_password: {
                      email_label: "Email",
                      password_label: "Senha",
                      email_input_placeholder: "seu@email.com",
                      button_label: "Enviar instruções",
                      loading_button_label: "Enviando...",
                      link_text: "Esqueceu sua senha?",
                    },
                    update_password: {
                      password_label: "Nova senha",
                      password_input_placeholder: "Nova senha",
                      button_label: "Atualizar senha",
                      loading_button_label: "Atualizando...",
                    },
                  },
                }}
                providers={[]}
                redirectTo={`${window.location.origin}/`}
              />

              <div className="mt-6 text-center text-sm text-gray-400">
                Ao continuar, você concorda com nossos{" "}
                <a href="#" className="text-cyan-400 hover:underline">
                  Termos de Uso
                </a>{" "}
                e{" "}
                <a href="#" className="text-cyan-400 hover:underline">
                  Política de Privacidade
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
