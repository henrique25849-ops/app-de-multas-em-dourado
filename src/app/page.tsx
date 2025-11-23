"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabase";
import { 
  FileText, 
  Search, 
  CreditCard, 
  Users, 
  BookOpen, 
  Headphones,
  Menu,
  X,
  Shield,
  Zap,
  Award,
  TrendingUp,
  Clock,
  CheckCircle2,
  Star,
  MessageSquare,
  FileCheck,
  Sparkles,
  ArrowRight,
  Sun,
  Moon,
  Trophy,
  Target,
  Flame,
  Gift,
  Crown,
  Medal,
  Rocket,
  Play,
  LogOut
} from "lucide-react";

export default function Home() {
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [darkMode, setDarkMode] = useState(true);
  const [recursos, setRecursos] = useState<any[]>([]);
  const [badges, setBadges] = useState<any[]>([]);
  const [learningProgress, setLearningProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Carregar recursos
      const { data: recursosData } = await supabase
        .from("recursos")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });
      
      if (recursosData) setRecursos(recursosData);

      // Carregar badges
      const { data: badgesData } = await supabase
        .from("badges")
        .select("*")
        .eq("user_id", user?.id);
      
      if (badgesData) setBadges(badgesData);

      // Carregar progresso de aprendizado
      const { data: progressData } = await supabase
        .from("learning_progress")
        .select("*")
        .eq("user_id", user?.id);
      
      if (progressData) setLearningProgress(progressData);

    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user || !profile) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: "home", label: "Início", icon: Shield },
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "recursos", label: "Recursos Salvos", icon: FileCheck },
    { id: "comunidade", label: "Comunidade", icon: Users },
    { id: "planos", label: "Planos", icon: CreditCard },
    { id: "gamificacao", label: "Aprendizado", icon: Trophy },
    { id: "consultoria", label: "Consultoria", icon: Headphones },
  ];

  const mainActions = [
    { 
      title: "Gerar Recurso", 
      icon: FileText, 
      description: "Crie recursos automáticos com IA",
      color: "from-cyan-400 to-blue-500",
      badge: "Mais usado"
    },
    { 
      title: "Consultar Multas", 
      icon: Search, 
      description: "Busque e analise suas multas",
      color: "from-blue-400 to-indigo-500",
      badge: "Rápido"
    },
    { 
      title: "Planos Premium", 
      icon: CreditCard, 
      description: "Acesse recursos exclusivos",
      color: "from-indigo-400 to-purple-500",
      badge: "Popular"
    },
    { 
      title: "Comunidade", 
      icon: Users, 
      description: "Conecte-se com outros usuários",
      color: "from-purple-400 to-pink-500",
      badge: "Ativo"
    },
    { 
      title: "Aprendizado", 
      icon: Trophy, 
      description: "Ganhe pontos e recompensas",
      color: "from-cyan-400 to-teal-500",
      badge: "Novo"
    },
    { 
      title: "Suporte 24/7", 
      icon: Headphones, 
      description: "Atendimento especializado",
      color: "from-blue-500 to-cyan-400",
      badge: "Premium"
    },
  ];

  const stats = [
    { label: "Recursos Gerados", value: recursos.length.toString(), icon: FileText },
    { label: "Taxa de Sucesso", value: "94%", icon: CheckCircle2 },
    { label: "Nível Atual", value: profile.level.toString(), icon: Trophy },
    { label: "XP Total", value: profile.xp.toString(), icon: Star },
  ];

  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "/mês",
      features: [
        "1 recurso por mês",
        "Consulta básica de multas",
        "Acesso à comunidade",
        "Sistema de gamificação"
      ],
      highlight: false,
      current: profile.plan === "free"
    },
    {
      name: "Básico",
      price: "R$ 49",
      period: "/mês",
      features: [
        "5 recursos por mês",
        "Consulta avançada",
        "Suporte prioritário",
        "Todos os conteúdos",
        "Análise de viabilidade"
      ],
      highlight: false,
      current: profile.plan === "basic"
    },
    {
      name: "Premium",
      price: "R$ 149",
      period: "/mês",
      features: [
        "Recursos ilimitados",
        "Consultoria especializada",
        "Análise jurídica completa",
        "Acompanhamento de processos",
        "Suporte 24/7",
        "Badges exclusivas"
      ],
      highlight: true,
      current: profile.plan === "premium"
    }
  ];

  const communityPosts = [
    {
      user: "Carlos M.",
      badge: "Premium",
      time: "2h atrás",
      content: "Consegui cancelar uma multa de R$ 880 usando o recurso gerado aqui! Obrigado!",
      likes: 45,
      comments: 12
    },
    {
      user: "Ana Silva",
      badge: "Básico",
      time: "5h atrás",
      content: "Alguém já teve experiência com multas de estacionamento irregular?",
      likes: 23,
      comments: 8
    },
    {
      user: "Roberto L.",
      badge: "Premium",
      time: "1d atrás",
      content: "A consultoria premium vale cada centavo. Economizei mais de R$ 3.000!",
      likes: 67,
      comments: 19
    }
  ];

  const userLevel = {
    current: profile.level,
    xp: profile.xp,
    xpToNext: profile.level * 1000,
    title: profile.level >= 10 ? "Mestre em Recursos" : profile.level >= 5 ? "Especialista em Recursos" : "Iniciante"
  };

  const allBadges = [
    { name: "Primeira Vitória", icon: Trophy, unlocked: badges.some(b => b.badge_type === "first_win"), color: "from-yellow-400 to-orange-500" },
    { name: "Sequência 7 dias", icon: Flame, unlocked: badges.some(b => b.badge_type === "streak_7"), color: "from-orange-400 to-red-500" },
    { name: "10 Recursos", icon: Target, unlocked: badges.some(b => b.badge_type === "resources_10"), color: "from-cyan-400 to-blue-500" },
    { name: "Mestre", icon: Crown, unlocked: badges.some(b => b.badge_type === "master"), color: "from-purple-400 to-pink-500" },
    { name: "100% Completo", icon: Star, unlocked: badges.some(b => b.badge_type === "complete_100"), color: "from-green-400 to-emerald-500" },
    { name: "Lendário", icon: Rocket, unlocked: badges.some(b => b.badge_type === "legendary"), color: "from-indigo-400 to-purple-600" },
  ];

  const learningModules = [
    {
      title: "Fundamentos de Recursos",
      lessons: 5,
      completed: learningProgress.find(p => p.module_id === "fundamentals")?.lessons_completed || 0,
      xp: 500,
      duration: "25 min",
      icon: BookOpen,
      color: "from-cyan-400 to-blue-500",
      status: "available"
    },
    {
      title: "Tipos de Multas",
      lessons: 8,
      completed: learningProgress.find(p => p.module_id === "types")?.lessons_completed || 0,
      xp: 800,
      duration: "40 min",
      icon: FileText,
      color: "from-blue-400 to-indigo-500",
      status: "available"
    },
    {
      title: "Estratégias Avançadas",
      lessons: 6,
      completed: learningProgress.find(p => p.module_id === "advanced")?.lessons_completed || 0,
      xp: 600,
      duration: "30 min",
      icon: Zap,
      color: "from-indigo-400 to-purple-500",
      status: profile.level >= 5 ? "available" : "locked"
    },
    {
      title: "Casos de Sucesso",
      lessons: 10,
      completed: learningProgress.find(p => p.module_id === "cases")?.lessons_completed || 0,
      xp: 1000,
      duration: "50 min",
      icon: Award,
      color: "from-purple-400 to-pink-500",
      status: profile.level >= 10 ? "available" : "locked"
    }
  ];

  const dailyChallenges = [
    { title: "Assista 1 lição", reward: "+50 XP", icon: Play, completed: false },
    { title: "Complete um módulo", reward: "+200 XP", icon: Target, completed: false },
    { title: "Compartilhe na comunidade", reward: "+100 XP", icon: MessageSquare, completed: false },
  ];

  const leaderboard = [
    { rank: 1, name: "João Silva", xp: 8500, avatar: "J", badge: "Lendário" },
    { rank: 2, name: "Maria Santos", xp: 7200, avatar: "M", badge: "Mestre" },
    { rank: 3, name: "Pedro Costa", xp: 6800, avatar: "P", badge: "Especialista" },
    { rank: 4, name: profile.full_name || "Você", xp: profile.xp, avatar: profile.full_name?.charAt(0) || "V", badge: userLevel.title, highlight: true },
    { rank: 5, name: "Ana Lima", xp: 2100, avatar: "A", badge: "Avançado" },
  ];

  const renderHome = () => (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6 pt-8">
        <div className={`inline-flex items-center gap-2 ${darkMode ? 'bg-cyan-500/10 border-cyan-400/30' : 'bg-cyan-500/20 border-cyan-500/40'} border rounded-full px-4 py-2 mb-4`}>
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-cyan-400 font-medium">Powered by AI Technology</span>
        </div>
        <h1 className={`text-5xl md:text-7xl font-bold ${darkMode ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600' : 'bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-800'} bg-clip-text text-transparent`}>
          Olá, {profile.full_name || "Usuário"}!
        </h1>
        <p className={`text-xl md:text-2xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
          Bem-vindo de volta à sua plataforma de recursos inteligentes.
        </p>
      </div>

      {/* Main Actions */}
      <div className="space-y-4">
        <h2 className={`text-3xl md:text-4xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-900'} mb-8`}>
          Acesse Nossas Funcionalidades
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mainActions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                if (action.title === "Planos Premium") setActiveSection("planos");
                if (action.title === "Comunidade") setActiveSection("comunidade");
                if (action.title === "Aprendizado") setActiveSection("gamificacao");
              }}
              className={`group relative ${darkMode ? 'bg-gradient-to-br from-gray-900/60 to-gray-950/80 border-gray-800/50 hover:border-cyan-500/50' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-cyan-500/50'} backdrop-blur-sm border-2 rounded-3xl p-8 md:p-10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20 text-left overflow-hidden`}
            >
              <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-bold ${darkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-500/30 text-cyan-600'} border border-cyan-500/30`}>
                {action.badge}
              </div>
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${action.color} mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-cyan-500/30`}>
                  <action.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3 group-hover:text-cyan-400 transition-colors duration-300`}>
                  {action.title}
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-base md:text-lg mb-6 leading-relaxed`}>
                  {action.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-cyan-400 font-bold text-lg group-hover:gap-3 transition-all duration-300">
                    <span>Acessar Agora</span>
                    <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                  <div className={`w-12 h-1 rounded-full bg-gradient-to-r ${action.color} opacity-50 group-hover:opacity-100 group-hover:w-20 transition-all duration-500`}></div>
                </div>
              </div>
              <div className={`absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br ${action.color} opacity-5 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`}></div>
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-6">
        <h2 className={`text-3xl md:text-4xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Seus Resultados
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`${darkMode ? 'bg-gray-900/30 border-gray-800/50 hover:border-cyan-500/50' : 'bg-white border-gray-200 hover:border-cyan-500/50'} backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:scale-105 shadow-lg`}
            >
              <stat.icon className="w-8 h-8 text-cyan-400 mb-3" />
              <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>{stat.value}</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Dashboard</h2>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Bem-vindo de volta! Aqui está seu resumo.</p>
        </div>
        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-3 rounded-xl font-bold capitalize">
          Plano {profile.plan}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${darkMode ? 'bg-gray-900/30 border-gray-800/50' : 'bg-white border-gray-200'} backdrop-blur-sm border rounded-2xl p-6`}>
          <div className="flex items-center justify-between mb-4">
            <FileCheck className="w-8 h-8 text-cyan-400" />
            <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{recursos.filter(r => r.status === 'in_analysis').length}</span>
          </div>
          <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Recursos Ativos</div>
        </div>

        <div className={`${darkMode ? 'bg-gray-900/30 border-gray-800/50' : 'bg-white border-gray-200'} backdrop-blur-sm border rounded-2xl p-6`}>
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-blue-400" />
            <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{recursos.filter(r => r.status === 'pending').length}</span>
          </div>
          <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Em Análise</div>
        </div>

        <div className={`${darkMode ? 'bg-gray-900/30 border-gray-800/50' : 'bg-white border-gray-200'} backdrop-blur-sm border rounded-2xl p-6`}>
          <div className="flex items-center justify-between mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{recursos.filter(r => r.status === 'approved').length}</span>
          </div>
          <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Aprovados</div>
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-900/30 border-gray-800/50' : 'bg-white border-gray-200'} backdrop-blur-sm border rounded-2xl p-8`}>
        <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Atividade Recente</h3>
        {recursos.length === 0 ? (
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Nenhuma atividade ainda. Comece gerando seu primeiro recurso!</p>
        ) : (
          <div className="space-y-4">
            {recursos.slice(0, 5).map((recurso, index) => (
              <div key={index} className={`flex items-center justify-between p-4 ${darkMode ? 'bg-gray-950/40 border-gray-800/30 hover:border-cyan-500/30' : 'bg-gray-50 border-gray-200 hover:border-cyan-500/30'} rounded-xl border transition-all duration-300`}>
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${recurso.status === 'approved' ? 'bg-cyan-400' : 'bg-yellow-400'}`}></div>
                  <div>
                    <div className={`${darkMode ? 'text-white' : 'text-gray-900'} font-medium`}>Recurso #{recurso.id.slice(0, 8)}</div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{recurso.tipo}</div>
                  </div>
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  {new Date(recurso.created_at).toLocaleDateString('pt-BR')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderRecursos = () => (
    <div className="space-y-8">
      <div>
        <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Recursos Salvos</h2>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Gerencie todos os seus recursos de multas.</p>
      </div>

      {recursos.length === 0 ? (
        <div className={`${darkMode ? 'bg-gray-900/30 border-gray-800/50' : 'bg-white border-gray-200'} backdrop-blur-sm border rounded-2xl p-12 text-center`}>
          <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Nenhum recurso ainda</h3>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Comece gerando seu primeiro recurso de multa!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recursos.map((recurso, index) => (
            <div 
              key={index}
              className={`${darkMode ? 'bg-gray-900/30 border-gray-800/50 hover:border-cyan-500/50' : 'bg-white border-gray-200 hover:border-cyan-500/50'} backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:scale-105`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>#{recurso.id.slice(0, 8)}</div>
                  <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{recurso.tipo}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  recurso.status === 'approved' ? 'bg-cyan-500/20 text-cyan-400' :
                  recurso.status === 'in_analysis' ? 'bg-yellow-400/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {recurso.status === 'approved' ? 'Aprovado' : recurso.status === 'in_analysis' ? 'Em análise' : 'Pendente'}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={darkMode ? 'text-gray-500' : 'text-gray-500'}>
                  {new Date(recurso.created_at).toLocaleDateString('pt-BR')}
                </span>
                <span className={`${darkMode ? 'text-white' : 'text-gray-900'} font-bold`}>
                  R$ {recurso.valor.toFixed(2)}
                </span>
              </div>
              <button className={`w-full mt-4 ${darkMode ? 'bg-gray-950 hover:bg-cyan-500/10' : 'bg-gray-50 hover:bg-cyan-500/10'} border border-cyan-500/30 text-cyan-400 py-2 rounded-xl font-medium transition-all duration-300`}>
                Ver Detalhes
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderComunidade = () => (
    <div className="space-y-8">
      <div>
        <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Comunidade</h2>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Conecte-se, compartilhe e aprenda com outros usuários.</p>
      </div>

      <div className="space-y-4">
        {communityPosts.map((post, index) => (
          <div 
            key={index}
            className={`${darkMode ? 'bg-gray-900/30 border-gray-800/50 hover:border-cyan-500/30' : 'bg-white border-gray-200 hover:border-cyan-500/30'} backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300`}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {post.user.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`${darkMode ? 'text-white' : 'text-gray-900'} font-bold`}>{post.user}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    post.badge === 'Premium' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-blue-400/20 text-blue-400'
                  }`}>
                    {post.badge}
                  </span>
                  <span className={`${darkMode ? 'text-gray-500' : 'text-gray-500'} text-sm`}>• {post.time}</span>
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>{post.content}</p>
                <div className="flex items-center gap-6 text-sm">
                  <button className={`flex items-center gap-2 ${darkMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-500'} transition-colors`}>
                    <Star className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </button>
                  <button className={`flex items-center gap-2 ${darkMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-500'} transition-colors`}>
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105">
        Criar Nova Publicação
      </button>
    </div>
  );

  const renderPlanos = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Escolha Seu Plano</h2>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Selecione o plano ideal para suas necessidades.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div 
            key={index}
            className={`relative ${darkMode ? 'bg-gray-900/30' : 'bg-white'} backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
              plan.highlight 
                ? 'border-cyan-500 shadow-2xl shadow-cyan-500/20' 
                : darkMode ? 'border-gray-800/50 hover:border-cyan-500/30' : 'border-gray-200 hover:border-cyan-500/30'
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                Mais Popular
              </div>
            )}
            {plan.current && (
              <div className="absolute -top-4 right-4 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                Plano Atual
              </div>
            )}
            <div className="text-center mb-6">
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{plan.name}</h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className={`text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{plan.period}</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className={`flex items-center gap-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button 
              disabled={plan.current}
              className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
                plan.current
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : plan.highlight
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:scale-105'
                  : darkMode ? 'bg-gray-950 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10' : 'bg-gray-50 border border-cyan-500/30 text-cyan-600 hover:bg-cyan-500/10'
              }`}
            >
              {plan.current ? 'Plano Atual' : 'Assinar Agora'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGamificacao = () => (
    <div className="space-y-8">
      {/* Header com Level e XP */}
      <div className={`${darkMode ? 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30' : 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/40'} border rounded-3xl p-8`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/50">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full border-2 border-gray-950">
                Nv {userLevel.current}
              </div>
            </div>
            <div>
              <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>{userLevel.title}</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-lg`}>Continue aprendendo para subir de nível!</p>
            </div>
          </div>
          <div className="text-center">
            <div className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{userLevel.xp} XP</div>
            <div className={`${darkMode ? 'bg-gray-950/40' : 'bg-white/60'} rounded-full h-3 w-64 overflow-hidden`}>
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(userLevel.xp / userLevel.xpToNext) * 100}%` }}
              ></div>
            </div>
            <p className={`${darkMode ? 'text-gray-500' : 'text-gray-600'} text-sm mt-2`}>
              {userLevel.xpToNext - userLevel.xp} XP para o próximo nível
            </p>
          </div>
        </div>
      </div>

      {/* Desafios Diários */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-8 h-8 text-cyan-400" />
          <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Desafios Diários</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dailyChallenges.map((challenge, index) => (
            <div 
              key={index}
              className={`${darkMode ? 'bg-gray-900/30 border-gray-800/50' : 'bg-white border-gray-200'} backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
                challenge.completed ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <challenge.icon className={`w-10 h-10 ${challenge.completed ? 'text-green-400' : 'text-cyan-400'}`} />
                {challenge.completed && <CheckCircle2 className="w-6 h-6 text-green-400" />}
              </div>
              <h4 className={`${darkMode ? 'text-white' : 'text-gray-900'} font-bold text-lg mb-2`}>{challenge.title}</h4>
              <div className="flex items-center justify-between">
                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{challenge.reward}</span>
                {!challenge.completed && (
                  <button className="text-cyan-400 text-sm font-bold hover:underline">Começar</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Módulos de Aprendizado */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-8 h-8 text-cyan-400" />
          <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Módulos de Aprendizado</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningModules.map((module, index) => (
            <div 
              key={index}
              className={`group relative ${darkMode ? 'bg-gray-900/30 border-gray-800/50 hover:border-cyan-500/50' : 'bg-white border-gray-200 hover:border-cyan-500/50'} backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
                module.status === 'locked' ? 'opacity-50' : ''
              }`}
            >
              {module.completed === module.lessons && (
                <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Completo
                </div>
              )}
              {module.completed > 0 && module.completed < module.lessons && (
                <div className="absolute top-4 right-4 bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  Em Progresso
                </div>
              )}
              {module.status === 'locked' && (
                <div className="absolute top-4 right-4 bg-gray-500/20 text-gray-400 px-3 py-1 rounded-full text-xs font-bold">
                  Bloqueado
                </div>
              )}

              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${module.color} mb-4 shadow-lg`}>
                <module.icon className="w-8 h-8 text-white" />
              </div>

              <h4 className={`${darkMode ? 'text-white' : 'text-gray-900'} font-bold text-xl mb-3`}>{module.title}</h4>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Progresso</span>
                  <span className="text-cyan-400 font-bold">{module.completed}/{module.lessons} lições</span>
                </div>
                <div className={`${darkMode ? 'bg-gray-950/40' : 'bg-gray-100'} rounded-full h-2 overflow-hidden`}>
                  <div 
                    className={`bg-gradient-to-r ${module.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${(module.completed / module.lessons) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 text-sm">
                  <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Clock className="w-4 h-4" />
                    {module.duration}
                  </span>
                  <span className="flex items-center gap-1 text-cyan-400 font-bold">
                    <Star className="w-4 h-4" />
                    +{module.xp} XP
                  </span>
                </div>
              </div>

              <button 
                disabled={module.status === 'locked'}
                className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
                  module.status === 'locked'
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:scale-105'
                }`}
              >
                {module.status === 'locked' ? `Desbloqueie no nível ${index * 5 + 5}` : module.completed === module.lessons ? 'Revisar' : module.completed > 0 ? 'Continuar' : 'Começar'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Badges Conquistadas */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-8 h-8 text-cyan-400" />
          <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Conquistas</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {allBadges.map((badge, index) => (
            <div 
              key={index}
              className={`${darkMode ? 'bg-gray-900/30 border-gray-800/50' : 'bg-white border-gray-200'} backdrop-blur-sm border rounded-2xl p-4 text-center transition-all duration-300 hover:scale-105 ${
                !badge.unlocked ? 'opacity-40 grayscale' : ''
              }`}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${badge.color} mb-3 shadow-lg ${
                badge.unlocked ? 'animate-pulse' : ''
              }`}>
                <badge.icon className="w-8 h-8 text-white" />
              </div>
              <p className={`${darkMode ? 'text-white' : 'text-gray-900'} font-bold text-sm`}>{badge.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ranking */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Crown className="w-8 h-8 text-yellow-400" />
          <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Ranking Global</h3>
        </div>
        <div className={`${darkMode ? 'bg-gray-900/30 border-gray-800/50' : 'bg-white border-gray-200'} backdrop-blur-sm border rounded-2xl overflow-hidden`}>
          {leaderboard.map((user, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between p-6 border-b ${darkMode ? 'border-gray-800/50' : 'border-gray-200'} last:border-b-0 transition-all duration-300 ${
                user.highlight ? 'bg-cyan-500/10 border-l-4 border-l-cyan-500' : 'hover:bg-gray-950/20'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`text-2xl font-bold ${
                  user.rank === 1 ? 'text-yellow-400' :
                  user.rank === 2 ? 'text-gray-400' :
                  user.rank === 3 ? 'text-orange-400' :
                  darkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  #{user.rank}
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                  user.highlight ? 'bg-gradient-to-br from-cyan-400 to-blue-500' : 'bg-gradient-to-br from-gray-600 to-gray-700'
                }`}>
                  {user.avatar}
                </div>
                <div>
                  <div className={`${darkMode ? 'text-white' : 'text-gray-900'} font-bold`}>{user.name}</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.badge}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.xp}</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>XP</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recompensas Disponíveis */}
      <div className={`${darkMode ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30' : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/40'} border rounded-3xl p-8`}>
        <div className="flex items-center gap-4 mb-6">
          <Gift className="w-12 h-12 text-purple-400" />
          <div>
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recompensas Disponíveis</h3>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Troque seus pontos por benefícios exclusivos</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "1 Recurso Grátis", cost: 500, icon: FileText },
            { name: "Consultoria 30min", cost: 1500, icon: Headphones },
            { name: "Badge Exclusiva", cost: 2000, icon: Medal }
          ].map((reward, index) => (
            <div 
              key={index}
              className={`${darkMode ? 'bg-gray-950/40 border-gray-800/30' : 'bg-white/60 border-gray-200'} border rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105`}
            >
              <reward.icon className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <h4 className={`${darkMode ? 'text-white' : 'text-gray-900'} font-bold mb-2`}>{reward.name}</h4>
              <div className="text-purple-400 font-bold text-lg mb-4">{reward.cost} XP</div>
              <button 
                disabled={profile.xp < reward.cost}
                className={`w-full py-2 rounded-xl font-bold transition-all duration-300 ${
                  profile.xp < reward.cost
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-400 to-pink-500 text-white hover:scale-105'
                }`}
              >
                {profile.xp < reward.cost ? 'XP Insuficiente' : 'Resgatar'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderConsultoria = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Consultoria Premium</h2>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Atendimento especializado com advogados experientes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`${darkMode ? 'bg-gradient-to-br from-gray-900/40 to-gray-950/60 border-cyan-500/30' : 'bg-gradient-to-br from-white to-gray-50 border-cyan-500/40'} backdrop-blur-sm border rounded-2xl p-8`}>
          <Headphones className="w-16 h-16 text-cyan-400 mb-6" />
          <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Consultoria Individual</h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>Sessão de 1 hora com especialista para análise detalhada do seu caso.</p>
          <div className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>R$ 299</div>
          <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300">
            Agendar Agora
          </button>
        </div>

        <div className={`${darkMode ? 'bg-gradient-to-br from-gray-900/40 to-gray-950/60 border-cyan-500/30' : 'bg-gradient-to-br from-white to-gray-50 border-cyan-500/40'} backdrop-blur-sm border rounded-2xl p-8`}>
          <Shield className="w-16 h-16 text-cyan-400 mb-6" />
          <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Acompanhamento Completo</h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>Suporte contínuo até a resolução final do seu processo.</p>
          <div className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>R$ 899</div>
          <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300">
            Contratar Agora
          </button>
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-900/30 border-gray-800/50' : 'bg-white border-gray-200'} backdrop-blur-sm border rounded-2xl p-8`}>
        <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Por que escolher nossa consultoria?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: CheckCircle2, title: "Especialistas Certificados", desc: "Advogados com mais de 10 anos de experiência" },
            { icon: Zap, title: "Resposta Rápida", desc: "Atendimento em até 24 horas" },
            { icon: Shield, title: "Garantia de Qualidade", desc: "Satisfação garantida ou seu dinheiro de volta" },
            { icon: Award, title: "Taxa de Sucesso", desc: "94% de aprovação nos recursos" }
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <item.icon className="w-8 h-8 text-cyan-400 flex-shrink-0" />
              <div>
                <h4 className={`${darkMode ? 'text-white' : 'text-gray-900'} font-bold mb-1`}>{item.title}</h4>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen relative ${darkMode ? 'bg-gray-950' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Animated Tech Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 ${darkMode ? 'opacity-20' : 'opacity-10'}`} style={{
          backgroundImage: `linear-gradient(${darkMode ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.2)'} 1px, transparent 1px), linear-gradient(90deg, ${darkMode ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.2)'} 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-950/95 border-gray-800/50' : 'bg-white/95 border-gray-200'} backdrop-blur-lg border-b transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>minnes.multas</span>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-900/30' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-900/50 hover:bg-gray-900 text-cyan-400' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={signOut}
                className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  darkMode 
                    ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400' 
                    : 'bg-red-500/10 hover:bg-red-500/20 text-red-600'
                }`}
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Sair</span>
              </button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`md:hidden p-2 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className={`md:hidden border-t ${darkMode ? 'border-gray-800/50 bg-gray-950/98' : 'border-gray-200 bg-white/98'} backdrop-blur-lg transition-colors duration-300`}>
            <nav className="px-4 py-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-900/30' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
              <button
                onClick={signOut}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  darkMode 
                    ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400' 
                    : 'bg-red-500/10 hover:bg-red-500/20 text-red-600'
                }`}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sair</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {activeSection === "home" && renderHome()}
        {activeSection === "dashboard" && renderDashboard()}
        {activeSection === "recursos" && renderRecursos()}
        {activeSection === "comunidade" && renderComunidade()}
        {activeSection === "planos" && renderPlanos()}
        {activeSection === "gamificacao" && renderGamificacao()}
        {activeSection === "consultoria" && renderConsultoria()}
      </main>

      {/* Footer */}
      <footer className={`relative border-t ${darkMode ? 'border-gray-800/50 bg-gray-950/95' : 'border-gray-200 bg-white/95'} backdrop-blur-lg mt-16 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className={`${darkMode ? 'text-white' : 'text-gray-900'} font-bold`}>minnes.multas</span>
            </div>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
              © 2024 minnes.multas. Todos os direitos reservados.
            </p>
            <div className={`flex items-center gap-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <a href="#" className="hover:text-cyan-400 transition-colors">Termos</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacidade</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
