import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import cementImage from "@assets/generated_images/rbf_cement_bags_warehouse_burkina.png";
import rebarImage from "@assets/generated_images/rbf_rebar_steel_depot_burkina.png";
import warehouseImage from "@assets/generated_images/rbf_warehouse_materials_ouagadougou.png";
import pvcImage from "@assets/generated_images/rbf_pvc_pipes_warehouse_ouaga.png";

const materials = [
  {
    category: "Ciments & Liants",
    color: "#C74634",
    products: [
      { name: "Ciment CPJ 32.5", unit: "Sac 50kg", price: "6 500 FCFA", stock: "En stock" },
      { name: "Ciment CPJ 42.5", unit: "Sac 50kg", price: "7 200 FCFA", stock: "En stock" },
      { name: "Ciment blanc", unit: "Sac 25kg", price: "8 500 FCFA", stock: "En stock" },
      { name: "Chaux hydraulique", unit: "Sac 25kg", price: "4 800 FCFA", stock: "En stock" },
    ],
    image: cementImage,
  },
  {
    category: "Fers à béton",
    color: "#8B1538",
    products: [
      { name: "Fer rond lisse Ø6", unit: "Barre 12m", price: "12 000 FCFA", stock: "En stock" },
      { name: "Fer HA Ø8", unit: "Barre 12m", price: "18 500 FCFA", stock: "En stock" },
      { name: "Fer HA Ø10", unit: "Barre 12m", price: "28 000 FCFA", stock: "En stock" },
      { name: "Fer HA Ø12", unit: "Barre 12m", price: "40 000 FCFA", stock: "En stock" },
      { name: "Treillis soudé", unit: "Panneau 6x2.4m", price: "35 000 FCFA", stock: "En stock" },
    ],
    image: rebarImage,
  },
  {
    category: "Agrégats",
    color: "#2E5A9C",
    products: [
      { name: "Sable de rivière", unit: "m³", price: "15 000 FCFA", stock: "En stock" },
      { name: "Gravier 5/15", unit: "m³", price: "18 000 FCFA", stock: "En stock" },
      { name: "Gravier 15/25", unit: "m³", price: "20 000 FCFA", stock: "En stock" },
      { name: "Tout-venant", unit: "m³", price: "12 000 FCFA", stock: "En stock" },
      { name: "Latérite", unit: "m³", price: "8 000 FCFA", stock: "En stock" },
    ],
    image: warehouseImage,
  },
  {
    category: "Matériaux de finition",
    color: "#058B5E",
    products: [
      { name: "Carreaux céramique 30x30", unit: "m²", price: "8 500 FCFA", stock: "En stock" },
      { name: "Carreaux grès 60x60", unit: "m²", price: "15 000 FCFA", stock: "En stock" },
      { name: "Peinture acrylique", unit: "Pot 25L", price: "45 000 FCFA", stock: "En stock" },
      { name: "Enduit extérieur", unit: "Sac 25kg", price: "12 000 FCFA", stock: "En stock" },
    ],
    image: pvcImage,
  },
];

export default function MaterialsCategories() {
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
            Notre catalogue de matériaux
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Plus de 500 références en stock permanent, livraison sous 24h
          </p>
        </motion.div>

        <div className="space-y-16">
          {materials.map((material, index) => (
            <motion.div
              key={material.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3
                className="text-3xl font-bold mb-8"
                style={{ color: material.color }}
              >
                {material.category}
              </h3>

              <Card className="overflow-hidden border-none shadow-2xl">
                <div className="grid md:grid-cols-3 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <img
                      src={material.image}
                      alt={material.category}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <CardContent className="md:col-span-2 p-8">
                    <div className="space-y-4">
                      {material.products.map((product) => (
                        <div
                          key={product.name}
                          className="flex flex-wrap items-center justify-between p-4 bg-[#F5F1E8] rounded-lg hover:bg-[#F5F1E8]/70 transition-colors gap-4"
                        >
                          <div className="flex-1 min-w-[200px]">
                            <h4 className="text-lg font-semibold text-[#1A1A1A] mb-1">
                              {product.name}
                            </h4>
                            <p className="text-sm text-[#707070]">{product.unit}</p>
                          </div>
                          <div className="flex items-center gap-6">
                            <span
                              className="px-3 py-1 rounded-full text-xs font-semibold"
                              style={{ 
                                backgroundColor: `${material.color}15`,
                                color: material.color 
                              }}
                            >
                              {product.stock}
                            </span>
                            <span className="text-2xl font-bold text-[#C74634] min-w-[140px] text-right">
                              {product.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                      <Button
                        className="bg-[#C74634] text-white hover:bg-[#A73828] font-semibold"
                        data-testid={`button-order-${material.category.replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        Commander
                      </Button>
                      <Button
                        variant="outline"
                        className="border-[#C74634] text-[#C74634]"
                        data-testid={`button-catalog-${material.category.replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        Télécharger le catalogue
                      </Button>
                    </div>
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
