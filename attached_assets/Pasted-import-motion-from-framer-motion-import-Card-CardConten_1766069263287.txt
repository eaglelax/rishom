import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin } from "lucide-react";

const leaders = [
  {
    name: "Amadou TRAORE",
    position: "Président Directeur Général",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    bio: "Visionnaire et entrepreneur, Amadou a fondé le Groupe Rishom avec la mission de contribuer au développement économique de l'Afrique.",
  },
  {
    name: "Fatima OUEDRAOGO",
    position: "Directrice Générale Adjointe",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    bio: "Expert en stratégie et finance, Fatima pilote le développement stratégique du groupe et supervise les opérations des entités.",
  },
  {
    name: "Ibrahim KONE",
    position: "Directeur des Opérations",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "Fort de 20 ans d'expérience dans le BTP et l'industrie, Ibrahim assure l'excellence opérationnelle de nos projets.",
  },
  {
    name: "Aissata SANKARA",
    position: "Directrice des Ressources Humaines",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    bio: "Passionnée par le développement des talents, Aissata coordonne la politique RH du groupe et la formation de nos équipes.",
  },
];

export default function AboutLeadershipSection() {
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
            Notre direction
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Une équipe de leaders expérimentés au service de notre vision
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-none overflow-hidden">
                <div className="relative h-80">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {leader.name}
                    </h3>
                    <p className="text-white/90 text-sm">{leader.position}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-[#3A3A3C] mb-4">{leader.bio}</p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-[#8B1538] hover:text-[#C4526D] transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="font-semibold">Profil LinkedIn</span>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
