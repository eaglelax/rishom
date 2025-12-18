import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Calendar } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Programme d'accès à l'eau potable",
    location: "Province du Yatenga",
    beneficiaries: "5 000 personnes",
    date: "2024-2025",
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&q=80",
    description: "Construction de 5 forages équipés de pompes solaires dans des villages ruraux.",
    pillar: "Communautaire",
    color: "#C74634",
  },
  {
    id: 2,
    title: "Formation professionnelle des jeunes",
    location: "Ouagadougou & Bobo-Dioulasso",
    beneficiaries: "300 jeunes",
    date: "2024",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    description: "Programme de formation gratuite aux métiers du BTP avec garantie d'emploi.",
    pillar: "Éducation",
    color: "#8B1538",
  },
  {
    id: 3,
    title: "Reforestation communautaire",
    location: "Région du Centre-Nord",
    beneficiaries: "10 villages",
    date: "2023-2025",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80",
    description: "Plantation de 50 000 arbres avec accompagnement des communautés locales.",
    pillar: "Environnemental",
    color: "#058B5E",
  },
  {
    id: 4,
    title: "Centres de santé communautaires",
    location: "Zone rurale de Koudougou",
    beneficiaries: "8 000 personnes",
    date: "2024-2026",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80",
    description: "Construction et équipement de 3 centres de santé avec personnel formé.",
    pillar: "Social",
    color: "#2E5A9C",
  },
];

export default function CSRProjectsSection() {
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
            Projets en cours
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Des initiatives concrètes qui transforment des vies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full text-white text-sm font-semibold"
                      style={{ backgroundColor: project.color }}
                    >
                      {project.pillar}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-3">
                    {project.title}
                  </h3>
                  <p className="text-[#3A3A3C] mb-4">{project.description}</p>
                  <div className="space-y-2 text-sm text-[#707070]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {project.beneficiaries}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {project.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
