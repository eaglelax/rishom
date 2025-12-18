import { motion } from "framer-motion";
import { Search, FileCheck, Rocket, LineChart } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Diagnostic",
    description: "Analyse approfondie de votre situation actuelle, opportunités et défis.",
  },
  {
    icon: FileCheck,
    number: "02",
    title: "Stratégie",
    description: "Élaboration d'une feuille de route personnalisée adaptée à vos objectifs.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Mise en œuvre",
    description: "Accompagnement opérationnel dans l'exécution de votre plan d'action.",
  },
  {
    icon: LineChart,
    number: "04",
    title: "Suivi",
    description: "Monitoring des résultats et ajustements pour garantir le succès.",
  },
];

export default function RICProcessSection() {
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
            Notre méthode
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Une approche structurée pour des résultats concrets
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 rounded-full bg-[#8B1538] flex items-center justify-center">
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-white border-4 border-[#8B1538] flex items-center justify-center">
                      <span className="text-[#8B1538] font-bold text-sm">
                        {step.number}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-[#8B1538] mb-4">
                    {step.title}
                  </h3>
                  <p className="text-[#3A3A3C]">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-[#8B1538]/20 -z-10" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
