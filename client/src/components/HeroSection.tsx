import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Pause, Play } from "lucide-react";
import { Link } from "wouter";

import groupeLogoWhite from "@assets/LOGOS_DEF-12_1766165412964.png";
import rbfLogoWhite from "@assets/LOGOS_DEF-08_1766102890554.png";
import ricLogoWhite from "@assets/LOGOS_DEF-10_1766165412964.png";
import reviLogoWhite from "@assets/LOGOS_DEF-10_1766102890554.png";
import rbaLogoWhite from "@assets/LOGOS_DEF-04_1766102890554.png";

const entityLogos: Record<string, string> = {
  "RBF": rbfLogoWhite,
  "RIC": ricLogoWhite,
  "REV'I": reviLogoWhite,
  "RBA": rbaLogoWhite,
  "GROUPE": groupeLogoWhite,
};

import heroRbfConstruction from "@assets/generated_images/rbf_construction_site_ouagadougou.png";
import heroRbfWarehouse from "@assets/generated_images/rbf_warehouse_burkina_faso.png";
import heroRicConsulting from "@assets/generated_images/ric_consulting_meeting_burkina.png";
import heroRicTraining from "@assets/generated_images/ric_training_session_burkina.png";
import heroReviAgriculture from "@assets/generated_images/revi_rice_agriculture_burkina.png";
import heroReviLivestock from "@assets/generated_images/revi_poultry_farm_burkina.png";
import heroRbaCampus from "@assets/generated_images/rba_campus_ouagadougou_burkina.png";
import heroRbaClassroom from "@assets/generated_images/rba_classroom_burkina_faso.png";
import heroGroupInnovation from "@assets/generated_images/innovation_lab_ouagadougou_burkina.png";
import heroGroupTeam from "@assets/generated_images/rishom_team_photo_burkina.png";
import heroGroupCommunity from "@assets/generated_images/rishom_csr_tree_planting_burkina.png";
import heroGroupInfrastructure from "@assets/generated_images/rishom_complex_aerial_ouagadougou.png";
import heroRbfEquipment from "@assets/generated_images/rbf_construction_equipment_fleet.png";
import heroRicData from "@assets/generated_images/ric_data_analyst_burkinabe_woman.png";
import heroReviProcessing from "@assets/generated_images/revi_food_processing_burkina.png";
import heroReviMarket from "@assets/generated_images/revi_market_store_ouagadougou.png";
import heroRbaComputerLab from "@assets/generated_images/rba_computer_lab_burkina.png";
import heroRbaGraduation from "@assets/generated_images/rba_graduation_ceremony_burkina.png";
import heroGroupFuture from "@assets/generated_images/burkinabe_entrepreneur_futuristic_vision.png";
import heroGroupCelebration from "@assets/generated_images/rishom_team_celebration_burkina.png";

interface CarouselSlide {
  id: number;
  image: string;
  imageDescription: string;
  entity: string;
  entityColor: string;
  title: string;
  subtitle: string;
  link: string;
}

const carouselSlides: CarouselSlide[] = [
  {
    id: 1,
    image: heroRbfConstruction,
    imageDescription: "Chantier de construction moderne à Ouagadougou avec ouvriers burkinabè en gilets orange et casques blancs travaillant sur un immeuble de 5 étages. Au premier plan, une grue jaune RBF, des sacs de ciment empilés. Architecture contemporaine avec façade vitrée. Ciel bleu, lumière naturelle éclatante.",
    entity: "RBF",
    entityColor: "#C74634",
    title: "RBF - Leader du BTP au Burkina Faso",
    subtitle: "Matériaux de qualité • Location d'engins • Service premium",
    link: "/rbf"
  },
  {
    id: 2,
    image: heroRbfWarehouse,
    imageDescription: "Entrepôt RBF spacieux et organisé avec hauts rayonnages métalliques remplis de matériaux de construction (sacs de ciment, fer à béton, tuyaux PVC). Au premier plan, chariot élévateur jaune RBF conduit par un employé burkinabè en combinaison bleue. Éclairage LED moderne.",
    entity: "RBF",
    entityColor: "#C74634",
    title: "RBF - 15 ans d'excellence",
    subtitle: "4 agences • +500 chantiers livrés • Stock permanent",
    link: "/rbf"
  },
  {
    id: 3,
    image: heroRicConsulting,
    imageDescription: "Salle de réunion moderne avec grande table en bois clair. Équipe RIC diverse (3 consultants burkinabè en tenue business casual) présentant des graphiques de croissance sur écran interactif à des clients entrepreneurs. Tableaux blancs avec diagrammes stratégiques.",
    entity: "RIC",
    entityColor: "#8B1538",
    title: "RIC - Accélérateur de croissance",
    subtitle: "Audit • Stratégie • Accompagnement projets",
    link: "/ric"
  },
  {
    id: 4,
    image: heroRicTraining,
    imageDescription: "Session de formation RIC dans salle équipée moderne. Formateur burkinabè debout devant tableau blanc interactif, expliquant concepts business à 12 participants attentifs (entrepreneurs et managers burkinabè). Participants avec laptops ouverts, prenant notes.",
    entity: "RIC",
    entityColor: "#8B1538",
    title: "RIC - Experts en développement d'entreprises",
    subtitle: "80+ clients accompagnés • Présence CEDEAO",
    link: "/ric"
  },
  {
    id: 5,
    image: heroReviAgriculture,
    imageDescription: "Vaste champ de riz vert éclatant à perte de vue sous ciel bleu burkinabè. Au premier plan, agriculteurs burkinabè (2 hommes, 1 femme) en tenue de travail et chapeaux de paille, souriant, inspectant plants de riz à maturité. Système d'irrigation moderne visible.",
    entity: "REV'I",
    entityColor: "#058B5E",
    title: "REV'I - L'agriculture burkinabè réinventée",
    subtitle: "Production locale • Qualité premium • Circuit court",
    link: "/revi"
  },
  {
    id: 6,
    image: heroReviLivestock,
    imageDescription: "Ferme d'élevage moderne REV'I avec poulailler climatisé en arrière-plan. Au premier plan, éleveur burkinabè en blouse blanche tenant plateau d'œufs frais dorés. Poules pondeuses en bonne santé dans enclos propre et spacieux. Bâtiments agricoles contemporains.",
    entity: "REV'I",
    entityColor: "#058B5E",
    title: "REV'I - Du producteur à ton assiette",
    subtitle: "12M œufs/an • 500 tonnes viande • Agriculture durable",
    link: "/revi"
  },
  {
    id: 7,
    image: heroRbaCampus,
    imageDescription: "Campus RBA moderne à Ouagadougou. Bâtiment principal en architecture contemporaine (verre et béton clair), pelouses vertes entretenues, palmiers, allées pavées. Étudiants burkinabè (mix hommes/femmes, 18-25 ans) en tenue décontractée marchant avec sacs à dos.",
    entity: "RBA",
    entityColor: "#2E5A9C",
    title: "RBA - Former les leaders africains de demain",
    subtitle: "BTS • Licences • Masters • Formations pros",
    link: "/rba"
  },
  {
    id: 8,
    image: heroRbaClassroom,
    imageDescription: "Salle de classe RBA high-tech avec 25 étudiants burkinabè attentifs (diversité hommes/femmes) devant ordinateurs portables. Professeur burkinabè en chemise élégante expliquant concept au tableau interactif digital. Salle climatisée lumineuse, tables modulables.",
    entity: "RBA",
    entityColor: "#2E5A9C",
    title: "RBA - Pédagogie d'excellence",
    subtitle: "3 500+ alumni • 87% taux d'insertion • Partenariat Université",
    link: "/rba"
  },
  {
    id: 9,
    image: heroGroupInnovation,
    imageDescription: "Rishom Innovation Lab : open space moderne avec jeunes ingénieurs burkinabè (4 personnes, mix hommes/femmes) travaillant sur prototypes technologiques. Écrans multiples affichant code et designs 3D. Tableaux blancs couverts de schémas et post-its colorés.",
    entity: "GROUPE",
    entityColor: "#8B1538",
    title: "Innovation au cœur de notre ADN",
    subtitle: "500M FCFA investis en R&D • 12 chercheurs • 8 projets actifs",
    link: "/innovation"
  },
  {
    id: 10,
    image: heroGroupTeam,
    imageDescription: "Photo de groupe corporate : 20 employés du Groupe Rishom (mix managers et opérationnels, toutes entités) debout devant siège social moderne. Diversité ethnique burkinabè (Mossi, Peul, Gourmantché, etc.), équilibre hommes/femmes, tenues professionnelles élégantes.",
    entity: "GROUPE",
    entityColor: "#8B1538",
    title: "1 800 collaborateurs, 1 vision commune",
    subtitle: "Bâtir l'Afrique de demain ensemble",
    link: "/a-propos"
  },
  {
    id: 11,
    image: heroGroupCommunity,
    imageDescription: "Action RSE Rishom : équipe de volontaires Rishom (10 personnes en t-shirts verts logo Groupe) plantant arbres avec villageois burkinabè (femmes, hommes, enfants) dans village rural. Jeunes plants d'arbres alignés, arrosoirs, bêches. Sourires, entraide.",
    entity: "GROUPE",
    entityColor: "#058B5E",
    title: "Développement durable & Impact communautaire",
    subtitle: "50 000 arbres plantés • 5 000 bénéficiaires • Label RSE 2024",
    link: "/developpement-durable"
  },
  {
    id: 12,
    image: heroGroupInfrastructure,
    imageDescription: "Vue aérienne spectaculaire par drone : complexe industriel Groupe Rishom à Ouagadougou. Plusieurs bâtiments modernes (entrepôts RBF, usine REV'I, campus RBA, bureaux RIC) organisés autour d'espaces verts. Panneaux solaires sur tous les toits.",
    entity: "GROUPE",
    entityColor: "#B8956A",
    title: "18 Milliards FCFA de CA en 2024",
    subtitle: "4 entités • 6 pays • 450+ entreprises clientes",
    link: "/investisseurs"
  },
  {
    id: 13,
    image: heroRbfEquipment,
    imageDescription: "Parc d'engins RBF impressionnant : 5 machines de chantier alignées (bulldozer, pelleteuse, rouleau compresseur, grue mobile, chargeuse) toutes jaunes flambant neuves avec logo RBF. Opérateurs burkinabè fiers debout devant leurs machines en tenue sécurité orange.",
    entity: "RBF",
    entityColor: "#C74634",
    title: "RBF Location - Flotte moderne de 80+ engins",
    subtitle: "Disponibilité immédiate • Opérateurs qualifiés",
    link: "/rbf/location-engins"
  },
  {
    id: 14,
    image: heroRicData,
    imageDescription: "Analyste RIC burkinabè (femme, 30 ans, lunettes, tenue professionnelle) devant double écran affichant dashboards colorés avec graphiques et KPIs d'entreprise. Bureau moderne épuré, plante verte, tasse de café. Concentration intense.",
    entity: "RIC",
    entityColor: "#8B1538",
    title: "RIC Data Analytics - Décisions éclairées par la donnée",
    subtitle: "Prédictions • Tableaux de bord • Insights business",
    link: "/ric/services"
  },
  {
    id: 15,
    image: heroReviProcessing,
    imageDescription: "Unité de transformation REV'I : chaîne de production moderne où employées burkinabè (5 femmes en blouses blanches, charlottes) conditionnent purée de tomate dans boîtes de conserve. Équipements inox étincelants, contrôle qualité strict.",
    entity: "REV'I",
    entityColor: "#058B5E",
    title: "REV'I Industries - De la ferme à votre cuisine",
    subtitle: "5 tonnes transformées/jour • Certification ISO 22000",
    link: "/revi/transformation"
  },
  {
    id: 16,
    image: heroReviMarket,
    imageDescription: "Boutique REV'I Market moderne et accueillante : rayons bien fournis avec produits REV'I (riz, œufs, légumes frais, purées de tomate, confitures). Cliente burkinabè élégante choisissant produits, vendeuse souriante en tablier vert logo REV'I conseillant.",
    entity: "REV'I",
    entityColor: "#058B5E",
    title: "REV'I Market - 4 boutiques à Ouaga & Bobo",
    subtitle: "Produits 100% burkinabè • Frais & traçables",
    link: "/revi/distribution"
  },
  {
    id: 17,
    image: heroRbaComputerLab,
    imageDescription: "Salle informatique RBA dernier cri : 30 postes iMac alignés où étudiants burkinabè (mix hommes/femmes) codent ou créent designs graphiques. Écrans multiples, clavier/souris sans fil. Superviseur circulant entre rangs. Salle climatisée.",
    entity: "RBA",
    entityColor: "#2E5A9C",
    title: "RBA - Formation aux métiers du digital",
    subtitle: "Marketing digital • Data • Développement web",
    link: "/rba/formations-diplomantes"
  },
  {
    id: 18,
    image: heroRbaGraduation,
    imageDescription: "Cérémonie de remise de diplômes RBA : 50 diplômés burkinabè en toge noire et toque, tenant diplômes, souriant fièrement. Familles applaudissant. Scène avec bannière RBA, podium, fleurs. Grande salle moderne décorée. Émotion, fierté, accomplissement.",
    entity: "RBA",
    entityColor: "#2E5A9C",
    title: "RBA - 3 500+ alumni qui réussissent",
    subtitle: "87% emploi dans les 6 mois • Réseau solide",
    link: "/rba/temoignages"
  },
  {
    id: 19,
    image: heroGroupFuture,
    imageDescription: "Montage artistique moderne : jeune entrepreneur burkinabè (25 ans, costume élégant) tenant tablette affichant projections holographiques futuristes (graphiques 3D, carte CEDEAO interactive, innovations). Fond de Ouagadougou moderne avec buildings, ciel crépusculaire.",
    entity: "GROUPE",
    entityColor: "#8B1538",
    title: "Groupe Rishom - Vision 2030",
    subtitle: "25 Mds FCFA CA • 10 pays CEDEAO • Leader régional",
    link: "/histoire"
  },
  {
    id: 20,
    image: heroGroupCelebration,
    imageDescription: "Moment festif corporate : équipe multiculturelle Groupe Rishom (30 personnes) levant mains en l'air en célébration dans open space moderne décoré (ballons, bannières succès). Diversité ethnique, générations, postes. Joie collective, confettis, trophée au centre.",
    entity: "GROUPE",
    entityColor: "#B8956A",
    title: "Rejoins une aventure humaine exceptionnelle",
    subtitle: "Groupe Rishom recrute des talents • Candidature spontanée",
    link: "/carrieres"
  }
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0
  })
};

export default function HeroSection() {
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback((newDirection: number) => {
    setCurrentIndex(([prev]) => {
      let next = prev + newDirection;
      if (next >= carouselSlides.length) next = 0;
      if (next < 0) next = carouselSlides.length - 1;
      return [next, newDirection];
    });
  }, []);

  const goToSlide = (index: number) => {
    const newDirection = index > currentIndex ? 1 : -1;
    setCurrentIndex([index, newDirection]);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, paginate]);

  const currentSlide = carouselSlides[currentIndex];

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-[#3A3A3C]">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", duration: 0.4, ease: "easeOut" },
            opacity: { duration: 0.4 }
          }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] ease-out hover:scale-105"
            style={{ backgroundImage: `url(${currentSlide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div 
            className="absolute inset-0 opacity-30"
            style={{ 
              background: `linear-gradient(135deg, ${currentSlide.entityColor}40 0%, transparent 50%)`
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="mb-6">
              <img 
                src={entityLogos[currentSlide.entity]} 
                alt={currentSlide.entity}
                className="h-48 md:h-60 w-auto mx-auto"
              />
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
              style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}
            >
              {currentSlide.title}
            </h1>

            <p
              className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-10"
              style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}
            >
              {currentSlide.subtitle}
            </p>

            <div>
              <Link href={currentSlide.link}>
                <Button
                  size="lg"
                  className="text-white font-semibold text-lg px-8 py-6 rounded-full group"
                  style={{ backgroundColor: currentSlide.entityColor }}
                  data-testid={`hero-cta-${currentSlide.id}`}
                >
                  EN SAVOIR PLUS
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
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
          {carouselSlides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`relative h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8" : "w-2"
              }`}
              style={{
                backgroundColor: index === currentIndex ? slide.entityColor : "rgba(255,255,255,0.4)"
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
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-20 text-white/60 text-sm font-medium">
        {String(currentIndex + 1).padStart(2, "0")} / {String(carouselSlides.length).padStart(2, "0")}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </section>
  );
}
