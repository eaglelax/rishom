import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface Entity {
  id: string;
  code: string;
  fullName: string;
  shortName: string;
  description: string | null;
  colorPrimary: string;
  logoUrl: string | null;
  pageSlug: string | null;
  displayOrder: number;
  isActive: boolean;
}

// Descriptions par défaut si non définies en BD
const defaultDescriptions: Record<string, string> = {
  "RBF": "Leader en équipements BTP et solutions de construction",
  "RIC": "Conseil stratégique et investissement pour la croissance",
  "REVI": "Excellence en agro-business et valorisation agricole",
  "RBA": "Formation professionnelle et développement des compétences",
  "GROUPE": "Holding et coordination stratégique du groupe",
};

export default function EntitiesGrid() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await fetch("/api/entities");
        if (response.ok) {
          const data = await response.json();
          // Trier par displayOrder
          const sorted = data.sort((a: Entity, b: Entity) => a.displayOrder - b.displayOrder);
          setEntities(sorted);
        }
      } catch (error) {
        console.error("Erreur chargement entités:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEntities();
  }, []);

  if (isLoading) {
    return (
      <section id="entities" className="py-20 md:py-32 bg-[#F5F1E8]">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-12 h-12 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (entities.length === 0) {
    return null;
  }

  return (
    <section id="entities" className="py-20 md:py-32 bg-[#F5F1E8]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#8B1538] mb-4">
            Nos entités
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Cinq expertises complémentaires au service de votre réussite
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {entities.map((entity, index) => {
            const description = entity.description || defaultDescriptions[entity.code] || "";
            const href = `/${entity.pageSlug || entity.code.toLowerCase()}`;

            return (
              <motion.div
                key={entity.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -12,
                  transition: { duration: 0.3 }
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card
                  className="h-full transition-all duration-300 cursor-pointer group border-none hover:shadow-[0_20px_40px_rgba(139,21,56,0.15)]"
                  data-testid={`entity-card-${entity.code.toLowerCase()}`}
                >
                  <CardHeader>
                    <div className="h-20 flex items-center justify-center mb-4">
                      {entity.logoUrl ? (
                        <img
                          src={entity.logoUrl}
                          alt={entity.fullName}
                          className="h-16 w-auto object-contain"
                        />
                      ) : (
                        <div
                          className="h-16 w-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                          style={{ backgroundColor: entity.colorPrimary }}
                        >
                          {entity.code.charAt(0)}
                        </div>
                      )}
                    </div>
                    <CardTitle
                      className="text-2xl font-semibold mb-2"
                      style={{ color: entity.colorPrimary }}
                    >
                      {entity.code}
                    </CardTitle>
                    <p className="text-sm font-medium text-[#3A3A3C]">
                      {entity.fullName}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#707070] mb-4">{description}</p>
                    <a
                      href={href}
                      className="inline-flex items-center font-semibold hover:gap-3 transition-all group"
                      style={{ color: entity.colorPrimary }}
                    >
                      Découvrir
                      <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
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
