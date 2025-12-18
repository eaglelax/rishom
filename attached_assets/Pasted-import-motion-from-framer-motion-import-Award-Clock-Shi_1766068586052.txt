import { motion } from "framer-motion";
import { Award, Clock, Shield, ThumbsUp } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Expertise reconnue",
    description: "Plus de 15 ans d'expérience dans la fourniture d'équipements BTP",
  },
  {
    icon: Shield,
    title: "Qualité garantie",
    description: "Équipements certifiés et matériaux conformes aux normes internationales",
  },
  {
    icon: Clock,
    title: "Réactivité",
    description: "Livraison rapide et service client disponible 7j/7",
  },
  {
    icon: ThumbsUp,
    title: "Accompagnement",
    description: "Conseil technique et support personnalisé pour chaque projet",
  },
];

export default function RBFWhyChooseSection() {
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#C74634] mb-4">
            Pourquoi choisir RBF ?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-[#C74634]/10 flex items-center justify-center">
                    <Icon className="w-10 h-10 text-[#C74634]" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-[#C74634] mb-4">
                  {reason.title}
                </h3>
                <p className="text-[#3A3A3C]">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
