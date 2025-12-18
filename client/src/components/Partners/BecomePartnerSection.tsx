import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Handshake, Target, Users, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Handshake,
    title: "Collaboration gagnant-gagnant",
    description: "Des partenariats équilibrés basés sur la confiance et le bénéfice mutuel.",
  },
  {
    icon: Target,
    title: "Accès au marché",
    description: "Bénéficiez de notre réseau étendu en Afrique de l'Ouest.",
  },
  {
    icon: Users,
    title: "Expertise reconnue",
    description: "Profitez de notre expérience de 15 ans dans 5 secteurs stratégiques.",
  },
  {
    icon: TrendingUp,
    title: "Croissance partagée",
    description: "Développez votre activité avec un partenaire fiable et ambitieux.",
  },
];

export default function PartnersBecomePartnerSection() {
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#8B1538] mb-4">
            Devenir partenaire
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Rejoignez un écosystème dynamique de partenaires engagés pour le développement de l'Afrique
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#8B1538]/10 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-[#8B1538]" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[#8B1538] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-[#3A3A3C]">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <a href="/contact">
            <Button
              size="lg"
              className="bg-[#8B1538] text-white hover:bg-[#6B1028] font-semibold px-8 py-6 rounded-full"
              data-testid="button-become-partner"
            >
              Proposer un partenariat
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
