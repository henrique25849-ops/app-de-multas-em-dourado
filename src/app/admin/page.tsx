"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabase";
import { 
  Video, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Shield,
  AlertCircle,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff
} from "lucide-react";

type VideoTutorial = {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url?: string;
  duration: string;
  category: string;
  xp_reward: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export default function AdminPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [videos, setVideos] = useState<VideoTutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoTutorial | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video_url: "",
    thumbnail_url: "",
    duration: "",
    category: "fundamentos",
    xp_reward: 100,
    is_published: false
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    // Verificar se usuário é admin
    if (user && profile) {
      checkAdminAccess();
    }
  }, [user, profile]);

  useEffect(() => {
    if (user) {
      loadVideos();
    }
  }, [user]);

  const checkAdminAccess = async () => {
    try {
      // Verificar se o usuário tem role de admin na tabela user_profiles
      const { data, error } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("id", user?.id)
        .single();

      if (error || !data || data.role !== "admin") {
        // Se não for admin, redireciona para home
        router.push("/");
      }
    } catch (error) {
      console.error("Erro ao verificar acesso admin:", error);
      router.push("/");
    }
  };

  const loadVideos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("video_tutorials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setVideos(data);
    } catch (error) {
      console.error("Erro ao carregar vídeos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingVideo) {
        // Atualizar vídeo existente
        const { error } = await supabase
          .from("video_tutorials")
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq("id", editingVideo.id);

        if (error) throw error;
      } else {
        // Criar novo vídeo
        const { error } = await supabase
          .from("video_tutorials")
          .insert([formData]);

        if (error) throw error;
      }

      // Resetar formulário e recarregar lista
      resetForm();
      loadVideos();
    } catch (error) {
      console.error("Erro ao salvar vídeo:", error);
      alert("Erro ao salvar vídeo. Tente novamente.");
    }
  };

  const handleEdit = (video: VideoTutorial) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description,
      video_url: video.video_url,
      thumbnail_url: video.thumbnail_url || "",
      duration: video.duration,
      category: video.category,
      xp_reward: video.xp_reward,
      is_published: video.is_published
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este vídeo?")) return;

    try {
      const { error } = await supabase
        .from("video_tutorials")
        .delete()
        .eq("id", id);

      if (error) throw error;
      loadVideos();
    } catch (error) {
      console.error("Erro ao excluir vídeo:", error);
      alert("Erro ao excluir vídeo. Tente novamente.");
    }
  };

  const togglePublish = async (video: VideoTutorial) => {
    try {
      const { error } = await supabase
        .from("video_tutorials")
        .update({ 
          is_published: !video.is_published,
          updated_at: new Date().toISOString()
        })
        .eq("id", video.id);

      if (error) throw error;
      loadVideos();
    } catch (error) {
      console.error("Erro ao alterar status:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      video_url: "",
      thumbnail_url: "",
      duration: "",
      category: "fundamentos",
      xp_reward: 100,
      is_published: false
    });
    setEditingVideo(null);
    setShowForm(false);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur-lg border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">Painel Admin</span>
                <p className="text-xs text-gray-400">Gerenciamento de Vídeos</p>
              </div>
            </div>

            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 bg-gray-900/50 hover:bg-gray-900 text-gray-400 hover:text-white rounded-xl transition-all duration-300"
            >
              Voltar ao App
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
            <Video className="w-8 h-8 text-cyan-400 mb-3" />
            <div className="text-3xl font-bold text-white mb-1">{videos.length}</div>
            <div className="text-sm text-gray-400">Total de Vídeos</div>
          </div>

          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
            <Eye className="w-8 h-8 text-green-400 mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              {videos.filter(v => v.is_published).length}
            </div>
            <div className="text-sm text-gray-400">Publicados</div>
          </div>

          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
            <EyeOff className="w-8 h-8 text-yellow-400 mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              {videos.filter(v => !v.is_published).length}
            </div>
            <div className="text-sm text-gray-400">Rascunhos</div>
          </div>

          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
            <Clock className="w-8 h-8 text-blue-400 mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              {videos.reduce((acc, v) => acc + parseInt(v.duration.split(':')[0] || '0'), 0)}min
            </div>
            <div className="text-sm text-gray-400">Duração Total</div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Vídeos e Tutoriais</h2>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Adicionar Vídeo
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {editingVideo ? "Editar Vídeo" : "Novo Vídeo"}
                </h3>
                <button
                  onClick={resetForm}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Título *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="Ex: Fundamentos de Recursos de Multas"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Descrição *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                    placeholder="Descreva o conteúdo do vídeo..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    URL do Vídeo (YouTube/Vimeo) *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    URL da Thumbnail (opcional)
                  </label>
                  <input
                    type="url"
                    value={formData.thumbnail_url}
                    onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Duração *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none transition-colors"
                      placeholder="Ex: 15:30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      XP Recompensa *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.xp_reward}
                      onChange={(e) => setFormData({ ...formData, xp_reward: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none transition-colors"
                      placeholder="100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Categoria *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  >
                    <option value="fundamentos">Fundamentos</option>
                    <option value="tipos">Tipos de Multas</option>
                    <option value="avancado">Estratégias Avançadas</option>
                    <option value="casos">Casos de Sucesso</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_published"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    className="w-5 h-5 bg-gray-950 border border-gray-800 rounded text-cyan-500 focus:ring-cyan-500"
                  />
                  <label htmlFor="is_published" className="text-gray-300">
                    Publicar imediatamente
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-bold transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white rounded-xl font-bold transition-all duration-300"
                  >
                    <Save className="w-5 h-5" />
                    {editingVideo ? "Atualizar" : "Salvar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Videos List */}
        <div className="space-y-4">
          {videos.length === 0 ? (
            <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-12 text-center">
              <Video className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Nenhum vídeo cadastrado</h3>
              <p className="text-gray-400 mb-6">Comece adicionando seu primeiro vídeo tutorial!</p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white rounded-xl font-bold transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                Adicionar Primeiro Vídeo
              </button>
            </div>
          ) : (
            videos.map((video) => (
              <div
                key={video.id}
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 hover:border-cyan-500/30 rounded-2xl p-6 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Thumbnail */}
                  <div className="flex-shrink-0">
                    {video.thumbnail_url ? (
                      <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        className="w-full md:w-48 h-32 object-cover rounded-xl"
                      />
                    ) : (
                      <div className="w-full md:w-48 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                        <Video className="w-12 h-12 text-cyan-400" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
                        <p className="text-gray-400 text-sm line-clamp-2">{video.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {video.is_published ? (
                          <span className="flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            Publicado
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-xs font-bold">
                            <AlertCircle className="w-3 h-3" />
                            Rascunho
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {video.duration}
                      </span>
                      <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-xs font-medium">
                        {video.category}
                      </span>
                      <span className="text-cyan-400 font-bold">+{video.xp_reward} XP</span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => togglePublish(video)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                          video.is_published
                            ? "bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400"
                            : "bg-green-500/10 hover:bg-green-500/20 text-green-400"
                        }`}
                      >
                        {video.is_published ? (
                          <>
                            <EyeOff className="w-4 h-4" />
                            Despublicar
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4" />
                            Publicar
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleEdit(video)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-xl font-medium transition-all duration-300"
                      >
                        <Edit className="w-4 h-4" />
                        Editar
                      </button>

                      <button
                        onClick={() => handleDelete(video.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl font-medium transition-all duration-300"
                      >
                        <Trash2 className="w-4 h-4" />
                        Excluir
                      </button>

                      <a
                        href={video.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-medium transition-all duration-300"
                      >
                        <Video className="w-4 h-4" />
                        Ver Vídeo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
