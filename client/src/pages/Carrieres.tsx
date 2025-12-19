import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Clock, DollarSign, Users, Search, Send, X, Award } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import heroImage from '@assets/generated_images/careers_page_hero_image.png';
import groupeLogoWhite from '@assets/LOGOS_DEF-06_1766102890554.png';

interface Job {
  id: number;
  title: string;
  entity: string;
  department: string;
  location: string;
  contract: string;
  experience: string;
  salary: string;
  posted: string;
  summary: string;
  description: string;
  missions: string[];
  requirements: string[];
  benefits: string[];
}

const jobs: Job[] = [
  {
    id: 1,
    title: 'Chef de Projet BTP',
    entity: 'RBF',
    department: 'Direction Technique',
    location: 'Ouagadougou',
    contract: 'CDI',
    experience: '5-8 ans',
    salary: '800K - 1.2M FCFA',
    posted: '3 jours',
    summary: 'Pilotage de projets de construction d\'envergure, coordination des équipes techniques et suivi des délais.',
    description: 'Nous recherchons un Chef de Projet expérimenté pour superviser nos chantiers stratégiques au Burkina Faso. Vous serez responsable de la gestion complète des projets de construction.',
    missions: [
      'Planifier et coordonner l\'ensemble des phases du projet',
      'Manager les équipes techniques (20-50 personnes)',
      'Assurer le respect des délais, budgets et normes qualité',
      'Gérer les relations avec les clients et sous-traitants',
      'Reporting régulier à la Direction Générale'
    ],
    requirements: [
      'Ingénieur Génie Civil ou équivalent (Bac+5)',
      'Minimum 5 ans d\'expérience en gestion de projets BTP',
      'Maîtrise des logiciels de gestion de projet (MS Project, Primavera)',
      'Leadership et excellentes capacités de communication',
      'Permis B obligatoire'
    ],
    benefits: [
      'Véhicule de fonction',
      'Assurance santé famille complète',
      'Prime de performance annuelle',
      'Formation continue',
      'Possibilité d\'évolution vers Direction Travaux'
    ]
  },
  {
    id: 2,
    title: 'Consultant Junior Stratégie',
    entity: 'RIC',
    department: 'Pôle Conseil',
    location: 'Ouagadougou',
    contract: 'CDI',
    experience: '2-4 ans',
    salary: '500K - 700K FCFA',
    posted: '1 semaine',
    summary: 'Accompagnement des entreprises dans leurs projets de transformation et développement stratégique.',
    description: 'Intégrez notre équipe conseil pour accompagner les PME et grandes entreprises africaines dans leurs défis stratégiques.',
    missions: [
      'Réaliser des diagnostics stratégiques et organisationnels',
      'Élaborer des plans de développement et business plans',
      'Accompagner les clients dans la mise en œuvre des recommandations',
      'Participer aux études de marché et analyses sectorielles',
      'Contribuer aux propositions commerciales'
    ],
    requirements: [
      'Master en Management, Économie ou École de Commerce',
      '2-4 ans d\'expérience en conseil ou audit',
      'Excellentes capacités analytiques et rédactionnelles',
      'Maîtrise parfaite du français, anglais professionnel',
      'Disponibilité pour déplacements régionaux'
    ],
    benefits: [
      'Formation aux méthodologies conseil',
      'Exposition à des missions variées',
      'Prime de mission',
      'Assurance santé premium',
      'Évolution rapide possible'
    ]
  },
  {
    id: 3,
    title: 'Responsable Production Agricole',
    entity: 'REV\'I',
    department: 'Exploitation',
    location: 'Bobo-Dioulasso',
    contract: 'CDI',
    experience: '6-10 ans',
    salary: '700K - 900K FCFA',
    posted: '2 semaines',
    summary: 'Supervision des exploitations agricoles et coordination des équipes de production sur le terrain.',
    description: 'Nous recherchons un expert agricole pour superviser nos exploitations et optimiser notre production en respectant les principes de l\'agriculture durable.',
    missions: [
      'Planifier et superviser les cycles de production',
      'Manager les équipes de terrain (100+ agriculteurs)',
      'Optimiser les rendements dans une logique durable',
      'Assurer la qualité des récoltes et leur traçabilité',
      'Développer les partenariats avec les producteurs locaux'
    ],
    requirements: [
      'Ingénieur Agronome (Bac+5) ou équivalent',
      'Minimum 6 ans d\'expérience en production agricole',
      'Connaissance des cultures locales (maïs, soja, sésame)',
      'Sensibilité aux enjeux environnementaux',
      'Capacité à travailler en milieu rural'
    ],
    benefits: [
      'Logement de fonction',
      'Véhicule tout-terrain',
      'Prime de rendement',
      'Assurance santé complète',
      'Participation aux bénéfices'
    ]
  },
  {
    id: 4,
    title: 'Formateur Technique BTP',
    entity: 'RBA',
    department: 'Pédagogie',
    location: 'Ouagadougou',
    contract: 'CDI',
    experience: '8+ ans',
    salary: '600K - 800K FCFA',
    posted: '5 jours',
    summary: 'Animation de formations techniques pour les professionnels du BTP et les jeunes en insertion.',
    description: 'Rejoignez notre académie pour former la prochaine génération de professionnels du BTP au Burkina Faso.',
    missions: [
      'Concevoir et animer des modules de formation technique',
      'Accompagner les apprenants dans leur parcours',
      'Développer des supports pédagogiques innovants',
      'Évaluer les compétences acquises',
      'Maintenir un lien avec les entreprises partenaires'
    ],
    requirements: [
      'BTS/DUT Génie Civil minimum + expérience terrain significative',
      '8 ans d\'expérience en BTP dont 3 en formation',
      'Pédagogie et patience',
      'Maîtrise des techniques de construction modernes',
      'Capacité à vulgariser les concepts techniques'
    ],
    benefits: [
      'Horaires adaptés',
      'Vacances scolaires',
      'Formation de formateurs',
      'Assurance santé',
      'Impact social direct'
    ]
  },
  {
    id: 5,
    title: 'Contrôleur de Gestion',
    entity: 'Groupe',
    department: 'Finance',
    location: 'Ouagadougou',
    contract: 'CDI',
    experience: '4-6 ans',
    salary: '650K - 850K FCFA',
    posted: '1 jour',
    summary: 'Pilotage de la performance financière et accompagnement des entités dans le suivi budgétaire.',
    description: 'Intégrez la Direction Financière du Groupe pour piloter la performance et accompagner notre croissance.',
    missions: [
      'Élaborer et suivre les budgets des entités',
      'Produire les reportings mensuels consolidés',
      'Analyser les écarts et proposer des actions correctives',
      'Accompagner les opérationnels dans le pilotage',
      'Contribuer aux projets transverses (ERP, BI)'
    ],
    requirements: [
      'Master Finance/Contrôle de Gestion ou DESCF',
      '4-6 ans d\'expérience en contrôle de gestion',
      'Maîtrise avancée d\'Excel et outils BI',
      'Connaissance des ERP (SAP, Sage)',
      'Rigueur et sens de la synthèse'
    ],
    benefits: [
      'Bonus annuel sur objectifs',
      'Assurance santé premium',
      'Tickets restaurant',
      'Formation continue',
      'Évolution vers DAF entité'
    ]
  },
  {
    id: 6,
    title: 'Stagiaire Marketing Digital',
    entity: 'Groupe',
    department: 'Communication',
    location: 'Ouagadougou',
    contract: 'Stage',
    experience: 'Étudiant Bac+4/5',
    salary: '150K FCFA',
    posted: '2 jours',
    summary: 'Support à l\'équipe communication dans la gestion des réseaux sociaux et campagnes digitales.',
    description: 'Stage de 6 mois pour accompagner le développement de notre présence digitale.',
    missions: [
      'Gérer les publications sur les réseaux sociaux',
      'Créer du contenu visuel (Canva, Adobe)',
      'Analyser les performances des campagnes',
      'Participer à l\'organisation d\'événements',
      'Contribuer à la veille concurrentielle'
    ],
    requirements: [
      'Étudiant Bac+4/5 en Marketing/Communication',
      'Maîtrise des réseaux sociaux professionnels',
      'Créativité et sens de l\'image',
      'Bon niveau rédactionnel',
      'Autonomie et proactivité'
    ],
    benefits: [
      'Indemnité de stage attractive',
      'Possibilité d\'embauche',
      'Encadrement de qualité',
      'Environnement stimulant',
      'Tickets transport'
    ]
  }
];

const entityColors: Record<string, string> = {
  'RBF': '#C74634',
  'RIC': '#8B1538',
  'REV\'I': '#058B5E',
  'RBA': '#2E5A9C',
  'Groupe': '#8B1538'
};

const HeroSection = () => (
  <section className="relative h-[50vh] flex items-center">
    <div className="absolute inset-0">
      <img 
        src={heroImage}
        alt="Carrières Groupe Rishom"
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
        <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-careers-title">
          Rejoins Notre Équipe
        </h1>
        <p className="text-xl text-white/90">
          Construis ta carrière dans un groupe en pleine croissance qui façonne l'avenir de l'Afrique.
        </p>
      </motion.div>
    </div>
  </section>
);

interface FilterState {
  search: string;
  entity: string;
  contract: string;
  location: string;
}

const FilterSection = ({ filters, setFilters, jobCount }: { 
  filters: FilterState; 
  setFilters: (f: FilterState) => void;
  jobCount: number;
}) => {
  return (
    <section className="py-6 bg-[#F5F1E8] sticky top-[64px] z-30 shadow-md">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B8956A]" />
            <Input
              type="text"
              placeholder="Rechercher un poste..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="pl-10 border-[#B8956A]/30 focus:border-[#8B1538]"
              data-testid="input-search-job"
            />
          </div>

          <Select 
            value={filters.entity} 
            onValueChange={(value) => setFilters({ ...filters, entity: value })}
          >
            <SelectTrigger className="border-[#B8956A]/30" data-testid="select-entity">
              <SelectValue placeholder="Toutes les entités" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Toutes">Toutes les entités</SelectItem>
              <SelectItem value="RBF">RBF</SelectItem>
              <SelectItem value="RIC">RIC</SelectItem>
              <SelectItem value="REV'I">REV'I</SelectItem>
              <SelectItem value="RBA">RBA</SelectItem>
              <SelectItem value="Groupe">Groupe</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={filters.contract} 
            onValueChange={(value) => setFilters({ ...filters, contract: value })}
          >
            <SelectTrigger className="border-[#B8956A]/30" data-testid="select-contract">
              <SelectValue placeholder="Tous les contrats" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tous">Tous les contrats</SelectItem>
              <SelectItem value="CDI">CDI</SelectItem>
              <SelectItem value="CDD">CDD</SelectItem>
              <SelectItem value="Stage">Stage</SelectItem>
              <SelectItem value="Alternance">Alternance</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={filters.location} 
            onValueChange={(value) => setFilters({ ...filters, location: value })}
          >
            <SelectTrigger className="border-[#B8956A]/30" data-testid="select-location">
              <SelectValue placeholder="Toutes les villes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Toutes">Toutes les villes</SelectItem>
              <SelectItem value="Ouagadougou">Ouagadougou</SelectItem>
              <SelectItem value="Bobo-Dioulasso">Bobo-Dioulasso</SelectItem>
              <SelectItem value="Abidjan">Abidjan</SelectItem>
              <SelectItem value="Dakar">Dakar</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="mt-4 text-center text-sm text-[#3A3A3C]">
          <strong>{jobCount}</strong> offre{jobCount > 1 ? 's' : ''} disponible{jobCount > 1 ? 's' : ''}
        </div>
      </div>
    </section>
  );
};

const JobCard = ({ job, onClick }: { job: Job; onClick: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
  >
    <Card 
      className="cursor-pointer border-none shadow-lg h-full"
      onClick={onClick}
      data-testid={`card-job-${job.id}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <span 
              className="inline-block px-3 py-1 rounded-full text-white text-xs font-bold mb-3"
              style={{ backgroundColor: entityColors[job.entity] }}
            >
              {job.entity}
            </span>
            <h3 className="text-xl font-bold text-[#3A3A3C] mb-2">{job.title}</h3>
            <p className="text-[#B8956A] font-semibold">{job.department}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="inline-block bg-[#F5F1E8] text-[#8B1538] px-3 py-1 rounded-full text-xs font-semibold">
              {job.contract}
            </span>
          </div>
        </div>

        <p className="text-[#3A3A3C] text-sm mb-4 line-clamp-2">{job.summary}</p>

        <div className="grid grid-cols-2 gap-3 text-sm text-[#3A3A3C]">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#8B1538]" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#8B1538]" />
            <span>{job.experience}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#8B1538]" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#8B1538]" />
            <span>Il y a {job.posted}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[#B8956A]/20">
          <Button className="w-full bg-[#8B1538] hover:bg-[#3A3A3C]">
            Voir l'offre complète
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const JobModal = ({ job, onClose }: { job: Job | null; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverLetter: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Candidature envoyée avec succès ! Nous reviendrons vers vous sous 5 jours ouvrés.');
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  if (!job) return null;

  return (
    <Dialog open={!!job} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#3A3A3C]">
            {job.title}
          </DialogTitle>
          <p className="text-[#B8956A]">{job.entity} - {job.department}</p>
        </DialogHeader>

        <div className="grid md:grid-cols-4 gap-4 my-6">
          <div className="bg-[#F5F1E8] p-4 rounded-lg text-center">
            <MapPin className="w-6 h-6 text-[#8B1538] mx-auto mb-2" />
            <div className="text-xs text-[#707070] mb-1">Localisation</div>
            <div className="font-bold text-[#3A3A3C] text-sm">{job.location}</div>
          </div>
          <div className="bg-[#F5F1E8] p-4 rounded-lg text-center">
            <Briefcase className="w-6 h-6 text-[#8B1538] mx-auto mb-2" />
            <div className="text-xs text-[#707070] mb-1">Type</div>
            <div className="font-bold text-[#3A3A3C] text-sm">{job.contract}</div>
          </div>
          <div className="bg-[#F5F1E8] p-4 rounded-lg text-center">
            <Clock className="w-6 h-6 text-[#8B1538] mx-auto mb-2" />
            <div className="text-xs text-[#707070] mb-1">Expérience</div>
            <div className="font-bold text-[#3A3A3C] text-sm">{job.experience}</div>
          </div>
          <div className="bg-[#F5F1E8] p-4 rounded-lg text-center">
            <DollarSign className="w-6 h-6 text-[#8B1538] mx-auto mb-2" />
            <div className="text-xs text-[#707070] mb-1">Salaire</div>
            <div className="font-bold text-[#3A3A3C] text-sm">{job.salary}</div>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-lg font-bold text-[#3A3A3C] mb-3">Description du poste</h3>
            <p className="text-[#707070]">{job.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#3A3A3C] mb-3">Missions principales</h3>
            <ul className="space-y-2">
              {job.missions.map((mission, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#8B1538] mt-1">-</span>
                  <span className="text-[#707070]">{mission}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#3A3A3C] mb-3">Profil recherché</h3>
            <ul className="space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#8B1538] mt-1">-</span>
                  <span className="text-[#707070]">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#3A3A3C] mb-3">Ce que nous offrons</h3>
            <ul className="space-y-2">
              {job.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#8B1538] mt-1">-</span>
                  <span className="text-[#707070]">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#B8956A]/20 pt-6">
          <h3 className="text-xl font-bold text-[#3A3A3C] mb-4">Postuler à cette offre</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#3A3A3C] mb-2">Prénom *</label>
                <Input
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="border-[#B8956A]/30"
                  data-testid="input-firstname"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3A3A3C] mb-2">Nom *</label>
                <Input
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="border-[#B8956A]/30"
                  data-testid="input-lastname"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#3A3A3C] mb-2">Email *</label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border-[#B8956A]/30"
                  data-testid="input-email"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3A3A3C] mb-2">Téléphone *</label>
                <Input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="border-[#B8956A]/30"
                  data-testid="input-phone"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#3A3A3C] mb-2">Lettre de motivation</label>
              <Textarea
                value={formData.coverLetter}
                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                className="border-[#B8956A]/30 min-h-[120px]"
                placeholder="Présentez-vous et expliquez votre motivation..."
                data-testid="textarea-cover-letter"
              />
            </div>

            <div className="flex gap-4">
              <Button 
                type="submit" 
                className="flex-1 bg-[#8B1538] hover:bg-[#3A3A3C]"
                disabled={isSubmitting}
                data-testid="button-submit-application"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma candidature'}
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={onClose}
                data-testid="button-cancel"
              >
                <X className="w-4 h-4 mr-2" />
                Annuler
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const WhyJoinSection = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-[#3A3A3C] mb-4">Pourquoi nous rejoindre ?</h2>
        <p className="text-lg text-[#707070] max-w-2xl mx-auto">
          Intégrez un groupe en pleine expansion qui investit dans ses talents
        </p>
      </motion.div>
      
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { icon: Users, title: '1800+', subtitle: 'Collaborateurs' },
          { icon: Award, title: '42%', subtitle: 'Femmes' },
          { icon: Briefcase, title: '5', subtitle: 'Entités' },
          { icon: MapPin, title: '4', subtitle: 'Pays' }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="text-center p-6 border-none shadow-md">
              <stat.icon className="w-8 h-8 text-[#8B1538] mx-auto mb-3" />
              <div className="text-3xl font-bold text-[#8B1538] mb-1">{stat.title}</div>
              <div className="text-sm text-[#707070]">{stat.subtitle}</div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default function Carrieres() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    entity: 'Toutes',
    contract: 'Tous',
    location: 'Toutes'
  });
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                          job.department.toLowerCase().includes(filters.search.toLowerCase());
    const matchesEntity = filters.entity === 'Toutes' || job.entity === filters.entity;
    const matchesContract = filters.contract === 'Tous' || job.contract === filters.contract;
    const matchesLocation = filters.location === 'Toutes' || job.location === filters.location;
    
    return matchesSearch && matchesEntity && matchesContract && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <FilterSection 
          filters={filters} 
          setFilters={setFilters} 
          jobCount={filteredJobs.length}
        />
        
        <section className="py-12 bg-[#F5F1E8]">
          <div className="container mx-auto px-4">
            {filteredJobs.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onClick={() => setSelectedJob(job)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-[#707070] text-lg">
                  Aucune offre ne correspond à vos critères de recherche.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setFilters({ search: '', entity: 'Toutes', contract: 'Tous', location: 'Toutes' })}
                  data-testid="button-reset-filters"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </section>

        <WhyJoinSection />
        
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      </main>
      <Footer />
    </div>
  );
}
