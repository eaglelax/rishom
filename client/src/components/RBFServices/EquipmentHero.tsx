import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import equipmentHeroImage from "@assets/generated_images/rbf_excavator_equipment_burkina.png";
import rbfLogoWhite from "@assets/LOGOS_DEF-08_1766102890554.png";

export default function EquipmentHero() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={equipmentHeroImage}
          alt="Équipements de construction RBF Burkina"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#C74634]/95 to-[#C74634]/70" />
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
            <a href="/rbf" className="hover:text-white transition-colors">
              RBF
            </a>
            <ChevronRight className="w-4 h-4" />
            <span>Équipements de construction</span>
          </div>

          {/* Logo */}
          <div className="mb-6">
            <img 
              src={rbfLogoWhite} 
              alt="Rishom Burkina Faso" 
              className="h-16 w-auto"
            />
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Équipements de construction
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
            Des équipements de pointe pour tous vos chantiers de construction
          </p>
        </motion.div>
      </div>
    </section>
  );
}
