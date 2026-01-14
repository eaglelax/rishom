import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Pause, Play } from "lucide-react";
import { Link } from "wouter";

// Images de fallback (pour le cas où la BD est vide)
import heroRbfConstruction from "@assets/generated_images/rbf_construction_site_ouagadougou.png";
import heroRicConsulting from "@assets/generated_images/ric_consulting_meeting_burkina.png";
import heroReviAgriculture from "@assets/generated_images/revi_rice_agriculture_burkina.png";
import heroRbaCampus from "@assets/generated_images/rba_campus_ouagadougou_burkina.png";
import heroGroupTeam from "@assets/generated_images/rishom_team_photo_burkina.png";

// Images de fallback par entité
const fallbackImages: Record<string, string> = {
  "RBF": heroRbfConstruction,
  "RIC": heroRicConsulting,
  "REVI": heroReviAgriculture,
  "REV'I": heroReviAgriculture,
  "RBA": heroRbaCampus,
  "GROUPE": heroGroupTeam,
};

// Descriptions par défaut pour les entités
const defaultDescriptions: Record<string, { title: string; subtitle: string }> = {
  "GROUPE": {
    title: "Groupe Rishom",
    subtitle: "Bâtir l'avenir, ensemble"
  },
  "RBF": {
    title: "Rishom BTP & Fournitures",
    subtitle: "Construction et fournitures de qualité"
  },
  "RIC": {
    title: "Rishom Invest & Conseil",
    subtitle: "Conseil et investissement stratégique"
  },
  "REVI": {
    title: "Rishom Élevage & Valorisation",
    subtitle: "Agriculture et élevage durables"
  },
  "RBA": {
    title: "Rishom Business Academy",
    subtitle: "Formation professionnelle d'excellence"
  },
};

interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  imageAltText: string | null;
  colorCode: string | null;
  linkUrl: string | null;
  ctaText: string | null;
  displayOrder: number;
  entityId?: string | null;
}

interface Entity {
  id: string;
  code: string;
  fullName: string;
  shortName: string;
  colorPrimary: string;
  logoUrl: string | null;
  logoWhiteUrl: string | null;
  pageSlug: string | null;
}

const slideVariants = {
  enter: {
    opacity: 0
  },
  center: {
    zIndex: 1,
    opacity: 1
  },
  exit: {
    zIndex: 0,
    opacity: 0
  }
};

const textVariants = {
  enter: {
    opacity: 0,
    y: 10
  },
  center: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: -10
  }
};

// Détermine l'entité à partir du titre ou de l'URL
function getEntityCodeFromSlide(slide: CarouselSlide): string {
  const title = slide.title.toUpperCase();
  const link = (slide.linkUrl || "").toLowerCase();

  if (title.includes("RBF") || link.includes("/rbf")) return "RBF";
  if (title.includes("RIC") || link.includes("/ric")) return "RIC";
  if (title.includes("REV'I") || title.includes("REVI") || link.includes("/revi")) return "REVI";
  if (title.includes("RBA") || link.includes("/rba")) return "RBA";
  return "GROUPE";
}

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les entités et les slides depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Charger les entités
        const entitiesRes = await fetch("/api/entities");
        const entitiesData = entitiesRes.ok ? await entitiesRes.json() : [];
        setEntities(entitiesData);

        // Charger les slides du carousel
        const carouselRes = await fetch("/api/carousel");
        const carouselData = carouselRes.ok ? await carouselRes.json() : [];

        if (carouselData.length > 0) {
          setSlides(carouselData);
        } else if (entitiesData.length > 0) {
          // Si pas de slides, créer des slides à partir des entités
          const defaultSlides: CarouselSlide[] = entitiesData
            .sort((a: Entity, b: Entity) => a.code === "GROUPE" ? -1 : b.code === "GROUPE" ? 1 : 0)
            .map((entity: Entity, index: number) => ({
              id: entity.id,
              title: defaultDescriptions[entity.code]?.title || entity.fullName,
              subtitle: defaultDescriptions[entity.code]?.subtitle || entity.shortName,
              imageUrl: fallbackImages[entity.code] || heroGroupTeam,
              imageAltText: entity.fullName,
              colorCode: entity.colorPrimary,
              linkUrl: `/${entity.pageSlug || entity.code.toLowerCase()}`,
              ctaText: "Découvrir",
              displayOrder: index,
              entityId: entity.id,
            }));
          setSlides(defaultSlides);
        }
      } catch (error) {
        console.error("Erreur chargement données:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Récupérer les infos d'une entité par son code
  const getEntityByCode = (code: string): Entity | undefined => {
    return entities.find(e => e.code === code || e.code === code.replace("'", ""));
  };

  const paginate = useCallback((direction: number) => {
    if (slides.length === 0) return;
    setCurrentIndex((prev) => {
      let next = prev + direction;
      if (next >= slides.length) next = 0;
      if (next < 0) next = slides.length - 1;
      return next;
    });
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPaused || slides.length === 0) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, paginate, slides.length]);

  // Afficher un loading ou rien pendant le chargement
  if (isLoading || slides.length === 0) {
    return (
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-[#3A3A3C] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  const currentSlide = slides[currentIndex];
  const entityCode = getEntityCodeFromSlide(currentSlide);
  const entity = getEntityByCode(entityCode);
  const entityColor = currentSlide.colorCode || entity?.colorPrimary || "#8B1538";

  // Logo: utiliser celui de l'entité (depuis la BD) ou le logo blanc
  const logoUrl = entity?.logoWhiteUrl || entity?.logoUrl || null;

  // Image: utiliser celle du slide, sinon fallback
  const imageUrl = currentSlide.imageUrl && (currentSlide.imageUrl.startsWith("/") || currentSlide.imageUrl.startsWith("http"))
    ? currentSlide.imageUrl
    : fallbackImages[entityCode] || heroGroupTeam;

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-[#3A3A3C]">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `linear-gradient(135deg, ${entityColor}40 0%, transparent 50%)`
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center max-w-5xl mx-auto will-change-transform"
          >
            {logoUrl && (
              <div className="mb-6">
                <img
                  src={logoUrl}
                  alt={entity?.fullName || entityCode}
                  className="h-48 md:h-60 w-auto mx-auto"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
            )}

            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
              style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}
            >
              {currentSlide.title}
            </h1>

            {currentSlide.subtitle && (
              <p
                className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-10"
                style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}
              >
                {currentSlide.subtitle}
              </p>
            )}

            {currentSlide.linkUrl && (
              <div>
                <Link href={currentSlide.linkUrl}>
                  <Button
                    size="lg"
                    className="text-white font-semibold text-lg px-8 py-6 rounded-full group"
                    style={{ backgroundColor: entityColor }}
                    data-testid={`hero-cta-${currentSlide.id}`}
                  >
                    {currentSlide.ctaText || "EN SAVOIR PLUS"}
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 z-20 flex justify-between pointer-events-none">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => paginate(-1)}
          className="pointer-events-auto bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-full w-12 h-12"
          data-testid="carousel-prev"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => paginate(1)}
          className="pointer-events-auto bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-full w-12 h-12"
          data-testid="carousel-next"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsPaused(!isPaused)}
          className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-full w-10 h-10"
          data-testid="carousel-pause"
        >
          {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
        </Button>

        <div className="flex gap-2">
          {slides.map((slide, index) => {
            const slideEntityCode = getEntityCodeFromSlide(slide);
            const slideEntity = getEntityByCode(slideEntityCode);
            const slideColor = slide.colorCode || slideEntity?.colorPrimary || "#8B1538";
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`relative h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-8" : "w-2"
                }`}
                style={{
                  backgroundColor: index === currentIndex ? slideColor : "rgba(255,255,255,0.4)"
                }}
                data-testid={`carousel-dot-${index}`}
              >
                {index === currentIndex && !isPaused && (
                  <motion.div
                    className="absolute inset-0 rounded-full origin-left"
                    style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 5, ease: "linear" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-20 text-white/60 text-sm font-medium">
        {String(currentIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </section>
  );
}
