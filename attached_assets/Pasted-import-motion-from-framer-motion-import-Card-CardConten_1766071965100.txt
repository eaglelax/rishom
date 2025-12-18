import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, Clock, Shield } from "lucide-react";

const options = [
  {
    icon: Users,
    title: "Avec opérateurs",
    description: "Engins loués avec opérateurs qualifiés et expérimentés",
    features: [
      "Opérateurs certifiés",
      "Formation continue",
      "Respect des normes de sécurité",
      "Supervision de chantier",
    ],
    supplement: "+ 50 000 FCFA/jour par opérateur",
  },
  {
    icon: UserCheck,
    title: "Sans opérateurs",
    description: "Location d'engins pour vos équipes formées",
    features: [
      "Formation gratuite (2h)",
      "Manuel d'utilisation fourni",
      "Support téléphonique 24/7",
      "Intervention rapide en cas de panne",
    ],
    supplement: "Tarif de base",
  },
];

const advantages = [
  {
    icon: Clock,
    title: "Flexibilité",
    description: "Location à la journée, semaine ou mois. Prolongation possible selon disponibilité.",
  },
  {
    icon: Shield,
    title: "Assurance incluse",
    description: "Tous risques chantier inclus dans le tarif. Franchise : 500 000 FCFA.",
  },
];

export default function RentalOptions() {
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
            Formules de location
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {options.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-none">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-[#C74634]/10 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-[#C74634]" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#C74634]">
                          {option.title}
                        </h3>
                        <p className="text-sm font-semibold text-[#707070]">
                          {option.supplement}
                        </p>
                      </div>
                    </div>
                    <p className="text-[#3A3A3C] mb-6">{option.description}</p>
                    <ul className="space-y-3">
                      {option.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#C74634] mt-2 flex-shrink-0" />
                          <span className="text-[#3A3A3C]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="w-12 h-12 rounded-full bg-[#C74634]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-[#C74634]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#C74634] mb-2">
                    {advantage.title}
                  </h4>
                  <p className="text-[#3A3A3C]">{advantage.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
