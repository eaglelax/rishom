import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Building } from "lucide-react";

interface Entity {
  id: string;
  code: string;
  fullName: string;
  shortName: string;
  colorPrimary: string;
  logoUrl: string | null;
  phone: string | null;
  phone2: string | null;
  email: string | null;
  email2: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
}

export default function ContactEntitiesContact() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await fetch("/api/entities");
        if (response.ok) {
          const data: Entity[] = await response.json();
          // Exclure GROUPE et trier par displayOrder
          const filtered = data
            .filter(e => e.code !== "GROUPE")
            .sort((a, b) => (a as any).displayOrder - (b as any).displayOrder);
          setEntities(filtered);
        }
      } catch (error) {
        console.error("Erreur chargement entités:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEntities();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-12 h-12 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (entities.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#8B1538] mb-4">
            Contacter une entité
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Contactez directement l'entité concernée par votre demande
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {entities.map((entity, index) => (
            <motion.div
              key={entity.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-none">
                <CardContent className="p-8">
                  <div className="h-16 flex items-start mb-4">
                    {entity.logoUrl ? (
                      <img
                        src={entity.logoUrl}
                        alt={entity.fullName}
                        className="h-14 w-auto object-contain"
                      />
                    ) : (
                      <div
                        className="h-14 w-14 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: entity.colorPrimary }}
                      >
                        <Building className="h-8 w-8 text-white" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-6">
                    {entity.fullName}
                  </h3>
                  <div className="space-y-4">
                    {(entity.phone || entity.phone2) && (
                      <div className="flex items-start gap-3">
                        <Phone
                          className="w-5 h-5 flex-shrink-0 mt-1"
                          style={{ color: entity.colorPrimary }}
                        />
                        <div className="flex flex-col">
                          {entity.phone && (
                            <a
                              href={`tel:${entity.phone}`}
                              className="text-[#3A3A3C] hover:underline"
                            >
                              {entity.phone}
                            </a>
                          )}
                          {entity.phone2 && (
                            <a
                              href={`tel:${entity.phone2}`}
                              className="text-[#3A3A3C] hover:underline"
                            >
                              {entity.phone2}
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                    {(entity.email || entity.email2) && (
                      <div className="flex items-start gap-3">
                        <Mail
                          className="w-5 h-5 flex-shrink-0 mt-1"
                          style={{ color: entity.colorPrimary }}
                        />
                        <div className="flex flex-col">
                          {entity.email && (
                            <a
                              href={`mailto:${entity.email}`}
                              className="text-[#3A3A3C] hover:underline break-all"
                            >
                              {entity.email}
                            </a>
                          )}
                          {entity.email2 && (
                            <a
                              href={`mailto:${entity.email2}`}
                              className="text-[#3A3A3C] hover:underline break-all"
                            >
                              {entity.email2}
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                    {(entity.address || entity.city) && (
                      <div className="flex items-start gap-3">
                        <MapPin
                          className="w-5 h-5 flex-shrink-0 mt-1"
                          style={{ color: entity.colorPrimary }}
                        />
                        <span className="text-[#3A3A3C]">
                          {[entity.address, entity.city, entity.country]
                            .filter(Boolean)
                            .join(", ")}
                        </span>
                      </div>
                    )}
                    {!entity.phone && !entity.email && !entity.address && (
                      <p className="text-gray-400 italic">
                        Coordonnées non renseignées
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
