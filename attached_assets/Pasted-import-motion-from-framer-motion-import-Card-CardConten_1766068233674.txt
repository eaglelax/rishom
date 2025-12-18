import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Calendar } from "lucide-react";

const news = [
  {
    id: 1,
    title: "Lancement de notre nouvelle usine de transformation agricole",
    date: "15 Décembre 2025",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80",
    category: "REV'I",
  },
  {
    id: 2,
    title: "Partenariat stratégique avec des investisseurs européens",
    date: "10 Décembre 2025",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&q=80",
    category: "RIC",
  },
  {
    id: 3,
    title: "Formation de 200 jeunes aux métiers du BTP",
    date: "5 Décembre 2025",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    category: "RBA",
  },
  {
    id: 4,
    title: "Livraison du projet d'infrastructure à Ouagadougou",
    date: "1 Décembre 2025",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
    category: "RBF",
  },
];

export default function NewsGrid() {
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
          <motion.a
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            href="/actualites"
            className="hidden md:inline-flex items-center text-[#8B1538] font-semibold hover:gap-3 transition-all group"
            data-testid="view-all-news"
          >
            Voir toutes
            <ChevronRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
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
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#8B1538] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-[#707070] text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4 line-clamp-2 group-hover:text-[#8B1538] transition-colors">
                    {item.title}
                  </h3>
                  <a
                    href={`/actualites/${item.id}`}
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8 md:hidden"
        >
          <a
            href="/actualites"
            className="inline-flex items-center text-[#8B1538] font-semibold"
          >
            Voir toutes
            <ChevronRight className="ml-1 w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
