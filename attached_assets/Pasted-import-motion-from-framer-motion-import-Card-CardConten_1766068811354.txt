import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, FileText, Lightbulb, Target, BarChart3 } from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "Stratégie de croissance",
    description: "Élaboration de plans stratégiques pour développer votre activité et conquérir de nouveaux marchés.",
  },
  {
    icon: Users,
    title: "Levée de fonds",
    description: "Accompagnement dans la recherche d'investisseurs et structuration de votre dossier financier.",
  },
  {
    icon: FileText,
    title: "Études de faisabilité",
    description: "Analyse approfondie de la viabilité technique, économique et financière de vos projets.",
  },
  {
    icon: Lightbulb,
    title: "Innovation & transformation",
    description: "Conseil en innovation et accompagnement dans la transformation digitale de votre entreprise.",
  },
  {
    icon: Target,
    title: "Optimisation opérationnelle",
    description: "Amélioration des processus et de l'efficacité opérationnelle pour maximiser vos performances.",
  },
  {
    icon: BarChart3,
    title: "Analyse financière",
    description: "Diagnostic financier complet et recommandations pour optimiser votre rentabilité.",
  },
];

export default function RICServicesSection() {
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
            Nos expertises
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Un accompagnement sur mesure pour transformer vos ambitions en succès
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
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
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#3A3A3C]">{service.description}</p>
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
