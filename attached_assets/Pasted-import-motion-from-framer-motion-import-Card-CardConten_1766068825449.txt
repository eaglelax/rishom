import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Sprout, Factory, Zap } from "lucide-react";

const sectors = [
  {
    icon: Building2,
    title: "Immobilier & Construction",
    description: "Investissements dans les projets immobiliers et infrastructures.",
    opportunities: "5 projets actifs",
  },
  {
    icon: Sprout,
    title: "Agro-industrie",
    description: "Financement de la transformation agricole et agro-business.",
    opportunities: "3 projets en cours",
  },
  {
    icon: Factory,
    title: "Industrie",
    description: "Soutien au développement industriel et manufacturier.",
    opportunities: "2 projets financés",
  },
  {
    icon: Zap,
    title: "Énergies & Technologies",
    description: "Investissements dans les énergies renouvelables et tech.",
    opportunities: "4 projets émergents",
  },
];

export default function RICInvestmentSection() {
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#8B1538] mb-4">
            Nos secteurs d'investissement
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Des opportunités diversifiées dans les secteurs porteurs de l'économie africaine
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sectors.map((sector, index) => {
            const Icon = sector.icon;
            return (
              <motion.div
                key={sector.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-none">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-20 h-20 rounded-full bg-[#8B1538]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-10 h-10 text-[#8B1538]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-[#8B1538] mb-3">
                          {sector.title}
                        </h3>
                        <p className="text-[#3A3A3C] mb-4">{sector.description}</p>
                        <div className="inline-block bg-[#8B1538]/10 px-4 py-2 rounded-full">
                          <span className="text-[#8B1538] font-semibold text-sm">
                            {sector.opportunities}
                          </span>
                        </div>
                      </div>
                    </div>
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
