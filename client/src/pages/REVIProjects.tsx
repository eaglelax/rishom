import { useState, useEffect } from "react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Tractor, Lightbulb, Users, TrendingUp, CheckCircle2, Calendar, FolderKanban, MapPin } from "lucide-react";

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

interface Statistic {
  id: string;
  label: string;
  value: number;
  suffix: string | null;
}

const HeroSection = ({ entity }: { entity: Entity | null }) => (
  <section className="relative h-[60vh] flex items-center">
    <div
      className="absolute inset-0 opacity-95"
      style={{ background: `linear-gradient(135deg, ${entity?.colorPrimary || "#058B5E"}, #3A3A3C)` }}
    />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-6">Projets Agricoles Structurants</h1>
        <p className="text-xl max-w-2xl">Initiatives pour moderniser l'agriculture burkinabè et renforcer la sécurité alimentaire.</p>
      </motion.div>
    </div>
  </section>
);

const ProjectCard = ({ project, entity, index }: { project: Project; entity: Entity | null; index: number }) => {
  const color = entity?.colorPrimary || "#058B5E";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-lg shadow-lg"
    >
      <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
        <div style={{ color }}>
          <FolderKanban className="w-12 h-12" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-[#3A3A3C] mb-2">{project.title}</h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm mb-4">
            {project.location && (
              <div>
                <span className="font-semibold text-[#3A3A3C]">Localisation : </span>
                <span className="text-[#3A3A3C]">{project.location}</span>
              </div>
            )}
            {project.duration && (
              <div>
                <span className="font-semibold text-[#3A3A3C]">Durée : </span>
                <span className="text-[#3A3A3C]">{project.duration}</span>
              </div>
            )}
            {project.budget && (
              <div>
                <span className="font-semibold text-[#3A3A3C]">Budget : </span>
                <span style={{ color }} className="font-bold">{project.budget}</span>
              </div>
            )}
            {project.client && (
              <div>
                <span className="font-semibold text-[#3A3A3C]">Partenaires : </span>
                <span className="text-[#3A3A3C]">{project.client}</span>
              </div>
            )}
          </div>
          {project.description && (
            <p className="text-[#3A3A3C] mb-4">{project.description}</p>
          )}
          {project.solutions && (
            <div className="mb-4">
              <h4 className="font-semibold text-[#3A3A3C] mb-2">Objectifs :</h4>
              <ul className="grid md:grid-cols-2 gap-2">
                {project.solutions.split('\n').filter(Boolean).map((obj, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color }} />
                    <span className="text-[#3A3A3C]">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
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

const OngoingProjectsSection = ({ projects, entity }: { projects: Project[]; entity: Entity | null }) => {
  // Projets en cours = année actuelle ou future
  const currentYear = new Date().getFullYear();
  const ongoingProjects = projects.filter(p => p.year && p.year >= currentYear - 1);

  if (ongoingProjects.length === 0) return null;

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Projets en Cours</h2>
        <div className="space-y-8">
          {ongoingProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} entity={entity} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CompletedProjectsSection = ({ projects, entity }: { projects: Project[]; entity: Entity | null }) => {
  const currentYear = new Date().getFullYear();
  const completedProjects = projects.filter(p => p.year && p.year < currentYear - 1);
  const color = entity?.colorPrimary || "#058B5E";

  if (completedProjects.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Projets Réalisés</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {completedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-[#F5F1E8] p-6 rounded-lg"
            >
              <div className="flex items-center mb-3">
                <CheckCircle2 className="w-6 h-6 mr-2" style={{ color }} />
                <span className="text-sm font-semibold text-[#B8956A]">{project.year}</span>
              </div>
              <h3 className="text-xl font-bold text-[#3A3A3C] mb-2">{project.title}</h3>
              {project.location && (
                <p className="text-sm text-[#3A3A3C] mb-3">{project.location}</p>
              )}
              {project.results && (
                <div className="pt-3 border-t border-[#B8956A]/20">
                  <TrendingUp className="w-5 h-5 inline mr-2" style={{ color }} />
                  <span className="text-sm font-semibold" style={{ color }}>{project.results}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ImpactSection = ({ entity, statistics }: { entity: Entity | null; statistics: Statistic[] }) => {
  const color = entity?.colorPrimary || "#058B5E";

  // Statistiques par défaut si aucune n'est trouvée
  const defaultStats = [
    { value: "1 200+", label: "Producteurs accompagnés" },
    { value: "3 500 ha", label: "Surfaces aménagées" },
    { value: "8 500 T", label: "Production additionnelle/an" },
    { value: "45%", label: "Augmentation rendements" }
  ];

  const displayStats = statistics.length > 0
    ? statistics.map(s => ({ value: `${s.value}${s.suffix || ''}`, label: s.label }))
    : defaultStats;

  return (
    <section className="py-20 text-white" style={{ backgroundColor: color }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-center">Impact Global</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {displayStats.map((impact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2">{impact.value}</div>
              <div className="text-xl">{impact.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedProjectsSection = ({ projects, entity }: { projects: Project[]; entity: Entity | null }) => {
  const featuredProjects = projects.filter(p => p.isFeatured);
  const color = entity?.colorPrimary || "#058B5E";

  if (featuredProjects.length === 0) return null;

  return (
    <section className="py-20 bg-[#F5F1E8]">
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
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div
                className="inline-block text-white text-xs font-semibold px-3 py-1 rounded-full mb-4"
                style={{ backgroundColor: color }}
              >
                {project.projectType || "Projet"}
              </div>
              <h3 className="text-xl font-bold text-[#3A3A3C] mb-4">{project.title}</h3>
              <div className="space-y-2 text-sm">
                {project.year && (
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" style={{ color }} />
                    <span className="text-[#3A3A3C]">Lancement : {project.year}</span>
                  </div>
                )}
                {project.budget && (
                  <div className="font-bold" style={{ color }}>Budget : {project.budget}</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function REVIProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [entity, setEntity] = useState<Entity | null>(null);
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer l'entité REVI
        const entitiesRes = await fetch("/api/entities");
        if (entitiesRes.ok) {
          const entities: Entity[] = await entitiesRes.json();
          const reviEntity = entities.find(e => e.code === "REVI" || e.shortName.toUpperCase() === "REV'I");
          if (reviEntity) {
            setEntity(reviEntity);

            // Récupérer les projets de REVI
            const projectsRes = await fetch(`/api/projects/entity/${reviEntity.id}`);
            if (projectsRes.ok) {
              const data = await projectsRes.json();
              setProjects(data);
            }
          }
        }

        // Récupérer les statistiques
        const statsRes = await fetch("/api/statistics");
        if (statsRes.ok) {
          const data = await statsRes.json();
          setStatistics(data);
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
          <div className="w-12 h-12 border-4 border-[#058B5E] border-t-transparent rounded-full animate-spin" />
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
      <OngoingProjectsSection projects={projects} entity={entity} />
      <CompletedProjectsSection projects={projects} entity={entity} />
      <ImpactSection entity={entity} statistics={statistics} />
      <FeaturedProjectsSection projects={projects} entity={entity} />
      <Footer />
    </div>
  );
}
