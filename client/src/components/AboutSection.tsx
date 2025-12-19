import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import headquartersImage from "@assets/generated_images/rishom_headquarters_ouagadougou.png";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#8B1538] leading-tight">
              Groupe Rishom, acteur majeur du développement africain
            </h2>

            <div className="space-y-4 text-lg text-[#1A1A1A]">
              <p>
                Depuis plus de 15 ans, le Groupe Rishom s'est imposé comme un
                acteur incontournable du développement économique en Afrique de
                l'Ouest, avec une présence forte au Burkina Faso.
              </p>

              <p>
                Notre force réside dans notre capacité à intervenir sur
                l'ensemble de la chaîne de valeur à travers nos 5 entités
                spécialisées : construction et équipements BTP, conseil et
                investissement, agro-business et formation professionnelle.
              </p>

              <p>
                Avec plus de 500 collaborateurs et une présence dans 4 pays,
                nous accompagnons nos clients dans leurs projets les plus
                ambitieux, en alliant expertise technique, innovation et
                engagement pour un développement durable.
              </p>
            </div>

            <Button
              size="lg"
              className="bg-[#8B1538] text-white hover:bg-[#C4526D] font-semibold px-8 py-6 rounded-full group mt-8"
              data-testid="about-cta"
            >
              En savoir plus
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={headquartersImage}
              alt="Siège Groupe Rishom Ouagadougou"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#8B1538]/30 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
