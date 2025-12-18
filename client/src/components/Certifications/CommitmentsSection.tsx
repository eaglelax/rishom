import { motion } from "framer-motion";
import { Target, TrendingUp, Users, Shield } from "lucide-react";

const commitments = [
  {
    icon: Target,
    title: "Amélioration continue",
    description: "Audits réguliers et plans d'action pour maintenir et améliorer nos standards de qualité.",
  },
  {
    icon: TrendingUp,
    title: "Formation du personnel",
    description: "Plus de 500 collaborateurs formés aux normes ISO et aux bonnes pratiques.",
  },
  {
    icon: Users,
    title: "Satisfaction client",
    description: "Taux de satisfaction de 92% grâce à nos processus qualité rigoureux.",
  },
  {
    icon: Shield,
    title: "Conformité réglementaire",
    description: "Respect strict de toutes les normes nationales et internationales en vigueur.",
  },
];

export default function CertificationsCommitmentsSection() {
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
            Notre engagement qualité
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Au-delà des certifications, une culture d'excellence ancrée dans nos pratiques quotidiennes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {commitments.map((commitment, index) => {
            const Icon = commitment.icon;
            return (
              <motion.div
                key={commitment.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
                    <Icon className="w-10 h-10 text-[#8B1538]" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-[#8B1538] mb-4">
                  {commitment.title}
                </h3>
                <p className="text-[#3A3A3C]">{commitment.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
