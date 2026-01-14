import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

// Images de fallback
import heroRbfConstruction from "@assets/generated_images/rbf_construction_site_ouagadougou.png";
import heroRicConsulting from "@assets/generated_images/ric_consulting_meeting_burkina.png";
import heroReviAgriculture from "@assets/generated_images/revi_rice_agriculture_burkina.png";
import heroRbaCampus from "@assets/generated_images/rba_campus_ouagadougou_burkina.png";
import heroGroupTeam from "@assets/generated_images/rishom_team_photo_burkina.png";

const fallbackImages: Record<string, string> = {
  "RBF": heroRbfConstruction,
  "RIC": heroRicConsulting,
  "REVI": heroReviAgriculture,
  "RBA": heroRbaCampus,
  "GROUPE": heroGroupTeam,
};

interface Entity {
  id: string;
  code: string;
  fullName: string;
  shortName: string;
  description: string | null;
  colorPrimary: string;
  colorSecondary: string | null;
  logoUrl: string | null;
  logoWhiteUrl: string | null;
  pageSlug: string | null;
  aboutText: string | null;
}

interface EntityHeroSectionProps {
  entityCode: string;
  title?: string;
  subtitle?: string;
  showContactButton?: boolean;
  showCatalogButton?: boolean;
  catalogButtonText?: string;
  catalogButtonLink?: string;
  heroImageUrl?: string;
}

export default function EntityHeroSection({
  entityCode,
  title,
  subtitle,
  showContactButton = true,
  showCatalogButton = true,
  catalogButtonText = "En savoir plus",
  catalogButtonLink,
  heroImageUrl,
}: EntityHeroSectionProps) {
  const [entity, setEntity] = useState<Entity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const response = await fetch("/api/entities");
        if (response.ok) {
          const data: Entity[] = await response.json();
          const found = data.find(e => e.code.toUpperCase() === entityCode.toUpperCase());
          if (found) setEntity(found);
        }
      } catch (error) {
        console.error("Erreur chargement entité:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEntity();
  }, [entityCode]);

  const displayTitle = title || entity?.fullName || entityCode;
  const displaySubtitle = subtitle || entity?.description || "";
  const color = entity?.colorPrimary || "#8B1538";
  const logoUrl = entity?.logoWhiteUrl || entity?.logoUrl;
  const backgroundImage = heroImageUrl || fallbackImages[entityCode.toUpperCase()] || heroGroupTeam;

  if (isLoading) {
    return (
      <section
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: color }}
      >
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt={displayTitle}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${color}f2 0%, ${color}b3 100%)`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/80 text-sm mb-6">
            <a href="/" className="hover:text-white transition-colors">
              Accueil
            </a>
            <ChevronRight className="w-4 h-4" />
            <span>{entityCode}</span>
          </div>

          {/* Logo */}
          {logoUrl && (
            <div className="mb-8">
              <img
                src={logoUrl}
                alt={entity?.fullName || entityCode}
                className="h-24 w-auto"
                style={!entity?.logoWhiteUrl ? { filter: "brightness(0) invert(1)" } : undefined}
              />
            </div>
          )}

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {displayTitle}
          </h1>

          {displaySubtitle && (
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl">
              {displaySubtitle}
            </p>
          )}

          <div className="flex flex-wrap gap-4">
            {showContactButton && (
              <a href="/contact">
                <Button
                  size="lg"
                  className="bg-white font-semibold px-8 py-6 rounded-full group"
                  style={{ color }}
                  data-testid={`${entityCode.toLowerCase()}-contact-cta`}
                >
                  Nous contacter
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            )}
            {showCatalogButton && (
              <a href={catalogButtonLink || `/${entity?.pageSlug || entityCode.toLowerCase()}/services`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white font-semibold px-8 py-6 rounded-full"
                  style={{ ["--tw-ring-color" as string]: color }}
                  data-testid={`${entityCode.toLowerCase()}-catalog-cta`}
                >
                  {catalogButtonText}
                </Button>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
