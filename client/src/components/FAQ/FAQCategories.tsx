import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    category: "Questions générales",
    color: "#8B1538",
    questions: [
      {
        q: "Qu'est-ce que le Groupe Rishom ?",
        a: "Le Groupe Rishom est un acteur majeur du développement économique en Afrique de l'Ouest, présent dans 5 secteurs stratégiques : BTP et fournitures (RBF), investissement et conseil (RIC), agro-business (REV'I), formation professionnelle (RBA). Fondé il y a plus de 15 ans, le groupe emploie plus de 500 collaborateurs et opère dans 4 pays.",
      },
      {
        q: "Dans quels pays êtes-vous présents ?",
        a: "Le Groupe Rishom est présent principalement au Burkina Faso (siège social à Ouagadougou), avec des activités dans 3 autres pays d'Afrique de l'Ouest : Côte d'Ivoire, Mali et Niger. Nous développons actuellement notre présence au Sénégal et au Bénin.",
      },
      {
        q: "Comment contacter le Groupe Rishom ?",
        a: "Vous pouvez nous contacter via notre formulaire en ligne sur la page Contact, par email à contact@rishom-group.com, ou par téléphone au +226 70 00 00 00. Chaque entité dispose également de ses propres coordonnées disponibles sur leurs pages respectives.",
      },
      {
        q: "Quelle est la différence entre le Groupe et les entités ?",
        a: "Le Groupe Rishom est la holding qui coordonne la stratégie globale. Les 4 entités (RBF, RIC, REV'I, RBA) sont des filiales autonomes spécialisées dans leurs domaines respectifs, avec leurs propres équipes, offres et expertises.",
      },
    ],
  },
  {
    category: "Carrières & Recrutement",
    color: "#2E5A9C",
    questions: [
      {
        q: "Comment postuler au Groupe Rishom ?",
        a: "Consultez nos offres d'emploi sur la page Carrières et postulez directement en ligne. Vous pouvez également envoyer une candidature spontanée via le formulaire dédié. Nous examinons toutes les candidatures avec attention et revenons vers les profils correspondant à nos besoins dans un délai de 2 semaines.",
      },
      {
        q: "Quels profils recrutez-vous ?",
        a: "Nous recrutons des profils variés : ingénieurs BTP, consultants, agronomes, formateurs, comptables, commerciaux, etc. Du niveau technicien au cadre supérieur, nous recherchons des talents passionnés et engagés pour contribuer au développement de l'Afrique.",
      },
      {
        q: "Proposez-vous des stages et alternances ?",
        a: "Oui, nous accueillons chaque année plus de 50 stagiaires et alternants dans toutes nos entités. Les stages durent généralement entre 3 et 6 mois. Consultez nos offres sur la page Carrières ou envoyez votre candidature spontanée.",
      },
      {
        q: "Quels sont les avantages pour les employés ?",
        a: "Nous offrons une rémunération compétitive, une couverture santé complète, des formations continues via RBA, des opportunités d'évolution interne, un environnement multiculturel, et des avantages sociaux (primes, participation aux bénéfices, etc.).",
      },
    ],
  },
  {
    category: "Projets & Partenariats",
    color: "#C74634",
    questions: [
      {
        q: "Comment soumettre un projet au Groupe Rishom ?",
        a: "Pour soumettre un projet d'investissement, contactez RIC via ric@rishom-group.com avec un executive summary de votre projet. Notre équipe l'examinera sous 10 jours ouvrés et reviendra vers vous si le projet correspond à nos critères d'investissement.",
      },
      {
        q: "Dans quels secteurs investissez-vous ?",
        a: "Via RIC, nous investissons prioritairement dans l'immobilier, l'agro-industrie, les infrastructures, les énergies renouvelables et les technologies. Nous recherchons des projets à fort impact social et environnemental, avec un potentiel de rentabilité solide.",
      },
      {
        q: "Comment devenir partenaire du Groupe ?",
        a: "Consultez notre page Partenaires et remplissez le formulaire de contact en précisant le type de partenariat envisagé (commercial, technique, financier, académique). Notre équipe évaluera votre proposition et vous recontactera rapidement.",
      },
      {
        q: "Travaillez-vous avec des PME locales ?",
        a: "Absolument. Nous privilégions les partenariats avec les entreprises locales dans le cadre de nos projets. Plus de 70% de nos fournisseurs sont des PME burkinabè et ouest-africaines. Nous croyons fermement au développement de l'écosystème entrepreneurial local.",
      },
    ],
  },
  {
    category: "Services par entité",
    color: "#058B5E",
    questions: [
      {
        q: "Quels services propose RBF ?",
        a: "RBF propose la vente et location d'engins BTP, la fourniture de matériaux de construction, la maintenance d'équipements, le conseil technique, et la logistique BTP. Consultez la page RBF pour plus de détails sur nos offres et notre catalogue complet.",
      },
      {
        q: "Comment RIC peut-il aider mon entreprise ?",
        a: "RIC offre du conseil stratégique, de l'accompagnement à la levée de fonds, des études de faisabilité, de l'optimisation opérationnelle, et de l'analyse financière. Prenez rendez-vous pour un diagnostic gratuit de vos besoins.",
      },
      {
        q: "Où acheter les produits REV'I ?",
        a: "Les produits REV'I (viandes, œufs, produits laitiers, céréales) sont disponibles dans nos points de vente à Ouagadougou, Bobo-Dioulasso et Koudougou, ainsi que chez nos distributeurs partenaires. Consultez la liste complète sur la page REV'I.",
      },
      {
        q: "Comment s'inscrire aux formations RBA ?",
        a: "Consultez notre calendrier de formations sur la page RBA, choisissez votre programme et remplissez le formulaire d'inscription en ligne. Les inscriptions se font par session (3 sessions par an). Places limitées, inscription par ordre d'arrivée.",
      },
    ],
  },
  {
    category: "Responsabilité & Engagement",
    color: "#8B1538",
    questions: [
      {
        q: "Quelles sont vos actions RSE ?",
        a: "Nos actions RSE s'articulent autour de 4 piliers : social (2000+ emplois créés, égalité H/F), environnement (réduction CO2, énergies renouvelables), communautaire (50 projets/an, accès à l'eau), et éducation (1000 formations/an). Consultez notre page RSE pour en savoir plus.",
      },
      {
        q: "Le Groupe est-il certifié ?",
        a: "Oui, nous détenons plusieurs certifications : ISO 9001 (qualité), ISO 14001 (environnement), ISO 22000 (sécurité alimentaire), ISO 45001 (santé-sécurité), Label RSE Engagé, et Qualiopi (formation). Consultez notre page Certifications pour le détail.",
      },
      {
        q: "Comment le Groupe contribue-t-il au développement local ?",
        a: "Nous créons des emplois locaux (60% dans les zones rurales), formons des jeunes gratuitement, soutenons des projets communautaires, construisons des infrastructures (puits, centres de santé), et privilégions les fournisseurs locaux dans nos achats.",
      },
      {
        q: "Publiez-vous vos rapports financiers ?",
        a: "Oui, nous publions annuellement nos rapports d'activité, rapports financiers consolidés, rapports RSE et rapports de gouvernance. Ils sont tous disponibles en téléchargement sur nos pages Gouvernance et Espace Presse.",
      },
    ],
  },
];

export default function FAQCategories() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {faqData.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12 last:mb-0"
            >
              <h2
                className="text-3xl md:text-4xl font-bold mb-8"
                style={{ color: category.color }}
              >
                {category.category}
              </h2>

              <div className="space-y-4">
                {category.questions.map((item, qIndex) => {
                  const key = `${catIndex}-${qIndex}`;
                  const isOpen = openItems[key];

                  return (
                    <motion.div
                      key={qIndex}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: qIndex * 0.05 }}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleItem(catIndex, qIndex)}
                        className="w-full flex items-center justify-between p-6 text-left bg-[#F5F1E8] hover:bg-[#F5F1E8]/70 transition-colors"
                        data-testid={`faq-toggle-${catIndex}-${qIndex}`}
                      >
                        <span className="text-lg font-semibold text-[#1A1A1A] pr-4">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          style={{ color: category.color }}
                        />
                      </button>

                      <motion.div
                        initial={false}
                        animate={{
                          height: isOpen ? "auto" : 0,
                          opacity: isOpen ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-white">
                          <p className="text-[#3A3A3C] leading-relaxed">
                            {item.a}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
