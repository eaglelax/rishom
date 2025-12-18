import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const products = [
  {
    category: "Engins de terrassement",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80",
    items: ["Bulldozers", "Pelles mécaniques", "Chargeuses", "Niveleuses"],
  },
  {
    category: "Engins de levage",
    image: "https://images.unsplash.com/photo-1590675514671-0b8f1d6e60d0?w=600&q=80",
    items: ["Grues mobiles", "Chariots élévateurs", "Nacelles", "Portiques"],
  },
  {
    category: "Matériel de compactage",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80",
    items: ["Compacteurs", "Rouleaux", "Plaques vibrantes", "Pilonneuses"],
  },
  {
    category: "Transport & Malaxage",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80",
    items: ["Camions-bennes", "Bétonnières", "Pompes à béton", "Dumpers"],
  },
];

export default function RBFProductsSection() {
  return (
    <section className="py-20 md:py-32 bg-[#F5F1E8]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#C74634] mb-4">
            Notre catalogue
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Un parc d'équipements moderne et diversifié
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.category}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-none">
                <div className="relative h-64">
                  <img
                    src={product.image}
                    alt={product.category}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <h3 className="absolute bottom-6 left-6 text-3xl font-bold text-white">
                    {product.category}
                  </h3>
                </div>
                <CardContent className="p-6">
                  <ul className="grid grid-cols-2 gap-3">
                    {product.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-[#3A3A3C]"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C74634]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-[#C74634] text-white hover:bg-[#C74634]/90 font-semibold px-8 py-6 rounded-full group"
            data-testid="full-catalog-cta"
          >
            Télécharger le catalogue complet
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
