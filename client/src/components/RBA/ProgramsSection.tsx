import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hammer, Calculator, Users, Laptop, ClipboardList, Briefcase } from "lucide-react";

const programs = [
  {
    icon: Hammer,
    title: "Métiers du BTP",
    description: "Maçonnerie, plomberie, électricité, conduite d'engins et gestion de chantiers.",
    duration: "3 à 12 mois",
  },
  {
    icon: Calculator,
    title: "Comptabilité & Gestion",
    description: "Comptabilité générale, gestion financière, audit et contrôle de gestion.",
    duration: "6 à 18 mois",
  },
  {
    icon: Users,
    title: "Management",
    description: "Leadership, gestion d'équipe, ressources humaines et développement organisationnel.",
    duration: "3 à 9 mois",
  },
  {
    icon: Laptop,
    title: "Informatique",
    description: "Bureautique, développement web, maintenance informatique et cybersécurité.",
    duration: "6 à 12 mois",
  },
  {
    icon: ClipboardList,
    title: "Agro-business",
    description: "Techniques agricoles modernes, gestion d'exploitation et transformation agricole.",
    duration: "4 à 10 mois",
  },
  {
    icon: Briefcase,
    title: "Entrepreneuriat",
    description: "Création d'entreprise, business plan, marketing et gestion commerciale.",
    duration: "2 à 6 mois",
  },
];

export default function RBAProgramsSection() {
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2E5A9C] mb-4">
            Nos formations
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Des programmes certifiants adaptés aux besoins du marché de l'emploi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-none bg-[#F5F1E8]">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-[#2E5A9C]/10 flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-[#2E5A9C]" />
                    </div>
                    <CardTitle className="text-2xl text-[#2E5A9C]">
                      {program.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#3A3A3C] mb-4">{program.description}</p>
                    <div className="inline-block bg-[#2E5A9C]/10 px-4 py-2 rounded-full">
                      <span className="text-[#2E5A9C] font-semibold text-sm">
                        Durée : {program.duration}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
