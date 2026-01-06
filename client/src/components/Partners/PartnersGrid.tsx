import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface Partner {
  id: string;
  name: string;
  description: string | null;
  logoUrl: string | null;
  websiteUrl: string | null;
  categoryId: string | null;
  partnerSince: string | null;
  displayOrder: number;
}

interface PartnerCategory {
  id: string;
  name: string;
  color: string | null;
  displayOrder: number;
}

interface GroupedPartners {
  category: PartnerCategory;
  partners: Partner[];
}

export default function PartnersGrid() {
  const [groupedPartners, setGroupedPartners] = useState<GroupedPartners[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [partnersRes, categoriesRes] = await Promise.all([
          fetch("/api/partners"),
          fetch("/api/partners/categories")
        ]);

        if (partnersRes.ok && categoriesRes.ok) {
          const partners: Partner[] = await partnersRes.json();
          const categories: PartnerCategory[] = await categoriesRes.json();

          // Grouper les partenaires par catégorie
          const grouped = categories
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map(category => ({
              category,
              partners: partners
                .filter(p => p.categoryId === category.id)
                .sort((a, b) => a.displayOrder - b.displayOrder)
            }))
            .filter(g => g.partners.length > 0);

          // Ajouter les partenaires sans catégorie
          const uncategorized = partners.filter(p => !p.categoryId);
          if (uncategorized.length > 0) {
            grouped.push({
              category: { id: "other", name: "Autres Partenaires", color: "#8B1538", displayOrder: 999 },
              partners: uncategorized
            });
          }

          setGroupedPartners(grouped);
        }
      } catch (error) {
        console.error("Erreur chargement partenaires:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatYear = (dateStr: string | null): string => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.getFullYear().toString();
    } catch {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-12 h-12 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (groupedPartners.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        {groupedPartners.map((group) => (
          <motion.div
            key={group.category.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 last:mb-0"
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-8"
              style={{ color: group.category.color || "#8B1538" }}
            >
              {group.category.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {group.partners.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-none">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-3">
                        {partner.logoUrl && (
                          <img
                            src={partner.logoUrl}
                            alt={partner.name}
                            className="w-16 h-16 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-[#1A1A1A]">
                            {partner.websiteUrl ? (
                              <a
                                href={partner.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#8B1538] transition-colors"
                              >
                                {partner.name}
                              </a>
                            ) : (
                              partner.name
                            )}
                          </h3>
                        </div>
                      </div>
                      {partner.description && (
                        <p className="text-[#3A3A3C] mb-4">{partner.description}</p>
                      )}
                      {partner.partnerSince && (
                        <p className="text-sm text-[#707070]">
                          Partenaire depuis <span className="font-semibold">{formatYear(partner.partnerSince)}</span>
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
