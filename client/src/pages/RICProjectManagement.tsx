import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Briefcase, Users, Calendar, FileText, CheckCircle2 } from "lucide-react";
import projectManagementHeroImage from "@assets/generated_images/ric_project_management_burkina.png";

const HeroSection = () => (
  <section className="relative h-[60vh] flex items-center">
    <div className="absolute inset-0 bg-gradient-to-br from-[#8B1538] to-[#3A3A3C] opacity-95" />
    <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url(${projectManagementHeroImage})` }} />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-6">Accompagnement de Projets</h1>
        <p className="text-xl max-w-2xl">Pilotage opérationnel de vos projets stratégiques, de la conception à la réalisation.</p>
      </motion.div>
    </div>
  </section>
);

const ServicesSection = () => {
  const services = [
    {
      icon: <Briefcase className="w-12 h-12" />,
      title: "Direction de projet (PMO)",
      description: "Pilotage complet de projets complexes, coordination des parties prenantes, gestion des risques",
      scope: "Projets > 100M FCFA"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Assistance à maîtrise d'ouvrage",
      description: "Support décisionnel, validation des livrables, contrôle qualité, recette",
      scope: "Tous types de projets"
    },
    {
      icon: <Calendar className="w-12 h-12" />,
      title: "Planification & suivi",
      description: "Roadmap détaillée, jalons, allocation des ressources, reporting avancement",
      scope: "Projets multi-phases"
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: "Montage de dossiers",
      description: "Business plan, études de faisabilité, demandes de financement, appels d'offres",
      scope: "Dossiers de financement"
    }
  ];

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Nos Services d'Accompagnement</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="text-[#8B1538] mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-[#3A3A3C] mb-3">{service.title}</h3>
              <p className="text-[#3A3A3C] mb-4">{service.description}</p>
              <div className="text-[#B8956A] font-semibold">{service.scope}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MethodologySection = () => {
  const steps = [
    { title: "Cadrage", description: "Objectifs, périmètre, contraintes, budget", icon: <FileText className="w-8 h-8" /> },
    { title: "Planification", description: "WBS, planning, ressources, risques", icon: <Calendar className="w-8 h-8" /> },
    { title: "Exécution", description: "Coordination, suivi, reporting, ajustements", icon: <Users className="w-8 h-8" /> },
    { title: "Clôture", description: "Recette, capitalisation, bilan, transfert", icon: <CheckCircle2 className="w-8 h-8" /> }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Méthodologie de Gestion de Projet</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-[#8B1538] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-[#3A3A3C] mb-2">{step.title}</h3>
              <p className="text-sm text-[#3A3A3C]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectTypesSection = () => {
  const types = [
    {
      category: "Projets industriels",
      examples: ["Création d'usine", "Extension capacité", "Modernisation outil de production"],
      complexity: "Élevée"
    },
    {
      category: "Projets IT/Digital",
      examples: ["ERP", "Transformation digitale", "E-commerce", "CRM"],
      complexity: "Moyenne à élevée"
    },
    {
      category: "Projets immobiliers",
      examples: ["Construction bureaux", "Complexe commercial", "Lotissement"],
      complexity: "Élevée"
    },
    {
      category: "Projets agricoles",
      examples: ["Ferme moderne", "Unité transformation", "Périmètre irrigué"],
      complexity: "Moyenne"
    }
  ];

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Types de Projets Accompagnés</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {types.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold text-[#8B1538] mb-3">{type.category}</h3>
              <ul className="space-y-2 mb-4">
                {type.examples.map((example, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#8B1538] mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-[#3A3A3C]">{example}</span>
                  </li>
                ))}
              </ul>
              <div className="text-sm">
                <span className="font-semibold text-[#3A3A3C]">Complexité : </span>
                <span className="text-[#B8956A]">{type.complexity}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SuccessMetricsSection = () => (
  <section className="py-20 bg-[#8B1538] text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold mb-12 text-center">Nos Indicateurs de Performance</h2>
      <div className="grid md:grid-cols-4 gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-5xl font-bold mb-2">92%</div>
          <div className="text-xl">Projets livrés à temps</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="text-5xl font-bold mb-2">87%</div>
          <div className="text-xl">Respect du budget initial</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-5xl font-bold mb-2">45+</div>
          <div className="text-xl">Projets accompagnés</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-5xl font-bold mb-2">95%</div>
          <div className="text-xl">Satisfaction client</div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default function RICProjectManagement() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <HeroSection />
      <ServicesSection />
      <MethodologySection />
      <ProjectTypesSection />
      <SuccessMetricsSection />
      <Footer />
    </div>
  );
}
