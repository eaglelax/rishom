import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ChevronRight } from "lucide-react";
import graduationImage from "@assets/generated_images/rba_graduation_ceremony_burkina.png";
import poultryImage from "@assets/generated_images/revi_poultry_farm_modern_burkina.png";
import infrastructureImage from "@assets/generated_images/infrastructure_project_burkina_rishom.png";

const relatedArticles = [
  {
    id: 3,
    title: "200 jeunes formés aux métiers du BTP",
    image: graduationImage,
    date: "5 Décembre 2025",
    category: "RBA",
    categoryColor: "#2E5A9C",
  },
  {
    id: 5,
    title: "Expansion de nos activités d'élevage",
    image: poultryImage,
    date: "28 Novembre 2025",
    category: "REV'I",
    categoryColor: "#058B5E",
  },
  {
    id: 4,
    title: "Livraison du projet d'infrastructure à Ouagadougou",
    image: infrastructureImage,
    date: "1 Décembre 2025",
    category: "RBF",
    categoryColor: "#C74634",
  },
];

export default function RelatedArticles() {
  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-[#8B1538] mb-12"
          >
            Articles connexes
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group overflow-hidden border-none">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1 rounded-full text-white text-xs font-semibold"
                        style={{ backgroundColor: article.categoryColor }}
                      >
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-[#707070] mb-3">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4 line-clamp-2 group-hover:text-[#8B1538] transition-colors">
                      {article.title}
                    </h3>
                    <a
                      href={`/actualites/${article.id}`}
                      className="inline-flex items-center text-[#8B1538] font-semibold hover:gap-3 transition-all group"
                    >
                      Lire l'article
                      <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
