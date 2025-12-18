import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function RICHeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80"
          alt="Conseil RIC"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B1538]/95 to-[#8B1538]/70" />
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
            <span>RIC</span>
          </div>

          <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <span className="text-white font-bold text-xl">RIC</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Rishom Invest & Conseil
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl">
            Conseil stratégique et investissement pour accélérer la croissance de votre entreprise
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-white text-[#8B1538] hover:bg-white/90 font-semibold px-8 py-6 rounded-full group"
              data-testid="ric-contact-cta"
            >
              Prendre rendez-vous
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#8B1538] font-semibold px-8 py-6 rounded-full"
              data-testid="ric-services-cta"
            >
              Nos expertises
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
