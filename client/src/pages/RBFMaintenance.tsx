import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Wrench, Clock, Shield, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => (
  <section className="relative h-[60vh] flex items-center">
    <div className="absolute inset-0 bg-gradient-to-br from-[#C74634] to-[#3A3A3C] opacity-95" />
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=80')] bg-cover bg-center mix-blend-overlay" />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-6">Maintenance & Service Après-Vente</h1>
        <p className="text-xl max-w-2xl">Prolongez la durée de vie de vos équipements avec nos services de maintenance préventive et corrective.</p>
      </motion.div>
    </div>
  </section>
);

const ServicesSection = () => {
  const services = [
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Maintenance préventive",
      description: "Inspections régulières, entretien planifié, diagnostics anticipés",
      frequency: "Contrats mensuels/trimestriels"
    },
    {
      icon: <Wrench className="w-12 h-12" />,
      title: "Maintenance corrective",
      description: "Réparations d'urgence, remplacement de pièces, remise en état",
      response: "Intervention sous 24h"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Garantie étendue",
      description: "Extension de garantie constructeur, couverture complète, pièces d'origine",
      coverage: "Jusqu'à 5 ans"
    }
  ];

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Nos Services de Maintenance</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-[#C74634] mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-[#3A3A3C] mb-4">{service.title}</h3>
              <p className="text-[#3A3A3C] mb-4">{service.description}</p>
              <div className="text-[#B8956A] font-semibold">
                {service.frequency || service.response || service.coverage}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContractsSection = () => {
  const contracts = [
    {
      name: "Contrat Essentiel",
      price: "50 000 FCFA/mois",
      features: ["2 visites/an", "Pièces d'usure incluses", "Assistance téléphonique", "Rapport d'intervention"]
    },
    {
      name: "Contrat Premium",
      price: "120 000 FCFA/mois",
      features: ["4 visites/an", "Toutes pièces incluses", "Intervention prioritaire", "Véhicule de remplacement"],
      featured: true
    },
    {
      name: "Contrat sur-mesure",
      price: "Sur devis",
      features: ["Fréquence personnalisée", "Flotte complète", "Gestionnaire dédié", "SLA garanti"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Contrats de Maintenance</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {contracts.map((contract, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`p-8 rounded-lg border-2 ${contract.featured ? "border-[#C74634] bg-[#F5F1E8]" : "border-[#B8956A] bg-white"}`}
            >
              {contract.featured && (
                <div className="bg-[#C74634] text-white text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
                  RECOMMANDÉ
                </div>
              )}
              <h3 className="text-2xl font-bold text-[#3A3A3C] mb-2">{contract.name}</h3>
              <div className="text-3xl font-bold text-[#C74634] mb-6">{contract.price}</div>
              <ul className="space-y-3 mb-8">
                {contract.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#C74634] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-[#3A3A3C]">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full bg-[#C74634] text-white hover:bg-[#8B1538] font-semibold"
                data-testid={`button-subscribe-${index}`}
              >
                Souscrire
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EmergencySection = () => (
  <section className="py-20 bg-[#C74634]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
      <Phone className="w-16 h-16 mx-auto mb-6" />
      <h2 className="text-4xl font-bold mb-4">Assistance d'Urgence 24/7</h2>
      <p className="text-xl mb-8">Une panne sur votre chantier ? Appelez notre hotline disponible jour et nuit.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a 
          href="tel:+22670123456" 
          className="bg-white text-[#C74634] py-4 px-8 rounded-lg font-bold text-xl hover:bg-[#F5F1E8] transition-colors"
          data-testid="link-emergency-phone"
        >
          +226 70 12 34 56
        </a>
        <a 
          href="mailto:urgence@rbf.bf" 
          className="border-2 border-white text-white py-4 px-8 rounded-lg font-bold hover:bg-white hover:text-[#C74634] transition-colors"
          data-testid="link-emergency-email"
        >
          urgence@rbf.bf
        </a>
      </div>
    </div>
  </section>
);

export default function RBFMaintenance() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <HeroSection />
      <ServicesSection />
      <ContractsSection />
      <EmergencySection />
      <Footer />
    </div>
  );
}
