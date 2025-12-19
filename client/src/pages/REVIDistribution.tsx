import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Store, ShoppingBag, Truck, MapPin, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import distributionHeroImage from "@assets/generated_images/revi_market_store_ouagadougou.png";

const HeroSection = () => (
  <section className="relative h-[60vh] flex items-center">
    <div className="absolute inset-0 bg-gradient-to-br from-[#058B5E] to-[#3A3A3C] opacity-95" />
    <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url(${distributionHeroImage})` }} />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-6">Réseau de Distribution</h1>
        <p className="text-xl max-w-2xl">Boutiques en propre et réseau de partenaires pour rendre nos produits accessibles partout.</p>
      </motion.div>
    </div>
  </section>
);

const StoresSection = () => {
  const stores = [
    {
      name: "REV'I Market Ouaga Centre",
      address: "Avenue Kwamé N'Krumah, Zone 1",
      city: "Ouagadougou",
      phone: "+226 25 30 45 67",
      hours: "Lun-Sam : 7h-20h, Dim : 8h-13h",
      services: ["Fruits & légumes frais", "Viandes & charcuterie", "Produits transformés REV'I", "Livraison à domicile"],
      surface: "250 m²"
    },
    {
      name: "REV'I Market Bobo",
      address: "Route de Banfora, secteur 25",
      city: "Bobo-Dioulasso",
      phone: "+226 20 98 45 23",
      hours: "Lun-Sam : 7h-19h30, Dim : 8h-13h",
      services: ["Produits locaux", "Épicerie fine", "Corner bio", "Click & Collect"],
      surface: "180 m²"
    },
    {
      name: "REV'I Express Karpala",
      address: "Carrefour Karpala",
      city: "Ouagadougou",
      phone: "+226 25 36 78 90",
      hours: "Lun-Dim : 7h-22h",
      services: ["Produits de première nécessité", "Snacking", "Service rapide"],
      surface: "80 m²"
    },
    {
      name: "REV'I Frais Dassasgho",
      address: "Marché central de Dassasgho",
      city: "Ouagadougou",
      phone: "+226 25 42 11 55",
      hours: "Lun-Sam : 6h-19h, Dim : 6h-14h",
      services: ["Fruits & légumes du jour", "Viandes fraîches", "Œufs fermiers"],
      surface: "120 m²"
    }
  ];

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Nos Boutiques REV'I</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {stores.map((store, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-start mb-4">
                <Store className="w-8 h-8 text-[#058B5E] mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-[#3A3A3C]">{store.name}</h3>
                  <p className="text-[#B8956A] font-semibold">{store.city}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm mb-4">
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-[#058B5E] mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-[#3A3A3C]">{store.address}</span>
                </div>
                <div className="flex items-start">
                  <Phone className="w-4 h-4 text-[#058B5E] mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-[#3A3A3C]">{store.phone}</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#058B5E] mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-[#3A3A3C]">{store.hours}</span>
                </div>
              </div>
              <div className="border-t border-[#B8956A]/20 pt-4">
                <h4 className="font-semibold text-[#3A3A3C] mb-2">Services :</h4>
                <ul className="space-y-1">
                  {store.services.map((service, idx) => (
                    <li key={idx} className="text-sm text-[#3A3A3C] flex items-start">
                      <span className="text-[#058B5E] mr-2">•</span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 text-sm text-[#B8956A] font-semibold">
                Surface : {store.surface}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PartnersSection = () => {
  const partners = [
    {
      category: "Supermarchés & hypermarchés",
      partners: ["Marina Market (5 points de vente)", "Leader Price (3 points de vente)", "Casino (2 points de vente)", "Carrefour Market"]
    },
    {
      category: "Hôtels & restaurants",
      partners: ["Hôtel Laïco Ouaga 2000", "Sofitel Silmandé", "Restaurant Le Verdoyant", "Chaîne La Taverne"]
    },
    {
      category: "Collectivités",
      partners: ["Cantines scolaires (12 établissements)", "Hôpitaux (4 structures)", "Entreprises (restauration collective)"]
    },
    {
      category: "Export",
      partners: ["Côte d'Ivoire (Abidjan)", "Mali (Bamako)", "Niger (Niamey)", "Togo (Lomé)"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Nos Partenaires de Distribution</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-[#F5F1E8] p-6 rounded-lg"
            >
              <h3 className="text-xl font-bold text-[#058B5E] mb-4">{partner.category}</h3>
              <ul className="space-y-2">
                {partner.partners.map((p, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#058B5E] mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-[#3A3A3C]">{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LogisticsSection = () => {
  const services = [
    {
      icon: <Truck className="w-12 h-12" />,
      title: "Livraison B2B",
      description: "Livraison quotidienne pour les professionnels (restaurants, hôtels, cantines)",
      conditions: "Commande min. 50 000 FCFA, livraison gratuite Ouaga & Bobo"
    },
    {
      icon: <ShoppingBag className="w-12 h-12" />,
      title: "Livraison à domicile",
      description: "Service de livraison pour particuliers via nos boutiques",
      conditions: "Commande min. 15 000 FCFA, frais 1 500 FCFA (gratuit > 30 000 FCFA)"
    },
    {
      icon: <Store className="w-12 h-12" />,
      title: "Click & Collect",
      description: "Commande en ligne, retrait en boutique sous 2h",
      conditions: "Disponible dans toutes nos boutiques, sans minimum d'achat"
    }
  ];

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Services de Livraison</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <div className="text-[#058B5E] flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-[#3A3A3C] mb-3">{service.title}</h3>
              <p className="text-[#3A3A3C] mb-4">{service.description}</p>
              <p className="text-sm text-[#B8956A] font-semibold">{service.conditions}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FranchiseSection = () => (
  <section className="py-20 bg-[#058B5E] text-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <Store className="w-16 h-16 mx-auto mb-6" />
      <h2 className="text-4xl font-bold mb-6">Devenir Franchisé REV'I</h2>
      <p className="text-xl mb-8">Vous voulez ouvrir une boutique REV'I dans votre ville ? Rejoignez notre réseau de franchisés.</p>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
          <div className="text-3xl font-bold mb-2">15M FCFA</div>
          <div className="text-sm">Investissement initial</div>
        </div>
        <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
          <div className="text-3xl font-bold mb-2">Formation</div>
          <div className="text-sm">Complète incluse</div>
        </div>
        <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
          <div className="text-3xl font-bold mb-2">Support</div>
          <div className="text-sm">Continu</div>
        </div>
      </div>
      <Button 
        className="bg-white text-[#058B5E] hover:bg-[#F5F1E8] font-semibold text-lg py-6 px-8"
        data-testid="button-download-franchise"
      >
        Télécharger le Dossier Franchise
      </Button>
    </div>
  </section>
);

const ContactSection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl font-bold text-[#3A3A3C] mb-6">Devenir Distributeur</h2>
      <p className="text-xl text-[#3A3A3C] mb-8">
        Vous êtes un professionnel de la distribution ? Proposez nos produits dans votre point de vente.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          className="bg-[#058B5E] text-white hover:bg-[#3A3A3C] font-semibold"
          data-testid="button-b2b-catalog"
        >
          Demander le Catalogue B2B
        </Button>
        <Button 
          variant="outline"
          className="border-2 border-[#058B5E] text-[#058B5E] hover:bg-[#058B5E] hover:text-white font-semibold"
          data-testid="button-contact-sales"
        >
          Contacter un Commercial
        </Button>
      </div>
    </div>
  </section>
);

export default function REVIDistribution() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <HeroSection />
      <StoresSection />
      <PartnersSection />
      <LogisticsSection />
      <FranchiseSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
