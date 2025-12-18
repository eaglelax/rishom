import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Beef, Egg, Milk, Wheat, Apple, Fish } from "lucide-react";

const sectors = [
  {
    icon: Beef,
    title: "Élevage bovin",
    description: "Production de viande bovine de qualité avec traçabilité complète de la ferme à l'assiette.",
  },
  {
    icon: Egg,
    title: "Aviculture",
    description: "Élevage de poulets de chair et production d'œufs selon les normes sanitaires internationales.",
  },
  {
    icon: Milk,
    title: "Production laitière",
    description: "Collecte, transformation et distribution de produits laitiers frais et dérivés.",
  },
  {
    icon: Wheat,
    title: "Céréales & légumineuses",
    description: "Culture, stockage et transformation de céréales et légumineuses locales.",
  },
  {
    icon: Apple,
    title: "Fruits & légumes",
    description: "Production maraîchère et fruitière avec techniques d'irrigation moderne.",
  },
  {
    icon: Fish,
    title: "Pisciculture",
    description: "Élevage de poissons en bassins et étangs pour diversifier l'offre protéinée.",
  },
];

export default function REVISectorsSection() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#058B5E] mb-4">
            Nos filières
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Une offre diversifiée pour répondre aux besoins alimentaires du continent
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((sector, index) => {
            const Icon = sector.icon;
            return (
              <motion.div
                key={sector.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-none bg-[#F5F1E8]">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-[#058B5E]/10 flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-[#058B5E]" />
                    </div>
                    <CardTitle className="text-2xl text-[#058B5E]">
                      {sector.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#3A3A3C]">{sector.description}</p>
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
