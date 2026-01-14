import { useState, useEffect } from "react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { TrendingUp, CheckCircle2, Calendar, FolderKanban, MapPin, Building2, Briefcase } from "lucide-react";

interface Entity {
  id: string;
  code: string;
  shortName: string;
  colorPrimary: string;
  logoUrl: string | null;
}

interface Project {
  id: string;
  entityId: string | null;
  title: string;
  slug: string;
  client: string | null;
  location: string | null;
  year: number | null;
  description: string | null;
  challenges: string | null;
  solutions: string | null;
  results: string | null;
  imageUrl: string | null;
  projectType: string | null;
  budget: string | null;
  duration: string | null;
  isFeatured: boolean;
}

const HeroSection = ({ entity }: { entity: Entity | null }) => (
  <section className="relative h-[60vh] flex items-center">
    <div
      className="absolute inset-0 opacity-95"
      style={{ background: `linear-gradient(135deg, ${entity?.colorPrimary || "#8B1538"}, #3A3A3C)` }}
    />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-6">Nos Projets d'Investissement</h1>
        <p className="text-xl max-w-2xl">Accompagnement stratégique et financement pour la croissance de vos entreprises.</p>
      </motion.div>
    </div>
  </section>
);

const ProjectCard = ({ project, entity, index }: { project: Project; entity: Entity | null; index: number }) => {
  const color = entity?.colorPrimary || "#8B1538";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-lg shadow-lg"
    >
      <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-24 h-24 object-cover rounded-lg"
          />
        ) : (
          <div style={{ color }}>
            <Briefcase className="w-12 h-12" />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {project.projectType && (
              <span
                className="px-3 py-1 text-xs font-semibold text-white rounded-full"
                style={{ backgroundColor: color }}
              >
                {project.projectType}
              </span>
            )}
          </div>
          <h3 className="text-2xl font-bold text-[#3A3A3C] mb-2">{project.title}</h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm mb-4">
            {project.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color }} />
                <span className="text-[#3A3A3C]">{project.location}</span>
              </div>
            )}
            {project.year && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" style={{ color }} />
                <span className="text-[#3A3A3C]">{project.year}</span>
              </div>
            )}
            {project.budget && (
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" style={{ color }} />
                <span style={{ color }} className="font-bold">{project.budget}</span>
              </div>
            )}
            {project.client && (
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" style={{ color }} />
                <span className="text-[#3A3A3C]">{project.client}</span>
              </div>
            )}
          </div>
          {project.description && (
            <p className="text-[#3A3A3C] mb-4">{project.description}</p>
          )}
          {project.results && (
            <div className="pt-4 border-t border-[#B8956A]/20">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" style={{ color }} />
                <span className="text-sm font-semibold" style={{ color }}>{project.results}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = ({ projects, entity }: { projects: Project[]; entity: Entity | null }) => {
  if (projects.length === 0) {
    return (
      <section className="py-20 bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FolderKanban className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-3xl font-bold text-[#3A3A3C] mb-4">Nos Projets</h2>
          <p className="text-xl text-[#707070]">
            Aucun projet disponible pour le moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Nos Projets</h2>
        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} entity={entity} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedProjectsSection = ({ projects, entity }: { projects: Project[]; entity: Entity | null }) => {
  const featuredProjects = projects.filter(p => p.isFeatured);
  const color = entity?.colorPrimary || "#8B1538";

  if (featuredProjects.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Projets Phares</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-[#F5F1E8] p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <div
                className="inline-block text-white text-xs font-semibold px-3 py-1 rounded-full mb-4"
                style={{ backgroundColor: color }}
              >
                {project.projectType || "Investissement"}
              </div>
              <h3 className="text-xl font-bold text-[#3A3A3C] mb-4">{project.title}</h3>
              {project.description && (
                <p className="text-sm text-[#3A3A3C] mb-4 line-clamp-2">{project.description}</p>
              )}
              <div className="space-y-2 text-sm">
                {project.location && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" style={{ color }} />
                    <span className="text-[#3A3A3C]">{project.location}</span>
                  </div>
                )}
                {project.budget && (
                  <div className="font-bold" style={{ color }}>{project.budget}</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function RICProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [entity, setEntity] = useState<Entity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer l'entité RIC
        const entitiesRes = await fetch("/api/entities");
        if (entitiesRes.ok) {
          const entities: Entity[] = await entitiesRes.json();
          const ricEntity = entities.find(e => e.code === "RIC" || e.shortName.toUpperCase() === "RIC");
          if (ricEntity) {
            setEntity(ricEntity);

            // Récupérer les projets de RIC
            const projectsRes = await fetch(`/api/projects/entity/${ricEntity.id}`);
            if (projectsRes.ok) {
              const data = await projectsRes.json();
              setProjects(data);
            }
          }
        }
      } catch (error) {
        console.error("Erreur chargement données:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <TopBar />
        <Header />
        <div className="flex justify-center items-center py-32">
          <div className="w-12 h-12 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <HeroSection entity={entity} />
      <ProjectsSection projects={projects} entity={entity} />
      <FeaturedProjectsSection projects={projects} entity={entity} />
      <Footer />
    </div>
  );
}
