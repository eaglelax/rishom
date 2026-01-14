import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ChevronRight, Newspaper } from "lucide-react";
import { Link } from "wouter";

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

export default function NewsArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);
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
          const data: Article[] = await newsRes.json();
          // Exclure le premier article (déjà affiché dans FeaturedArticle)
          setArticles(data.slice(1));
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
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-12 h-12 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Newspaper className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-3xl font-semibold text-[#8B1538] mb-4">
              Dernières actualités
            </h2>
            <p className="text-xl text-[#707070]">
              Aucune actualité disponible pour le moment.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-semibold text-[#8B1538]">
            Dernières actualités
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => {
            const categoryInfo = getCategoryInfo(article.categoryId);
            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group overflow-hidden border-none">
                  <div className="relative h-48 overflow-hidden">
                    {article.featuredImageUrl ? (
                      <img
                        src={article.featuredImageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Newspaper className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1 rounded-full text-white text-xs font-semibold"
                        style={{ backgroundColor: categoryInfo.color }}
                      >
                        {categoryInfo.name}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-[#707070] mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(article.publishedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {estimateReadTime(article.content)}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3 line-clamp-2 group-hover:text-[#8B1538] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-[#3A3A3C] mb-4 line-clamp-2">
                      {article.excerpt || article.content.substring(0, 100) + "..."}
                    </p>
                    <Link
                      href={`/actualites/${article.slug}`}
                      className="inline-flex items-center text-[#8B1538] font-semibold hover:gap-3 transition-all group"
                    >
                      Lire la suite
                      <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
