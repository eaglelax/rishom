/**
 * Script de migration du contenu statique vers la base de données
 * Exécuter une seule fois avec: npx tsx scripts/migrate-content.ts
 */

import "dotenv/config";
import { db } from "../server/db";
import * as schema from "../shared/schema";
import crypto from "crypto";

// Fonction pour générer un UUID
const uuid = () => crypto.randomUUID();

// ============================================
// DONNÉES DU CAROUSEL (20 slides)
// ============================================
const carouselSlides = [
  {
    id: uuid(),
    title: "RBF - Leader du BTP au Burkina Faso",
    subtitle: "Matériaux de qualité • Location d'engins • Service premium",
    imageUrl: "/images/rbf/rbf-hero-1.jpg",
    imageAltText: "Chantier RBF avec engins de construction",
    linkUrl: "/rbf",
    ctaText: "Découvrir RBF",
    colorCode: "#C74634",
    isActive: true,
    displayOrder: 0,
  },
  {
    id: uuid(),
    title: "RBF - Équipements de pointe",
    subtitle: "La plus large gamme d'équipements BTP en Afrique de l'Ouest",
    imageUrl: "/images/rbf/rbf-hero-2.jpg",
    imageAltText: "Showroom équipements RBF",
    linkUrl: "/rbf/equipements",
    ctaText: "Voir nos équipements",
    colorCode: "#C74634",
    isActive: true,
    displayOrder: 1,
  },
  {
    id: uuid(),
    title: "RBF - Service après-vente",
    subtitle: "Maintenance • Réparation • Formation",
    imageUrl: "/images/rbf/rbf-hero-3.jpg",
    imageAltText: "Atelier maintenance RBF",
    linkUrl: "/rbf/services",
    ctaText: "Nos services",
    colorCode: "#C74634",
    isActive: true,
    displayOrder: 2,
  },
  {
    id: uuid(),
    title: "RBF - Location d'engins",
    subtitle: "Engins de chantier disponibles immédiatement",
    imageUrl: "/images/rbf/rbf-hero-4.jpg",
    imageAltText: "Flotte d'engins RBF",
    linkUrl: "/rbf/location",
    ctaText: "Louer un engin",
    colorCode: "#C74634",
    isActive: true,
    displayOrder: 3,
  },
  {
    id: uuid(),
    title: "RIC - Accélérateur de croissance",
    subtitle: "Audit • Stratégie • Accompagnement projets",
    imageUrl: "/images/ric/ric-hero-1.jpg",
    imageAltText: "Équipe conseil RIC",
    linkUrl: "/ric",
    ctaText: "Découvrir RIC",
    colorCode: "#8B1538",
    isActive: true,
    displayOrder: 4,
  },
  {
    id: uuid(),
    title: "RIC - Conseil en stratégie",
    subtitle: "Des experts pour transformer votre entreprise",
    imageUrl: "/images/ric/ric-hero-2.jpg",
    imageAltText: "Réunion stratégique RIC",
    linkUrl: "/ric/services",
    ctaText: "Nos expertises",
    colorCode: "#8B1538",
    isActive: true,
    displayOrder: 5,
  },
  {
    id: uuid(),
    title: "RIC - Levée de fonds",
    subtitle: "Accompagnement investissement • Due diligence",
    imageUrl: "/images/ric/ric-hero-3.jpg",
    imageAltText: "Meeting investisseurs RIC",
    linkUrl: "/ric/investissement",
    ctaText: "En savoir plus",
    colorCode: "#8B1538",
    isActive: true,
    displayOrder: 6,
  },
  {
    id: uuid(),
    title: "RIC - Études de faisabilité",
    subtitle: "Analyse de marché • Business plan • Projections",
    imageUrl: "/images/ric/ric-hero-4.jpg",
    imageAltText: "Analyse de données RIC",
    linkUrl: "/ric/etudes",
    ctaText: "Demander une étude",
    colorCode: "#8B1538",
    isActive: true,
    displayOrder: 7,
  },
  {
    id: uuid(),
    title: "REV'I - L'agriculture burkinabè réinventée",
    subtitle: "Production locale • Qualité premium • Circuit court",
    imageUrl: "/images/revi/revi-hero-1.jpg",
    imageAltText: "Champs agricoles REV'I",
    linkUrl: "/revi",
    ctaText: "Découvrir REV'I",
    colorCode: "#058B5E",
    isActive: true,
    displayOrder: 8,
  },
  {
    id: uuid(),
    title: "REV'I - Élevage moderne",
    subtitle: "Bovin • Aviculture • Production laitière",
    imageUrl: "/images/revi/revi-hero-2.jpg",
    imageAltText: "Ferme d'élevage REV'I",
    linkUrl: "/revi/elevage",
    ctaText: "Nos productions",
    colorCode: "#058B5E",
    isActive: true,
    displayOrder: 9,
  },
  {
    id: uuid(),
    title: "REV'I - Transformation agricole",
    subtitle: "Usine aux normes internationales",
    imageUrl: "/images/revi/revi-hero-3.jpg",
    imageAltText: "Usine de transformation REV'I",
    linkUrl: "/revi/transformation",
    ctaText: "Notre usine",
    colorCode: "#058B5E",
    isActive: true,
    displayOrder: 10,
  },
  {
    id: uuid(),
    title: "REV'I - Partenariat producteurs",
    subtitle: "Accompagnement de 1200+ producteurs locaux",
    imageUrl: "/images/revi/revi-hero-4.jpg",
    imageAltText: "Producteurs partenaires REV'I",
    linkUrl: "/revi/partenaires",
    ctaText: "Devenir partenaire",
    colorCode: "#058B5E",
    isActive: true,
    displayOrder: 11,
  },
  {
    id: uuid(),
    title: "RBA - Former les leaders africains de demain",
    subtitle: "BTS • Licences • Masters • Formations pros",
    imageUrl: "/images/rba/rba-hero-1.jpg",
    imageAltText: "Campus RBA",
    linkUrl: "/rba",
    ctaText: "Découvrir RBA",
    colorCode: "#2E5A9C",
    isActive: true,
    displayOrder: 12,
  },
  {
    id: uuid(),
    title: "RBA - Excellence académique",
    subtitle: "Programmes certifiés • Formateurs experts",
    imageUrl: "/images/rba/rba-hero-2.jpg",
    imageAltText: "Salle de classe RBA",
    linkUrl: "/rba/programmes",
    ctaText: "Nos programmes",
    colorCode: "#2E5A9C",
    isActive: true,
    displayOrder: 13,
  },
  {
    id: uuid(),
    title: "RBA - Insertion professionnelle",
    subtitle: "87% de taux d'insertion • 450+ entreprises partenaires",
    imageUrl: "/images/rba/rba-hero-3.jpg",
    imageAltText: "Cérémonie de remise des diplômes RBA",
    linkUrl: "/rba/insertion",
    ctaText: "Nos résultats",
    colorCode: "#2E5A9C",
    isActive: true,
    displayOrder: 14,
  },
  {
    id: uuid(),
    title: "RBA - Formation continue",
    subtitle: "Développez vos compétences tout au long de votre carrière",
    imageUrl: "/images/rba/rba-hero-4.jpg",
    imageAltText: "Formation professionnelle RBA",
    linkUrl: "/rba/formation-continue",
    ctaText: "Se former",
    colorCode: "#2E5A9C",
    isActive: true,
    displayOrder: 15,
  },
  {
    id: uuid(),
    title: "Groupe Rishom - Vision 2030",
    subtitle: "25 Mds FCFA CA • 10 pays CEDEAO • Leader régional",
    imageUrl: "/images/groupe/groupe-hero-1.jpg",
    imageAltText: "Siège du Groupe Rishom",
    linkUrl: "/a-propos",
    ctaText: "Notre vision",
    colorCode: "#8B1538",
    isActive: true,
    displayOrder: 16,
  },
  {
    id: uuid(),
    title: "Groupe Rishom - 15 ans d'excellence",
    subtitle: "Depuis 2008, nous bâtissons l'Afrique de demain",
    imageUrl: "/images/groupe/groupe-hero-2.jpg",
    imageAltText: "Histoire du Groupe Rishom",
    linkUrl: "/a-propos/histoire",
    ctaText: "Notre histoire",
    colorCode: "#8B1538",
    isActive: true,
    displayOrder: 17,
  },
  {
    id: uuid(),
    title: "Groupe Rishom - Nos engagements RSE",
    subtitle: "Développement durable • Impact social • Environnement",
    imageUrl: "/images/groupe/groupe-hero-3.jpg",
    imageAltText: "Actions RSE Groupe Rishom",
    linkUrl: "/a-propos/rse",
    ctaText: "Nos engagements",
    colorCode: "#8B1538",
    isActive: true,
    displayOrder: 18,
  },
  {
    id: uuid(),
    title: "Groupe Rishom - Rejoignez-nous",
    subtitle: "500+ collaborateurs • Opportunités de carrière",
    imageUrl: "/images/groupe/groupe-hero-4.jpg",
    imageAltText: "Équipe Groupe Rishom",
    linkUrl: "/carrieres",
    ctaText: "Voir les offres",
    colorCode: "#8B1538",
    isActive: true,
    displayOrder: 19,
  },
];

// ============================================
// ÉQUIPE DIRIGEANTE
// ============================================
const leadershipTeam = [
  {
    id: uuid(),
    fullName: "Amadou TRAORE",
    position: "Président Directeur Général",
    entityId: null, // Groupe
    photoUrl: "/images/team/amadou-traore.jpg",
    bio: "Visionnaire et entrepreneur, Amadou a fondé le Groupe Rishom avec la mission de contribuer au développement économique de l'Afrique. Fort de 25 ans d'expérience dans les affaires, il a su bâtir un groupe diversifié et performant.",
    linkedinUrl: "https://linkedin.com/in/amadou-traore",
    email: "a.traore@rishom.com",
    displayOrder: 0,
    isActive: true,
  },
  {
    id: uuid(),
    fullName: "Fatima OUEDRAOGO",
    position: "Directrice Générale Adjointe",
    entityId: null,
    photoUrl: "/images/team/fatima-ouedraogo.jpg",
    bio: "Expert en stratégie et finance, Fatima pilote le développement stratégique du groupe et supervise les opérations des entités. Elle cumule 20 ans d'expérience en conseil et direction d'entreprise.",
    linkedinUrl: "https://linkedin.com/in/fatima-ouedraogo",
    email: "f.ouedraogo@rishom.com",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: uuid(),
    fullName: "Ibrahim KONE",
    position: "Directeur des Opérations",
    entityId: null,
    photoUrl: "/images/team/ibrahim-kone.jpg",
    bio: "Fort de 20 ans d'expérience dans le BTP et l'industrie, Ibrahim assure l'excellence opérationnelle de nos projets. Il supervise les activités de RBF et coordonne les grands chantiers du groupe.",
    linkedinUrl: "https://linkedin.com/in/ibrahim-kone",
    email: "i.kone@rishom.com",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: uuid(),
    fullName: "Aissata SANKARA",
    position: "Directrice des Ressources Humaines",
    entityId: null,
    photoUrl: "/images/team/aissata-sankara.jpg",
    bio: "Passionnée par le développement des talents, Aissata coordonne la politique RH du groupe et la formation de nos équipes. Elle œuvre pour faire de Rishom un employeur de référence en Afrique de l'Ouest.",
    linkedinUrl: "https://linkedin.com/in/aissata-sankara",
    email: "a.sankara@rishom.com",
    displayOrder: 3,
    isActive: true,
  },
];

// ============================================
// TÉMOIGNAGES
// ============================================
const testimonials = [
  // Témoignages RBF
  {
    id: uuid(),
    authorName: "Abdoulaye Ouédraogo",
    authorPosition: "Directeur Général",
    authorCompany: "SCEB Construction",
    authorPhotoUrl: "/images/testimonials/abdoulaye-ouedraogo.jpg",
    content: "Nous travaillons avec RBF depuis 5 ans maintenant. Leur qualité de service et la disponibilité des équipements nous permettent de respecter nos délais de chantier. Un partenaire de confiance.",
    rating: 5,
    displayOrder: 0,
    isActive: true,
  },
  {
    id: uuid(),
    authorName: "Marie-Claire Kaboré",
    authorPosition: "Présidente",
    authorCompany: "BTP Kaboré & Fils",
    authorPhotoUrl: "/images/testimonials/marie-claire-kabore.jpg",
    content: "RBF nous a accompagnés sur notre plus gros projet d'infrastructure. Leur expertise technique et leur réactivité ont été déterminantes pour la réussite du chantier.",
    rating: 5,
    displayOrder: 1,
    isActive: true,
  },
  // Témoignages RIC
  {
    id: uuid(),
    authorName: "Aminata Touré",
    authorPosition: "CEO",
    authorCompany: "AgroTech Innovations SA",
    authorPhotoUrl: "/images/testimonials/aminata-toure.jpg",
    content: "L'audit stratégique réalisé par RIC a transformé notre entreprise. Leur méthodologie rigoureuse et leurs recommandations pertinentes nous ont permis de doubler notre chiffre d'affaires en 18 mois.",
    rating: 5,
    displayOrder: 2,
    isActive: true,
  },
  {
    id: uuid(),
    authorName: "Moussa Diallo",
    authorPosition: "Directeur Financier",
    authorCompany: "Groupe Sahel Industries",
    authorPhotoUrl: "/images/testimonials/moussa-diallo.jpg",
    content: "RIC nous a accompagnés dans notre levée de fonds de 2 milliards FCFA. Leur connaissance du marché et leur réseau d'investisseurs ont été des atouts majeurs.",
    rating: 5,
    displayOrder: 3,
    isActive: true,
  },
  // Témoignages REV'I
  {
    id: uuid(),
    authorName: "Boureima Ouédraogo",
    authorPosition: "Producteur de riz",
    authorCompany: "Coopérative de Bama",
    authorPhotoUrl: "/images/testimonials/boureima-ouedraogo.jpg",
    content: "Grâce au contrat de production avec REV'I, mes rendements ont augmenté de 67% et mes revenus ont doublé. L'accompagnement technique et l'accès aux intrants de qualité font toute la différence.",
    rating: 5,
    displayOrder: 4,
    isActive: true,
  },
  {
    id: uuid(),
    authorName: "Salimata Compaoré",
    authorPosition: "Présidente",
    authorCompany: "Groupement Femmes de Koudougou",
    authorPhotoUrl: "/images/testimonials/salimata-compaore.jpg",
    content: "REV'I a changé la vie de notre groupement. Nous avons maintenant un débouché garanti pour notre production de légumes et un accès au crédit agricole.",
    rating: 5,
    displayOrder: 5,
    isActive: true,
  },
  // Témoignages RBA
  {
    id: uuid(),
    authorName: "Aminata Koné",
    authorPosition: "Directrice des Opérations",
    authorCompany: "Startup Fintech Ouaga",
    authorPhotoUrl: "/images/testimonials/aminata-kone.jpg",
    content: "Mon Master en Management à RBA a été un tournant dans ma carrière. Je suis passée d'assistante administrative à directrice en 2 ans. La formation est vraiment orientée vers l'employabilité.",
    rating: 5,
    displayOrder: 6,
    isActive: true,
  },
  {
    id: uuid(),
    authorName: "Souleymane Traoré",
    authorPosition: "Chef de chantier",
    authorCompany: "Entreprise Bâtiment Plus",
    authorPhotoUrl: "/images/testimonials/souleymane-traore.jpg",
    content: "La formation Métiers du BTP de RBA m'a ouvert les portes de l'emploi. En 6 mois, j'ai acquis des compétences pratiques qui m'ont permis de décrocher mon CDI dès la fin de la formation.",
    rating: 5,
    displayOrder: 7,
    isActive: true,
  },
];

// ============================================
// ACTUALITÉS
// ============================================
const newsArticles = [
  {
    id: uuid(),
    title: "Lancement de notre nouvelle usine de transformation agricole",
    slug: "lancement-usine-transformation-agricole",
    excerpt: "REV'I inaugure une unité de transformation moderne qui permettra de valoriser la production de 1500 agriculteurs partenaires.",
    content: `
      <p>Le Groupe Rishom, à travers sa filiale REV'I, vient d'inaugurer une nouvelle usine de transformation agricole à Koudougou. Cette infrastructure moderne représente un investissement de 3 milliards de FCFA.</p>

      <h3>Une capacité de production ambitieuse</h3>
      <p>L'usine dispose d'une capacité de transformation de 50 tonnes par jour, permettant de traiter les productions de céréales, fruits et légumes de la région. Elle est équipée des dernières technologies de conservation et de conditionnement.</p>

      <h3>Impact sur l'économie locale</h3>
      <p>Ce projet va créer 150 emplois directs et bénéficier à plus de 1500 producteurs partenaires. Il s'inscrit dans notre stratégie de valorisation des productions locales et de réduction des importations.</p>

      <blockquote>"Cette usine est une étape majeure dans notre mission de révolutionner l'agriculture burkinabè. Elle permettra à nos producteurs partenaires d'accéder à de nouveaux marchés et d'augmenter significativement leurs revenus."</blockquote>

      <p>La cérémonie d'inauguration s'est déroulée en présence du Ministre de l'Agriculture et de nombreux partenaires institutionnels.</p>
    `,
    featuredImageUrl: "/images/news/usine-revi.jpg",
    categoryId: null,
    authorName: "Service Communication",
    isPublished: true,
    publishedAt: new Date("2025-12-15"),
    viewCount: 245,
  },
  {
    id: uuid(),
    title: "Partenariat stratégique avec des investisseurs européens",
    slug: "partenariat-investisseurs-europeens",
    excerpt: "RIC accompagne une levée de fonds majeure pour le développement des PME ouest-africaines.",
    content: `
      <p>Rishom Investment & Consulting (RIC) vient de conclure un partenariat stratégique avec un consortium d'investisseurs européens pour le financement de PME africaines.</p>

      <h3>Un fonds de 10 milliards FCFA</h3>
      <p>Ce partenariat met à disposition un fonds d'investissement de 10 milliards FCFA destiné aux PME à fort potentiel de croissance dans la zone UEMOA.</p>

      <h3>Accompagnement sur-mesure</h3>
      <p>RIC assurera l'identification des entreprises cibles, la due diligence et l'accompagnement post-investissement. Notre expertise locale combinée au réseau international de nos partenaires offre une proposition de valeur unique.</p>

      <p>Les secteurs prioritaires sont l'agroalimentaire, les technologies, les services financiers et l'industrie.</p>
    `,
    featuredImageUrl: "/images/news/partenariat-ric.jpg",
    categoryId: null,
    authorName: "Direction RIC",
    isPublished: true,
    publishedAt: new Date("2025-12-10"),
    viewCount: 189,
  },
  {
    id: uuid(),
    title: "Formation de 200 jeunes aux métiers du BTP",
    slug: "formation-200-jeunes-btp",
    excerpt: "RBA lance un programme de formation professionnelle en partenariat avec les entreprises du secteur.",
    content: `
      <p>Rishom Business Academy (RBA) vient de lancer un programme ambitieux de formation aux métiers du BTP en partenariat avec les principales entreprises du secteur.</p>

      <h3>Un programme adapté au marché</h3>
      <p>200 jeunes bénéficieront d'une formation pratique de 6 à 12 mois dans les métiers de la construction : maçonnerie, électricité, plomberie, menuiserie et conduite d'engins.</p>

      <h3>Insertion professionnelle garantie</h3>
      <p>Grâce à notre réseau de 450 entreprises partenaires, 80% des diplômés trouvent un emploi dans les 3 mois suivant leur formation. RBF s'est engagé à recruter 50 diplômés du programme.</p>

      <p>Les inscriptions sont ouvertes jusqu'au 15 janvier 2026.</p>
    `,
    featuredImageUrl: "/images/news/formation-btp.jpg",
    categoryId: null,
    authorName: "Direction RBA",
    isPublished: true,
    publishedAt: new Date("2025-12-05"),
    viewCount: 312,
  },
  {
    id: uuid(),
    title: "Livraison du projet d'infrastructure routière à Ouagadougou",
    slug: "livraison-infrastructure-ouagadougou",
    excerpt: "RBF achève un projet majeur de voirie dans la capitale burkinabè.",
    content: `
      <p>Rishom BTP & Fournitures (RBF) vient d'achever la réhabilitation de 15 km de voirie dans le quartier de Ouaga 2000, un projet d'envergure qui améliore considérablement la mobilité urbaine.</p>

      <h3>Un chantier exemplaire</h3>
      <p>Réalisé en 18 mois, ce projet a mobilisé plus de 200 ouvriers et techniciens. Il comprend la construction de routes bitumées, l'installation de l'éclairage public et l'aménagement de trottoirs.</p>

      <h3>Impact sur la communauté</h3>
      <p>Cette infrastructure bénéficie à plus de 50 000 habitants et facilite l'accès aux services publics, écoles et centres de santé du quartier.</p>

      <p>Le Maire de Ouagadougou a salué la qualité des travaux et le respect des délais.</p>
    `,
    featuredImageUrl: "/images/news/voirie-ouaga.jpg",
    categoryId: null,
    authorName: "Service Communication",
    isPublished: true,
    publishedAt: new Date("2025-12-01"),
    viewCount: 178,
  },
];

// ============================================
// OFFRES D'EMPLOI
// ============================================
const jobOffers = [
  {
    id: uuid(),
    title: "Ingénieur BTP Senior",
    entityId: null, // À lier avec RBF
    location: "Ouagadougou",
    contractType: "CDI",
    department: "Technique",
    description: `
      <h3>À propos du poste</h3>
      <p>Nous recherchons un Ingénieur BTP Senior pour piloter nos projets d'infrastructure les plus ambitieux.</p>

      <h3>Responsabilités</h3>
      <ul>
        <li>Supervision technique des chantiers</li>
        <li>Gestion des équipes de terrain</li>
        <li>Suivi budgétaire et planning</li>
        <li>Relations avec les clients et partenaires</li>
      </ul>

      <h3>Profil recherché</h3>
      <ul>
        <li>Bac+5 en Génie Civil ou équivalent</li>
        <li>Minimum 8 ans d'expérience</li>
        <li>Maîtrise des logiciels de CAO/DAO</li>
        <li>Leadership et sens de l'organisation</li>
      </ul>
    `,
    requirements: "Bac+5 Génie Civil, 8 ans d'expérience minimum",
    salaryRange: "1 500 000 - 2 500 000 FCFA",
    isRemote: false,
    isPublished: true,
    publishedAt: new Date("2025-12-20"),
    expiresAt: new Date("2026-01-31"),
    applicationCount: 15,
  },
  {
    id: uuid(),
    title: "Consultant en Stratégie",
    entityId: null, // À lier avec RIC
    location: "Ouagadougou",
    contractType: "CDI",
    department: "Conseil",
    description: `
      <h3>À propos du poste</h3>
      <p>Rejoignez notre équipe de consultants pour accompagner les entreprises africaines dans leur transformation.</p>

      <h3>Responsabilités</h3>
      <ul>
        <li>Réalisation d'audits stratégiques</li>
        <li>Élaboration de plans de développement</li>
        <li>Accompagnement à la levée de fonds</li>
        <li>Formation des équipes clients</li>
      </ul>

      <h3>Profil recherché</h3>
      <ul>
        <li>Bac+5 en Management/Finance</li>
        <li>3-5 ans d'expérience en conseil</li>
        <li>Excellentes capacités analytiques</li>
        <li>Anglais courant</li>
      </ul>
    `,
    requirements: "Bac+5 Management/Finance, 3-5 ans en conseil",
    salaryRange: "1 200 000 - 2 000 000 FCFA",
    isRemote: false,
    isPublished: true,
    publishedAt: new Date("2025-12-17"),
    expiresAt: new Date("2026-01-31"),
    applicationCount: 23,
  },
  {
    id: uuid(),
    title: "Responsable Production Agricole",
    entityId: null, // À lier avec REV'I
    location: "Koudougou",
    contractType: "CDI",
    department: "Production",
    description: `
      <h3>À propos du poste</h3>
      <p>Pilotez la production agricole de REV'I et accompagnez nos producteurs partenaires.</p>

      <h3>Responsabilités</h3>
      <ul>
        <li>Supervision des exploitations</li>
        <li>Accompagnement des producteurs partenaires</li>
        <li>Gestion de la qualité</li>
        <li>Planification des campagnes agricoles</li>
      </ul>

      <h3>Profil recherché</h3>
      <ul>
        <li>Ingénieur agronome ou équivalent</li>
        <li>5 ans d'expérience en production agricole</li>
        <li>Connaissance des cultures locales</li>
        <li>Capacité à travailler en milieu rural</li>
      </ul>
    `,
    requirements: "Ingénieur agronome, 5 ans d'expérience",
    salaryRange: "1 000 000 - 1 500 000 FCFA",
    isRemote: false,
    isPublished: true,
    publishedAt: new Date("2025-12-15"),
    expiresAt: new Date("2026-01-31"),
    applicationCount: 8,
  },
  {
    id: uuid(),
    title: "Formateur Métiers du BTP",
    entityId: null, // À lier avec RBA
    location: "Bobo-Dioulasso",
    contractType: "CDD",
    department: "Formation",
    description: `
      <h3>À propos du poste</h3>
      <p>Formez la nouvelle génération de professionnels du BTP au sein de notre académie.</p>

      <h3>Responsabilités</h3>
      <ul>
        <li>Animation des modules de formation</li>
        <li>Suivi pédagogique des apprenants</li>
        <li>Évaluation des compétences</li>
        <li>Développement de supports de cours</li>
      </ul>

      <h3>Profil recherché</h3>
      <ul>
        <li>Diplôme technique BTP (Bac+2 minimum)</li>
        <li>10 ans d'expérience terrain</li>
        <li>Aptitude à la transmission</li>
        <li>Patience et pédagogie</li>
      </ul>
    `,
    requirements: "Bac+2 technique BTP, 10 ans d'expérience",
    salaryRange: "800 000 - 1 200 000 FCFA",
    isRemote: false,
    isPublished: true,
    publishedAt: new Date("2025-12-19"),
    expiresAt: new Date("2026-02-28"),
    applicationCount: 12,
  },
  {
    id: uuid(),
    title: "Chef de Projet Infrastructure",
    entityId: null, // À lier avec RBF
    location: "Ouagadougou",
    contractType: "CDI",
    department: "Projet",
    description: `
      <h3>À propos du poste</h3>
      <p>Prenez en charge la gestion de nos projets d'infrastructure de A à Z.</p>

      <h3>Responsabilités</h3>
      <ul>
        <li>Planification et coordination des projets</li>
        <li>Gestion des ressources et budgets</li>
        <li>Interface avec les clients</li>
        <li>Reporting à la direction</li>
      </ul>
    `,
    requirements: "Bac+5 Gestion de projet, 5 ans d'expérience",
    salaryRange: "1 300 000 - 2 000 000 FCFA",
    isRemote: false,
    isPublished: true,
    publishedAt: new Date("2025-12-21"),
    expiresAt: new Date("2026-01-31"),
    applicationCount: 18,
  },
  {
    id: uuid(),
    title: "Analyste Financier",
    entityId: null, // À lier avec RIC
    location: "Ouagadougou",
    contractType: "CDI",
    department: "Finance",
    description: `
      <h3>À propos du poste</h3>
      <p>Rejoignez l'équipe finance de RIC pour analyser les opportunités d'investissement.</p>

      <h3>Responsabilités</h3>
      <ul>
        <li>Analyse financière des entreprises cibles</li>
        <li>Modélisation financière</li>
        <li>Due diligence</li>
        <li>Rédaction de mémos d'investissement</li>
      </ul>
    `,
    requirements: "Bac+5 Finance, 3 ans d'expérience",
    salaryRange: "1 000 000 - 1 600 000 FCFA",
    isRemote: false,
    isPublished: true,
    publishedAt: new Date("2025-12-18"),
    expiresAt: new Date("2026-01-31"),
    applicationCount: 27,
  },
];

// ============================================
// FAQ
// ============================================
const faqItems = [
  // Questions générales
  {
    id: uuid(),
    categoryId: null, // À lier
    question: "Qu'est-ce que le Groupe Rishom ?",
    answer: "Le Groupe Rishom est un conglomérat africain fondé en 2008, présent dans plusieurs secteurs d'activité : BTP et fournitures (RBF), conseil et investissement (RIC), agro-business (REV'I) et formation (RBA). Nous employons plus de 500 collaborateurs et opérons dans 4 pays d'Afrique de l'Ouest.",
    displayOrder: 0,
    isPublished: true,
  },
  {
    id: uuid(),
    categoryId: null,
    question: "Dans quels pays le Groupe Rishom est-il présent ?",
    answer: "Le Groupe Rishom est présent au Burkina Faso (siège social), au Mali, en Côte d'Ivoire et au Niger. Nous prévoyons d'étendre notre présence à d'autres pays de la CEDEAO d'ici 2030.",
    displayOrder: 1,
    isPublished: true,
  },
  {
    id: uuid(),
    categoryId: null,
    question: "Comment contacter le Groupe Rishom ?",
    answer: "Vous pouvez nous contacter par téléphone au +226 25 30 XX XX, par email à contact@rishom.com, ou en visitant notre siège social à Ouagadougou, Zone d'activité de Kossodo. Vous pouvez également utiliser le formulaire de contact sur notre site.",
    displayOrder: 2,
    isPublished: true,
  },
  // Carrières
  {
    id: uuid(),
    categoryId: null,
    question: "Comment postuler à une offre d'emploi ?",
    answer: "Pour postuler, rendez-vous sur notre page Carrières et consultez les offres disponibles. Cliquez sur l'offre qui vous intéresse et remplissez le formulaire de candidature en joignant votre CV et lettre de motivation.",
    displayOrder: 3,
    isPublished: true,
  },
  {
    id: uuid(),
    categoryId: null,
    question: "Proposez-vous des stages ?",
    answer: "Oui, nous accueillons régulièrement des stagiaires dans toutes nos entités. Les stages durent de 3 à 6 mois et peuvent déboucher sur une embauche. Envoyez votre candidature spontanée à rh@rishom.com.",
    displayOrder: 4,
    isPublished: true,
  },
  // Services RBF
  {
    id: uuid(),
    categoryId: null,
    question: "Quels équipements peut-on louer chez RBF ?",
    answer: "RBF propose une large gamme d'équipements en location : pelles mécaniques, bulldozers, chargeurs, grues, bétonnières, échafaudages, groupes électrogènes et bien plus. Consultez notre catalogue ou contactez notre service commercial.",
    displayOrder: 5,
    isPublished: true,
  },
  // Services RIC
  {
    id: uuid(),
    categoryId: null,
    question: "Comment bénéficier d'un accompagnement RIC ?",
    answer: "Pour bénéficier de nos services de conseil, contactez-nous pour un premier rendez-vous gratuit. Nous évaluerons vos besoins et vous proposerons un accompagnement sur-mesure : audit, stratégie, levée de fonds ou transformation.",
    displayOrder: 6,
    isPublished: true,
  },
  // Services REV'I
  {
    id: uuid(),
    categoryId: null,
    question: "Comment devenir producteur partenaire de REV'I ?",
    answer: "Les producteurs souhaitant rejoindre notre réseau peuvent s'inscrire via notre formulaire en ligne ou contacter notre équipe terrain. Nous proposons des contrats de production, un accompagnement technique et un accès aux intrants de qualité.",
    displayOrder: 7,
    isPublished: true,
  },
  // Services RBA
  {
    id: uuid(),
    categoryId: null,
    question: "Comment s'inscrire aux formations RBA ?",
    answer: "Les inscriptions se font en ligne sur notre site ou directement dans nos centres de formation à Ouagadougou et Bobo-Dioulasso. Les prochaines sessions démarrent en janvier, mars et septembre.",
    displayOrder: 8,
    isPublished: true,
  },
];

// ============================================
// TIMELINE / HISTOIRE
// ============================================
const timelineMilestones = [
  {
    id: uuid(),
    year: 2008,
    title: "Création du groupe",
    description: "Amadou Traoré fonde Rishom BTP & Fournitures à Ouagadougou avec une équipe de 10 personnes et une vision claire : bâtir l'Afrique de demain.",
    imageUrl: "/images/timeline/2008-creation.jpg",
    isActive: true,
  },
  {
    id: uuid(),
    year: 2012,
    title: "Expansion régionale",
    description: "Ouverture de filiales au Mali et en Côte d'Ivoire. Le groupe compte désormais 150 employés et réalise ses premiers grands chantiers d'infrastructure.",
    imageUrl: "/images/timeline/2012-expansion.jpg",
    isActive: true,
  },
  {
    id: uuid(),
    year: 2015,
    title: "Diversification",
    description: "Création de RIC (Rishom Investment & Consulting) pour accompagner les entreprises dans leur développement stratégique et leurs projets d'investissement.",
    imageUrl: "/images/timeline/2015-ric.jpg",
    isActive: true,
  },
  {
    id: uuid(),
    year: 2018,
    title: "Innovation agricole",
    description: "Lancement de REV'I pour révolutionner l'agriculture burkinabè. Premiers contrats avec les producteurs locaux et construction de l'usine de transformation.",
    imageUrl: "/images/timeline/2018-revi.jpg",
    isActive: true,
  },
  {
    id: uuid(),
    year: 2021,
    title: "Formation & talents",
    description: "Ouverture de RBA (Rishom Business Academy) pour former les talents africains de demain. 500 étudiants inscrits dès la première année.",
    imageUrl: "/images/timeline/2021-rba.jpg",
    isActive: true,
  },
  {
    id: uuid(),
    year: 2025,
    title: "Leadership régional",
    description: "Le groupe atteint 500 collaborateurs et consolide sa position de leader dans ses secteurs d'activité. Vision 2030 : 25 milliards FCFA de CA.",
    imageUrl: "/images/timeline/2025-leadership.jpg",
    isActive: true,
  },
];

// ============================================
// PROGRAMMES RBA
// ============================================
const rbaPrograms = [
  {
    id: uuid(),
    entityId: null, // À lier avec RBA
    name: "Métiers du BTP",
    slug: "metiers-btp",
    shortDescription: "Formation pratique aux métiers de la construction : maçonnerie, électricité, plomberie, menuiserie, conduite d'engins.",
    fullDescription: "Programme complet de formation aux métiers du BTP avec stages pratiques sur nos chantiers RBF. Certification reconnue par l'État.",
    iconName: "hard-hat",
    imageUrl: "/images/programs/btp.jpg",
    displayOrder: 0,
    isActive: true,
  },
  {
    id: uuid(),
    entityId: null,
    name: "Comptabilité & Gestion",
    slug: "comptabilite-gestion",
    shortDescription: "BTS, Licence et Master en comptabilité, gestion financière et contrôle de gestion.",
    fullDescription: "Formations diplômantes en partenariat avec des universités reconnues. Stages en entreprise garantis.",
    iconName: "calculator",
    imageUrl: "/images/programs/comptabilite.jpg",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: uuid(),
    entityId: null,
    name: "Management",
    slug: "management",
    shortDescription: "Développez vos compétences en leadership, gestion d'équipe et stratégie d'entreprise.",
    fullDescription: "Programmes de formation continue et MBA pour cadres et dirigeants. Intervenants de haut niveau.",
    iconName: "users",
    imageUrl: "/images/programs/management.jpg",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: uuid(),
    entityId: null,
    name: "Informatique",
    slug: "informatique",
    shortDescription: "Développement web, réseaux, cybersécurité et data science.",
    fullDescription: "Formations aux métiers du numérique avec certification internationale. Taux d'insertion de 95%.",
    iconName: "laptop",
    imageUrl: "/images/programs/informatique.jpg",
    displayOrder: 3,
    isActive: true,
  },
  {
    id: uuid(),
    entityId: null,
    name: "Agro-business",
    slug: "agro-business",
    shortDescription: "Gestion d'exploitation agricole, transformation et commercialisation des produits agricoles.",
    fullDescription: "Formation pratique en partenariat avec REV'I. Accès à un réseau de producteurs et distributeurs.",
    iconName: "tractor",
    imageUrl: "/images/programs/agro.jpg",
    displayOrder: 4,
    isActive: true,
  },
  {
    id: uuid(),
    entityId: null,
    name: "Entrepreneuriat",
    slug: "entrepreneuriat",
    shortDescription: "Création et gestion d'entreprise, business plan, financement et développement commercial.",
    fullDescription: "Programme d'incubation avec accompagnement personnalisé. Accès au réseau RIC pour le financement.",
    iconName: "rocket",
    imageUrl: "/images/programs/entrepreneuriat.jpg",
    displayOrder: 5,
    isActive: true,
  },
];

// ============================================
// FONCTION DE MIGRATION
// ============================================
async function migrateContent() {
  console.log("🚀 Démarrage de la migration du contenu...\n");

  try {
    // 1. Migration du carousel
    console.log("📸 Migration des slides du carousel...");
    for (const slide of carouselSlides) {
      await db.insert(schema.heroCarouselSlides).values(slide).onDuplicateKeyUpdate({ set: slide });
    }
    console.log(`   ✅ ${carouselSlides.length} slides migrés\n`);

    // 2. Migration de l'équipe
    console.log("👥 Migration de l'équipe dirigeante...");
    for (const member of leadershipTeam) {
      await db.insert(schema.leadershipTeam).values(member).onDuplicateKeyUpdate({ set: member });
    }
    console.log(`   ✅ ${leadershipTeam.length} membres migrés\n`);

    // 3. Migration des témoignages
    console.log("💬 Migration des témoignages...");
    for (const testimonial of testimonials) {
      await db.insert(schema.testimonials).values(testimonial).onDuplicateKeyUpdate({ set: testimonial });
    }
    console.log(`   ✅ ${testimonials.length} témoignages migrés\n`);

    // 4. Migration des actualités
    console.log("📰 Migration des actualités...");
    for (const article of newsArticles) {
      await db.insert(schema.newsArticles).values(article).onDuplicateKeyUpdate({ set: article });
    }
    console.log(`   ✅ ${newsArticles.length} articles migrés\n`);

    // 5. Migration des offres d'emploi
    console.log("💼 Migration des offres d'emploi...");
    for (const job of jobOffers) {
      await db.insert(schema.jobOffers).values(job).onDuplicateKeyUpdate({ set: job });
    }
    console.log(`   ✅ ${jobOffers.length} offres migrées\n`);

    // 6. Migration de la FAQ
    console.log("❓ Migration de la FAQ...");
    for (const faq of faqItems) {
      await db.insert(schema.faqItems).values(faq).onDuplicateKeyUpdate({ set: faq });
    }
    console.log(`   ✅ ${faqItems.length} questions migrées\n`);

    // 7. Migration de la timeline
    console.log("📅 Migration de la timeline...");
    for (const milestone of timelineMilestones) {
      await db.insert(schema.timelineMilestones).values(milestone).onDuplicateKeyUpdate({ set: milestone });
    }
    console.log(`   ✅ ${timelineMilestones.length} jalons migrés\n`);

    // 8. Migration des programmes RBA
    console.log("🎓 Migration des programmes RBA...");
    for (const program of rbaPrograms) {
      await db.insert(schema.services).values(program).onDuplicateKeyUpdate({ set: program });
    }
    console.log(`   ✅ ${rbaPrograms.length} programmes migrés\n`);

    console.log("✅ Migration terminée avec succès !");
    console.log("\n📊 Récapitulatif:");
    console.log(`   - Slides carousel: ${carouselSlides.length}`);
    console.log(`   - Équipe dirigeante: ${leadershipTeam.length}`);
    console.log(`   - Témoignages: ${testimonials.length}`);
    console.log(`   - Actualités: ${newsArticles.length}`);
    console.log(`   - Offres d'emploi: ${jobOffers.length}`);
    console.log(`   - FAQ: ${faqItems.length}`);
    console.log(`   - Timeline: ${timelineMilestones.length}`);
    console.log(`   - Programmes: ${rbaPrograms.length}`);

  } catch (error) {
    console.error("❌ Erreur lors de la migration:", error);
    throw error;
  }

  process.exit(0);
}

// Exécution
migrateContent();
