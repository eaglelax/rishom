import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FileText, Calendar, CheckCircle2, CreditCard, Award, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => (
  <section className="relative h-[60vh] flex items-center">
    <div className="absolute inset-0 bg-gradient-to-br from-[#2E5A9C] to-[#3A3A3C] opacity-95" />
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&q=80')] bg-cover bg-center mix-blend-overlay" />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-6">Admission & Inscription</h1>
        <p className="text-xl max-w-2xl">Toutes les informations pour candidater et intégrer RBA.</p>
      </motion.div>
    </div>
  </section>
);

const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "Choisir votre formation",
      description: "Parcourez le catalogue, identifiez la formation adaptée à votre profil et vos objectifs",
      duration: "Temps nécessaire : 1h"
    },
    {
      number: "02",
      title: "Constituer votre dossier",
      description: "Rassemblez les pièces requises (voir liste ci-dessous)",
      duration: "Temps nécessaire : 2-3 jours"
    },
    {
      number: "03",
      title: "Déposer votre candidature",
      description: "En ligne sur notre plateforme ou sur place au campus",
      duration: "Validation sous 48h"
    },
    {
      number: "04",
      title: "Passer les tests",
      description: "Tests écrits + entretien de motivation (formations diplômantes uniquement)",
      duration: "Résultats sous 5 jours"
    },
    {
      number: "05",
      title: "Finaliser votre inscription",
      description: "Paiement des frais, signature du contrat de formation",
      duration: "Bienvenue à RBA !"
    }
  ];

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Processus d'Admission en 5 Étapes</h2>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-start gap-4"
            >
              <div className="w-16 h-16 bg-[#2E5A9C] text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                {step.number}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#3A3A3C] mb-2">{step.title}</h3>
                <p className="text-[#3A3A3C] mb-2">{step.description}</p>
                <p className="text-sm text-[#B8956A] font-semibold">{step.duration}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DocumentsSection = () => {
  const documents: Record<string, string[]> = {
    "Formations courtes": [
      "Fiche d'inscription remplie",
      "Copie CNI ou passeport",
      "CV à jour",
      "1 photo d'identité"
    ],
    "Formations certifiantes": [
      "Fiche d'inscription remplie",
      "Copie CNI ou passeport",
      "CV détaillé",
      "Lettre de motivation",
      "Copie diplôme le plus élevé",
      "2 photos d'identité"
    ],
    "BTS (Bac+2)": [
      "Fiche d'inscription remplie",
      "Copie CNI ou passeport",
      "Copie Bac + relevé de notes",
      "Certificat de scolarité",
      "Lettre de motivation",
      "Certificat médical",
      "4 photos d'identité"
    ],
    "Licence / Master": [
      "Fiche d'inscription remplie",
      "Copie CNI ou passeport",
      "Copies diplômes (Bac + L2 ou Licence)",
      "Relevés de notes",
      "Lettre de motivation",
      "Certificat médical",
      "4 photos d'identité",
      "Attestation de travail (si salarié)"
    ]
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Pièces à Fournir</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(documents).map(([category, docs], index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-[#F5F1E8] p-6 rounded-lg"
            >
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-[#2E5A9C] mr-3" />
                <h3 className="text-xl font-bold text-[#2E5A9C]">{category}</h3>
              </div>
              <ul className="space-y-2">
                {docs.map((doc, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#2E5A9C] mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-[#3A3A3C]">{doc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button 
            className="bg-[#2E5A9C] text-white hover:bg-[#3A3A3C] font-semibold"
            data-testid="button-download-form"
          >
            Télécharger la Fiche d'Inscription
          </Button>
        </div>
      </div>
    </section>
  );
};

const CalendarSection = () => {
  const sessions = [
    {
      type: "Formations courtes",
      period: "Inscriptions permanentes",
      start: "Sessions toutes les 2 semaines",
      note: "Démarrage rapide"
    },
    {
      type: "Formations certifiantes",
      period: "Inscriptions : Janvier-Mars / Juillet-Septembre",
      start: "Rentrées : Avril / Octobre",
      note: "Places limitées (25 par promo)"
    },
    {
      type: "Formations diplômantes (BTS, Licence, Master)",
      period: "Inscriptions : Avril-Août",
      start: "Rentrée académique : 15 septembre",
      note: "Tests d'entrée obligatoires"
    }
  ];

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Calendrier des Inscriptions</h2>
        <div className="space-y-6">
          {sessions.map((session, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-start gap-4">
                <Calendar className="w-8 h-8 text-[#2E5A9C] flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#2E5A9C] mb-2">{session.type}</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-semibold text-[#3A3A3C]">Inscriptions : </span>{session.period}</p>
                    <p><span className="font-semibold text-[#3A3A3C]">Démarrage : </span>{session.start}</p>
                    <p className="text-[#B8956A] font-semibold">{session.note}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeesSection = () => {
  const fees = [
    { category: "Formations courtes", range: "100 000 - 200 000 FCFA", payment: "Comptant uniquement" },
    { category: "Formations certifiantes", range: "350 000 - 500 000 FCFA", payment: "Comptant ou 3 versements" },
    { category: "BTS", range: "700 000 - 750 000 FCFA/an", payment: "Comptant ou 3 versements/an" },
    { category: "Licence Pro", range: "900 000 FCFA", payment: "Comptant ou 3 versements" },
    { category: "Master", range: "1 200 000 FCFA/an", payment: "Comptant ou 4 versements/an" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Frais de Formation</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-[#F5F1E8] rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[#2E5A9C] text-white">
                <th className="p-4 text-left">Type de formation</th>
                <th className="p-4 text-left">Tarif</th>
                <th className="p-4 text-left">Modalités de paiement</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((fee, index) => (
                <tr key={index} className="border-b border-[#B8956A]/20">
                  <td className="p-4 font-semibold text-[#3A3A3C]">{fee.category}</td>
                  <td className="p-4 text-[#2E5A9C] font-bold">{fee.range}</td>
                  <td className="p-4 text-[#3A3A3C] text-sm">{fee.payment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 bg-[#F5F1E8] p-6 rounded-lg">
          <div className="flex items-start gap-3">
            <CreditCard className="w-6 h-6 text-[#2E5A9C] mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-[#3A3A3C] mb-2">Modes de paiement acceptés :</h3>
              <p className="text-sm text-[#3A3A3C]">
                Espèces, virement bancaire, Orange Money, Moov Money, chèque. Facilités de paiement sur demande motivée.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ScholarshipsSection = () => (
  <section className="py-20 bg-[#2E5A9C] text-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <Award className="w-16 h-16 mx-auto mb-6" />
      <h2 className="text-4xl font-bold mb-6">Bourses & Aides Financières</h2>
      <p className="text-xl mb-8">
        RBA propose des bourses d'excellence et des aides sociales pour les candidats méritants.
      </p>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-2">25%</h3>
          <p className="text-sm">Bourse d'excellence académique (meilleurs dossiers)</p>
        </div>
        <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-2">50%</h3>
          <p className="text-sm">Bourse sociale (conditions de ressources)</p>
        </div>
        <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-2">100%</h3>
          <p className="text-sm">Bourse intégrale (cas exceptionnels, 2 places/an)</p>
        </div>
      </div>
      <Button 
        className="bg-white text-[#2E5A9C] hover:bg-[#F5F1E8] font-semibold"
        data-testid="button-apply-scholarship"
      >
        Candidater pour une Bourse
      </Button>
    </div>
  </section>
);

const ContactSection = () => (
  <section className="py-20 bg-[#F5F1E8]">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <Phone className="w-16 h-16 text-[#2E5A9C] mx-auto mb-6" />
      <h2 className="text-4xl font-bold text-[#3A3A3C] mb-6">Besoin d'Aide pour Votre Admission ?</h2>
      <p className="text-xl text-[#3A3A3C] mb-8">
        Nos conseillers sont disponibles pour répondre à toutes vos questions.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg">
          <h3 className="font-bold text-[#2E5A9C] mb-3">Service Admissions</h3>
          <p className="text-sm text-[#3A3A3C] mb-2">+226 25 30 45 67</p>
          <p className="text-sm text-[#3A3A3C]">admissions@rba.bf</p>
          <p className="text-xs text-[#B8956A] mt-2">Lun-Ven : 8h-17h / Sam : 9h-13h</p>
        </div>
        <div className="bg-white p-6 rounded-lg">
          <h3 className="font-bold text-[#2E5A9C] mb-3">Prendre Rendez-vous</h3>
          <p className="text-sm text-[#3A3A3C] mb-4">Visite du campus et entretien conseiller</p>
          <Button 
            className="bg-[#2E5A9C] text-white hover:bg-[#3A3A3C] font-semibold"
            data-testid="button-book-visit"
          >
            Réserver un Créneau
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default function RBAAdmission() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <HeroSection />
      <ProcessSection />
      <DocumentsSection />
      <CalendarSection />
      <FeesSection />
      <ScholarshipsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
