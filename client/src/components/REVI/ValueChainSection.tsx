import { motion } from "framer-motion";
import { Sprout, Factory, Package, Truck } from "lucide-react";

const steps = [
  {
    icon: Sprout,
    title: "Production",
    description: "Fermes modernes avec pratiques agricoles durables et respectueuses de l'environnement.",
  },
  {
    icon: Factory,
    title: "Transformation",
    description: "Unités de transformation aux normes avec traçabilité et contrôle qualité rigoureux.",
  },
  {
    icon: Package,
    title: "Conditionnement",
    description: "Emballages adaptés pour préserver fraîcheur et qualité des produits.",
  },
  {
    icon: Truck,
    title: "Distribution",
    description: "Réseau logistique performant pour livrer rapidement sur l'ensemble du territoire.",
  },
];

export default function REVIValueChainSection() {
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#058B5E] mb-4">
            Notre chaîne de valeur
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            De la production à la distribution, une maîtrise complète pour garantir qualité et fraîcheur
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-[#058B5E] flex items-center justify-center">
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-[#058B5E] mb-4">
                  {step.title}
                </h3>
                <p className="text-[#3A3A3C]">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-[#058B5E]/20 -z-10" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
