import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FileSearch, BarChart3, TrendingUp, Shield, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import auditHeroImage from "@assets/generated_images/ric_audit_session_burkina.png";

const HeroSection = () => (
  <section className="relative h-[60vh] flex items-center">
    <div className="absolute inset-0 bg-gradient-to-br from-[#8B1538] to-[#3A3A3C] opacity-95" />
    <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url(${auditHeroImage})` }} />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-6">Audit & Diagnostic d'Entreprise</h1>
        <p className="text-xl max-w-2xl">Analyse approfondie de votre organisation pour identifier les leviers de croissance et les axes d'amélioration.</p>
      </motion.div>
    </div>
  </section>
);

const AuditTypesSection = () => {
  const audits = [
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: "Audit financier",
      description: "Analyse comptable, trésorerie, rentabilité, structure financière",
      deliverables: ["Rapport d'analyse financière", "Recommandations de gestion", "Plan d'optimisation"],
      duration: "2-3 semaines"
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Audit stratégique",
      description: "Positionnement marché, concurrence, opportunités de développement",
      deliverables: ["Diagnostic stratégique", "Matrice SWOT détaillée", "Plan d'action prioritaire"],
      duration: "3-4 semaines"
    },
    {
      icon: <FileSearch className="w-12 h-12" />,
      title: "Audit opérationnel",
      description: "Processus internes, efficacité organisationnelle, gestion des ressources",
      deliverables: ["Cartographie des processus", "Analyse des inefficiences", "Plan d'amélioration continue"],
      duration: "4-6 semaines"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Audit de conformité",
      description: "Réglementations, normes sectorielles, conformité légale et fiscale",
      deliverables: ["Rapport de conformité", "Liste des non-conformités", "Feuille de route de mise en conformité"],
      duration: "2-4 semaines"
    }
  ];

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Nos Types d'Audit</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {audits.map((audit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="text-[#8B1538] mb-4">{audit.icon}</div>
              <h3 className="text-2xl font-bold text-[#3A3A3C] mb-3">{audit.title}</h3>
              <p className="text-[#3A3A3C] mb-4">{audit.description}</p>
              <div className="mb-4">
                <h4 className="font-semibold text-[#3A3A3C] mb-2">Livrables :</h4>
                <ul className="space-y-2">
                  {audit.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#8B1538] mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-[#B8956A] font-semibold">Durée : {audit.duration}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = [
    { number: "01", title: "Cadrage", description: "Définition du périmètre, objectifs, méthodologie" },
    { number: "02", title: "Collecte", description: "Données financières, interviews, visites terrain" },
    { number: "03", title: "Analyse", description: "Diagnostic approfondi, identification des écarts" },
    { number: "04", title: "Restitution", description: "Présentation des résultats et recommandations" },
    { number: "05", title: "Accompagnement", description: "Suivi de la mise en œuvre des actions" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Notre Méthodologie</h2>
        <div className="grid md:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-[#8B1538] text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                {step.number}
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

const PricingSection = () => {
  const packages = [
    {
      name: "Audit Express",
      price: "500 000 FCFA",
      description: "Diagnostic rapide sur un domaine spécifique",
      features: ["1 domaine au choix", "Rapport synthétique (15 pages)", "5 recommandations prioritaires", "1 session de restitution"]
    },
    {
      name: "Audit Standard",
      price: "1 500 000 FCFA",
      description: "Analyse complète multi-domaines",
      features: ["2-3 domaines", "Rapport détaillé (40 pages)", "Plan d'action complet", "2 sessions de restitution", "Suivi 3 mois"],
      featured: true
    },
    {
      name: "Audit Stratégique",
      price: "Sur devis",
      description: "Diagnostic global avec accompagnement",
      features: ["Tous domaines", "Rapport exhaustif (80+ pages)", "Feuille de route 12 mois", "Accompagnement personnalisé", "Suivi 12 mois"]
    }
  ];

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Nos Formules d'Audit</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`p-8 rounded-lg ${pkg.featured ? "bg-[#8B1538] text-white" : "bg-white border-2 border-[#B8956A]"}`}
            >
              {pkg.featured && (
                <div className="bg-[#B8956A] text-white text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
                  PLUS POPULAIRE
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
              <div className="text-3xl font-bold mb-2">{pkg.price}</div>
              <p className={`mb-6 ${pkg.featured ? "text-white/90" : "text-[#3A3A3C]"}`}>{pkg.description}</p>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${pkg.featured ? "text-[#B8956A]" : "text-[#8B1538]"}`} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full font-semibold ${pkg.featured ? "bg-white text-[#8B1538] hover:bg-[#F5F1E8]" : "bg-[#8B1538] text-white hover:bg-[#3A3A3C]"}`}
                data-testid={`button-audit-${index}`}
              >
                Demander un Audit
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function RICAudit() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <HeroSection />
      <AuditTypesSection />
      <ProcessSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
