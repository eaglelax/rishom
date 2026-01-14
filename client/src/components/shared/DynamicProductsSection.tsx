import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Package, ShoppingBag } from "lucide-react";
import { Link } from "wouter";

interface Entity {
  id: string;
  code: string;
  shortName: string;
  colorPrimary: string;
}

interface ProductCategory {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
}

interface Product {
  id: string;
  categoryId: string | null;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: string | null;
  isForRent: boolean;
  isForSale: boolean;
  isFeatured: boolean;
}

interface Props {
  entitySlug: string;
  title?: string;
  subtitle?: string;
  showCatalogButton?: boolean;
  catalogButtonText?: string;
  catalogButtonLink?: string;
}

// Couleurs par défaut par entité
const defaultColors: Record<string, string> = {
  "RBF": "#C74634",
  "RIC": "#8B1538",
  "REVI": "#058B5E",
  "REV'I": "#058B5E",
  "RBA": "#2E5A9C",
  "GROUPE": "#8B1538",
};

export default function DynamicProductsSection({
  entitySlug,
  title = "Nos produits",
  subtitle,
  showCatalogButton = true,
  catalogButtonText = "Voir le catalogue complet",
  catalogButtonLink
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [entity, setEntity] = useState<Entity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer l'entité par slug
        const entityRes = await fetch(`/api/entities/${entitySlug}`);
        if (entityRes.ok) {
          const entityData: Entity = await entityRes.json();
          setEntity(entityData);

          // Récupérer les produits de cette entité
          const [productsRes, categoriesRes] = await Promise.all([
            fetch(`/api/products/entity/${entityData.id}`),
            fetch(`/api/product-categories/entity/${entityData.id}`)
          ]);

          if (productsRes.ok) {
            const data = await productsRes.json();
            setProducts(data);
          }
          if (categoriesRes.ok) {
            const data = await categoriesRes.json();
            setCategories(data);
          }
        }
      } catch (error) {
        console.error("Erreur chargement produits:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [entitySlug]);

  const color = entity?.colorPrimary || defaultColors[entity?.code?.toUpperCase() || ""] || "#8B1538";

  if (isLoading) {
    return (
      <section className="py-20 md:py-32 bg-[#F5F1E8]">
        <div className="container mx-auto px-4 flex justify-center">
          <div
            className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: `${color} transparent transparent transparent` }}
          />
        </div>
      </section>
    );
  }

  // Si pas de produits ni de catégories, ne rien afficher
  if (products.length === 0 && categories.length === 0) {
    return null;
  }

  // Grouper les produits par catégorie
  const productsByCategory = categories.map(cat => ({
    ...cat,
    products: products.filter(p => p.categoryId === cat.id)
  })).filter(cat => cat.products.length > 0);

  // Produits sans catégorie
  const uncategorizedProducts = products.filter(p => !p.categoryId);

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
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4"
            style={{ color }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Affichage par catégorie */}
        {productsByCategory.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {productsByCategory.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-none">
                  <div className="relative h-64">
                    {category.imageUrl ? (
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Package className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <h3 className="absolute bottom-6 left-6 text-3xl font-bold text-white">
                      {category.name}
                    </h3>
                  </div>
                  <CardContent className="p-6">
                    <ul className="grid grid-cols-2 gap-3">
                      {category.products.slice(0, 8).map((product) => (
                        <li
                          key={product.id}
                          className="flex items-center gap-2 text-[#3A3A3C]"
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                          {product.name}
                        </li>
                      ))}
                    </ul>
                    {category.products.length > 8 && (
                      <p className="text-sm text-gray-500 mt-3">
                        +{category.products.length - 8} autres produits
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Produits sans catégorie */}
        {uncategorizedProducts.length > 0 && productsByCategory.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {uncategorizedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-none">
                  <div className="relative h-48">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    {(product.isForRent || product.isForSale) && (
                      <div className="absolute top-3 right-3 flex gap-2">
                        {product.isForSale && (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                            Vente
                          </span>
                        )}
                        {product.isForRent && (
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                            Location
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">{product.name}</h3>
                    {product.description && (
                      <p className="text-[#3A3A3C] text-sm mb-3 line-clamp-2">{product.description}</p>
                    )}
                    {product.price && (
                      <p className="font-bold" style={{ color }}>{product.price}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {showCatalogButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            {catalogButtonLink ? (
              <Link href={catalogButtonLink}>
                <Button
                  size="lg"
                  className="text-white font-semibold px-8 py-6 rounded-full group"
                  style={{ backgroundColor: color }}
                >
                  {catalogButtonText}
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                className="text-white font-semibold px-8 py-6 rounded-full group"
                style={{ backgroundColor: color }}
              >
                {catalogButtonText}
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
