import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const principles = [
  {
    title: "Transparence",
    description: "Publication régulière de nos résultats financiers et extra-financiers. Communication ouverte avec toutes nos parties prenantes.",
  },
  {
    title: "Responsabilité",
    description: "Chaque organe de gouvernance assume pleinement ses responsabilités dans le respect des réglementations en vigueur.",
  },
  {
    title: "Équité",
    description: "Traitement équitable de tous les actionnaires et respect des droits de chacun dans les processus décisionnels.",
  },
  {
    title: "Indépendance",
    description: "Garantie de l'indépendance du Conseil d'Administration avec des administrateurs indépendants qualifiés.",
  },
  {
    title: "Intégrité",
    description: "Code de conduite strict appliqué à tous les niveaux de l'organisation, prévention des conflits d'intérêts.",
  },
  {
    title: "Durabilité",
    description: "Intégration des enjeux environnementaux, sociaux et de gouvernance dans toutes nos décisions stratégiques.",
  },
];

export default function GovernancePrinciplesSection() {
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
            Nos principes de gouvernance
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Des valeurs qui guident nos pratiques et nos décisions au quotidien
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-[#8B1538] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-[#8B1538] mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-[#3A3A3C]">{principle.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
