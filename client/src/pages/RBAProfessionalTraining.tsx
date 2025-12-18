import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Clock, Users, Award, CheckCircle2, Calendar } from "lucide-react";

const HeroSection = () => (
  <section className="relative h-[60vh] flex items-center">
    <div className="absolute inset-0 bg-gradient-to-br from-[#2E5A9C] to-[#3A3A3C] opacity-95" />
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80')] bg-cover bg-center mix-blend-overlay" />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-6">Formations Professionnelles</h1>
        <p className="text-xl max-w-2xl">Développez vos compétences avec nos formations courtes et certifiantes.</p>
      </motion.div>
    </div>
  </section>
);

const ShortTrainingsSection = () => {
  const trainings = [
    {
      title: "Management d'équipe",
      duration: "3 jours",
      schedule: "Lun-Mer (9h-17h)",
      price: "150 000 FCFA",
      modules: ["Styles de leadership", "Motivation des équipes", "Gestion des conflits", "Délégation efficace", "Évaluation de performance"],
      target: "Managers, chefs de service",
      nextSession: "15-17 avril 2025"
    },
    {
      title: "Marketing digital",
      duration: "5 jours",
      schedule: "Lun-Ven (14h-18h)",
      price: "200 000 FCFA",
      modules: ["Stratégie digitale", "SEO & SEA", "Social Media Marketing", "Email marketing", "Analytics & ROI"],
      target: "Marketeurs, entrepreneurs",
      nextSession: "22-26 avril 2025"
    },
    {
      title: "Comptabilité pour non-comptables",
      duration: "2 jours",
      schedule: "Sam-Dim (9h-17h)",
      price: "100 000 FCFA",
      modules: ["Principes comptables de base", "Lecture bilan & compte de résultat", "Gestion de trésorerie", "Fiscalité simplifiée"],
      target: "Entrepreneurs, managers",
      nextSession: "27-28 avril 2025"
    },
    {
      title: "Gestion de projet Agile",
      duration: "3 jours",
      schedule: "Mer-Ven (9h-17h)",
      price: "180 000 FCFA",
      modules: ["Méthodologies Agile (Scrum, Kanban)", "Sprint planning", "Gestion du backlog", "Outils (Jira, Trello)", "Certification Scrum Master"],
      target: "Chefs de projet, développeurs",
      nextSession: "6-8 mai 2025"
    }
  ];

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Formations Courtes (1-5 jours)</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {trainings.map((training, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold text-[#2E5A9C] mb-4">{training.title}</h3>
              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-[#2E5A9C] mr-2" />
                  <span>{training.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-[#2E5A9C] mr-2" />
                  <span>{training.target}</span>
                </div>
                <div className="col-span-2 text-[#B8956A] font-semibold">
                  {training.schedule}
                </div>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold text-[#3A3A3C] mb-2">Programme :</h4>
                <ul className="space-y-1">
                  {training.modules.map((module, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#2E5A9C] mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-[#3A3A3C]">{module}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-[#B8956A]/20 flex flex-wrap justify-between items-center gap-2">
                <div>
                  <div className="text-sm text-[#3A3A3C]">Prochaine session</div>
                  <div className="font-semibold text-[#2E5A9C]">{training.nextSession}</div>
                </div>
                <div className="text-2xl font-bold text-[#2E5A9C]">{training.price}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CertifyingTrainingsSection = () => {
  const programs = [
    {
      title: "Certificat Professionnel en Contrôle de Gestion",
      duration: "4 mois",
      schedule: "Soirs (18h30-21h30) + Samedi matin",
      price: "450 000 FCFA",
      modules: ["Comptabilité analytique", "Tableaux de bord", "Budgets & prévisions", "Analyse des écarts", "Outils de pilotage (Excel, Power BI)"],
      certification: "Certificat RBA reconnu par les entreprises",
      hours: "120 heures",
      nextSession: "Septembre 2025"
    },
    {
      title: "Certificat Professionnel en Community Management",
      duration: "3 mois",
      schedule: "Soirs (18h30-21h) + Samedi",
      price: "350 000 FCFA",
      modules: ["Stratégie social media", "Création de contenu", "Gestion de communauté", "Publicité Facebook/Instagram", "Analytics & reporting"],
      certification: "Certificat RBA + Badge Facebook Blueprint",
      hours: "90 heures",
      nextSession: "Juin 2025"
    },
    {
      title: "Certificat Professionnel en Gestion des Ressources Humaines",
      duration: "5 mois",
      schedule: "Week-ends (Sam-Dim 9h-17h)",
      price: "500 000 FCFA",
      modules: ["Administration du personnel", "Recrutement & intégration", "Formation & développement", "Gestion de la paie", "Droit du travail burkinabè"],
      certification: "Certificat RBA",
      hours: "150 heures",
      nextSession: "Octobre 2025"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Formations Certifiantes (3-6 mois)</h2>
        <div className="space-y-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#F5F1E8] p-8 rounded-lg"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#2E5A9C] mb-2">{program.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-[#2E5A9C] mr-2" />
                      <span>{program.duration} - {program.hours}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 text-[#2E5A9C] mr-2" />
                      <span>{program.certification}</span>
                    </div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-[#2E5A9C]">{program.price}</div>
              </div>
              <p className="text-[#B8956A] font-semibold mb-4">{program.schedule}</p>
              <div className="grid md:grid-cols-2 gap-3">
                {program.modules.map((module, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#2E5A9C] mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-[#3A3A3C]">{module}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-[#B8956A]/20 flex items-center">
                <Calendar className="w-5 h-5 text-[#2E5A9C] mr-2" />
                <span className="font-semibold text-[#3A3A3C]">Prochaine rentrée : {program.nextSession}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ModalitiesSection = () => {
  const modalities = [
    { title: "Inscription", description: "Dossier en ligne ou sur place, validation sous 48h" },
    { title: "Paiement", description: "Comptant ou échelonné (3 versements), facilités disponibles" },
    { title: "Supports", description: "Manuels physiques + accès plateforme e-learning" },
    { title: "Évaluation", description: "Contrôle continu + examen final + projet professionnel" }
  ];

  return (
    <section className="py-20 bg-[#2E5A9C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-center">Modalités Pratiques</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {modalities.map((modality, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur p-6 rounded-lg text-center"
            >
              <h3 className="text-xl font-bold mb-3">{modality.title}</h3>
              <p className="text-sm">{modality.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function RBAProfessionalTraining() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <HeroSection />
      <ShortTrainingsSection />
      <CertifyingTrainingsSection />
      <ModalitiesSection />
      <Footer />
    </div>
  );
}
