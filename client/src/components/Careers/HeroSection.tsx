import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Search } from "lucide-react";
import teamImage from "@assets/generated_images/rishom_team_photo_burkina.png";

export default function CareersHeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={teamImage}
          alt="Carrières Groupe Rishom Burkina"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B1538]/90 to-[#8B1538]/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-2 text-white/80 text-sm mb-6">
            <a href="/" className="hover:text-white transition-colors">
              Accueil
            </a>
            <ChevronRight className="w-4 h-4" />
            <span>Carrières</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Construisez votre avenir avec nous
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Rejoignez une équipe passionnée qui façonne l'avenir de l'Afrique
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Poste, mot-clé..."
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-white"
                  data-testid="input-job-search"
                />
              </div>
              <Button
                size="lg"
                className="bg-white text-[#8B1538] hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg whitespace-nowrap"
                data-testid="search-jobs"
              >
                Rechercher
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
