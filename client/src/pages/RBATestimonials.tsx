import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Star, Quote, TrendingUp, Award, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => (
  <section className="relative h-[50vh] flex items-center">
    <div className="absolute inset-0 bg-gradient-to-br from-[#2E5A9C] to-[#3A3A3C] opacity-95" />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-6">Témoignages Étudiants & Alumni</h1>
        <p className="text-xl max-w-2xl mx-auto">Découvrez les parcours de ceux qui ont choisi RBA pour booster leur carrière.</p>
      </motion.div>
    </div>
  </section>
);

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Aminata Koné",
      program: "Master Management des Organisations",
      promo: "Promo 2023",
      before: "Assistante administrative",
      after: "Directrice des Opérations - Startup Fintech",
      rating: 5,
      comment: "Le Master RBA m'a permis de passer d'un poste opérationnel à un poste stratégique. Les enseignants sont des professionnels en activité qui partagent leur expérience terrain. Mon mémoire sur la transformation digitale m'a directement servi pour mon poste actuel.",
      results: "Salaire x2,5 en 2 ans"
    },
    {
      name: "Jean-Claude Sawadogo",
      program: "Certificat Professionnel en Community Management",
      promo: "2024",
      before: "Sans emploi",
      after: "Community Manager freelance (5 clients)",
      rating: 5,
      comment: "Formation intensive et ultra-pratique. En 3 mois, j'ai appris à créer du contenu, gérer des campagnes publicitaires et analyser les performances. J'ai trouvé mon premier client avant même la fin de la formation.",
      results: "Revenus 350 000 FCFA/mois"
    },
    {
      name: "Fatoumata Diallo",
      program: "BTS Comptabilité et Gestion",
      promo: "Promo 2022",
      before: "Bachelière",
      after: "Contrôleuse de gestion junior - Groupe industriel",
      rating: 5,
      comment: "Les stages en entreprise pendant les 2 ans de BTS m'ont permis de mettre en pratique immédiatement mes compétences. J'ai été embauchée par l'entreprise qui m'a accueillie en stage de 2ème année.",
      results: "CDI obtenu 1 mois après le diplôme"
    },
    {
      name: "Mohamed Traoré",
      program: "Licence Pro Entrepreneuriat & Innovation",
      promo: "Promo 2023",
      before: "Vendeur de téléphones",
      after: "Fondateur - E-commerce électronique (15 employés)",
      rating: 5,
      comment: "RBA m'a appris à structurer mon projet, faire un business plan solide et pitcher devant des investisseurs. Grâce à l'accompagnement RBA, j'ai levé 50M FCFA et lancé ma plateforme e-commerce. Aujourd'hui, on fait 20M FCFA de CA/mois.",
      results: "CA 240M FCFA/an, 15 emplois créés"
    },
    {
      name: "Aïssatou Compaoré",
      program: "Formation courte Marketing Digital",
      promo: "2024",
      before: "Commerçante",
      after: "Responsable Marketing Digital - PME textile",
      rating: 4,
      comment: "J'avais une boutique de vêtements mais je ne savais pas comment utiliser les réseaux sociaux pour vendre. La formation m'a ouvert les yeux. J'ai triplé mes ventes en 6 mois et j'ai été recrutée pour gérer le digital d'une entreprise.",
      results: "Ventes x3, nouvelle carrière"
    },
    {
      name: "Ibrahim Ouédraogo",
      program: "Certificat Professionnel Contrôle de Gestion",
      promo: "2023",
      before: "Comptable",
      after: "Contrôleur de gestion - Groupe agro-alimentaire",
      rating: 5,
      comment: "Le programme est exigeant mais ça vaut le coup. J'ai appris à construire des tableaux de bord, faire des prévisions et piloter la performance. Mon salaire a augmenté de 40% suite à ma promotion.",
      results: "Promotion + 40% salaire"
    }
  ];

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Témoignages</h2>
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
              <Quote className="absolute top-4 right-4 w-12 h-12 text-[#2E5A9C] opacity-10" />
              <div className="flex items-start mb-4">
                <div className="w-16 h-16 rounded-full bg-[#2E5A9C] flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
                  {testimonial.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#3A3A3C]">{testimonial.name}</h3>
                  <p className="text-[#2E5A9C] font-semibold text-sm">{testimonial.program}</p>
                  <p className="text-[#B8956A] text-sm">{testimonial.promo}</p>
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
              <div className="bg-[#F5F1E8] p-3 rounded-lg mb-4 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="font-semibold text-[#3A3A3C]">Avant : </span>
                    <span className="text-[#3A3A3C]">{testimonial.before}</span>
                  </div>
                  <span className="text-[#2E5A9C]">→</span>
                  <div>
                    <span className="font-semibold text-[#3A3A3C]">Après : </span>
                    <span className="text-[#3A3A3C]">{testimonial.after}</span>
                  </div>
                </div>
              </div>
              <p className="text-[#3A3A3C] mb-4 italic">"{testimonial.comment}"</p>
              <div className="border-t border-[#B8956A]/20 pt-4">
                <div className="flex items-start">
                  <TrendingUp className="w-5 h-5 text-[#2E5A9C] mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-[#3A3A3C]">
                    <span className="font-semibold">Impact : </span>{testimonial.results}
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
    { value: "3 500+", label: "Alumni" },
    { value: "87%", label: "Taux d'insertion professionnelle" },
    { value: "450+", label: "Entreprises partenaires" },
    { value: "4,6/5", label: "Satisfaction étudiants" }
  ];

  return (
    <section className="py-20 bg-[#2E5A9C] text-white">
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

const CareerPathsSection = () => {
  const paths = [
    {
      sector: "Finance & Comptabilité",
      positions: ["Contrôleur de gestion", "Chef comptable", "Auditeur", "DAF"],
      companies: "Banques, cabinets d'audit, grandes entreprises"
    },
    {
      sector: "Marketing & Communication",
      positions: ["Chef de produit", "Community manager", "Chargé de communication", "Directeur marketing"],
      companies: "Agences, start-ups, multinationales"
    },
    {
      sector: "Ressources Humaines",
      positions: ["Chargé de recrutement", "Responsable formation", "DRH", "Consultant RH"],
      companies: "PME, grandes entreprises, cabinets conseil"
    },
    {
      sector: "Entrepreneuriat",
      positions: ["Fondateur start-up", "Gérant PME", "Consultant indépendant", "Franchise owner"],
      companies: "Auto-entrepreneur, création d'entreprise"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Débouchés Professionnels</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {paths.map((path, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-[#F5F1E8] p-6 rounded-lg"
            >
              <div className="flex items-center mb-4">
                <Briefcase className="w-8 h-8 text-[#2E5A9C] mr-3" />
                <h3 className="text-xl font-bold text-[#2E5A9C]">{path.sector}</h3>
              </div>
              <div className="mb-3">
                <h4 className="font-semibold text-[#3A3A3C] text-sm mb-2">Postes accessibles :</h4>
                <div className="flex flex-wrap gap-2">
                  {path.positions.map((position, idx) => (
                    <span key={idx} className="bg-white text-[#2E5A9C] px-3 py-1 rounded-full text-xs font-semibold">
                      {position}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-[#3A3A3C]">
                <span className="font-semibold">Employeurs : </span>{path.companies}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AlumniNetworkSection = () => (
  <section className="py-20 bg-[#F5F1E8]">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <Award className="w-16 h-16 text-[#2E5A9C] mx-auto mb-6" />
      <h2 className="text-4xl font-bold text-[#3A3A3C] mb-6">Réseau Alumni RBA</h2>
      <p className="text-xl text-[#3A3A3C] mb-8">
        Rejoignez une communauté de 3 500+ professionnels qui s'entraident et partagent des opportunités.
      </p>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg">
          <h3 className="font-bold text-[#2E5A9C] mb-2">Events networking</h3>
          <p className="text-sm text-[#3A3A3C]">Afterworks, conférences, rencontres</p>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h3 className="font-bold text-[#2E5A9C] mb-2">Plateforme emploi</h3>
          <p className="text-sm text-[#3A3A3C]">Offres exclusives alumni</p>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h3 className="font-bold text-[#2E5A9C] mb-2">Mentorat</h3>
          <p className="text-sm text-[#3A3A3C]">Accompagnement par des seniors</p>
        </div>
      </div>
      <Button 
        className="bg-[#2E5A9C] text-white hover:bg-[#3A3A3C] font-semibold text-lg py-6 px-8"
        data-testid="button-join-alumni"
      >
        Rejoindre le Réseau Alumni
      </Button>
    </div>
  </section>
);

export default function RBATestimonials() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <HeroSection />
      <TestimonialsSection />
      <StatsSection />
      <CareerPathsSection />
      <AlumniNetworkSection />
      <Footer />
    </div>
  );
}
