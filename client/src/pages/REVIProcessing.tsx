import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Factory, Package, Refrigerator, Award, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import processingHeroImage from "@assets/generated_images/revi_food_factory_burkina.png";

const HeroSection = () => (
  <section className="relative h-[60vh] flex items-center">
    <div className="absolute inset-0 bg-gradient-to-br from-[#058B5E] to-[#3A3A3C] opacity-95" />
    <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url(${processingHeroImage})` }} />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-6">Transformation Agro-alimentaire</h1>
        <p className="text-xl max-w-2xl">Unités modernes de transformation pour valoriser nos productions et répondre aux attentes du marché.</p>
      </motion.div>
    </div>
  </section>
);

const UnitsSection = () => {
  const units = [
    {
      icon: <Factory className="w-12 h-12" />,
      name: "Unité de décorticage de riz",
      location: "Bama",
      capacity: "10 tonnes/jour",
      products: ["Riz blanc", "Riz étuvé", "Brisures"],
      equipment: "Décortiqueuses modernes, trieuses optiques, ensacheuses"
    },
    {
      icon: <Package className="w-12 h-12" />,
      name: "Unité de conditionnement céréales",
      location: "Ouagadougou",
      capacity: "15 tonnes/jour",
      products: ["Farine de maïs", "Farine de mil", "Semoule"],
      equipment: "Moulins, tamiseuses, conditionneuses sous vide"
    },
    {
      icon: <Refrigerator className="w-12 h-12" />,
      name: "Abattoir moderne",
      location: "Bobo-Dioulasso",
      capacity: "100 têtes/jour",
      products: ["Viande bovine", "Viande porcine", "Abats"],
      equipment: "Chaîne d'abattage, chambres froides, découpe"
    },
    {
      icon: <Factory className="w-12 h-12" />,
      name: "Conserverie de fruits & légumes",
      location: "Banfora",
      capacity: "5 tonnes/jour",
      products: ["Purée de tomate", "Confitures", "Légumes en conserve"],
      equipment: "Pasteurisateurs, remplisseuses, sertisseuses"
    }
  ];

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Nos Unités de Transformation</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {units.map((unit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="text-[#058B5E] mb-4">{unit.icon}</div>
              <h3 className="text-2xl font-bold text-[#3A3A3C] mb-2">{unit.name}</h3>
              <p className="text-[#B8956A] font-semibold mb-4">{unit.location}</p>
              <div className="mb-4">
                <div className="text-sm text-[#3A3A3C] mb-1">
                  <span className="font-semibold">Capacité : </span>{unit.capacity}
                </div>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold text-[#3A3A3C] mb-2">Produits :</h4>
                <div className="flex flex-wrap gap-2">
                  {unit.products.map((product, idx) => (
                    <span key={idx} className="bg-[#F5F1E8] text-[#058B5E] px-3 py-1 rounded-full text-sm">
                      {product}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-[#B8956A]/20">
                <p className="text-sm text-[#3A3A3C]">
                  <span className="font-semibold">Équipements : </span>{unit.equipment}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductsSection = () => {
  const categories = [
    {
      category: "Céréales transformées",
      products: [
        { name: "Riz REV'I Premium", format: "Sachets 1kg, 5kg, 25kg", price: "600-650 FCFA/kg" },
        { name: "Farine de maïs", format: "Sachets 500g, 1kg", price: "350 FCFA/kg" },
        { name: "Semoule de mil", format: "Sachets 1kg", price: "400 FCFA/kg" }
      ]
    },
    {
      category: "Viandes & charcuterie",
      products: [
        { name: "Viande bovine (carcasse)", format: "En gros", price: "2 800 FCFA/kg" },
        { name: "Viande découpée", format: "Sous vide", price: "3 200 FCFA/kg" },
        { name: "Saucisses artisanales", format: "Barquettes 500g", price: "3 500 FCFA/kg" }
      ]
    },
    {
      category: "Conserves",
      products: [
        { name: "Purée de tomate REV'I", format: "Boîtes 400g, 800g", price: "450-800 FCFA" },
        { name: "Confiture mangue-gingembre", format: "Pots 250g", price: "1 200 FCFA" },
        { name: "Haricots verts en conserve", format: "Boîtes 400g", price: "600 FCFA" }
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Nos Produits Transformés</h2>
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold text-[#058B5E] mb-4">{cat.category}</h3>
            <div className="bg-[#F5F1E8] rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#058B5E] text-white">
                    <th className="p-3 text-left">Produit</th>
                    <th className="p-3 text-left">Format</th>
                    <th className="p-3 text-left">Prix</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.products.map((product, idx) => (
                    <tr key={idx} className="border-b border-[#B8956A]/20">
                      <td className="p-3 font-semibold text-[#3A3A3C]">{product.name}</td>
                      <td className="p-3 text-[#3A3A3C] text-sm">{product.format}</td>
                      <td className="p-3 text-[#058B5E] font-semibold">{product.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const QualitySection = () => {
  const standards = [
    "Normes HACCP appliquées",
    "Traçabilité de la matière première au produit fini",
    "Contrôles qualité à chaque étape",
    "Laboratoire d'analyse interne",
    "Certifications sanitaires à jour",
    "Étiquetage conforme réglementation UEMOA"
  ];

  return (
    <section className="py-20 bg-[#3A3A3C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-center">Qualité & Sécurité Alimentaire</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {standards.map((standard, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start"
            >
              <CheckCircle2 className="w-6 h-6 text-[#058B5E] mr-3 flex-shrink-0 mt-1" />
              <span className="text-lg">{standard}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Award className="w-16 h-16 mx-auto mb-4 text-[#B8956A]" />
          <p className="text-xl">Certification ISO 22000 en cours d'obtention</p>
        </div>
      </div>
    </section>
  );
};

const DistributionSection = () => (
  <section className="py-20 bg-[#F5F1E8]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Distribution & Points de Vente</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-lg shadow-lg text-center"
        >
          <h3 className="text-xl font-bold text-[#058B5E] mb-3">Supermarchés</h3>
          <p className="text-[#3A3A3C] mb-3">Marina Market, Leader Price, Casino</p>
          <div className="text-3xl font-bold text-[#B8956A]">45%</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-lg shadow-lg text-center"
        >
          <h3 className="text-xl font-bold text-[#058B5E] mb-3">Restauration</h3>
          <p className="text-[#3A3A3C] mb-3">Hôtels, restaurants, cantines</p>
          <div className="text-3xl font-bold text-[#B8956A]">35%</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-lg shadow-lg text-center"
        >
          <h3 className="text-xl font-bold text-[#058B5E] mb-3">Boutiques REV'I</h3>
          <p className="text-[#3A3A3C] mb-3">4 magasins en propre</p>
          <div className="text-3xl font-bold text-[#B8956A]">20%</div>
        </motion.div>
      </div>
      <div className="mt-12 text-center">
        <Button 
          className="bg-[#058B5E] text-white hover:bg-[#3A3A3C] font-semibold text-lg py-6 px-8"
          data-testid="button-become-distributor"
        >
          Devenir Distributeur
        </Button>
      </div>
    </div>
  </section>
);

export default function REVIProcessing() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <HeroSection />
      <UnitsSection />
      <ProductsSection />
      <QualitySection />
      <DistributionSection />
      <Footer />
    </div>
  );
}
