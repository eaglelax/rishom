import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Images,
  Newspaper,
  Users,
  Handshake,
  MessageSquareQuote,
  Mail,
  Briefcase,
  TrendingUp,
  Eye,
  Clock,
} from "lucide-react";

interface DashboardStats {
  carousel: number;
  news: number;
  team: number;
  partners: number;
  testimonials: number;
  messages: number;
  jobs: number;
  unreadMessages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    carousel: 0,
    news: 0,
    team: 0,
    partners: 0,
    testimonials: 0,
    messages: 0,
    jobs: 0,
    unreadMessages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Slides Carousel",
      value: stats.carousel,
      icon: Images,
      color: "bg-blue-500",
      href: "/admin/carousel",
    },
    {
      title: "Actualités",
      value: stats.news,
      icon: Newspaper,
      color: "bg-green-500",
      href: "/admin/news",
    },
    {
      title: "Équipe Direction",
      value: stats.team,
      icon: Users,
      color: "bg-purple-500",
      href: "/admin/team",
    },
    {
      title: "Partenaires",
      value: stats.partners,
      icon: Handshake,
      color: "bg-orange-500",
      href: "/admin/partners",
    },
    {
      title: "Témoignages",
      value: stats.testimonials,
      icon: MessageSquareQuote,
      color: "bg-pink-500",
      href: "/admin/testimonials",
    },
    {
      title: "Offres d'emploi",
      value: stats.jobs,
      icon: Briefcase,
      color: "bg-indigo-500",
      href: "/admin/jobs",
    },
    {
      title: "Messages",
      value: stats.messages,
      icon: Mail,
      color: "bg-red-500",
      href: "/admin/messages",
      badge: stats.unreadMessages > 0 ? stats.unreadMessages : undefined,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Bienvenue dans l'espace d'administration du Groupe Rishom
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="block group"
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md group-hover:scale-[1.02]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{card.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">
                        {isLoading ? (
                          <span className="inline-block w-12 h-8 bg-gray-200 rounded animate-pulse" />
                        ) : (
                          card.value
                        )}
                      </p>
                    </div>
                    <div className={`${card.color} p-3 rounded-xl relative`}>
                      <card.icon className="h-6 w-6 text-white" />
                      {card.badge && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {card.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#8B1538]" />
                Actions rapides
              </CardTitle>
              <CardDescription>
                Accédez rapidement aux fonctionnalités les plus utilisées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="/admin/carousel"
                  className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <Images className="h-5 w-5 text-blue-500" />
                  <span className="font-medium text-sm">Gérer le carousel</span>
                </a>
                <a
                  href="/admin/news"
                  className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <Newspaper className="h-5 w-5 text-green-500" />
                  <span className="font-medium text-sm">Ajouter une actualité</span>
                </a>
                <a
                  href="/admin/team"
                  className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <Users className="h-5 w-5 text-purple-500" />
                  <span className="font-medium text-sm">Gérer l'équipe</span>
                </a>
                <a
                  href="/admin/messages"
                  className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <Mail className="h-5 w-5 text-red-500" />
                  <span className="font-medium text-sm">Voir les messages</span>
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-[#8B1538]" />
                Aperçu du site
              </CardTitle>
              <CardDescription>
                Liens rapides vers les pages du site public
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="font-medium text-sm">Page d'accueil</span>
                  <span className="text-xs text-gray-500">→</span>
                </a>
                <a
                  href="/actualites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="font-medium text-sm">Actualités</span>
                  <span className="text-xs text-gray-500">→</span>
                </a>
                <a
                  href="/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="font-medium text-sm">Contact</span>
                  <span className="text-xs text-gray-500">→</span>
                </a>
                <a
                  href="/carrieres"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="font-medium text-sm">Carrières</span>
                  <span className="text-xs text-gray-500">→</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info */}
        <Card className="border-0 shadow-md bg-gradient-to-r from-[#8B1538] to-[#C74634] text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Dernière mise à jour</h3>
                <p className="text-white/80 text-sm">
                  {new Date().toLocaleDateString("fr-FR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
