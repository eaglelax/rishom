import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Truck, HardHat, Building, Wrench, Package, Settings,
  TrendingUp, Users, FileText, Lightbulb, Target, BarChart3,
  Leaf, Wheat, Factory, Sprout, ShoppingBag, Droplets,
  GraduationCap, BookOpen, Award, Briefcase, UserCheck, Building2,
  Beef, Egg, Milk, Apple, Fish,
  type LucideIcon
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  shortDescription: string | null;
  iconName: string | null;
  imageUrl: string | null;
  displayOrder: number;
}

interface Entity {
  id: string;
  shortName: string;
  primaryColor: string | null;
}

interface Props {
  entitySlug: string;
  title?: string;
  subtitle?: string;
}

// Mapping des noms d'icônes vers les composants Lucide
const iconMap: Record<string, LucideIcon> = {
  // BTP
  "truck": Truck,
  "hard-hat": HardHat,
  "hardhat": HardHat,
  "building": Building,
  "building2": Building2,
  "wrench": Wrench,
  "package": Package,
  "settings": Settings,
  // Consulting
  "trending-up": TrendingUp,
  "users": Users,
  "file-text": FileText,
  "lightbulb": Lightbulb,
  "target": Target,
  "bar-chart-3": BarChart3,
  "barchart3": BarChart3,
  // Agriculture
  "leaf": Leaf,
  "wheat": Wheat,
  "factory": Factory,
  "sprout": Sprout,
  "shopping-bag": ShoppingBag,
  "droplets": Droplets,
  // Formation
  "graduation-cap": GraduationCap,
  "book-open": BookOpen,
  "award": Award,
  "briefcase": Briefcase,
  "user-check": UserCheck,
  // Agro-business
  "beef": Beef,
  "egg": Egg,
  "milk": Milk,
  "apple": Apple,
  "fish": Fish,
};

// Couleurs par défaut par entité
const defaultColors: Record<string, string> = {
  "RBF": "#C74634",
  "RIC": "#8B1538",
  "REVI": "#058B5E",
  "REV'I": "#058B5E",
  "RBA": "#2E5A9C",
  "GROUPE": "#8B1538",
};

export default function DynamicServicesSection({ entitySlug, title = "Nos services", subtitle }: Props) {
  const [services, setServices] = useState<Service[]>([]);
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

          // Récupérer les services de cette entité
          const servicesRes = await fetch(`/api/services/entity/${entityData.id}`);
          if (servicesRes.ok) {
            const data = await servicesRes.json();
            setServices(data);
          }
        }
      } catch (error) {
        console.error("Erreur chargement services:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [entitySlug]);

  const getIcon = (iconName: string | null): LucideIcon => {
    if (!iconName) return Settings;
    const normalizedName = iconName.toLowerCase().replace(/_/g, "-");
    return iconMap[normalizedName] || Settings;
  };

  const color = entity?.primaryColor || defaultColors[entity?.shortName?.toUpperCase() || ""] || "#8B1538";

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

  if (services.length === 0) {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = getIcon(service.iconName);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-none bg-[#F5F1E8]">
                  <CardHeader>
                    {service.imageUrl ? (
                      <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                    ) : (
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${color}15` }}
                      >
                        <Icon className="w-8 h-8" style={{ color }} />
                      </div>
                    )}
                    <CardTitle className="text-2xl" style={{ color }}>
                      {service.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {service.shortDescription && (
                      <p className="text-[#3A3A3C]">{service.shortDescription}</p>
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
