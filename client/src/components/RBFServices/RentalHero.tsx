import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import rentalHeroImage from "@assets/generated_images/rbf_equipment_fleet_operators_burkina.png";

export default function RentalHero() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={rentalHeroImage}
          alt="Parc de location d'engins RBF Burkina"
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
            <span>Location d'engins</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Location d'engins BTP
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
            Un parc moderne de plus de 150 engins disponibles à la location avec ou sans opérateurs
          </p>
        </motion.div>
      </div>
    </section>
  );
}
