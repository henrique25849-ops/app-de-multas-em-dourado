import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types para o banco de dados
export type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  plan: 'free' | 'basic' | 'premium';
  xp: number;
  level: number;
  created_at: string;
  updated_at: string;
};

export type Recurso = {
  id: string;
  user_id: string;
  multa_id: string;
  tipo: string;
  status: 'pending' | 'in_analysis' | 'approved' | 'rejected';
  valor: number;
  data_criacao: string;
  data_atualizacao: string;
};

export type Badge = {
  id: string;
  user_id: string;
  badge_type: string;
  unlocked_at: string;
};

export type LearningProgress = {
  id: string;
  user_id: string;
  module_id: string;
  lessons_completed: number;
  total_lessons: number;
  completed: boolean;
  updated_at: string;
};
