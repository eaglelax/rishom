import { motion } from "framer-motion";
import { Award, Shield, Wrench, DollarSign } from "lucide-react";

const specs = [
  {
    icon: Award,
    title: "Marques premium",
    description: "Caterpillar, Komatsu, Volvo, JCB - Les meilleures marques mondiales",
  },
  {
    icon: Shield,
    title: "Garantie constructeur",
    description: "1 à 3 ans selon équipement, pièces et main d'œuvre incluses",
  },
  {
    icon: Wrench,
    title: "Maintenance préventive",
    description: "Contrats de maintenance disponibles, interventions planifiées",
  },
  {
    icon: DollarSign,
    title: "Financement flexible",
    description: "Solutions de paiement adaptées : cash, crédit, leasing",
  },
];

export default function EquipmentSpecifications() {
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
            Nos engagements qualité
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specs.map((spec, index) => {
            const Icon = spec.icon;
            return (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
                    <Icon className="w-10 h-10 text-[#C74634]" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-[#C74634] mb-4">
                  {spec.title}
                </h3>
                <p className="text-[#3A3A3C]">{spec.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
