import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Briefcase, ChevronRight } from "lucide-react";
import { Link } from "wouter";

interface JobOffer {
  id: string;
  title: string;
  slug: string;
  entityId: string | null;
  location: string | null;
  contractType: string | null;
  department: string | null;
  createdAt: string;
}

interface Entity {
  id: string;
  shortName: string;
  primaryColor: string | null;
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

export default function CareersOpenPositions() {
  const [jobs, setJobs] = useState<JobOffer[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, entitiesRes] = await Promise.all([
          fetch("/api/jobs"),
          fetch("/api/entities")
        ]);

        if (jobsRes.ok) {
          const data = await jobsRes.json();
          setJobs(data);
        }
        if (entitiesRes.ok) {
          const data = await entitiesRes.json();
          setEntities(data);
        }
      } catch (error) {
        console.error("Erreur chargement offres:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getEntityInfo = (entityId: string | null): { name: string; color: string } => {
    if (!entityId) return { name: "GROUPE", color: "#8B1538" };
    const entity = entities.find(e => e.id === entityId);
    if (!entity) return { name: "GROUPE", color: "#8B1538" };
    return {
      name: entity.shortName,
      color: entity.primaryColor || defaultColors[entity.shortName.toUpperCase()] || "#8B1538"
    };
  };

  const formatTimeAgo = (dateStr: string): string => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Il y a 1 jour";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 14) return "Il y a 1 semaine";
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
    return `Il y a ${Math.floor(diffDays / 30)} mois`;
  };

  if (isLoading) {
    return (
      <section className="py-20 md:py-32 bg-[#F5F1E8]">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-12 h-12 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (jobs.length === 0) {
    return (
      <section className="py-20 md:py-32 bg-[#F5F1E8]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#8B1538] mb-4">
              Postes ouverts
            </h2>
            <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
              Aucune offre d'emploi disponible pour le moment. Consultez régulièrement cette page ou envoyez une candidature spontanée.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

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
            Postes ouverts
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            {jobs.length} opportunité{jobs.length > 1 ? "s" : ""} à saisir dans nos différentes entités
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {jobs.map((job, index) => {
            const entityInfo = getEntityInfo(job.entityId);
            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-none">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className="px-3 py-1 rounded-full text-white text-sm font-semibold"
                            style={{ backgroundColor: entityInfo.color }}
                          >
                            {entityInfo.name}
                          </span>
                          <span className="text-sm text-[#707070]">
                            {formatTimeAgo(job.createdAt)}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-[#707070]">
                          {job.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </div>
                          )}
                          {job.contractType && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {job.contractType}
                            </div>
                          )}
                          {job.department && (
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4" />
                              {job.department}
                            </div>
                          )}
                        </div>
                      </div>
                      <Link href={`/carrieres/${job.slug}`}>
                        <Button
                          className="bg-[#8B1538] text-white hover:bg-[#C4526D] font-semibold px-8 py-6 rounded-full group whitespace-nowrap"
                          data-testid={`apply-${job.id}`}
                        >
                          Postuler
                          <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
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
