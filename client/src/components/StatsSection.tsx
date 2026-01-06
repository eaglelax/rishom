import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Building2, Users, Globe, Award, Briefcase, TrendingUp,
  MapPin, Calendar, Star, Target, Zap, Heart,
  type LucideIcon
} from "lucide-react";

interface Statistic {
  id: string;
  icon: string | null;
  label: string;
  value: number;
  suffix: string | null;
  displayOrder: number;
}

// Mapping des noms d'icônes vers les composants Lucide
const iconMap: Record<string, LucideIcon> = {
  "building": Building2,
  "building2": Building2,
  "users": Users,
  "globe": Globe,
  "award": Award,
  "briefcase": Briefcase,
  "trending-up": TrendingUp,
  "map-pin": MapPin,
  "calendar": Calendar,
  "star": Star,
  "target": Target,
  "zap": Zap,
  "heart": Heart,
};

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    });
  }, [springValue]);

  return (
    <span ref={ref} className="inline-block">
      0
    </span>
  );
}

export default function StatsSection() {
  const [stats, setStats] = useState<Statistic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/statistics");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Erreur chargement statistiques:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Ne rien afficher si pas de stats
  if (isLoading) {
    return (
      <section className="py-20 md:py-32 bg-[#3A3A3C]">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (stats.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-32 bg-[#3A3A3C]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const iconName = stat.icon?.toLowerCase().replace(/_/g, "-") || "award";
            const Icon = iconMap[iconName] || Award;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
                data-testid={`stat-${stat.label.toLowerCase()}`}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#8B1538] flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix || ""} />
                  {stat.suffix || ""}
                </div>
                <p className="text-lg text-white/80">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
