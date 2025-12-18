import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Autoroute Ouagadougou-Bobo",
    location: "Burkina Faso",
    date: "2024",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80",
    description: "Fourniture de 45 engins de terrassement",
  },
  {
    id: 2,
    title: "Construction Aéroport International",
    location: "Ouagadougou",
    date: "2023-2024",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
    description: "Équipement complet du chantier",
  },
  {
    id: 3,
    title: "Barrage hydroélectrique",
    location: "Bagré",
    date: "2023",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80",
    description: "Location longue durée de 30 engins",
  },
];

export default function RBFProjectsSection() {
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
            Projets réalisés
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Des références majeures dans toute l'Afrique de l'Ouest
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border-none">
                <div className="relative h-56">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold text-[#C74634] mb-3">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-[#707070] mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {project.date}
                    </div>
                  </div>
                  <p className="text-[#3A3A3C]">{project.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
