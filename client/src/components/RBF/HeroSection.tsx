import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import rbfHeroImage from "@assets/generated_images/rbf_construction_site_ouagadougou.png";

export default function RBFHeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={rbfHeroImage}
          alt="Chantier BTP RBF Ouagadougou"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#C74634]/95 to-[#C74634]/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/80 text-sm mb-6">
            <a href="/" className="hover:text-white transition-colors">
              Accueil
            </a>
            <ChevronRight className="w-4 h-4" />
            <span>RBF</span>
          </div>

          {/* Logo/Name */}
          <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <span className="text-white font-bold text-xl">RBF</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Rishom BTP & Fournitures
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl">
            Leader en équipements BTP et solutions de construction pour vos projets d'infrastructure
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-white text-[#C74634] hover:bg-white/90 font-semibold px-8 py-6 rounded-full group"
              data-testid="rbf-contact-cta"
            >
              Nous contacter
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#C74634] font-semibold px-8 py-6 rounded-full"
              data-testid="rbf-catalog-cta"
            >
              Voir le catalogue
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
