import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import inaugurationImage from "@assets/generated_images/rishom_inauguration_ceremony_ouaga.png";

const featuredArticle = {
  id: 1,
  title: "Le Groupe Rishom inaugure sa nouvelle usine de transformation agricole",
  excerpt: "Un investissement majeur de 80 millions FCFA pour renforcer la souveraineté alimentaire du Burkina Faso et créer 200 emplois directs dans la région.",
  image: inaugurationImage,
  date: "15 Décembre 2025",
  readTime: "5 min",
  category: "REV'I",
  categoryColor: "#058B5E",
};

export default function NewsFeaturedArticle() {
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
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-6 left-6">
                  <span
                    className="px-4 py-2 rounded-full text-white text-sm font-semibold"
                    style={{ backgroundColor: featuredArticle.categoryColor }}
                  >
                    {featuredArticle.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-[#707070] mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {featuredArticle.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredArticle.readTime}
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                  {featuredArticle.title}
                </h3>
                <p className="text-lg text-[#3A3A3C] mb-6">
                  {featuredArticle.excerpt}
                </p>
                <Button
                  size="lg"
                  className="bg-[#8B1538] text-white hover:bg-[#C4526D] font-semibold px-8 py-6 rounded-full group w-fit"
                >
                  Lire l'article complet
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
