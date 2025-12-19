import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import excavatorImage from "@assets/generated_images/rbf_excavator_equipment_burkina.png";
import fleetImage from "@assets/generated_images/rbf_equipment_fleet_operators_burkina.png";
import constructionImage from "@assets/generated_images/rbf_construction_site_ouagadougou.png";

const fleet = [
  {
    category: "Engins de terrassement",
    color: "#C74634",
    machines: [
      {
        name: "Pelle hydraulique 20T",
        image: excavatorImage,
        daily: "250 000 FCFA",
        weekly: "1 500 000 FCFA",
        monthly: "5 000 000 FCFA",
        specs: "Profondeur 6m, Portée 9m",
      },
      {
        name: "Bulldozer Cat D6",
        image: constructionImage,
        daily: "300 000 FCFA",
        weekly: "1 800 000 FCFA",
        monthly: "6 000 000 FCFA",
        specs: "Lame 3.5m, Puissance 215HP",
      },
      {
        name: "Chargeuse 950H",
        image: fleetImage,
        daily: "200 000 FCFA",
        weekly: "1 200 000 FCFA",
        monthly: "4 000 000 FCFA",
        specs: "Godet 3m³, 4x4",
      },
    ],
  },
  {
    category: "Engins de compactage",
    color: "#8B1538",
    machines: [
      {
        name: "Rouleau vibrant 10T",
        image: fleetImage,
        daily: "150 000 FCFA",
        weekly: "900 000 FCFA",
        monthly: "3 000 000 FCFA",
        specs: "Largeur 1.7m, Double cylindre",
      },
      {
        name: "Compacteur pneumatique",
        image: constructionImage,
        daily: "120 000 FCFA",
        weekly: "700 000 FCFA",
        monthly: "2 500 000 FCFA",
        specs: "7 pneus, Largeur 2m",
      },
    ],
  },
  {
    category: "Engins de levage",
    color: "#2E5A9C",
    machines: [
      {
        name: "Grue mobile 50T",
        image: excavatorImage,
        daily: "400 000 FCFA",
        weekly: "2 400 000 FCFA",
        monthly: "8 000 000 FCFA",
        specs: "Flèche 35m, Radio-commandée",
      },
      {
        name: "Nacelle 20m",
        image: fleetImage,
        daily: "100 000 FCFA",
        weekly: "600 000 FCFA",
        monthly: "2 000 000 FCFA",
        specs: "Hauteur 20m, Capacité 250kg",
      },
    ],
  },
];

export default function RentalFleet() {
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
            Notre flotte de location
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Plus de 150 engins disponibles, entretenus et contrôlés régulièrement
          </p>
        </motion.div>

        {fleet.map((category) => (
          <div key={category.category} className="mb-20 last:mb-0">
            <h3
              className="text-3xl font-bold mb-8"
              style={{ color: category.color }}
            >
              {category.category}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.machines.map((machine, index) => (
                <motion.div
                  key={machine.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-none overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src={machine.image}
                        alt={machine.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className="px-3 py-1 rounded-full text-white text-sm font-semibold"
                          style={{ backgroundColor: category.color }}
                        >
                          Disponible
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold text-[#1A1A1A] mb-2">
                        {machine.name}
                      </h4>
                      <p className="text-sm text-[#707070] mb-4">{machine.specs}</p>

                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#3A3A3C]">Jour</span>
                          <span className="text-lg font-bold text-[#C74634]">
                            {machine.daily}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#3A3A3C]">Semaine</span>
                          <span className="text-lg font-bold text-[#C74634]">
                            {machine.weekly}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#3A3A3C]">Mois</span>
                          <span className="text-lg font-bold text-[#C74634]">
                            {machine.monthly}
                          </span>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-[#C74634] text-white hover:bg-[#A73828] font-semibold"
                        data-testid={`button-reserve-${machine.name.replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        Réserver
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
