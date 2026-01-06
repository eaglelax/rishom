import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Hammer, Calculator, Users, Laptop, ClipboardList, Briefcase,
  GraduationCap, BookOpen, Award, Wrench, Settings,
  type LucideIcon
} from "lucide-react";

interface RbaProgram {
  id: string;
  title: string;
  description: string | null;
  duration: string | null;
  iconName: string | null;
  imageUrl: string | null;
  displayOrder: number;
}

// Mapping des noms d'icônes vers les composants Lucide
const iconMap: Record<string, LucideIcon> = {
  "hammer": Hammer,
  "calculator": Calculator,
  "users": Users,
  "laptop": Laptop,
  "clipboard-list": ClipboardList,
  "clipboardlist": ClipboardList,
  "briefcase": Briefcase,
  "graduation-cap": GraduationCap,
  "book-open": BookOpen,
  "award": Award,
  "wrench": Wrench,
  "settings": Settings,
};

export default function RBAProgramsSection() {
  const [programs, setPrograms] = useState<RbaProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch("/api/rba/programs");
        if (response.ok) {
          const data = await response.json();
          setPrograms(data);
        }
      } catch (error) {
        console.error("Erreur chargement programmes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const getIcon = (iconName: string | null): LucideIcon => {
    if (!iconName) return GraduationCap;
    const normalizedName = iconName.toLowerCase().replace(/_/g, "-");
    return iconMap[normalizedName] || GraduationCap;
  };

  if (isLoading) {
    return (
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-12 h-12 border-4 border-[#2E5A9C] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (programs.length === 0) {
    return null;
  }

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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2E5A9C] mb-4">
            Nos formations
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Des programmes certifiants adaptés aux besoins du marché de l'emploi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => {
            const Icon = getIcon(program.iconName);
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-none bg-[#F5F1E8]">
                  <CardHeader>
                    {program.imageUrl ? (
                      <img
                        src={program.imageUrl}
                        alt={program.title}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-[#2E5A9C]/10 flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-[#2E5A9C]" />
                      </div>
                    )}
                    <CardTitle className="text-2xl text-[#2E5A9C]">
                      {program.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {program.description && (
                      <p className="text-[#3A3A3C] mb-4">{program.description}</p>
                    )}
                    {program.duration && (
                      <div className="inline-block bg-[#2E5A9C]/10 px-4 py-2 rounded-full">
                        <span className="text-[#2E5A9C] font-semibold text-sm">
                          Durée : {program.duration}
                        </span>
                      </div>
                    )}
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
