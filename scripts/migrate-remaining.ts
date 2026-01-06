/**
 * Script de migration pour les données restantes avec les bons schémas
 * Exécuter avec: npx tsx scripts/migrate-remaining.ts
 */

import "dotenv/config";
import { db } from "../server/db";
import * as schema from "../shared/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

const uuid = () => crypto.randomUUID();

async function migrateRemaining() {
  console.log("🚀 Migration des données restantes...\n");

  try {
    // Récupérer les IDs des entités
    const entities = await db.select().from(schema.entities);
    const entityIds: Record<string, string> = {};
    for (const entity of entities) {
      entityIds[entity.code] = entity.id;
    }
    console.log("📋 Entités trouvées:", Object.keys(entityIds).join(", "));

    // ============================================
    // 1. TÉMOIGNAGES (avec le bon schéma)
    // ============================================
    console.log("\n💬 Suppression et re-création des témoignages...");
    await db.delete(schema.testimonials);

    const testimonials = [
      {
        id: uuid(),
        name: "Abdoulaye Ouédraogo",
        programOrService: "Fourniture équipements BTP",
        testimonialText: "Nous travaillons avec RBF depuis 5 ans maintenant. Leur qualité de service et la disponibilité des équipements nous permettent de respecter nos délais de chantier. Un partenaire de confiance.",
        imageUrl: "/images/testimonials/abdoulaye-ouedraogo.jpg",
        imageAltText: "Abdoulaye Ouédraogo - Directeur Général SCEB Construction",
        company: "SCEB Construction",
        entityId: entityIds.RBF,
        rating: 5,
        isFeatured: true,
        isPublished: true,
      },
      {
        id: uuid(),
        name: "Marie-Claire Kaboré",
        programOrService: "Grands projets infrastructure",
        testimonialText: "RBF nous a accompagnés sur notre plus gros projet d'infrastructure. Leur expertise technique et leur réactivité ont été déterminantes pour la réussite du chantier.",
        imageUrl: "/images/testimonials/marie-claire-kabore.jpg",
        imageAltText: "Marie-Claire Kaboré - Présidente BTP Kaboré & Fils",
        company: "BTP Kaboré & Fils",
        entityId: entityIds.RBF,
        rating: 5,
        isFeatured: true,
        isPublished: true,
      },
      {
        id: uuid(),
        name: "Aminata Touré",
        programOrService: "Audit stratégique",
        testimonialText: "L'audit stratégique réalisé par RIC a transformé notre entreprise. Leur méthodologie rigoureuse et leurs recommandations pertinentes nous ont permis de doubler notre chiffre d'affaires en 18 mois.",
        imageUrl: "/images/testimonials/aminata-toure.jpg",
        imageAltText: "Aminata Touré - CEO AgroTech Innovations SA",
        company: "AgroTech Innovations SA",
        entityId: entityIds.RIC,
        rating: 5,
        isFeatured: true,
        isPublished: true,
      },
      {
        id: uuid(),
        name: "Moussa Diallo",
        programOrService: "Levée de fonds",
        testimonialText: "RIC nous a accompagnés dans notre levée de fonds de 2 milliards FCFA. Leur connaissance du marché et leur réseau d'investisseurs ont été des atouts majeurs.",
        imageUrl: "/images/testimonials/moussa-diallo.jpg",
        imageAltText: "Moussa Diallo - Directeur Financier Groupe Sahel Industries",
        company: "Groupe Sahel Industries",
        entityId: entityIds.RIC,
        rating: 5,
        isFeatured: true,
        isPublished: true,
      },
      {
        id: uuid(),
        name: "Boureima Ouédraogo",
        programOrService: "Contrat de production",
        testimonialText: "Grâce au contrat de production avec REV'I, mes rendements ont augmenté de 67% et mes revenus ont doublé. L'accompagnement technique et l'accès aux intrants de qualité font toute la différence.",
        imageUrl: "/images/testimonials/boureima-ouedraogo.jpg",
        imageAltText: "Boureima Ouédraogo - Producteur de riz, Coopérative de Bama",
        company: "Coopérative de Bama",
        entityId: entityIds.REVI,
        rating: 5,
        isFeatured: true,
        isPublished: true,
      },
      {
        id: uuid(),
        name: "Salimata Compaoré",
        programOrService: "Partenariat producteurs",
        testimonialText: "REV'I a changé la vie de notre groupement. Nous avons maintenant un débouché garanti pour notre production de légumes et un accès au crédit agricole.",
        imageUrl: "/images/testimonials/salimata-compaore.jpg",
        imageAltText: "Salimata Compaoré - Présidente Groupement Femmes de Koudougou",
        company: "Groupement Femmes de Koudougou",
        entityId: entityIds.REVI,
        rating: 5,
        isFeatured: true,
        isPublished: true,
      },
      {
        id: uuid(),
        name: "Aminata Koné",
        programOrService: "Master Management",
        testimonialText: "Mon Master en Management à RBA a été un tournant dans ma carrière. Je suis passée d'assistante administrative à directrice en 2 ans. La formation est vraiment orientée vers l'employabilité.",
        imageUrl: "/images/testimonials/aminata-kone.jpg",
        imageAltText: "Aminata Koné - Directrice des Opérations, Startup Fintech",
        company: "Startup Fintech Ouaga",
        entityId: entityIds.RBA,
        rating: 5,
        isFeatured: true,
        isPublished: true,
      },
      {
        id: uuid(),
        name: "Souleymane Traoré",
        programOrService: "Formation Métiers du BTP",
        testimonialText: "La formation Métiers du BTP de RBA m'a ouvert les portes de l'emploi. En 6 mois, j'ai acquis des compétences pratiques qui m'ont permis de décrocher mon CDI dès la fin de la formation.",
        imageUrl: "/images/testimonials/souleymane-traore.jpg",
        imageAltText: "Souleymane Traoré - Chef de chantier",
        company: "Entreprise Bâtiment Plus",
        entityId: entityIds.RBA,
        rating: 5,
        isFeatured: false,
        isPublished: true,
      },
    ];

    for (const t of testimonials) {
      await db.insert(schema.testimonials).values(t);
    }
    console.log(`   ✅ ${testimonials.length} témoignages migrés`);

    // ============================================
    // 2. SERVICES PAR ENTITÉ
    // ============================================
    console.log("\n🔧 Migration des services par entité...");
    await db.delete(schema.services);

    const allServices = [
      // Services RBF
      { entityId: entityIds.RBF, title: "Équipements de construction", description: "Large gamme d'équipements neufs et d'occasion pour tous vos projets de construction.", icon: "hard-hat", displayOrder: 0, isActive: true },
      { entityId: entityIds.RBF, title: "Location d'engins", description: "Flotte complète d'engins de chantier disponibles à la location courte et longue durée.", icon: "truck", displayOrder: 1, isActive: true },
      { entityId: entityIds.RBF, title: "Matériaux de construction", description: "Ciment, fer, sable, gravier et tous les matériaux de qualité pour vos chantiers.", icon: "brick", displayOrder: 2, isActive: true },
      { entityId: entityIds.RBF, title: "Maintenance & SAV", description: "Service après-vente expert et maintenance préventive de vos équipements.", icon: "wrench", displayOrder: 3, isActive: true },
      { entityId: entityIds.RBF, title: "Logistique BTP", description: "Transport et livraison de matériaux sur vos chantiers dans tout le Burkina.", icon: "package", displayOrder: 4, isActive: true },
      { entityId: entityIds.RBF, title: "Conseil technique", description: "Accompagnement et expertise pour optimiser vos projets de construction.", icon: "clipboard", displayOrder: 5, isActive: true },

      // Services RIC
      { entityId: entityIds.RIC, title: "Stratégie de croissance", description: "Définition et mise en œuvre de plans stratégiques pour accélérer votre développement.", icon: "trending-up", displayOrder: 0, isActive: true },
      { entityId: entityIds.RIC, title: "Levée de fonds", description: "Accompagnement dans la recherche de financements et relations investisseurs.", icon: "banknote", displayOrder: 1, isActive: true },
      { entityId: entityIds.RIC, title: "Études de faisabilité", description: "Analyse de marché, business plans et projections financières pour vos projets.", icon: "chart-bar", displayOrder: 2, isActive: true },
      { entityId: entityIds.RIC, title: "Innovation & transformation", description: "Accompagnement digital et transformation des processus métier.", icon: "lightbulb", displayOrder: 3, isActive: true },
      { entityId: entityIds.RIC, title: "Optimisation opérationnelle", description: "Amélioration de la performance et réduction des coûts.", icon: "cog", displayOrder: 4, isActive: true },
      { entityId: entityIds.RIC, title: "Analyse financière", description: "Audit financier, restructuration et amélioration de la rentabilité.", icon: "calculator", displayOrder: 5, isActive: true },

      // Secteurs REV'I
      { entityId: entityIds.REVI, title: "Élevage bovin", description: "Production de viande et lait de qualité supérieure avec traçabilité complète.", icon: "cow", displayOrder: 0, isActive: true },
      { entityId: entityIds.REVI, title: "Aviculture", description: "Élevage de volailles et production d'œufs frais certifiés.", icon: "bird", displayOrder: 1, isActive: true },
      { entityId: entityIds.REVI, title: "Production laitière", description: "Lait frais, yaourts et produits laitiers transformés localement.", icon: "milk", displayOrder: 2, isActive: true },
      { entityId: entityIds.REVI, title: "Céréales & légumineuses", description: "Riz, maïs, mil, sorgho et légumineuses de qualité.", icon: "wheat", displayOrder: 3, isActive: true },
      { entityId: entityIds.REVI, title: "Fruits & légumes", description: "Production maraîchère et fruitière en circuit court.", icon: "apple", displayOrder: 4, isActive: true },
      { entityId: entityIds.REVI, title: "Pisciculture", description: "Élevage de poissons d'eau douce en bassin contrôlé.", icon: "fish", displayOrder: 5, isActive: true },
    ];

    for (const s of allServices) {
      await db.insert(schema.services).values({ id: uuid(), ...s });
    }
    console.log(`   ✅ ${allServices.length} services migrés`);

    // ============================================
    // 3. PROGRAMMES RBA
    // ============================================
    console.log("\n🎓 Migration des programmes RBA...");
    await db.delete(schema.rbaPrograms);

    const rbaPrograms = [
      { id: uuid(), title: "Métiers du BTP", description: "Formation pratique aux métiers de la construction : maçonnerie, électricité, plomberie, menuiserie, conduite d'engins.", icon: "hard-hat", duration: "3 à 12 mois", level: "basic", certificationType: "Certificat professionnel", targetAudience: "Jeunes sans qualification, reconversion professionnelle", displayOrder: 0, isActive: true },
      { id: uuid(), title: "Comptabilité & Gestion", description: "BTS, Licence et Master en comptabilité, gestion financière et contrôle de gestion.", icon: "calculator", duration: "6 à 18 mois", level: "intermediate", certificationType: "BTS / Licence / Master", targetAudience: "Bacheliers, professionnels en poste", displayOrder: 1, isActive: true },
      { id: uuid(), title: "Management", description: "Développez vos compétences en leadership, gestion d'équipe et stratégie d'entreprise.", icon: "users", duration: "3 à 9 mois", level: "advanced", certificationType: "MBA / Executive Certificate", targetAudience: "Cadres, managers, dirigeants", displayOrder: 2, isActive: true },
      { id: uuid(), title: "Informatique", description: "Développement web, réseaux, cybersécurité et data science.", icon: "laptop", duration: "6 à 12 mois", level: "intermediate", certificationType: "Certification internationale", targetAudience: "Passionnés du numérique, reconversion tech", displayOrder: 3, isActive: true },
      { id: uuid(), title: "Agro-business", description: "Gestion d'exploitation agricole, transformation et commercialisation des produits agricoles.", icon: "tractor", duration: "4 à 10 mois", level: "intermediate", certificationType: "Certificat professionnel", targetAudience: "Agriculteurs, entrepreneurs agricoles", displayOrder: 4, isActive: true },
      { id: uuid(), title: "Entrepreneuriat", description: "Création et gestion d'entreprise, business plan, financement et développement commercial.", icon: "rocket", duration: "2 à 6 mois", level: "basic", certificationType: "Attestation de formation", targetAudience: "Porteurs de projet, créateurs d'entreprise", displayOrder: 5, isActive: true },
    ];

    for (const p of rbaPrograms) {
      await db.insert(schema.rbaPrograms).values(p);
    }
    console.log(`   ✅ ${rbaPrograms.length} programmes RBA migrés`);

    // ============================================
    // 4. PARTENAIRES
    // ============================================
    console.log("\n🤝 Migration des partenaires...");

    // D'abord récupérer les catégories existantes
    const partnerCats = await db.select().from(schema.partnerCategories);
    const catIds: Record<string, string> = {};
    for (const cat of partnerCats) {
      catIds[cat.name] = cat.id;
    }

    await db.delete(schema.partners);

    const partners = [
      // Partenaires Institutionnels
      { name: "Banque Africaine de Développement", categoryId: catIds["Partenaires Institutionnels"], partnerType: "financial", description: "Financement de projets d'infrastructure et développement", partnershipSinceYear: 2020, websiteUrl: "https://www.afdb.org", displayOrder: 0, isActive: true },
      { name: "Ministère de l'Agriculture", categoryId: catIds["Partenaires Institutionnels"], partnerType: "institutional", description: "Partenariat pour le développement agricole", partnershipSinceYear: 2019, displayOrder: 1, isActive: true },
      { name: "Chambre de Commerce du Burkina", categoryId: catIds["Partenaires Institutionnels"], partnerType: "institutional", description: "Réseau d'affaires et promotion économique", partnershipSinceYear: 2018, displayOrder: 2, isActive: true },

      // Partenaires Techniques
      { name: "Caterpillar", categoryId: catIds["Partenaires Techniques"], partnerType: "technical", description: "Équipementier leader en engins de chantier", partnershipSinceYear: 2021, websiteUrl: "https://www.caterpillar.com", displayOrder: 0, isActive: true },
      { name: "Schneider Electric", categoryId: catIds["Partenaires Techniques"], partnerType: "technical", description: "Solutions électriques et automatisation", partnershipSinceYear: 2022, websiteUrl: "https://www.se.com", displayOrder: 1, isActive: true },
      { name: "John Deere", categoryId: catIds["Partenaires Techniques"], partnerType: "technical", description: "Équipements agricoles de pointe", partnershipSinceYear: 2020, websiteUrl: "https://www.deere.com", displayOrder: 2, isActive: true },

      // Partenaires Financiers
      { name: "Banque Atlantique", categoryId: catIds["Partenaires Financiers"], partnerType: "financial", description: "Services bancaires et financement projets", partnershipSinceYear: 2019, displayOrder: 0, isActive: true },
      { name: "Coris Bank", categoryId: catIds["Partenaires Financiers"], partnerType: "financial", description: "Solutions de financement PME", partnershipSinceYear: 2020, displayOrder: 1, isActive: true },
      { name: "Proparco", categoryId: catIds["Partenaires Financiers"], partnerType: "financial", description: "Investissement et accompagnement", partnershipSinceYear: 2021, websiteUrl: "https://www.proparco.fr", displayOrder: 2, isActive: true },

      // Partenaires Académiques
      { name: "Université de Ouagadougou", categoryId: catIds["Partenaires Académiques"], partnerType: "academic", description: "Partenariat formation et recherche", partnershipSinceYear: 2018, displayOrder: 0, isActive: true },
      { name: "Institut 2iE", categoryId: catIds["Partenaires Académiques"], partnerType: "academic", description: "Formation ingénieurs et techniciens", partnershipSinceYear: 2019, websiteUrl: "https://www.2ie-edu.org", displayOrder: 1, isActive: true },
      { name: "AFPA France", categoryId: catIds["Partenaires Académiques"], partnerType: "academic", description: "Certification et méthodologie formation", partnershipSinceYear: 2021, displayOrder: 2, isActive: true },
    ];

    for (const p of partners) {
      await db.insert(schema.partners).values({ id: uuid(), ...p });
    }
    console.log(`   ✅ ${partners.length} partenaires migrés`);

    // ============================================
    // 5. VALEURS DE L'ENTREPRISE
    // ============================================
    console.log("\n💎 Migration des valeurs...");
    await db.delete(schema.companyValues);

    const values = [
      { id: uuid(), title: "Excellence", description: "Nous visons l'excellence dans tout ce que nous faisons. Chaque projet est une opportunité de démontrer notre savoir-faire et notre engagement qualité.", icon: "star", displayOrder: 0, isActive: true },
      { id: uuid(), title: "Engagement", description: "Nous nous engageons pleinement auprès de nos clients, partenaires et collaborateurs. Tenir nos promesses est notre priorité.", icon: "handshake", displayOrder: 1, isActive: true },
      { id: uuid(), title: "Innovation", description: "Nous innovons constamment pour améliorer nos services et répondre aux défis de demain. L'Afrique mérite des solutions modernes.", icon: "lightbulb", displayOrder: 2, isActive: true },
      { id: uuid(), title: "Intégrité", description: "Nous agissons avec honnêteté et transparence. L'éthique guide toutes nos décisions et relations d'affaires.", icon: "shield", displayOrder: 3, isActive: true },
    ];

    for (const v of values) {
      await db.insert(schema.companyValues).values(v);
    }
    console.log(`   ✅ ${values.length} valeurs migrées`);

    // ============================================
    // 6. Mise à jour des news avec categoryId
    // ============================================
    console.log("\n📰 Mise à jour des catégories d'actualités...");
    const newsCats = await db.select().from(schema.newsCategories);
    const newsCatIds: Record<string, string> = {};
    for (const cat of newsCats) {
      newsCatIds[cat.slug] = cat.id;
    }

    // Mettre à jour les articles existants avec les bonnes catégories
    const articles = await db.select().from(schema.newsArticles);
    for (const article of articles) {
      let categoryId = newsCatIds["groupe"];
      if (article.title.includes("REV'I") || article.title.includes("agricole")) {
        categoryId = newsCatIds["revi"];
      } else if (article.title.includes("RIC") || article.title.includes("investisseurs")) {
        categoryId = newsCatIds["ric"];
      } else if (article.title.includes("RBA") || article.title.includes("formation") || article.title.includes("jeunes")) {
        categoryId = newsCatIds["rba"];
      } else if (article.title.includes("RBF") || article.title.includes("infrastructure") || article.title.includes("BTP")) {
        categoryId = newsCatIds["rbf"];
      }
      await db.update(schema.newsArticles).set({ categoryId }).where(eq(schema.newsArticles.id, article.id));
    }
    console.log(`   ✅ ${articles.length} articles mis à jour`);

    // ============================================
    // 7. SECTION À PROPOS
    // ============================================
    console.log("\n📖 Migration de la section À propos...");
    await db.delete(schema.aboutSection);

    await db.insert(schema.aboutSection).values({
      id: uuid(),
      title: "Groupe Rishom, acteur majeur du développement africain",
      subtitle: "Depuis 2008, nous contribuons à bâtir l'Afrique de demain",
      body: `<p>Fondé en 2008, le Groupe Rishom est aujourd'hui un acteur incontournable du développement économique en Afrique de l'Ouest. Notre mission est de contribuer à la transformation du continent à travers des activités diversifiées et complémentaires.</p>

<p>Avec plus de 500 collaborateurs répartis dans 4 pays, nous intervenons dans des secteurs stratégiques : le BTP et les fournitures d'équipements (RBF), le conseil et l'investissement (RIC), l'agro-business (REV'I) et la formation professionnelle (RBA).</p>

<p>Notre ambition pour 2030 : devenir le leader régional de nos secteurs d'activité, avec un chiffre d'affaires de 25 milliards FCFA et une présence dans 10 pays de la CEDEAO.</p>`,
      imageUrl: "/images/about/groupe-rishom-siege.jpg",
      imageAltText: "Siège du Groupe Rishom à Ouagadougou",
      ctaText: "Découvrir notre histoire",
      ctaUrl: "/a-propos/histoire",
      isActive: true,
    });
    console.log("   ✅ Section À propos migrée");

    console.log("\n✅ Migration complémentaire terminée avec succès !");

  } catch (error) {
    console.error("❌ Erreur:", error);
    throw error;
  }

  process.exit(0);
}

migrateRemaining();
