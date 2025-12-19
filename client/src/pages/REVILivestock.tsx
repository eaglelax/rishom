import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Beef, Egg, Fish, Heart, CheckCircle2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import livestockHeroImage from "@assets/generated_images/revi_poultry_farm_modern_burkina.png";

const HeroSection = () => (
  <section className="relative h-[60vh] flex items-center">
    <div className="absolute inset-0 bg-gradient-to-br from-[#058B5E] to-[#3A3A3C] opacity-95" />
    <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url(${livestockHeroImage})` }} />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-6">Élevage Moderne & Durable</h1>
        <p className="text-xl max-w-2xl">Production de viande, œufs et poisson dans le respect du bien-être animal et de l'environnement.</p>
      </motion.div>
    </div>
  </section>
);

const ProductionsSection = () => {
  const productions = [
    {
      icon: <Beef className="w-12 h-12" />,
      title: "Élevage bovin",
      description: "Races locales améliorées et races européennes adaptées",
      capacity: "2 000 têtes",
      production: "180 tonnes viande/an",
      features: ["Alimentation contrôlée", "Suivi vétérinaire", "Traçabilité complète"]
    },
    {
      icon: <Egg className="w-12 h-12" />,
      title: "Aviculture",
      description: "Poulets de chair et pondeuses en batteries modernes",
      capacity: "50 000 sujets",
      production: "12M œufs/an + 300 tonnes viande/an",
      features: ["Bâtiments climatisés", "Aliments premium", "Biosécurité"]
    },
    {
      icon: <Beef className="w-12 h-12" />,
      title: "Élevage porcin",
      description: "Porcs Large White en système intensif",
      capacity: "1 500 têtes",
      production: "120 tonnes viande/an",
      features: ["Porcheries modernes", "Génétique performante", "Gestion effluents"]
    },
    {
      icon: <Fish className="w-12 h-12" />,
      title: "Pisciculture",
      description: "Tilapia et poisson-chat en étangs et bassins",
      capacity: "15 bassins",
      production: "80 tonnes poisson/an",
      features: ["Alevins certifiés", "Alimentation biologique", "Circuit fermé"]
    }
  ];

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Nos Filières d'Élevage</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {productions.map((prod, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="text-[#058B5E] mb-4">{prod.icon}</div>
              <h3 className="text-2xl font-bold text-[#3A3A3C] mb-3">{prod.title}</h3>
              <p className="text-[#3A3A3C] mb-4">{prod.description}</p>
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div>
                  <div className="text-[#B8956A] font-semibold">Capacité</div>
                  <div className="text-[#3A3A3C]">{prod.capacity}</div>
                </div>
                <div>
                  <div className="text-[#B8956A] font-semibold">Production</div>
                  <div className="text-[#3A3A3C]">{prod.production}</div>
                </div>
              </div>
              <ul className="space-y-2">
                {prod.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#058B5E] mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-[#3A3A3C]">{feature}</span>
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

const WelfareSection = () => {
  const principles = [
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Bien-être animal",
      description: "Espaces adaptés, accès à l'eau, conditions de vie optimales"
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: "Qualité sanitaire",
      description: "Suivi vétérinaire permanent, vaccination, prophylaxie"
    },
    {
      icon: <CheckCircle2 className="w-10 h-10" />,
      title: "Traçabilité",
      description: "Identification individuelle, registres, suivi de la ferme à l'assiette"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Nos Engagements</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-[#058B5E] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                {principle.icon}
              </div>
              <h3 className="text-xl font-bold text-[#3A3A3C] mb-3">{principle.title}</h3>
              <p className="text-[#3A3A3C]">{principle.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeedSection = () => {
  const feeds = [
    { product: "Provende poulet chair", composition: "Maïs, soja, vitamines, minéraux", origin: "Production locale 80%" },
    { product: "Provende pondeuses", composition: "Céréales, tourteau, calcaire, compléments", origin: "Production locale 75%" },
    { product: "Aliment bovin", composition: "Fourrage, concentrés, mélasse, urée", origin: "Production locale 90%" },
    { product: "Aliment porc", composition: "Maïs, son de blé, soja, acides aminés", origin: "Production locale 70%" },
    { product: "Aliment poisson", composition: "Farine de poisson, soja, vitamines", origin: "Production locale 60%" }
  ];

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Alimentation Animale</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-[#058B5E] text-white">
                <th className="p-4 text-left">Produit</th>
                <th className="p-4 text-left">Composition</th>
                <th className="p-4 text-left">Origine</th>
              </tr>
            </thead>
            <tbody>
              {feeds.map((feed, index) => (
                <tr key={index} className="border-b border-[#B8956A]/20 hover:bg-[#F5F1E8] transition-colors">
                  <td className="p-4 font-semibold text-[#3A3A3C]">{feed.product}</td>
                  <td className="p-4 text-[#3A3A3C] text-sm">{feed.composition}</td>
                  <td className="p-4 text-[#058B5E] font-semibold text-sm">{feed.origin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 text-center">
          <p className="text-[#3A3A3C] mb-4">
            Nous produisons nos propres aliments dans notre unité de fabrication pour garantir qualité et traçabilité.
          </p>
          <Button 
            className="bg-[#058B5E] text-white hover:bg-[#3A3A3C] font-semibold"
            data-testid="button-provenderie"
          >
            Découvrir Notre Provenderie
          </Button>
        </div>
      </div>
    </section>
  );
};

const CertificationsSection = () => (
  <section className="py-20 bg-[#058B5E] text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <Award className="w-16 h-16 mx-auto mb-6" />
      <h2 className="text-4xl font-bold mb-6">Certifications & Normes</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">ISO 22000</h3>
          <p className="text-sm">Sécurité sanitaire des aliments</p>
        </div>
        <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Certification vétérinaire</h3>
          <p className="text-sm">Ministère de l'Agriculture</p>
        </div>
        <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Label qualité</h3>
          <p className="text-sm">En cours d'obtention</p>
        </div>
      </div>
    </div>
  </section>
);

export default function REVILivestock() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <HeroSection />
      <ProductionsSection />
      <WelfareSection />
      <FeedSection />
      <CertificationsSection />
      <Footer />
    </div>
  );
}
