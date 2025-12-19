import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import reviHeroImage from "@assets/generated_images/revi_rice_agriculture_burkina.png";

export default function REVIHeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={reviHeroImage}
          alt="Agriculture REV'I Burkina"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#058B5E]/95 to-[#058B5E]/70" />
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
            <span>REV'I</span>
          </div>

          <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <span className="text-white font-bold text-xl">REV'I</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Rishom Elevage & Valorisation
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl">
            Excellence en agro-business et valorisation des ressources agricoles pour une Afrique nourricière
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-white text-[#058B5E] hover:bg-white/90 font-semibold px-8 py-6 rounded-full group"
              data-testid="revi-contact-cta"
            >
              Découvrir nos produits
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#058B5E] font-semibold px-8 py-6 rounded-full"
              data-testid="revi-services-cta"
            >
              Nos filières
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
