import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Heart, Lightbulb, Shield } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "Nous visons l'excellence dans tout ce que nous entreprenons, avec un engagement constant pour la qualité et la performance.",
  },
  {
    icon: Heart,
    title: "Engagement",
    description: "Nous sommes engagés envers nos clients, nos collaborateurs et les communautés dans lesquelles nous opérons.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Nous encourageons la créativité et l'innovation pour apporter des solutions adaptées aux défis africains.",
  },
  {
    icon: Shield,
    title: "Intégrité",
    description: "Nous agissons avec transparence, honnêteté et respect dans toutes nos relations d'affaires.",
  },
];

export default function AboutValuesSection() {
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
            Nos valeurs
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Les principes qui guident notre action au quotidien
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-none bg-white text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="w-20 h-20 rounded-full bg-[#8B1538]/10 flex items-center justify-center">
                        <Icon className="w-10 h-10 text-[#8B1538]" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl text-[#8B1538]">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#3A3A3C]">{value.description}</p>
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
