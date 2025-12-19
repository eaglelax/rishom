import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { TrendingUp, FileText, Calendar, Download, BarChart3, PieChart, Award, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import investorsHeroImage from "@assets/generated_images/financial_presentation_rishom_burkina.png";

const HeroSection = () => (
  <section className="relative h-[60vh] flex items-center">
    <div className="absolute inset-0 bg-gradient-to-br from-[#8B1538] to-[#3A3A3C] opacity-95" />
    <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url(${investorsHeroImage})` }} />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-6">Relations Investisseurs</h1>
        <p className="text-xl max-w-2xl">Informations financières, gouvernance et perspectives de croissance du Groupe Rishom.</p>
      </motion.div>
    </div>
  </section>
);

const HighlightsSection = () => {
  const highlights = [
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Croissance soutenue",
      value: "+28% CA",
      description: "Croissance annuelle moyenne sur 5 ans (2019-2024)",
      color: "#058B5E"
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: "Rentabilité",
      value: "12,5%",
      description: "Marge opérationnelle 2023",
      color: "#8B1538"
    },
    {
      icon: <PieChart className="w-12 h-12" />,
      title: "Diversification",
      value: "4 secteurs",
      description: "Portefeuille diversifié réduisant les risques",
      color: "#2E5A9C"
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Solidité",
      value: "A-",
      description: "Notation Bloomfield Rating (2024)",
      color: "#B8956A"
    }
  ];

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Points Clés 2024</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <div className="flex justify-center mb-4" style={{ color: highlight.color }}>
                {highlight.icon}
              </div>
              <h3 className="text-lg font-bold text-[#3A3A3C] mb-2">{highlight.title}</h3>
              <div className="text-4xl font-bold mb-2" style={{ color: highlight.color }}>
                {highlight.value}
              </div>
              <p className="text-sm text-[#3A3A3C]">{highlight.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinancialPerformanceSection = () => {
  const years = [
    { year: "2020", ca: "10,2", ebitda: "1,5", resultat: "0,8" },
    { year: "2021", ca: "12,1", ebitda: "1,9", resultat: "1,1" },
    { year: "2022", ca: "14,8", ebitda: "2,3", resultat: "1,4" },
    { year: "2023", ca: "16,5", ebitda: "2,9", resultat: "1,7" },
    { year: "2024*", ca: "18,2", ebitda: "3,4", resultat: "2,0" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Performance Financière</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#8B1538] text-white">
                <th className="p-4 text-left">Année</th>
                <th className="p-4 text-right">CA (Mds FCFA)</th>
                <th className="p-4 text-right">EBITDA (Mds FCFA)</th>
                <th className="p-4 text-right">Résultat Net (Mds FCFA)</th>
              </tr>
            </thead>
            <tbody>
              {years.map((data, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border-b border-[#B8956A]/20 hover:bg-[#F5F1E8] transition-colors"
                >
                  <td className="p-4 font-semibold text-[#3A3A3C]">{data.year}</td>
                  <td className="p-4 text-right text-[#3A3A3C]">{data.ca}</td>
                  <td className="p-4 text-right text-[#3A3A3C]">{data.ebitda}</td>
                  <td className="p-4 text-right text-[#8B1538] font-semibold">{data.resultat}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#B8956A] mt-4 text-center">* Prévisions 2024</p>
      </div>
    </section>
  );
};

const RevenueBreakdownSection = () => {
  const breakdown = [
    { entity: "RBF (BTP & Fournitures)", percentage: 45, amount: "8,2 Mds", color: "#C74634" },
    { entity: "REV'I (Agro-business)", percentage: 30, amount: "5,5 Mds", color: "#058B5E" },
    { entity: "RIC (Conseil)", percentage: 15, amount: "2,7 Mds", color: "#8B1538" },
    { entity: "RBA (Formation)", percentage: 10, amount: "1,8 Mds", color: "#2E5A9C" }
  ];

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Répartition du CA 2024 par Entité</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {breakdown.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-[#3A3A3C]">{item.entity}</span>
                    <span className="font-bold" style={{ color: item.color }}>{item.amount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></motion.div>
                  </div>
                  <div className="text-sm text-[#B8956A] mt-1">{item.percentage}% du CA total</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-bold text-[#3A3A3C] mb-6">Analyse</h3>
            <ul className="space-y-4 text-[#3A3A3C]">
              <li className="flex items-start">
                <TrendingUp className="w-5 h-5 text-[#8B1538] mr-3 mt-1 flex-shrink-0" />
                <span><strong>RBF</strong> reste le moteur principal, porté par les infrastructures publiques</span>
              </li>
              <li className="flex items-start">
                <TrendingUp className="w-5 h-5 text-[#8B1538] mr-3 mt-1 flex-shrink-0" />
                <span><strong>REV'I</strong> affiche la plus forte croissance (+35% en 2024)</span>
              </li>
              <li className="flex items-start">
                <TrendingUp className="w-5 h-5 text-[#8B1538] mr-3 mt-1 flex-shrink-0" />
                <span><strong>RIC</strong> bénéficie de l'expansion régionale (Côte d'Ivoire, Sénégal)</span>
              </li>
              <li className="flex items-start">
                <TrendingUp className="w-5 h-5 text-[#8B1538] mr-3 mt-1 flex-shrink-0" />
                <span><strong>RBA</strong> se consolide avec des partenariats entreprises</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StrategySection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Stratégie de Croissance 2025-2027</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#F5F1E8] p-8 rounded-lg"
        >
          <h3 className="text-2xl font-bold text-[#8B1538] mb-4">Objectif CA 2027</h3>
          <div className="text-5xl font-bold text-[#8B1538] mb-4">25 Mds</div>
          <p className="text-[#3A3A3C]">Croissance annuelle moyenne de 15%, portée par l'expansion régionale et l'innovation</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-[#F5F1E8] p-8 rounded-lg"
        >
          <h3 className="text-2xl font-bold text-[#8B1538] mb-4">Expansion Géographique</h3>
          <ul className="space-y-2 text-[#3A3A3C]">
            <li>Togo et Bénin (2025)</li>
            <li>Ghana et Mali (2026)</li>
            <li>Nigeria (2027)</li>
            <li>10 pays CEDEAO à horizon 2030</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-[#F5F1E8] p-8 rounded-lg"
        >
          <h3 className="text-2xl font-bold text-[#8B1538] mb-4">Investissements Prioritaires</h3>
          <ul className="space-y-2 text-[#3A3A3C]">
            <li>Digitalisation (2 Mds FCFA)</li>
            <li>Nouvelles usines REV'I (3 Mds)</li>
            <li>Campus RBA (1,5 Mds)</li>
            <li>R&D Innovation (1,5 Mds)</li>
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
);

const DocumentsSection = () => {
  const documents = [
    { title: "Rapport Annuel 2023", type: "PDF", size: "8,5 MB", date: "Mars 2024" },
    { title: "Résultats Semestriels S1 2024", type: "PDF", size: "2,1 MB", date: "Juillet 2024" },
    { title: "Présentation Investisseurs 2024", type: "PDF", size: "5,3 MB", date: "Janvier 2024" },
    { title: "Code de Gouvernance", type: "PDF", size: "1,2 MB", date: "Décembre 2023" },
    { title: "Politique RSE 2024-2027", type: "PDF", size: "3,8 MB", date: "Janvier 2024" },
    { title: "Charte Éthique", type: "PDF", size: "0,8 MB", date: "Novembre 2023" }
  ];

  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Documentation Financière</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {documents.map((doc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <FileText className="w-8 h-8 text-[#8B1538] flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-[#3A3A3C] mb-1">{doc.title}</h3>
                  <p className="text-sm text-[#B8956A]">{doc.type} - {doc.size} - {doc.date}</p>
                </div>
              </div>
              <Button 
                size="icon" 
                className="bg-[#8B1538] text-white hover:bg-[#3A3A3C]"
                data-testid={`button-download-${index}`}
              >
                <Download className="w-5 h-5" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CalendarSection = () => {
  const events = [
    { date: "15 Mars 2025", event: "Publication Résultats Annuels 2024", type: "Résultats" },
    { date: "25 Avril 2025", event: "Assemblée Générale Annuelle", type: "AG" },
    { date: "15 Juillet 2025", event: "Résultats Semestriels S1 2025", type: "Résultats" },
    { date: "15 Octobre 2025", event: "Journée Investisseurs", type: "Événement" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#3A3A3C] mb-12 text-center">Calendrier Financier 2025</h2>
        <div className="space-y-6">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#F5F1E8] p-6 rounded-lg flex items-center gap-4"
            >
              <Calendar className="w-8 h-8 text-[#8B1538] flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold text-[#3A3A3C]">{event.event}</h3>
                <p className="text-sm text-[#B8956A]">{event.date}</p>
              </div>
              <span className="bg-[#8B1538] text-white text-xs font-semibold px-3 py-1 rounded-full">
                {event.type}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => (
  <section className="py-20 bg-[#8B1538] text-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl font-bold mb-6">Contact Relations Investisseurs</h2>
      <p className="text-xl mb-8">
        Notre équipe est à votre disposition pour toute question sur les performances et perspectives du Groupe.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
          <Mail className="w-8 h-8 mx-auto mb-3" />
          <h3 className="font-bold mb-2">Email</h3>
          <p>investisseurs@grouperishom.com</p>
        </div>
        <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
          <Phone className="w-8 h-8 mx-auto mb-3" />
          <h3 className="font-bold mb-2">Téléphone</h3>
          <p>+226 25 30 45 50</p>
        </div>
      </div>
      <Button 
        className="bg-white text-[#8B1538] hover:bg-[#F5F1E8] font-semibold text-lg py-6 px-8"
        data-testid="button-contact-ir"
      >
        Contacter l'équipe IR
      </Button>
    </div>
  </section>
);

export default function Investors() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <HeroSection />
      <HighlightsSection />
      <FinancialPerformanceSection />
      <RevenueBreakdownSection />
      <StrategySection />
      <DocumentsSection />
      <CalendarSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
