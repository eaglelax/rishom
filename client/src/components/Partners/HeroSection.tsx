import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import partnersHeroImage from "@assets/generated_images/business_partnership_burkina.png";

export default function PartnersHeroSection() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={partnersHeroImage}
          alt="Partenariats Groupe Rishom Burkina"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B1538]/90 to-[#8B1538]/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-2 text-white/80 text-sm mb-6">
            <a href="/" className="hover:text-white transition-colors">
              Accueil
            </a>
            <ChevronRight className="w-4 h-4" />
            <span>Partenaires</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Nos partenaires
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
            Des collaborations stratégiques pour accélérer notre développement
          </p>
        </motion.div>
      </div>
    </section>
  );
}
