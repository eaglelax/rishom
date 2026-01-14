import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Building2, FolderKanban } from "lucide-react";

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

interface ProjectsGridProps {
  activeFilter: string;
}

export default function ProjectsGrid({ activeFilter }: ProjectsGridProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, entitiesRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/entities")
        ]);

        if (projectsRes.ok) {
          const data = await projectsRes.json();
          setProjects(data);
        }
        if (entitiesRes.ok) {
          const data = await entitiesRes.json();
          setEntities(data);
        }
      } catch (error) {
        console.error("Erreur chargement projets:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getEntityInfo = (entityId: string | null): { code: string; name: string; color: string } => {
    if (!entityId) return { code: "groupe", name: "GROUPE", color: "#8B1538" };
    const entity = entities.find(e => e.id === entityId);
    if (!entity) return { code: "groupe", name: "GROUPE", color: "#8B1538" };
    return {
      code: entity.code.toLowerCase(),
      name: entity.shortName,
      color: entity.colorPrimary || "#8B1538"
    };
  };

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((project) => {
        const entityInfo = getEntityInfo(project.entityId);
        return entityInfo.code === activeFilter;
      });

  if (isLoading) {
    return (
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-12 h-12 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="container mx-auto px-4">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const entityInfo = getEntityInfo(project.entityId);
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border-none">
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
                      <div className="absolute top-4 left-4">
                        <span
                          className="px-3 py-1 rounded-full text-white text-sm font-semibold"
                          style={{ backgroundColor: entityInfo.color }}
                        >
                          {entityInfo.name}
                        </span>
                      </div>
                      {project.status && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 rounded-full bg-white/90 text-gray-800 text-xs font-medium">
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
                        <p className="text-[#3A3A3C] mb-4 line-clamp-3">{project.description}</p>
                      )}
                      <div className="space-y-2 text-sm text-[#707070]">
                        {project.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {project.location}
                          </div>
                        )}
                        {project.year && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {project.year}
                          </div>
                        )}
                        {project.budget && (
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            Budget : {project.budget}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <FolderKanban className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-2xl text-[#707070]">
              Aucun projet trouvé pour cette catégorie.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
