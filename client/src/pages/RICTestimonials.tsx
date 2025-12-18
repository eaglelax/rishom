import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Star, Quote, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => (
  <section className="relative h-[50vh] flex items-center">
    <div className="absolute inset-0 bg-gradient-to-br from-[#8B1538] to-[#3A3A3C] opacity-95" />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-6">Ils Nous Font Confiance</h1>
        <p className="text-xl max-w-2xl mx-auto">Découvrez comment RIC accompagne les entreprises ouest-africaines vers la croissance.</p>
      </motion.div>
    </div>
  </section>
);

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Aminata Touré",
      company: "AgroTech Innovations SA",
      role: "Directrice Générale",
      country: "Sénégal",
      rating: 5,
      service: "Audit stratégique",
      comment: "L'audit réalisé par RIC a été un déclic pour notre entreprise. Leur diagnostic précis nous a permis d'identifier nos forces et faiblesses. Grâce à leur accompagnement, nous avons restructuré nos opérations et doublé notre chiffre d'affaires en 18 mois.",
      results: "CA x2 en 18 mois, restructuration réussie"
    },
    {
      name: "Moussa Diallo",
      company: "Diallo Construction Group",
      role: "Président",
      country: "Guinée",
      rating: 5,
      service: "Accompagnement projet",
      comment: "Le pilotage de notre projet d'extension par RIC a été impeccable. Respect des délais, maîtrise du budget, communication fluide. Des vrais professionnels qui comprennent les réalités du terrain africain.",
      results: "Projet livré à temps, budget respecté à 98%"
    },
    {
      name: "Sophie Koffi",
      company: "BeautyLux Cosmetics",
      role: "Fondatrice",
      country: "Côte d'Ivoire",
      rating: 5,
      service: "Étude de marché",
      comment: "Leur étude de marché sur le secteur cosmétique en Afrique de l'Ouest a dépassé nos attentes. Données précises, analyse pointue, recommandations actionnables. Nous avons lancé 3 nouvelles gammes de produits sur cette base.",
      results: "3 nouvelles gammes lancées, +45% de parts de marché"
    },
    {
      name: "Ibrahim Sawadogo",
      company: "TechHub Ouaga",
      role: "CEO",
      country: "Burkina Faso",
      rating: 5,
      service: "Conseil stratégique",
      comment: "RIC nous a aidés à pivoter notre business model et à lever des fonds. Leur expertise en stratégie et financement est remarquable. Aujourd'hui, nous sommes leaders de l'incubation tech au Burkina.",
      results: "Levée de 300M FCFA, passage de 10 à 60 startups accompagnées"
    },
    {
      name: "Fatima Bah",
      company: "Éco-Emballages Afrique",
      role: "Directrice Innovation",
      country: "Mali",
      rating: 4,
      service: "Formation conseil",
      comment: "Les formations RIC ont transformé notre culture managériale. Contenu riche, formateurs expérimentés, cas pratiques pertinents. Nos managers sont maintenant autonomes et performants.",
      results: "Satisfaction formation : 9.2/10, +30% productivité équipes"
    },
    {
      name: "Jean-Baptiste Ndiaye",
      company: "Groupe Ndiaye Industries",
      role: "Directeur Général Adjoint",
      country: "Sénégal",
      rating: 5,
      service: "Audit financier",
      comment: "L'audit financier mené par RIC a révélé des zones d'optimisation insoupçonnées. Leur analyse fine de nos flux de trésorerie nous a permis d'économiser 80M FCFA la première année.",
      results: "80M FCFA économisés, amélioration BFR de 25%"
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
              <Quote className="absolute top-4 right-4 w-12 h-12 text-[#8B1538] opacity-10" />
              <div className="flex items-start mb-4">
                <div className="w-16 h-16 rounded-full bg-[#8B1538] flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
                  {testimonial.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#3A3A3C]">{testimonial.name}</h3>
                  <p className="text-[#8B1538] font-semibold">{testimonial.role}</p>
                  <p className="text-[#3A3A3C] text-sm">{testimonial.company}</p>
                  <p className="text-[#B8956A] text-sm">{testimonial.country}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#B8956A] fill-current" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#B8956A]/30" />
                ))}
              </div>
              <div className="inline-block bg-[#F5F1E8] text-[#8B1538] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {testimonial.service}
              </div>
              <p className="text-[#3A3A3C] mb-4 italic">"{testimonial.comment}"</p>
              <div className="border-t border-[#B8956A]/20 pt-4">
                <div className="flex items-start">
                  <TrendingUp className="w-5 h-5 text-[#8B1538] mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-[#3A3A3C]">
                    <span className="font-semibold">Résultats : </span>{testimonial.results}
                  </p>
                </div>
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
    { value: "80+", label: "Clients accompagnés" },
    { value: "96%", label: "Taux de satisfaction" },
    { value: "120+", label: "Missions réalisées" },
    { value: "6", label: "Pays d'intervention" }
  ];

  return (
    <section className="py-20 bg-[#8B1538] text-white">
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

const SectorsSection = () => {
  const sectors = [
    "Agroalimentaire",
    "BTP & Immobilier",
    "Technologies",
    "Distribution",
    "Industrie",
    "Services",
    "Santé",
    "Éducation"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Secteurs d'Activité de Nos Clients</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {sectors.map((sector, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-[#F5F1E8] text-[#3A3A3C] px-6 py-3 rounded-full font-semibold hover:bg-[#8B1538] hover:text-white transition-colors"
            >
              {sector}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-20 bg-[#F5F1E8]">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl font-bold text-[#3A3A3C] mb-6">Prêt à Transformer Votre Entreprise ?</h2>
      <p className="text-xl text-[#3A3A3C] mb-8">Rejoignez les entreprises qui ont choisi RIC pour accélérer leur croissance.</p>
      <Button 
        className="bg-[#8B1538] text-white hover:bg-[#3A3A3C] font-semibold text-lg py-6 px-8"
        data-testid="button-free-consultation"
      >
        Demander une Consultation Gratuite
      </Button>
    </div>
  </section>
);

export default function RICTestimonials() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <HeroSection />
      <TestimonialsSection />
      <StatsSection />
      <SectorsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
