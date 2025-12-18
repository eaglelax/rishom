import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Lightbulb, Rocket, Target, TrendingUp, CheckCircle2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => (
  <section className="relative h-[60vh] flex items-center">
    <div className="absolute inset-0 bg-gradient-to-br from-[#8B1538] to-[#3A3A3C] opacity-95" />
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80')] bg-cover bg-center mix-blend-overlay" />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-6">Innovation & R&D</h1>
        <p className="text-xl max-w-2xl">L'innovation au cœur de notre stratégie pour anticiper les besoins de demain.</p>
      </motion.div>
    </div>
  </section>
);

const VisionSection = () => (
  <section className="py-20 bg-[#F5F1E8]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Lightbulb className="w-16 h-16 text-[#8B1538] mb-6" />
          <h2 className="text-4xl font-bold text-[#3A3A3C] mb-6">Notre Vision de l'Innovation</h2>
          <p className="text-[#3A3A3C] mb-4">
            Au Groupe Rishom, l'innovation n'est pas un département, c'est un état d'esprit. Chaque collaborateur est encouragé à proposer des idées pour améliorer nos processus, services et produits.
          </p>
          <p className="text-[#3A3A3C] mb-4">
            Nous investissons 3% de notre chiffre d'affaires annuel dans la R&D, soit environ 500 millions FCFA en 2024, pour anticiper les besoins de nos clients et rester à la pointe de nos secteurs.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <h3 className="text-2xl font-bold text-[#8B1538] mb-6">Nos 4 Axes d'Innovation</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <CheckCircle2 className="w-6 h-6 text-[#8B1538] mr-3 flex-shrink-0 mt-1" />
              <div>
                <div className="font-bold text-[#3A3A3C]">Innovation Technologique</div>
                <div className="text-sm text-[#3A3A3C]">Digitalisation, automatisation, IA</div>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-6 h-6 text-[#8B1538] mr-3 flex-shrink-0 mt-1" />
              <div>
                <div className="font-bold text-[#3A3A3C]">Innovation Produits/Services</div>
                <div className="text-sm text-[#3A3A3C]">Nouvelles offres répondant aux besoins émergents</div>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-6 h-6 text-[#8B1538] mr-3 flex-shrink-0 mt-1" />
              <div>
                <div className="font-bold text-[#3A3A3C]">Innovation Processus</div>
                <div className="text-sm text-[#3A3A3C]">Optimisation, lean management, agilité</div>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-6 h-6 text-[#8B1538] mr-3 flex-shrink-0 mt-1" />
              <div>
                <div className="font-bold text-[#3A3A3C]">Innovation Sociale</div>
                <div className="text-sm text-[#3A3A3C]">Impact positif sur les communautés</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const ProjectsSection = () => {
  const projects = [
    {
      icon: <Rocket className="w-12 h-12" />,
      entity: "RBF",
      title: "Plateforme BTP Digital",
      description: "Marketplace en ligne pour commander matériaux et louer engins 24/7",
      status: "En développement",
      launch: "T2 2025",
      impact: "Réduction délais commande de 70%, disponibilité 24/7"
    },
    {
      icon: <Lightbulb className="w-12 h-12" />,
      entity: "RIC",
      title: "RIC Data Analytics",
      description: "Outil d'analyse prédictive pour aider les PME à anticiper leurs performances",
      status: "Pilote",
      launch: "T3 2025",
      impact: "Aide à la décision data-driven pour 50 PME pilotes"
    },
    {
      icon: <Target className="w-12 h-12" />,
      entity: "REV'I",
      title: "Ferme Aquaponique Intelligente",
      description: "Culture de légumes et élevage de poissons en circuit fermé avec IoT",
      status: "Étude de faisabilité",
      launch: "T4 2025",
      impact: "90% économie d'eau, production sans pesticides"
    },
    {
      icon: <Award className="w-12 h-12" />,
      entity: "RBA",
      title: "RBA Learning Platform",
      description: "Plateforme e-learning avec IA pour personnaliser les parcours de formation",
      status: "Beta test",
      launch: "T1 2025",
      impact: "Formations accessibles partout, adaptive learning"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Projets Innovants en Cours</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-[#F5F1E8] p-8 rounded-lg"
            >
              <div className="flex items-start mb-4 gap-4">
                <div className="text-[#8B1538]">{project.icon}</div>
                <div>
                  <span className="inline-block bg-[#8B1538] text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                    {project.entity}
                  </span>
                  <h3 className="text-xl font-bold text-[#3A3A3C]">{project.title}</h3>
                </div>
              </div>
              <p className="text-[#3A3A3C] mb-4">{project.description}</p>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold text-[#3A3A3C]">Statut : </span>
                  <span className="text-[#B8956A]">{project.status}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#3A3A3C]">Lancement prévu : </span>
                  <span className="text-[#8B1538] font-semibold">{project.launch}</span>
                </div>
                <div className="pt-3 border-t border-[#B8956A]/20">
                  <TrendingUp className="w-4 h-4 text-[#8B1538] inline mr-2" />
                  <span className="text-[#3A3A3C] font-semibold">{project.impact}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LabSection = () => (
  <section className="py-20 bg-[#3A3A3C] text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold mb-12 text-center">Rishom Innovation Lab</h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xl mb-6">
            Créé en 2022, le <strong>Rishom Innovation Lab</strong> est notre centre de R&D dédié à l'expérimentation et au prototypage rapide. Une équipe de 12 personnes (ingénieurs, data scientists, designers) travaille sur les projets innovants du Groupe.
          </p>
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Méthodologie Agile</h3>
              <p className="text-sm">Sprints de 2 semaines, tests utilisateurs, itérations rapides</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Open Innovation</h3>
              <p className="text-sm">Partenariats avec universités, start-ups, incubateurs</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Budget Dédié</h3>
              <p className="text-sm">500M FCFA/an pour expérimenter sans pression commerciale</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/10 backdrop-blur p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6">Processus d'Innovation</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#8B1538] rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <div className="font-bold">Idéation</div>
                  <div className="text-sm">Récolte d'idées (collaborateurs, clients, partenaires)</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#8B1538] rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <div className="font-bold">Sélection</div>
                  <div className="text-sm">Comité innovation mensuel, scoring des projets</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#8B1538] rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <div className="font-bold">Prototypage</div>
                  <div className="text-sm">MVP en 3 mois, tests terrain</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#8B1538] rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <div className="font-bold">Déploiement</div>
                  <div className="text-sm">Industrialisation et passage à l'échelle</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const PartnershipsSection = () => {
  const partners = [
    { name: "Université de Ouagadougou", domain: "Recherche académique", project: "Agriculture de précision" },
    { name: "2iE (Institut International d'Ingénierie)", domain: "Ingénierie", project: "Énergies renouvelables" },
    { name: "Burkina Tech Hub", domain: "Incubation start-ups", project: "Challenges innovation" },
    { name: "Orange Digital Center", domain: "Digital", project: "Formation développeurs" }
  ];

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Partenaires Innovation</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-lg font-bold text-[#8B1538] mb-2">{partner.name}</h3>
              <p className="text-sm text-[#3A3A3C] mb-2">
                <span className="font-semibold">Domaine : </span>{partner.domain}
              </p>
              <p className="text-sm text-[#B8956A]">
                <span className="font-semibold">Projet commun : </span>{partner.project}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const stats = [
    { value: "500M", label: "FCFA Budget R&D/an" },
    { value: "12", label: "Experts Innovation Lab" },
    { value: "4", label: "Projets en cours" },
    { value: "3%", label: "CA investi en R&D" }
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

const CTASection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <Lightbulb className="w-16 h-16 text-[#8B1538] mx-auto mb-6" />
      <h2 className="text-4xl font-bold text-[#3A3A3C] mb-6">Vous Avez une Idée Innovante ?</h2>
      <p className="text-xl text-[#3A3A3C] mb-8">
        Nous sommes toujours à la recherche de partenaires, start-ups et talents pour construire ensemble les solutions de demain.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          className="bg-[#8B1538] text-white hover:bg-[#3A3A3C] font-semibold text-lg py-6 px-8"
          data-testid="button-submit-project"
        >
          Soumettre un Projet
        </Button>
        <Button 
          variant="outline"
          className="border-2 border-[#8B1538] text-[#8B1538] hover:bg-[#8B1538] hover:text-white font-semibold text-lg py-6 px-8"
          data-testid="button-join-lab"
        >
          Rejoindre le Lab
        </Button>
      </div>
    </div>
  </section>
);

export default function Innovation() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <HeroSection />
      <VisionSection />
      <ProjectsSection />
      <LabSection />
      <PartnershipsSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
