import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Calendar } from "lucide-react";
import { Link } from "wouter";

// Images de fallback locales
import foodFactoryImage from "@assets/generated_images/revi_food_factory_burkina.png";
import partnershipImage from "@assets/generated_images/business_partnership_burkina.png";
import trainingImage from "@assets/generated_images/rba_professional_training_session.png";
import infrastructureImage from "@assets/generated_images/infrastructure_project_burkina_rishom.png";

interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  imageUrl: string | null;
  publishedAt: string | null;
  entityId: string | null;
  categoryId: string | null;
}

interface Entity {
  id: string;
  shortName: string;
}

// Fallback images par entité
const fallbackImages: Record<string, string> = {
  "RBF": infrastructureImage,
  "RIC": partnershipImage,
  "REVI": foodFactoryImage,
  "REV'I": foodFactoryImage,
  "RBA": trainingImage,
};

const defaultImage = partnershipImage;

export default function NewsGrid() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, entitiesRes] = await Promise.all([
          fetch("/api/news?limit=4"),
          fetch("/api/entities")
        ]);

        if (newsRes.ok) {
          const data = await newsRes.json();
          setNews(data);
        }
        if (entitiesRes.ok) {
          const data = await entitiesRes.json();
          setEntities(data);
        }
      } catch (error) {
        console.error("Erreur chargement actualités:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getEntityName = (entityId: string | null): string => {
    if (!entityId) return "GROUPE";
    const entity = entities.find(e => e.id === entityId);
    return entity?.shortName || "GROUPE";
  };

  const getImageUrl = (article: NewsArticle): string => {
    if (article.imageUrl && (article.imageUrl.startsWith("/images/") || article.imageUrl.startsWith("/uploads/") || article.imageUrl.startsWith("http"))) {
      return article.imageUrl;
    }
    const entityName = getEntityName(article.entityId);
    return fallbackImages[entityName] || defaultImage;
  };

  const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  if (isLoading) {
    return (
      <section id="news" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-12 h-12 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return null;
  }

  return (
    <section id="news" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#8B1538]"
          >
            Dernières actualités
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/actualites"
              className="hidden md:inline-flex items-center text-[#8B1538] font-semibold hover:gap-3 transition-all group"
              data-testid="view-all-news"
            >
              Voir toutes
              <ChevronRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group overflow-hidden border-none"
                data-testid={`news-card-${item.id}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getImageUrl(item)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#8B1538] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {getEntityName(item.entityId)}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-[#707070] text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(item.publishedAt)}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4 line-clamp-2 group-hover:text-[#8B1538] transition-colors">
                    {item.title}
                  </h3>
                  <Link
                    href={`/actualites/${item.slug}`}
                    className="inline-flex items-center text-[#8B1538] font-semibold hover:gap-3 transition-all group"
                  >
                    Lire la suite
                    <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8 md:hidden"
        >
          <Link
            href="/actualites"
            className="inline-flex items-center text-[#8B1538] font-semibold"
          >
            Voir toutes
            <ChevronRight className="ml-1 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
