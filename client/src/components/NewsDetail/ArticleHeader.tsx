import { motion } from "framer-motion";
import { Calendar, Clock, User, Share2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArticleHeaderProps {
  category: string;
  categoryColor: string;
  title: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
}

export default function ArticleHeader({
  category,
  categoryColor,
  title,
  date,
  readTime,
  author,
  image,
}: ArticleHeaderProps) {
  return (
    <>
      {/* Breadcrumb */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-[#707070]">
            <a href="/" className="hover:text-[#8B1538] transition-colors">
              Accueil
            </a>
            <ChevronRight className="w-4 h-4" />
            <a href="/actualites" className="hover:text-[#8B1538] transition-colors">
              Actualités
            </a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#1A1A1A]">{title.substring(0, 40)}...</span>
          </div>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Category Badge */}
              <div className="mb-6">
                <span
                  className="inline-block px-4 py-2 rounded-full text-white text-sm font-semibold"
                  style={{ backgroundColor: categoryColor }}
                >
                  {category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-6 leading-tight">
                {title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-[#707070] mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{author}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto hover:text-[#8B1538]"
                  data-testid="share-button"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Partager
                </Button>
              </div>

              {/* Featured Image */}
              <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
