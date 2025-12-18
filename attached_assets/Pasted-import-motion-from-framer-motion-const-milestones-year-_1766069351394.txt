import { motion } from "framer-motion";

const milestones = [
  {
    year: "2008",
    title: "Création du groupe",
    description: "Lancement de Rishom avec une vision : contribuer au développement de l'Afrique.",
  },
  {
    year: "2012",
    title: "Expansion régionale",
    description: "Ouverture de bureaux dans 3 pays d'Afrique de l'Ouest.",
  },
  {
    year: "2015",
    title: "Diversification",
    description: "Création de RBF et REV'I pour couvrir BTP et agro-business.",
  },
  {
    year: "2018",
    title: "Innovation",
    description: "Lancement de RIC pour accompagner les entrepreneurs et investisseurs.",
  },
  {
    year: "2021",
    title: "Formation",
    description: "Création de RBA pour former les talents de demain.",
  },
  {
    year: "2025",
    title: "Leadership",
    description: "500+ collaborateurs, leader reconnu dans nos 5 secteurs d'activité.",
  },
];

export default function AboutHistorySection() {
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
            Notre histoire
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Plus de 15 ans d'engagement au service du développement africain
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#8B1538]/20" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                  <h3 className="text-3xl font-bold text-[#8B1538] mb-2">
                    {milestone.year}
                  </h3>
                  <h4 className="text-2xl font-semibold text-[#3A3A3C] mb-3">
                    {milestone.title}
                  </h4>
                  <p className="text-lg text-[#707070]">
                    {milestone.description}
                  </p>
                </div>

                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-[#8B1538] flex items-center justify-center border-4 border-white shadow-lg">
                    <div className="w-8 h-8 rounded-full bg-white" />
                  </div>
                </div>

                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
