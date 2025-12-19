import { motion } from "framer-motion";
import { ChevronRight, Search } from "lucide-react";
import faqHeroImage from "@assets/generated_images/customer_service_rishom_burkina.png";
import groupeLogoWhite from "@assets/LOGOS_DEF-12_1766165412964.png";

export default function FAQHeroSection() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={faqHeroImage}
          alt="Service client Groupe Rishom Burkina"
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
            <span>FAQ</span>
          </div>

          {/* Logo */}
          <div className="mb-6">
            <img 
              src={groupeLogoWhite} 
              alt="Groupe Rishom" 
              className="h-16 w-auto mx-auto"
            />
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Questions fréquentes
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Trouvez rapidement les réponses à vos questions
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une question..."
                className="w-full pl-12 pr-4 py-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-white"
                data-testid="input-faq-search"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
