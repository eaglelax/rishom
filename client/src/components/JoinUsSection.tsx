import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function JoinUsSection() {
  return (
    <section id="careers" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
          alt="Équipe Rishom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#8B1538]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight">
            Rejoignez l'aventure Rishom
          </h2>

          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            Nous recherchons des talents passionnés qui souhaitent contribuer
            au développement de l'Afrique et grandir au sein d'un groupe
            innovant et ambitieux.
          </p>

          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#8B1538] font-semibold text-lg px-8 py-6 rounded-full group mt-8"
            data-testid="careers-cta"
          >
            Voir les opportunités
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
