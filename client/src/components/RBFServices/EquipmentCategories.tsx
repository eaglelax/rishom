import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package } from "lucide-react";
import { Link } from "wouter";

// Images par défaut
import excavatorImage from "@assets/generated_images/rbf_excavator_equipment_burkina.png";
import fleetImage from "@assets/generated_images/rbf_equipment_fleet_operators_burkina.png";
import constructionImage from "@assets/generated_images/rbf_construction_site_ouagadougou.png";
import maintenanceImage from "@assets/generated_images/rbf_maintenance_workshop_burkina.png";

interface Entity {
  id: string;
  code: string;
  shortName: string;
  colorPrimary: string;
}

interface Product {
  id: string;
  categoryId: string | null;
  entityId: string | null;
  name: string;
  slug: string;
  description: string | null;
  specifications: string | null;
  imageUrl: string | null;
  price: string | null;
  priceCurrency: string | null;
  isForRent: boolean;
  isForSale: boolean;
  isFeatured: boolean;
}

interface ProductCategory {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
}

// Images par défaut par index
const defaultImages = [excavatorImage, fleetImage, constructionImage, maintenanceImage];

// Avantages par défaut pour toutes les catégories
const defaultFeatures = [
  "État neuf ou reconditionné",
  "Garantie fabricant",
  "Formation opérateurs incluse",
  "Livraison sur site",
];

export default function EquipmentCategories() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [entity, setEntity] = useState<Entity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer l'entité RBF
        const entitiesRes = await fetch("/api/entities");
        if (entitiesRes.ok) {
          const entities: Entity[] = await entitiesRes.json();
          const rbfEntity = entities.find(e => e.code === "RBF" || e.shortName.toUpperCase() === "RBF");
          if (rbfEntity) {
            setEntity(rbfEntity);

            // Récupérer les produits de RBF
            const productsRes = await fetch(`/api/products/entity/${rbfEntity.id}`);
            if (productsRes.ok) {
              const data = await productsRes.json();
              setProducts(data);
            }
          }
        }

        // Récupérer les catégories de produits
        const categoriesRes = await fetch("/api/product-categories");
        if (categoriesRes.ok) {
          const data = await categoriesRes.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Erreur chargement données:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const color = entity?.colorPrimary || "#C74634";

  // Grouper les produits par catégorie
  const productsByCategory = categories.map((category, index) => {
    const categoryProducts = products.filter(p => p.categoryId === category.id);
    return {
      ...category,
      products: categoryProducts,
      image: category.imageUrl || defaultImages[index % defaultImages.length],
    };
  }).filter(cat => cat.products.length > 0);

  // Si pas de catégories avec produits, afficher les produits groupés par nom générique
  const displayCategories = productsByCategory.length > 0 ? productsByCategory :
    products.length > 0 ? [{
      id: "all",
      name: "Nos Équipements",
      description: "Équipements disponibles à la vente et à la location",
      image: defaultImages[0],
      products: products,
    }] : [];

  if (isLoading) {
    return (
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-12 h-12 border-4 rounded-full animate-spin" style={{ borderColor: color, borderTopColor: "transparent" }} />
        </div>
      </section>
    );
  }

  if (displayCategories.length === 0) {
    return (
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4" style={{ color }}>
              Notre gamme d'équipements
            </h2>
            <p className="text-xl text-[#707070]">
              Aucun équipement disponible pour le moment.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4" style={{ color }}>
            Notre gamme d'équipements
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Plus de {products.length > 0 ? products.length : 200} équipements disponibles à la vente dans toutes les catégories
          </p>
        </motion.div>

        <div className="space-y-16">
          {displayCategories.map((category, index) => (
            <motion.div
              key={category.id}
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
                    <h3 className="text-3xl font-bold mb-4" style={{ color }}>
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-lg text-[#3A3A3C] mb-6">
                        {category.description}
                      </p>
                    )}

                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-[#1A1A1A] mb-4">
                        Équipements disponibles :
                      </h4>
                      <div className="space-y-3">
                        {category.products.slice(0, 5).map((product) => (
                          <div key={product.id} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color }} />
                            <div>
                              <span className="font-semibold text-[#1A1A1A]">{product.name}</span>
                              {product.specifications && (
                                <span className="text-[#707070] text-sm ml-2">({product.specifications})</span>
                              )}
                            </div>
                          </div>
                        ))}
                        {category.products.length > 5 && (
                          <div className="text-sm ml-8" style={{ color }}>
                            + {category.products.length - 5} autres équipements
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-[#1A1A1A] mb-3">
                        Avantages :
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {defaultFeatures.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                            <span className="text-sm text-[#3A3A3C]">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link href="/devis">
                      <Button
                        className="text-white font-semibold w-fit"
                        style={{ backgroundColor: color }}
                        data-testid={`button-quote-${index}`}
                      >
                        Demander un devis
                      </Button>
                    </Link>
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
