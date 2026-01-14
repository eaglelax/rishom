import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ChevronRight, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface Entity {
  id: string;
  code: string;
  shortName: string;
  colorPrimary: string;
}

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImageUrl: string | null;
  categoryId: string | null;
  authorName: string | null;
  publishedAt: string | null;
  viewCount: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const defaultColors: Record<string, string> = {
  "RBF": "#C74634",
  "RIC": "#8B1538",
  "REVI": "#058B5E",
  "REV'I": "#058B5E",
  "RBA": "#2E5A9C",
  "GROUPE": "#8B1538",
};

export default function NewsFeaturedArticle() {
  const [article, setArticle] = useState<Article | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, categoriesRes] = await Promise.all([
          fetch("/api/news"),
          fetch("/api/news/categories")
        ]);

        if (newsRes.ok) {
          const articles: Article[] = await newsRes.json();
          // Prendre le premier article (le plus récent) comme article à la une
          if (articles.length > 0) {
            setArticle(articles[0]);
          }
        }
        if (categoriesRes.ok) {
          const data = await categoriesRes.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Erreur chargement actualités:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCategoryInfo = (categoryId: string | null): { name: string; color: string } => {
    if (!categoryId) return { name: "Actualité", color: "#8B1538" };
    const category = categories.find(c => c.id === categoryId);
    if (!category) return { name: "Actualité", color: "#8B1538" };
    // Essayer de matcher avec une couleur d'entité
    const color = defaultColors[category.name.toUpperCase()] || "#8B1538";
    return { name: category.name, color };
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

  const estimateReadTime = (content: string): string => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min`;
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-12 h-12 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (!article) {
    return null;
  }

  const categoryInfo = getCategoryInfo(article.categoryId);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-[#8B1538] mb-8">
            À la une
          </h2>
          <Card className="overflow-hidden border-none shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-96 md:h-auto">
                {article.featuredImageUrl ? (
                  <img
                    src={article.featuredImageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center min-h-[300px]">
                    <Newspaper className="w-24 h-24 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-6 left-6">
                  <span
                    className="px-4 py-2 rounded-full text-white text-sm font-semibold"
                    style={{ backgroundColor: categoryInfo.color }}
                  >
                    {categoryInfo.name}
                  </span>
                </div>
              </div>
              <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-[#707070] mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(article.publishedAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {estimateReadTime(article.content)}
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                  {article.title}
                </h3>
                <p className="text-lg text-[#3A3A3C] mb-6">
                  {article.excerpt || article.content.substring(0, 200) + "..."}
                </p>
                <Link href={`/actualites/${article.slug}`}>
                  <Button
                    size="lg"
                    className="bg-[#8B1538] text-white hover:bg-[#C4526D] font-semibold px-8 py-6 rounded-full group w-fit"
                  >
                    Lire l'article complet
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
