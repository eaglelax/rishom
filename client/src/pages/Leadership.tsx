import { motion } from 'framer-motion';
import { Linkedin, Mail, Award, Briefcase, GraduationCap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

import heroImage from '@assets/generated_images/leadership_team_hero_image.png';
import pdgImage from '@assets/generated_images/pdg_alassane_rishom_portrait.png';
import cfoImage from '@assets/generated_images/cfo_sophie_diallo_portrait.png';
import dgRbfImage from '@assets/generated_images/dg_rbf_moussa_sawadogo.png';
import dgRicImage from '@assets/generated_images/dg_ric_karim_ouedraogo.png';
import dgReviImage from '@assets/generated_images/dg_revi_fatimata_traore.png';
import dgRbaImage from '@assets/generated_images/dg_rba_ibrahim_compaore.png';
import drhImage from '@assets/generated_images/drh_aicha_zanre_portrait.png';
import groupeLogoWhite from '@assets/LOGOS_DEF-06_1766102890554.png';

const HeroSection = () => (
  <section className="relative h-[60vh] flex items-center">
    <div className="absolute inset-0">
      <img 
        src={heroImage}
        alt="Équipe de direction Groupe Rishom"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#8B1538]/90 to-[#3A3A3C]/80" />
    </div>
    <div className="relative z-10 container mx-auto px-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <img 
          src={groupeLogoWhite}
          alt="Groupe Rishom"
          className="h-16 w-auto mb-6"
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-leadership-title">
          Équipe de Direction
        </h1>
        <p className="text-xl text-white/90">
          Des leaders expérimentés qui guident notre vision et notre croissance en Afrique de l'Ouest.
        </p>
      </motion.div>
    </div>
  </section>
);

const CEOSection = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <div className="order-2 md:order-1">
          <div className="inline-block bg-[#8B1538] text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            PRÉSIDENT-DIRECTEUR GÉNÉRAL
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#3A3A3C] mb-4" data-testid="text-ceo-name">
            Alassane Rishom
          </h2>
          <p className="text-xl text-[#B8956A] mb-6 italic">
            "Bâtir l'Afrique de demain avec audace et vision"
          </p>
          
          <div className="space-y-4 text-[#3A3A3C] mb-6">
            <p>
              Entrepreneur visionnaire et self-made man burkinabè, Alassane Rishom a fondé le Groupe Rishom en 2010 avec l'ambition de contribuer au développement économique de l'Afrique de l'Ouest.
            </p>
            <p>
              Parti de rien avec un simple dépôt de matériaux de construction, il a su transformer son entreprise en un groupe multi-sectoriel de 18 milliards FCFA de chiffre d'affaires, employant plus de 1 800 personnes.
            </p>
            <p>
              Sa philosophie : l'excellence opérationnelle, l'innovation continue et l'impact social positif. Sous sa direction, le Groupe Rishom est devenu une référence en matière de gouvernance d'entreprise et de responsabilité sociale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#F5F1E8] p-4 rounded-lg">
              <GraduationCap className="w-6 h-6 text-[#8B1538] mb-2" />
              <h3 className="font-bold text-[#3A3A3C] mb-1">Formation</h3>
              <ul className="text-sm text-[#3A3A3C] space-y-1">
                <li>MBA HEC Paris (2015)</li>
                <li>Licence Gestion, Université Ouaga (2008)</li>
              </ul>
            </div>
            <div className="bg-[#F5F1E8] p-4 rounded-lg">
              <Award className="w-6 h-6 text-[#8B1538] mb-2" />
              <h3 className="font-bold text-[#3A3A3C] mb-1">Reconnaissances</h3>
              <ul className="text-sm text-[#3A3A3C] space-y-1">
                <li>Entrepreneur de l'Année 2023</li>
                <li>Chevalier de l'Ordre du Mérite</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <a 
              href="mailto:alassane.rishom@rishom-group.com" 
              className="flex items-center text-[#8B1538] hover:text-[#3A3A3C] transition-colors"
              data-testid="link-ceo-email"
            >
              <Mail className="w-5 h-5 mr-2" />
              <span className="text-sm">alassane.rishom@rishom-group.com</span>
            </a>
            <a 
              href="#" 
              className="flex items-center text-[#8B1538] hover:text-[#3A3A3C] transition-colors"
              data-testid="link-ceo-linkedin"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              <span className="text-sm">LinkedIn</span>
            </a>
          </div>
        </div>
        
        <div className="order-1 md:order-2">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B1538] to-[#B8956A] rounded-2xl transform rotate-3" />
            <img 
              src={pdgImage}
              alt="Alassane Rishom, PDG Groupe Rishom"
              className="relative rounded-2xl shadow-2xl w-full"
              data-testid="img-ceo-portrait"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

const executives = [
  {
    name: 'Sophie Diallo',
    position: 'Directrice Financière Groupe',
    entity: 'GROUPE RISHOM',
    entityColor: '#8B1538',
    image: cfoImage,
    bio: "Experte comptable SYSCOHADA avec 15 ans d'expérience dans l'audit et le contrôle de gestion. A piloté la certification ISO et la structuration financière du Groupe.",
    education: ['Master Finance, ESSEC Paris', 'Expert-comptable ONECCA'],
    experience: '15 ans',
    email: 'sophie.diallo@rishom-group.com',
    achievements: ['Certification ISO Groupe', 'Notation A- obtenue', 'Levée 3 Mds FCFA']
  },
  {
    name: 'Moussa Sawadogo',
    position: 'Directeur Général RBF',
    entity: 'RBF',
    entityColor: '#C74634',
    image: dgRbfImage,
    bio: "Ingénieur civil avec 18 ans dans le BTP. A dirigé des projets d'infrastructure majeurs au Burkina et en Côte d'Ivoire. Leader reconnu du secteur.",
    education: ['Ingénieur Génie Civil, 2iE', 'MBA Construction, ESTP Paris'],
    experience: '18 ans',
    email: 'moussa.sawadogo@rbf.bf',
    achievements: ['CA RBF x3 en 5 ans', '500+ chantiers livrés', 'Certification ISO 9001']
  },
  {
    name: 'Karim Ouédraogo',
    position: 'Directeur Général RIC',
    entity: 'RIC',
    entityColor: '#8B1538',
    image: dgRicImage,
    bio: 'Consultant senior avec expérience internationale (McKinsey, Boston Consulting Group). Spécialiste stratégie de croissance pour PME africaines.',
    education: ['MBA HEC Paris', 'Ingénieur Polytechnique Montréal'],
    experience: '12 ans',
    email: 'karim.ouedraogo@ric.bf',
    achievements: ['80+ missions conseil', 'Expansion CEDEAO', '96% satisfaction clients']
  },
  {
    name: 'Fatimata Traoré',
    position: "Directrice Générale REV'I",
    entity: "REV'I",
    entityColor: '#058B5E',
    image: dgReviImage,
    bio: "Agronome spécialisée en agriculture durable et sécurité alimentaire. Pionnière de l'agro-écologie au Burkina Faso.",
    education: ['PhD Agronomie, Montpellier SupAgro', 'Ingénieur Agro, IDR Bobo'],
    experience: '14 ans',
    email: 'fatimata.traore@revi.bf',
    achievements: ['Production x5 en 4 ans', 'Label RSE Agri', '1200 producteurs accompagnés']
  },
  {
    name: 'Ibrahim Compaoré',
    position: 'Directeur Général RBA',
    entity: 'RBA',
    entityColor: '#2E5A9C',
    image: dgRbaImage,
    bio: "Pédagogue et entrepreneur social, ancien directeur d'école de commerce. Passion pour l'éducation et l'employabilité des jeunes africains.",
    education: ['Doctorat Sciences Éducation, Sorbonne', 'MBA INSEAD'],
    experience: '16 ans',
    email: 'ibrahim.compaore@rba.bf',
    achievements: ['3500+ diplômés', '87% taux insertion', 'Partenariat Université']
  },
  {
    name: 'Aïcha Zanré',
    position: 'Directrice Ressources Humaines Groupe',
    entity: 'GROUPE RISHOM',
    entityColor: '#8B1538',
    image: drhImage,
    bio: 'Experte RH et transformation organisationnelle. A mis en place la politique diversité et inclusion du Groupe.',
    education: ['Master RH, IGS Paris', 'Psychologue du travail'],
    experience: '13 ans',
    email: 'aicha.zanre@rishom-group.com',
    achievements: ['42% femmes effectifs', 'Turnover 8%', 'Climat social excellent']
  }
];

const ExecutiveTeamSection = () => (
  <section className="py-20 bg-[#F5F1E8]">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#3A3A3C] mb-4">
          Comité de Direction
        </h2>
        <p className="text-lg text-[#707070] max-w-2xl mx-auto">
          Une équipe pluridisciplinaire au service de l'excellence opérationnelle
        </p>
      </motion.div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {executives.map((exec, index) => (
          <motion.div
            key={exec.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow h-full border-none" data-testid={`card-executive-${index}`}>
              <div className="relative h-72">
                <img 
                  src={exec.image}
                  alt={exec.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <span 
                    className="inline-block text-white px-3 py-1 rounded-full text-xs font-bold mb-2"
                    style={{ backgroundColor: exec.entityColor }}
                  >
                    {exec.entity}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1">{exec.name}</h3>
                  <p className="text-white/90 text-sm">{exec.position}</p>
                </div>
              </div>
              
              <CardContent className="p-6">
                <p className="text-[#3A3A3C] text-sm mb-4">{exec.bio}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2">
                    <GraduationCap className="w-5 h-5 text-[#8B1538] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-[#3A3A3C] mb-1">Formation</div>
                      {exec.education.map((edu, i) => (
                        <div key={i} className="text-xs text-[#707070]">{edu}</div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Briefcase className="w-5 h-5 text-[#8B1538] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-[#3A3A3C] mb-1">Expérience</div>
                      <div className="text-xs text-[#707070]">{exec.experience}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-[#8B1538] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-[#3A3A3C] mb-1">Réalisations clés</div>
                      {exec.achievements.map((ach, i) => (
                        <div key={i} className="text-xs text-[#707070]">{ach}</div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-[#B8956A]/20 flex items-center justify-between gap-4">
                  <a 
                    href={`mailto:${exec.email}`}
                    className="flex items-center text-[#8B1538] hover:text-[#3A3A3C] transition-colors text-xs"
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    Contact
                  </a>
                  <a 
                    href="#"
                    className="flex items-center text-[#8B1538] hover:text-[#3A3A3C] transition-colors text-xs"
                  >
                    <Linkedin className="w-4 h-4 mr-1" />
                    Profil
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const AdvisoryBoardSection = () => {
  const advisors = [
    { name: 'Dr. Abdoulaye Koné', role: 'Conseiller stratégique', expertise: 'Expansion régionale' },
    { name: 'Marie-Louise Sankara', role: 'Conseil RSE', expertise: 'Développement durable' },
    { name: 'Jean-Baptiste Ouattara', role: 'Conseil juridique', expertise: 'Droit des affaires' },
    { name: 'Pr. Aminata Diallo', role: 'Conseil académique', expertise: 'Innovation & R&D' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#3A3A3C] mb-4">
            Conseil Consultatif
          </h2>
          <p className="text-lg text-[#707070] max-w-2xl mx-auto">
            Des experts qui apportent leur vision stratégique au Groupe
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advisors.map((advisor, index) => (
            <motion.div
              key={advisor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center p-6 hover:shadow-lg transition-shadow border-none" data-testid={`card-advisor-${index}`}>
                <div className="w-20 h-20 bg-[#8B1538]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#8B1538]">
                    {advisor.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-bold text-[#3A3A3C] mb-1">{advisor.name}</h3>
                <p className="text-sm text-[#8B1538] font-medium mb-2">{advisor.role}</p>
                <p className="text-xs text-[#707070]">{advisor.expertise}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Leadership() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <CEOSection />
        <ExecutiveTeamSection />
        <AdvisoryBoardSection />
      </main>
      <Footer />
    </div>
  );
}
