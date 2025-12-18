import { motion } from "framer-motion";
import { TrendingUp, Users, Droplet, Tree, Award, Heart } from "lucide-react";

const impacts = [
  {
    icon: Users,
    value: "2000+",
    label: "Emplois créés",
    description: "dont 60% dans les zones rurales",
    color: "#8B1538",
  },
  {
    icon: TrendingUp,
    value: "30%",
    label: "Réduction CO2",
    description: "par rapport à 2020",
    color: "#058B5E",
  },
  {
    icon: Droplet,
    value: "15",
    label: "Points d'eau",
    description: "construits dans 10 villages",
    color: "#2E5A9C",
  },
  {
    icon: Tree,
    value: "50 000",
    label: "Arbres plantés",
    description: "programme de reforestation",
    color: "#058B5E",
  },
  {
    icon: Award,
    value: "200",
    label: "Bourses scolaires",
    description: "attribuées chaque année",
    color: "#C74634",
  },
  {
    icon: Heart,
    value: "50",
    label: "Projets soutenus",
    description: "initiatives communautaires",
    color: "#8B1538",
  },
];

export default function CSRImpactSection() {
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
            Notre impact en chiffres
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Des résultats concrets qui témoignent de notre engagement
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
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
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${impact.color}15` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: impact.color }} />
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2" style={{ color: impact.color }}>
                  {impact.value}
                </div>
                <p className="text-lg font-semibold text-[#1A1A1A] mb-1">
                  {impact.label}
                </p>
                <p className="text-sm text-[#707070]">{impact.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
