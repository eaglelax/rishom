import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, HardHat, Building, Wrench, Package, Settings } from "lucide-react";

const services = [
  {
    icon: HardHat,
    title: "Équipements de construction",
    description: "Fourniture complète d'équipements BTP neufs et reconditionnés pour tous types de chantiers.",
  },
  {
    icon: Truck,
    title: "Location d'engins",
    description: "Parc d'engins de chantier disponible à la location avec opérateurs qualifiés.",
  },
  {
    icon: Building,
    title: "Matériaux de construction",
    description: "Distribution de matériaux de qualité : ciment, fer, agrégats et finitions.",
  },
  {
    icon: Wrench,
    title: "Maintenance & SAV",
    description: "Service après-vente et maintenance préventive de vos équipements.",
  },
  {
    icon: Package,
    title: "Logistique BTP",
    description: "Transport et livraison de matériaux sur l'ensemble du territoire.",
  },
  {
    icon: Settings,
    title: "Conseil technique",
    description: "Accompagnement technique pour optimiser vos achats et chantiers.",
  },
];

export default function RBFServicesSection() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#C74634] mb-4">
            Nos services
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Des solutions complètes pour répondre à tous vos besoins en équipements et matériaux BTP
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-none bg-[#F5F1E8]">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-[#C74634]/10 flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-[#C74634]" />
                    </div>
                    <CardTitle className="text-2xl text-[#C74634]">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#3A3A3C]">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
