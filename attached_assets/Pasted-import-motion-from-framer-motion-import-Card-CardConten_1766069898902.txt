import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Heart, TrendingUp, Users, Briefcase, Award } from "lucide-react";

const benefits = [
  {
    icon: GraduationCap,
    title: "Formation continue",
    description: "Accès aux formations RBA et programmes de développement professionnel.",
  },
  {
    icon: TrendingUp,
    title: "Évolution de carrière",
    description: "Opportunités d'avancement et mobilité interne entre nos entités.",
  },
  {
    icon: Heart,
    title: "Équilibre vie pro/perso",
    description: "Horaires flexibles et politique de télétravail pour certains postes.",
  },
  {
    icon: Users,
    title: "Environnement collaboratif",
    description: "Équipes multiculturelles et esprit d'entraide au quotidien.",
  },
  {
    icon: Briefcase,
    title: "Avantages sociaux",
    description: "Assurance santé, primes de performance et participation aux bénéfices.",
  },
  {
    icon: Award,
    title: "Reconnaissance",
    description: "Programme de récompenses et valorisation des talents.",
  },
];

export default function CareersBenefitsSection() {
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
            Pourquoi nous rejoindre ?
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Des avantages et un environnement de travail qui favorisent votre épanouissement
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-none bg-[#F5F1E8]">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-[#8B1538]/10 flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-[#8B1538]" />
                    </div>
                    <CardTitle className="text-2xl text-[#8B1538]">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#3A3A3C]">{benefit.description}</p>
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
