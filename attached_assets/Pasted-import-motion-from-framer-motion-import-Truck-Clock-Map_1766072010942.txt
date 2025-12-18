import { motion } from "framer-motion";
import { Truck, Clock, MapPin, DollarSign } from "lucide-react";

const deliveryInfo = [
  {
    icon: Truck,
    title: "Livraison rapide",
    description: "Sous 24h pour Ouagadougou, 48h pour le reste du Burkina Faso",
  },
  {
    icon: Clock,
    title: "Commande en ligne",
    description: "Passez vos commandes 24/7 via notre plateforme web",
  },
  {
    icon: MapPin,
    title: "Livraison sur chantier",
    description: "Déchargement sur zone de stockage avec engin si nécessaire",
  },
  {
    icon: DollarSign,
    title: "Tarifs dégressifs",
    description: "Remises sur quantité à partir de 10 m³ ou 100 sacs",
  },
];

export default function MaterialsDelivery() {
  return (
    <section className="py-20 md:py-32 bg-[#F5F1E8]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#C74634] mb-4">
            Service de livraison
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Une logistique performante pour vous livrer partout au Burkina Faso
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {deliveryInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#C74634]/10 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-[#C74634]" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[#C74634] mb-3">
                  {info.title}
                </h3>
                <p className="text-[#3A3A3C]">{info.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 bg-white p-8 rounded-xl shadow-lg"
        >
          <h3 className="text-2xl font-bold text-[#C74634] mb-6 text-center">
            Frais de livraison
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border-2 border-[#C74634]/20 rounded-lg">
              <p className="text-sm text-[#707070] mb-2">Ouagadougou</p>
              <p className="text-3xl font-bold text-[#C74634]">Gratuit</p>
              <p className="text-xs text-[#707070] mt-2">À partir de 500 000 FCFA</p>
            </div>
            <div className="text-center p-4 border-2 border-[#C74634]/20 rounded-lg">
              <p className="text-sm text-[#707070] mb-2">Bobo-Dioulasso</p>
              <p className="text-3xl font-bold text-[#C74634]">50 000 F</p>
              <p className="text-xs text-[#707070] mt-2">Par voyage camion 20T</p>
            </div>
            <div className="text-center p-4 border-2 border-[#C74634]/20 rounded-lg">
              <p className="text-sm text-[#707070] mb-2">Autres villes</p>
              <p className="text-3xl font-bold text-[#C74634]">Sur devis</p>
              <p className="text-xs text-[#707070] mt-2">Selon distance</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
