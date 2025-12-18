import { motion } from "framer-motion";
import { Award, Clock, Users, Briefcase } from "lucide-react";

const advantages = [
  {
    icon: Award,
    title: "Certifications reconnues",
    description: "Diplômes et certificats reconnus par l'État et les professionnels du secteur.",
  },
  {
    icon: Users,
    title: "Formateurs experts",
    description: "Équipe pédagogique composée de professionnels expérimentés du terrain.",
  },
  {
    icon: Clock,
    title: "Horaires flexibles",
    description: "Formations en journée, soir et weekend pour s'adapter à vos contraintes.",
  },
  {
    icon: Briefcase,
    title: "Insertion professionnelle",
    description: "Accompagnement placement avec notre réseau d'entreprises partenaires.",
  },
];

export default function RBAAdvantagesSection() {
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2E5A9C] mb-4">
            Pourquoi choisir RBA ?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-[#2E5A9C]/10 flex items-center justify-center">
                    <Icon className="w-10 h-10 text-[#2E5A9C]" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-[#2E5A9C] mb-4">
                  {advantage.title}
                </h3>
                <p className="text-[#3A3A3C]">{advantage.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
