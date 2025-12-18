import { motion } from "framer-motion";
import { Users, Leaf, TrendingUp, Heart } from "lucide-react";

const impacts = [
  {
    icon: Users,
    value: "2000+",
    label: "Emplois créés",
    description: "Dans les zones rurales",
  },
  {
    icon: Leaf,
    value: "500 ha",
    label: "Terres cultivées",
    description: "Avec pratiques durables",
  },
  {
    icon: TrendingUp,
    value: "15%",
    label: "Croissance annuelle",
    description: "De la production",
  },
  {
    icon: Heart,
    value: "100%",
    label: "Local",
    description: "Production burkinabè",
  },
];

export default function REVIImpactSection() {
  return (
    <section className="py-20 md:py-32 bg-[#058B5E]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
            Notre impact
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Contribuer au développement rural et à la souveraineté alimentaire
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts.map((impact, index) => {
            const Icon = impact.icon;
            return (
              <motion.div
                key={impact.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-5xl font-bold text-white mb-2">
                  {impact.value}
                </div>
                <p className="text-xl font-semibold text-white mb-1">
                  {impact.label}
                </p>
                <p className="text-white/70 text-sm">{impact.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
