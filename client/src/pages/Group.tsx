import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  Target, 
  Briefcase, 
  Award,
  Globe,
  Lightbulb,
  Shield,
  BarChart3
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import groupeLogoWhite from '@assets/LOGOS_DEF-06_1766102890554.png';

export default function Group() {
  const subsidiaries = [
    {
      name: 'RBF',
      fullName: 'Rishom BTP & Fournitures',
      description: 'Leader burkinabè du BTP, location d\'engins et fourniture de matériaux de construction.',
      created: '2010',
      color: 'from-[#C74634] to-[#8B1538]',
      bgColor: 'bg-[#C74634]',
      revenue: '8 milliards FCFA',
      employees: 180,
      icon: Building2,
      link: '/rbf'
    },
    {
      name: 'RIC',
      fullName: 'Rishom Ingénierie & Conseil',
      description: 'Cabinet de conseil stratégique, audit et accompagnement de projets structurants.',
      created: '2015',
      color: 'from-[#8B1538] to-[#6B0F2A]',
      bgColor: 'bg-[#8B1538]',
      revenue: '3,5 milliards FCFA',
      employees: 45,
      icon: Lightbulb,
      link: '/ric'
    },
    {
      name: 'REV\'I',
      fullName: 'REV\'I Agrobusiness',
      description: 'Production agricole, élevage, transformation et distribution de produits alimentaires.',
      created: '2018',
      color: 'from-[#058B5E] to-[#046B47]',
      bgColor: 'bg-[#058B5E]',
      revenue: '5 milliards FCFA',
      employees: 320,
      icon: Globe,
      link: '/revi'
    },
    {
      name: 'RBA',
      fullName: 'Rishom Business Academy',
      description: 'Centre de formation professionnelle et diplômante en gestion, commerce et management.',
      created: '2020',
      color: 'from-[#2E5A9C] to-[#1E4A8C]',
      bgColor: 'bg-[#2E5A9C]',
      revenue: '1,5 milliard FCFA',
      employees: 35,
      icon: Award,
      link: '/rba'
    }
  ];

  const values = [
    {
      title: 'Excellence',
      description: 'Nous visons la perfection dans chaque projet, service et formation que nous délivrons.',
      icon: Award
    },
    {
      title: 'Innovation',
      description: 'Nous adoptons les meilleures pratiques internationales et les technologies modernes.',
      icon: Lightbulb
    },
    {
      title: 'Intégrité',
      description: 'Transparence, éthique et respect des engagements guident toutes nos actions.',
      icon: Shield
    },
    {
      title: 'Impact local',
      description: 'Nous contribuons activement au développement économique et social du Burkina Faso.',
      icon: Target
    }
  ];

  const keyFigures = [
    { label: 'Chiffre d\'affaires consolidé 2024', value: '18 milliards FCFA', icon: BarChart3 },
    { label: 'Collaborateurs', value: '580+', icon: Users },
    { label: 'Années d\'expérience', value: '14 ans', icon: TrendingUp },
    { label: 'Filiales actives', value: '4', icon: Briefcase }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <section className="relative bg-gradient-to-br from-[#8B1538] via-[#6B0F2A] to-[#4A0A1D] text-white py-24 px-4 overflow-hidden pt-32">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJWMThoMnYxNnptMCAxNmgtMlY0MGgydjEwem0tNi0yNGgtMlYxOGgydjh6bTAtMTZoLTJWMmgydjh6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
          </div>
          
          <div className="max-w-6xl mx-auto relative">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <img 
                src={groupeLogoWhite} 
                alt="Groupe Rishom" 
                className="h-20 mx-auto mb-6"
              />
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Building2 className="w-4 h-4" />
                Holding burkinabè
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Groupe <span className="text-white/80">Rishom</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8">
                Un écosystème intégré de 4 filiales au service du développement économique du Burkina Faso
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-md shadow-lg border border-border"
              >
                <div className="w-12 h-12 bg-[#8B1538]/10 rounded-full flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-[#8B1538]" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Notre vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Devenir le premier groupe privé burkinabè multi-sectoriel reconnu pour son excellence opérationnelle, 
                  son innovation et son impact positif sur le développement du pays.
                </p>
              </motion.div>

              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-md shadow-lg border border-border"
              >
                <div className="w-12 h-12 bg-[#058B5E]/10 rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-[#058B5E]" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Notre mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Offrir des solutions de qualité internationale dans le BTP, le conseil, l'agrobusiness et la formation, 
                  tout en créant de la valeur durable pour nos clients, partenaires et collaborateurs.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Le Groupe en chiffres
              </h2>
              <p className="text-xl text-muted-foreground">
                Des indicateurs qui témoignent de notre croissance et de notre impact
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {keyFigures.map((figure, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#8B1538]/5 p-6 rounded-md border border-[#8B1538]/10 text-center"
                  data-testid={`stat-${index}`}
                >
                  <figure.icon className="w-8 h-8 text-[#8B1538] mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-2">{figure.value}</div>
                  <div className="text-sm text-muted-foreground">{figure.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Nos 4 filiales
              </h2>
              <p className="text-xl text-muted-foreground">
                Un portefeuille diversifié et complémentaire
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {subsidiaries.map((sub, index) => (
                <Link key={index} href={sub.link}>
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-md shadow-lg overflow-hidden border border-border hover:shadow-2xl transition group cursor-pointer"
                    data-testid={`card-subsidiary-${sub.name}`}
                  >
                    <div className={`h-2 bg-gradient-to-r ${sub.color}`}></div>
                    <div className="p-8">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${sub.color} rounded-md flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition`}>
                          <sub.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-1">{sub.name}</h3>
                          <p className="text-sm text-muted-foreground">Créée en {sub.created}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground font-medium mb-6">{sub.fullName}</p>
                      <p className="text-muted-foreground mb-6">{sub.description}</p>
                      <div className="flex justify-between items-center gap-4 pt-4 border-t border-border">
                        <div>
                          <div className="text-sm text-muted-foreground">CA 2024</div>
                          <div className="font-bold text-foreground">{sub.revenue}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Effectif</div>
                          <div className="font-bold text-foreground">{sub.employees} personnes</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Nos valeurs fondamentales
              </h2>
              <p className="text-xl text-muted-foreground">
                Les principes qui guident chaque décision et action du Groupe
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card p-6 rounded-md border border-border text-center hover:shadow-lg transition"
                  data-testid={`card-value-${index}`}
                >
                  <div className="w-12 h-12 bg-[#8B1538]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-[#8B1538]" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gradient-to-br from-[#8B1538] to-[#6B0F2A] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Rejoignez l'aventure Rishom
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Explorez nos opportunités de carrière, de partenariat ou de collaboration
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/carrieres"
                  data-testid="link-careers"
                  className="bg-white text-[#8B1538] px-8 py-4 rounded-md font-semibold transition-all duration-200 hover:shadow-xl"
                >
                  Voir les offres d'emploi
                </Link>
                <Link
                  href="/contact"
                  data-testid="link-contact"
                  className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-md font-semibold transition-all duration-200 hover:bg-white/30"
                >
                  Devenir partenaire
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
