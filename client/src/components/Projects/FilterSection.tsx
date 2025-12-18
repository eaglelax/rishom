import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const filters = [
  { id: "all", label: "Tous les projets" },
  { id: "rbf", label: "BTP", color: "#C74634" },
  { id: "ric", label: "Investissement", color: "#8B1538" },
  { id: "revi", label: "Agro-business", color: "#058B5E" },
  { id: "rba", label: "Formation", color: "#2E5A9C" },
];

interface FilterSectionProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function ProjectsFilterSection({ activeFilter, onFilterChange }: FilterSectionProps) {
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
                activeFilter === filter.id && filter.color
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
