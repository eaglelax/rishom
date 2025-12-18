import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Building2 } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Autoroute Ouagadougou-Bobo-Dioulasso",
    category: "rbf",
    categoryLabel: "BTP",
    location: "Burkina Faso",
    date: "2023-2024",
    budget: "150M FCFA",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    description: "Construction d'une autoroute moderne reliant les deux principales villes du pays.",
    color: "#C74634",
  },
  {
    id: 2,
    title: "Centre commercial Ouaga 2000",
    category: "ric",
    categoryLabel: "Investissement",
    location: "Ouagadougou",
    date: "2024",
    budget: "80M FCFA",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    description: "Investissement dans un complexe commercial moderne de 5000m².",
    color: "#8B1538",
  },
  {
    id: 3,
    title: "Ferme avicole moderne de Koudougou",
    category: "revi",
    categoryLabel: "Agro-business",
    location: "Koudougou",
    date: "2023-2024",
    budget: "45M FCFA",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80",
    description: "Construction d'une ferme avicole produisant 50 000 poulets par mois.",
    color: "#058B5E",
  },
  {
    id: 4,
    title: "Aéroport International de Ouagadougou",
    category: "rbf",
    categoryLabel: "BTP",
    location: "Ouagadougou",
    date: "2022-2024",
    budget: "250M FCFA",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    description: "Extension et modernisation du terminal international.",
    color: "#C74634",
  },
  {
    id: 5,
    title: "Centre de formation professionnelle",
    category: "rba",
    categoryLabel: "Formation",
    location: "Bobo-Dioulasso",
    date: "2024",
    budget: "30M FCFA",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    description: "Nouveau campus pouvant accueillir 500 apprenants simultanément.",
    color: "#2E5A9C",
  },
  {
    id: 6,
    title: "Unité de transformation de soja",
    category: "revi",
    categoryLabel: "Agro-business",
    location: "Fada N'Gourma",
    date: "2023",
    budget: "60M FCFA",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
    description: "Usine de transformation avec capacité de 10 tonnes par jour.",
    color: "#058B5E",
  },
  {
    id: 7,
    title: "Complexe hôtelier Yennenga",
    category: "ric",
    categoryLabel: "Investissement",
    location: "Ouagadougou",
    date: "2023-2025",
    budget: "120M FCFA",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    description: "Hôtel 4 étoiles de 80 chambres avec centre de conférences.",
    color: "#8B1538",
  },
  {
    id: 8,
    title: "Barrage hydroélectrique de Bagré",
    category: "rbf",
    categoryLabel: "BTP",
    location: "Bagré",
    date: "2021-2024",
    budget: "300M FCFA",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
    description: "Participation à la construction d'un barrage produisant 15 MW.",
    color: "#C74634",
  },
  {
    id: 9,
    title: "Programme de formation aux métiers verts",
    category: "rba",
    categoryLabel: "Formation",
    location: "National",
    date: "2024-2025",
    budget: "25M FCFA",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    description: "Formation de 1000 jeunes aux énergies renouvelables.",
    color: "#2E5A9C",
  },
];

interface ProjectsGridProps {
  activeFilter: string;
}

export default function ProjectsGrid({ activeFilter }: ProjectsGridProps) {
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
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
                      {project.categoryLabel}
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
                      <Calendar className="w-4 h-4" />
                      {project.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Budget : {project.budget}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-[#707070]">
              Aucun projet trouvé pour cette catégorie.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
