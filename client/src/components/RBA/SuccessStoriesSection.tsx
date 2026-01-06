import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

// Images de fallback
import alumnusImage from "@assets/generated_images/rba_alumnus_male_portrait_burkina.png";
import alumnaImage from "@assets/generated_images/rba_alumna_female_portrait_burkina.png";
import entrepreneurImage from "@assets/generated_images/rba_entrepreneur_portrait_burkina.png";

interface Testimonial {
  id: string;
  name: string;
  position: string | null;
  company: string | null;
  testimonialText: string;
  photoUrl: string | null;
  entityId: string | null;
  displayOrder: number;
}

interface Entity {
  id: string;
  shortName: string;
}

// Fallback images par index
const fallbackImages = [alumnusImage, alumnaImage, entrepreneurImage];

export default function RBASuccessStoriesSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rbaEntityId, setRbaEntityId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les entités pour trouver RBA
        const entitiesRes = await fetch("/api/entities");
        if (entitiesRes.ok) {
          const entitiesData: Entity[] = await entitiesRes.json();
          setEntities(entitiesData);
          const rbaEntity = entitiesData.find(e => e.shortName.toUpperCase() === "RBA");
          if (rbaEntity) {
            setRbaEntityId(rbaEntity.id);
            // Récupérer les témoignages de RBA
            const testimonialsRes = await fetch(`/api/testimonials/entity/${rbaEntity.id}`);
            if (testimonialsRes.ok) {
              const data = await testimonialsRes.json();
              setTestimonials(data);
            }
          }
        }
      } catch (error) {
        console.error("Erreur chargement témoignages:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getImageUrl = (testimonial: Testimonial, index: number): string => {
    if (testimonial.photoUrl && (testimonial.photoUrl.startsWith("/images/") || testimonial.photoUrl.startsWith("/uploads/") || testimonial.photoUrl.startsWith("http"))) {
      return testimonial.photoUrl;
    }
    return fallbackImages[index % fallbackImages.length];
  };

  if (isLoading) {
    return (
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-12 h-12 border-4 border-[#2E5A9C] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2E5A9C] mb-4">
            Témoignages
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Ils ont réussi grâce à RBA
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-none">
                <CardContent className="p-8">
                  <Quote className="w-12 h-12 text-[#2E5A9C]/20 mb-4" />
                  <p className="text-[#3A3A3C] mb-6 italic">
                    "{testimonial.testimonialText}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={getImageUrl(testimonial, index)}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-semibold text-[#2E5A9C] text-lg">
                        {testimonial.name}
                      </h4>
                      {testimonial.position && (
                        <p className="text-sm text-[#707070]">{testimonial.position}</p>
                      )}
                      {testimonial.company && (
                        <p className="text-sm text-[#707070]">{testimonial.company}</p>
                      )}
                    </div>
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
