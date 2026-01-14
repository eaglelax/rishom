import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin, Calendar, Building2, FolderKanban } from "lucide-react";
import { Link } from "wouter";

interface Entity {
  id: string;
  code: string;
  shortName: string;
  colorPrimary: string;
}

interface Project {
  id: string;
  entityId: string | null;
  name: string;
  description: string | null;
  location: string | null;
  client: string | null;
  year: number | null;
  budget: string | null;
  imageUrl: string | null;
  status: string | null;
  isFeatured: boolean;
}

interface Props {
  entitySlug: string;
  title?: string;
  subtitle?: string;
  showAllButton?: boolean;
  allButtonText?: string;
  allButtonLink?: string;
  limit?: number;
}

// Couleurs par défaut par entité
const defaultColors: Record<string, string> = {
  "RBF": "#C74634",
  "RIC": "#8B1538",
  "REVI": "#058B5E",
  "REV'I": "#058B5E",
  "RBA": "#2E5A9C",
  "GROUPE": "#8B1538",
};

export default function DynamicProjectsSection({
  entitySlug,
  title = "Nos réalisations",
  subtitle,
  showAllButton = true,
  allButtonText = "Voir tous nos projets",
  allButtonLink,
  limit = 6
}: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [entity, setEntity] = useState<Entity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer l'entité par slug
        const entityRes = await fetch(`/api/entities/${entitySlug}`);
        if (entityRes.ok) {
          const entityData: Entity = await entityRes.json();
          setEntity(entityData);

          // Récupérer les projets de cette entité
          const projectsRes = await fetch(`/api/projects/entity/${entityData.id}`);
          if (projectsRes.ok) {
            const data = await projectsRes.json();
            setProjects(data);
          }
        }
      } catch (error) {
        console.error("Erreur chargement projets:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [entitySlug]);

  const color = entity?.colorPrimary || defaultColors[entity?.code?.toUpperCase() || ""] || "#8B1538";

  if (isLoading) {
    return (
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 flex justify-center">
          <div
            className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: `${color} transparent transparent transparent` }}
          />
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return null;
  }

  const displayedProjects = projects.slice(0, limit);

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
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4"
            style={{ color }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border-none bg-[#F5F1E8]">
                <div className="relative h-56">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <FolderKanban className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  {project.status && (
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1 rounded-full text-white text-sm font-semibold"
                        style={{ backgroundColor: color }}
                      >
                        {project.status}
                      </span>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-3">
                    {project.name}
                  </h3>
                  {project.description && (
                    <p className="text-[#3A3A3C] mb-4 line-clamp-2">{project.description}</p>
                  )}
                  <div className="space-y-2 text-sm text-[#707070]">
                    {project.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" style={{ color }} />
                        {project.location}
                      </div>
                    )}
                    {project.year && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" style={{ color }} />
                        {project.year}
                      </div>
                    )}
                    {project.budget && (
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" style={{ color }} />
                        Budget : {project.budget}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {showAllButton && projects.length > limit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            {allButtonLink ? (
              <Link href={allButtonLink}>
                <Button
                  size="lg"
                  className="text-white font-semibold px-8 py-6 rounded-full group"
                  style={{ backgroundColor: color }}
                >
                  {allButtonText}
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                className="text-white font-semibold px-8 py-6 rounded-full group"
                style={{ backgroundColor: color }}
              >
                {allButtonText}
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
