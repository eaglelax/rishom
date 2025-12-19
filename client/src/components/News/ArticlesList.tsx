import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import partnershipImage from "@assets/generated_images/business_partnership_burkina.png";
import graduationImage from "@assets/generated_images/rba_graduation_ceremony_burkina.png";
import infrastructureImage from "@assets/generated_images/infrastructure_project_burkina_rishom.png";
import poultryImage from "@assets/generated_images/revi_poultry_farm_modern_burkina.png";
import sustainabilityImage from "@assets/generated_images/rishom_sustainability_award_burkina.png";
import excavatorImage from "@assets/generated_images/rbf_excavator_equipment_burkina.png";

const articles = [
  {
    id: 2,
    title: "Partenariat stratégique avec des investisseurs européens",
    excerpt: "RIC signe un accord majeur pour accompagner 50 PME burkinabè dans leur développement.",
    image: partnershipImage,
    date: "10 Décembre 2025",
    readTime: "4 min",
    category: "RIC",
    categoryColor: "#8B1538",
  },
  {
    id: 3,
    title: "200 jeunes formés aux métiers du BTP",
    excerpt: "RBA célèbre la diplomation de sa plus grande promotion avec un taux d'insertion de 85%.",
    image: graduationImage,
    date: "5 Décembre 2025",
    readTime: "3 min",
    category: "RBA",
    categoryColor: "#2E5A9C",
  },
  {
    id: 4,
    title: "Livraison du projet d'infrastructure à Ouagadougou",
    excerpt: "RBF achève la construction d'un complexe commercial moderne de 10 000 m².",
    image: infrastructureImage,
    date: "1 Décembre 2025",
    readTime: "5 min",
    category: "RBF",
    categoryColor: "#C74634",
  },
  {
    id: 5,
    title: "Expansion de nos activités d'élevage",
    excerpt: "REV'I annonce l'ouverture de deux nouvelles fermes dans la région du Centre-Nord.",
    image: poultryImage,
    date: "28 Novembre 2025",
    readTime: "4 min",
    category: "REV'I",
    categoryColor: "#058B5E",
  },
  {
    id: 6,
    title: "Le Groupe Rishom primé pour son engagement RSE",
    excerpt: "Reconnaissance nationale pour nos actions en faveur du développement durable.",
    image: sustainabilityImage,
    date: "20 Novembre 2025",
    readTime: "3 min",
    category: "Groupe",
    categoryColor: "#8B1538",
  },
  {
    id: 7,
    title: "Nouvelle gamme d'équipements BTP disponible",
    excerpt: "RBF élargit son catalogue avec des engins de dernière génération.",
    image: excavatorImage,
    date: "15 Novembre 2025",
    readTime: "4 min",
    category: "RBF",
    categoryColor: "#C74634",
  },
];

export default function NewsArticlesList() {
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
          {articles.map((article, index) => (
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
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
                  <div className="flex items-center gap-4 text-sm text-[#707070] mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3 line-clamp-2 group-hover:text-[#8B1538] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[#3A3A3C] mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <a
                    href={`/actualites/${article.id}`}
                    className="inline-flex items-center text-[#8B1538] font-semibold hover:gap-3 transition-all group"
                  >
                    Lire la suite
                    <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
