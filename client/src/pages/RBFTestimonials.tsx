import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => (
  <section className="relative h-[50vh] flex items-center">
    <div className="absolute inset-0 bg-gradient-to-br from-[#C74634] to-[#3A3A3C] opacity-95" />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-6">Ce Que Disent Nos Clients</h1>
        <p className="text-xl max-w-2xl mx-auto">Plus de 200 entreprises nous font confiance pour leurs projets de construction.</p>
      </motion.div>
    </div>
  </section>
);

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Abdoulaye Ouédraogo",
      company: "SCEB - Société de Construction et d'Études du Burkina",
      role: "Directeur des Opérations",
      rating: 5,
      comment: "Nous travaillons avec RBF depuis 5 ans. La qualité des matériaux et la fiabilité des livraisons nous permettent de respecter tous nos délais. Le service après-vente est irréprochable.",
      project: "Construction de 120 logements sociaux à Ouagadougou"
    },
    {
      name: "Marie-Claire Kaboré",
      company: "BTP Kaboré & Fils",
      role: "Gérante",
      rating: 5,
      comment: "La location d'engins avec opérateur nous a sauvé la mise sur notre dernier chantier. Équipements récents, opérateurs compétents, tarifs compétitifs. Je recommande.",
      project: "Aménagement route Bobo-Dioulasso"
    },
    {
      name: "Ibrahim Sawadogo",
      company: "Entreprise Sawadogo Construction",
      role: "Fondateur",
      rating: 4,
      comment: "Service logistique impeccable. Les matériaux arrivent toujours à l'heure, conditionnés correctement. Le suivi GPS des livraisons est un vrai plus.",
      project: "Centre commercial à Koudougou"
    },
    {
      name: "Fatou Traoré",
      company: "Immobilier Traoré SA",
      role: "Directrice Générale",
      rating: 5,
      comment: "RBF nous accompagne sur tous nos projets immobiliers. Leur expertise technique et leurs conseils nous font gagner du temps et de l'argent. Partenaire de confiance.",
      project: "Résidence Traoré Gardens (80 appartements)"
    },
    {
      name: "Seydou Compaoré",
      company: "Routes et Travaux Publics du Faso",
      role: "Chef de Projet",
      rating: 5,
      comment: "La réactivité de l'équipe maintenance est exceptionnelle. Panne résolue en moins de 24h sur notre bulldozer. Professionnalisme au top.",
      project: "Réhabilitation RN1 Ouagadougou-Bobo"
    },
    {
      name: "Sophie Zanré",
      company: "Cabinet d'Architecture Zanré",
      role: "Architecte",
      rating: 4,
      comment: "Excellent catalogue d'équipements modernes. Leurs conseillers comprennent nos besoins techniques et proposent des solutions adaptées.",
      project: "Hôtel 4 étoiles à Ouagadougou"
    }
  ];

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Témoignages Clients</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg relative"
            >
              <Quote className="absolute top-4 right-4 w-12 h-12 text-[#C74634] opacity-10" />
              <div className="flex items-start mb-4">
                <div className="w-16 h-16 rounded-full bg-[#B8956A] flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
                  {testimonial.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#3A3A3C]">{testimonial.name}</h3>
                  <p className="text-[#C74634] font-semibold">{testimonial.role}</p>
                  <p className="text-[#3A3A3C] text-sm">{testimonial.company}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#B8956A] fill-current" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#B8956A]/30" />
                ))}
              </div>
              <p className="text-[#3A3A3C] mb-4 italic">"{testimonial.comment}"</p>
              <div className="border-t border-[#B8956A]/20 pt-4">
                <p className="text-sm text-[#3A3A3C]">
                  <span className="font-semibold">Projet : </span>{testimonial.project}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const stats = [
    { value: "200+", label: "Clients actifs" },
    { value: "98%", label: "Satisfaction client" },
    { value: "350+", label: "Projets livrés" },
    { value: "4.8/5", label: "Note moyenne" }
  ];

  return (
    <section className="py-20 bg-[#C74634] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-xl">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl font-bold text-[#3A3A3C] mb-6">Vous Voulez Partager Votre Expérience ?</h2>
      <p className="text-xl text-[#3A3A3C] mb-8">Votre avis nous aide à nous améliorer et guide d'autres professionnels dans leur choix.</p>
      <Button 
        className="bg-[#C74634] text-white hover:bg-[#8B1538] font-semibold text-lg py-6 px-8"
        data-testid="button-leave-testimonial"
      >
        Laisser un Témoignage
      </Button>
    </div>
  </section>
);

export default function RBFTestimonials() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <HeroSection />
      <TestimonialsSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
