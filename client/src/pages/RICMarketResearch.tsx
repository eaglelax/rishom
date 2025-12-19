import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Search, BarChart2, Users, Globe, CheckCircle2 } from "lucide-react";
import marketResearchHeroImage from "@assets/generated_images/ric_market_research_burkina.png";

const HeroSection = () => (
  <section className="relative h-[60vh] flex items-center">
    <div className="absolute inset-0 bg-gradient-to-br from-[#8B1538] to-[#3A3A3C] opacity-95" />
    <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url(${marketResearchHeroImage})` }} />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-6">Études de Marché</h1>
        <p className="text-xl max-w-2xl">Données fiables et analyses approfondies pour éclairer vos décisions stratégiques et commerciales.</p>
      </motion.div>
    </div>
  </section>
);

const StudyTypesSection = () => {
  const studies = [
    {
      icon: <Search className="w-12 h-12" />,
      title: "Étude de faisabilité",
      description: "Analyse de la viabilité d'un projet : marché cible, concurrence, potentiel commercial, rentabilité",
      deliverables: ["Rapport de faisabilité (50+ pages)", "Analyse SWOT", "Prévisions financières", "Recommandation Go/No-Go"],
      duration: "4-6 semaines",
      price: "1 200 000 FCFA"
    },
    {
      icon: <BarChart2 className="w-12 h-12" />,
      title: "Étude sectorielle",
      description: "Panorama complet d'un secteur : taille du marché, tendances, acteurs clés, réglementation",
      deliverables: ["Rapport sectoriel (80+ pages)", "Cartographie acteurs", "Données chiffrées", "Perspectives 3-5 ans"],
      duration: "6-8 semaines",
      price: "2 500 000 FCFA"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Étude de satisfaction",
      description: "Mesure de la satisfaction clients, analyse des attentes, identification des axes d'amélioration",
      deliverables: ["Rapport d'analyse", "Enquête quantitative", "Verbatims clients", "Plan d'action"],
      duration: "3-4 semaines",
      price: "800 000 FCFA"
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Étude d'opportunité export",
      description: "Identification des marchés export prometteurs, circuits de distribution, barrières à l'entrée",
      deliverables: ["Rapport pays cibles", "Stratégie d'entrée", "Contacts distributeurs", "Démarches export"],
      duration: "5-7 semaines",
      price: "1 800 000 FCFA"
    }
  ];

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Nos Types d'Études</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {studies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="text-[#8B1538] mb-4">{study.icon}</div>
              <h3 className="text-2xl font-bold text-[#3A3A3C] mb-3">{study.title}</h3>
              <p className="text-[#3A3A3C] mb-4">{study.description}</p>
              <div className="mb-4">
                <h4 className="font-semibold text-[#3A3A3C] mb-2">Livrables :</h4>
                <ul className="space-y-2">
                  {study.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#8B1538] mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap justify-between items-center pt-4 border-t border-[#B8956A]/20 gap-2">
                <span className="text-[#B8956A] font-semibold">{study.duration}</span>
                <span className="text-[#8B1538] font-bold text-xl">{study.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MethodologySection = () => {
  const methods = [
    {
      title: "Recherche documentaire",
      description: "Analyse de sources secondaires : rapports sectoriels, statistiques officielles, publications",
      tools: "Bases de données nationales et internationales"
    },
    {
      title: "Enquêtes quantitatives",
      description: "Questionnaires structurés auprès d'échantillons représentatifs (min. 200 répondants)",
      tools: "CAPI, CAWI, CATI"
    },
    {
      title: "Entretiens qualitatifs",
      description: "Interviews approfondies avec experts, acteurs clés, clients potentiels",
      tools: "Guides d'entretien, enregistrements"
    },
    {
      title: "Observation terrain",
      description: "Visites de sites, mystery shopping, observation des pratiques de la concurrence",
      tools: "Grilles d'observation"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Notre Méthodologie</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {methods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-[#F5F1E8] p-6 rounded-lg"
            >
              <h3 className="text-xl font-bold text-[#8B1538] mb-3">{method.title}</h3>
              <p className="text-[#3A3A3C] mb-3">{method.description}</p>
              <div className="text-sm text-[#B8956A] font-semibold">{method.tools}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SectorsSection = () => {
  const sectors = [
    "Agroalimentaire & Agro-industrie",
    "BTP & Immobilier",
    "Distribution & Commerce",
    "Santé & Pharmaceutique",
    "Éducation & Formation",
    "Énergie & Mines",
    "Technologies & Télécoms",
    "Tourisme & Hôtellerie",
    "Transport & Logistique",
    "Services financiers",
    "Industrie manufacturière",
    "Environnement & Recyclage"
  ];

  return (
    <section className="py-20 bg-[#3A3A3C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-center">Secteurs Couverts</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sectors.map((sector, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur p-4 rounded-lg text-center hover:bg-white/20 transition-colors"
            >
              <CheckCircle2 className="w-6 h-6 text-[#B8956A] mx-auto mb-2" />
              <span className="text-sm">{sector}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = [
    { number: "01", title: "Brief", description: "Définition des objectifs et périmètre" },
    { number: "02", title: "Proposition", description: "Méthodologie et devis détaillé" },
    { number: "03", title: "Collecte", description: "Recueil des données (2-4 semaines)" },
    { number: "04", title: "Analyse", description: "Traitement et interprétation" },
    { number: "05", title: "Restitution", description: "Présentation des résultats et recommandations" }
  ];

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Processus d'Étude</h2>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex-1 text-center"
            >
              <div className="w-16 h-16 bg-[#8B1538] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                {step.number}
              </div>
              <h3 className="text-lg font-bold text-[#3A3A3C] mb-2">{step.title}</h3>
              <p className="text-sm text-[#3A3A3C]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function RICMarketResearch() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <HeroSection />
      <StudyTypesSection />
      <MethodologySection />
      <SectorsSection />
      <ProcessSection />
      <Footer />
    </div>
  );
}
