import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import excavatorImage from "@assets/generated_images/rbf_excavator_equipment_burkina.png";
import fleetImage from "@assets/generated_images/rbf_equipment_fleet_operators_burkina.png";
import constructionImage from "@assets/generated_images/rbf_construction_site_ouagadougou.png";
import maintenanceImage from "@assets/generated_images/rbf_maintenance_workshop_burkina.png";

const categories = [
  {
    name: "Engins de terrassement",
    image: excavatorImage,
    description: "Équipements lourds pour travaux de terrassement et excavation",
    equipment: [
      { name: "Bulldozers", models: "Cat D6, D7, D8, D9" },
      { name: "Pelles hydrauliques", models: "20T à 45T" },
      { name: "Chargeuses sur pneus", models: "Cat 950, 966, 980" },
      { name: "Niveleuses", models: "Cat 140, 160" },
      { name: "Tracteurs sur chenilles", models: "Cat D5, D6" },
    ],
    features: [
      "État neuf ou reconditionné",
      "Garantie fabricant",
      "Formation opérateurs incluse",
      "Livraison sur site",
    ],
  },
  {
    name: "Engins de compactage",
    image: fleetImage,
    description: "Solutions de compactage pour tous types de sols",
    equipment: [
      { name: "Compacteurs à cylindres", models: "CS54, CS76, CS78" },
      { name: "Rouleaux vibrants", models: "10T à 20T" },
      { name: "Plaques vibrantes", models: "300kg à 800kg" },
      { name: "Pilonneuses", models: "60kg à 90kg" },
      { name: "Dames", models: "Manuelles et mécaniques" },
    ],
    features: [
      "Adaptation à tous types de sols",
      "Faible consommation",
      "Maintenance facilitée",
      "Pièces détachées disponibles",
    ],
  },
  {
    name: "Équipements de bétonnage",
    image: constructionImage,
    description: "Matériel complet pour production et mise en œuvre du béton",
    equipment: [
      { name: "Centrales à béton", models: "25 à 120 m³/h" },
      { name: "Bétonnières", models: "120L à 500L" },
      { name: "Pompes à béton", models: "Stationnaires et sur camion" },
      { name: "Vibrateurs", models: "Aiguilles et règles" },
      { name: "Lisseuses", models: "Manuelles et mécaniques" },
    ],
    features: [
      "Production continue",
      "Qualité constante",
      "Facilité d'utilisation",
      "Support technique 24/7",
    ],
  },
  {
    name: "Équipements de levage",
    image: maintenanceImage,
    description: "Solutions de levage sécurisées pour vos chantiers",
    equipment: [
      { name: "Grues mobiles", models: "25T à 500T" },
      { name: "Grues à tour", models: "Hauteur jusqu'à 80m" },
      { name: "Chariots élévateurs", models: "2.5T à 16T" },
      { name: "Nacelles élévatrices", models: "10m à 45m" },
      { name: "Monte-charges", models: "500kg à 3000kg" },
    ],
    features: [
      "Certifications sécurité",
      "Opérateurs qualifiés",
      "Inspection régulière",
      "Assurance tous risques",
    ],
  },
];

export default function EquipmentCategories() {
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
            Notre gamme d'équipements
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Plus de 200 équipements disponibles à la vente dans toutes les catégories
          </p>
        </motion.div>

        <div className="space-y-16">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-none shadow-2xl">
                <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                  <div className={`relative h-96 ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  
                  <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-[#C74634] mb-4">
                      {category.name}
                    </h3>
                    <p className="text-lg text-[#3A3A3C] mb-6">
                      {category.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-[#1A1A1A] mb-4">
                        Équipements disponibles :
                      </h4>
                      <div className="space-y-3">
                        {category.equipment.map((item) => (
                          <div key={item.name} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#C74634] flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold text-[#1A1A1A]">{item.name}</span>
                              <span className="text-[#707070] text-sm ml-2">({item.models})</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-[#1A1A1A] mb-3">
                        Avantages :
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {category.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#C74634]" />
                            <span className="text-sm text-[#3A3A3C]">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      className="bg-[#C74634] text-white hover:bg-[#A73828] font-semibold w-fit"
                      data-testid={`button-quote-${index}`}
                    >
                      Demander un devis
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
