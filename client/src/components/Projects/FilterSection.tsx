import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Entity {
  id: string;
  code: string;
  shortName: string;
  colorPrimary: string;
  description: string | null;
}

interface FilterSectionProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function ProjectsFilterSection({ activeFilter, onFilterChange }: FilterSectionProps) {
  const [entities, setEntities] = useState<Entity[]>([]);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await fetch("/api/entities");
        if (response.ok) {
          const data: Entity[] = await response.json();
          // Exclure GROUPE
          setEntities(data.filter(e => e.code !== "GROUPE"));
        }
      } catch (error) {
        console.error("Erreur chargement entités:", error);
      }
    };
    fetchEntities();
  }, []);

  // Construire les filtres dynamiquement depuis les entités
  const filters = [
    { id: "all", label: "Tous les projets", color: "#8B1538" },
    ...entities.map(e => ({
      id: e.code.toLowerCase(),
      label: e.shortName,
      color: e.colorPrimary || "#8B1538"
    }))
  ];

  return (
    <section className="py-12 bg-white border-b">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {filters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              variant={activeFilter === filter.id ? "default" : "outline"}
              className={`rounded-full px-6 py-2 font-semibold transition-all ${
                activeFilter === filter.id
                  ? "shadow-lg"
                  : "hover:shadow-md"
              }`}
              style={
                activeFilter === filter.id
                  ? { backgroundColor: filter.color, color: "white" }
                  : {}
              }
              data-testid={`filter-${filter.id}`}
            >
              {filter.label}
            </Button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
