import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Shield, TrendingUp, FileCheck } from "lucide-react";

const structure = [
  {
    icon: Users,
    title: "Conseil d'Administration",
    description: "Composé de 7 membres, le Conseil d'Administration définit les orientations stratégiques du groupe et supervise leur mise en œuvre.",
    members: "7 administrateurs dont 2 indépendants",
    meetings: "Réunions trimestrielles",
  },
  {
    icon: Shield,
    title: "Comité d'Audit",
    description: "Assure la fiabilité des informations financières et le contrôle interne. Veille au respect des normes comptables et réglementaires.",
    members: "3 membres indépendants",
    meetings: "Réunions semestrielles",
  },
  {
    icon: TrendingUp,
    title: "Comité Stratégique",
    description: "Examine les projets d'investissement majeurs et les opportunités de développement du groupe.",
    members: "5 membres exécutifs",
    meetings: "Réunions mensuelles",
  },
  {
    icon: FileCheck,
    title: "Comité RSE",
    description: "Pilote la stratégie de responsabilité sociétale et environnementale du groupe et suit les indicateurs de performance extra-financière.",
    members: "4 membres",
    meetings: "Réunions trimestrielles",
  },
];

export default function GovernanceStructureSection() {
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
            Structure de gouvernance
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Une organisation rigoureuse au service de la performance et de la transparence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {structure.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-none bg-[#F5F1E8]">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-full bg-[#8B1538]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-8 h-8 text-[#8B1538]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-[#8B1538] mb-3">
                          {item.title}
                        </h3>
                        <p className="text-[#3A3A3C] mb-4">{item.description}</p>
                        <div className="space-y-2 text-sm">
                          <p className="text-[#707070]">
                            <span className="font-semibold text-[#8B1538]">Composition :</span> {item.members}
                          </p>
                          <p className="text-[#707070]">
                            <span className="font-semibold text-[#8B1538]">Fréquence :</span> {item.meetings}
                          </p>
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
