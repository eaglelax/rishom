import { motion } from "framer-motion";
import factoryInteriorImage from "@assets/generated_images/revi_food_processing_burkina.png";

export default function ArticleContent() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto prose prose-lg prose-slate"
        >
          {/* Introduction */}
          <p className="text-xl text-[#3A3A3C] leading-relaxed mb-8">
            Le Groupe Rishom franchit une nouvelle étape dans son développement avec l'inauguration
            d'une usine ultramoderne de transformation agricole. Cet investissement majeur de 80
            millions FCFA marque la volonté du groupe de renforcer la souveraineté alimentaire du
            Burkina Faso tout en créant des opportunités d'emploi dans la région.
          </p>

          {/* Section 1 */}
          <h2 className="text-3xl font-bold text-[#8B1538] mt-12 mb-6">
            Un investissement stratégique pour l'économie locale
          </h2>
          <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
            L'usine, située dans la zone industrielle de Koudougou, dispose d'une capacité de
            traitement de 10 tonnes de produits agricoles par jour. Elle intègre les technologies
            les plus récentes en matière de transformation et de conditionnement, garantissant ainsi
            la qualité et la traçabilité des produits.
          </p>
          <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
            Ce projet s'inscrit dans la stratégie de REV'I de maîtriser l'ensemble de la chaîne de
            valeur, de la production à la distribution. L'objectif est de réduire les pertes
            post-récolte et d'offrir aux consommateurs des produits transformés de haute qualité à
            des prix compétitifs.
          </p>

          {/* Quote */}
          <blockquote className="border-l-4 border-[#8B1538] pl-6 py-4 my-8 bg-[#F5F1E8] rounded-r-lg">
            <p className="text-xl italic text-[#3A3A3C] mb-3">
              "Cette usine représente bien plus qu'un investissement économique. C'est un engagement
              envers notre communauté et notre vision d'une Afrique autosuffisante sur le plan
              alimentaire."
            </p>
            <footer className="text-[#707070] font-semibold">
              — Amadou TRAORE, Président Directeur Général du Groupe Rishom
            </footer>
          </blockquote>

          {/* Section 2 */}
          <h2 className="text-3xl font-bold text-[#8B1538] mt-12 mb-6">
            200 emplois directs créés
          </h2>
          <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
            L'usine génère 200 emplois directs et près de 500 emplois indirects dans les secteurs
            de l'agriculture, du transport et de la distribution. Une attention particulière a été
            portée au recrutement local, avec 80% des employés issus de la région de Koudougou.
          </p>
          <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
            Pour accompagner cette montée en compétences, RBA (Rishom Business Academy) a mis en
            place un programme de formation spécifique aux métiers de la transformation agricole.
            Plus de 150 personnes ont déjà bénéficié de ces formations certifiantes.
          </p>

          {/* Image in content */}
          <figure className="my-12">
            <img
              src={factoryInteriorImage}
              alt="Intérieur de l'usine de transformation au Burkina"
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
            <figcaption className="text-center text-sm text-[#707070] mt-4">
              Vue intérieure de l'usine de transformation avec ses équipements de pointe
            </figcaption>
          </figure>

          {/* Section 3 */}
          <h2 className="text-3xl font-bold text-[#8B1538] mt-12 mb-6">
            Un engagement environnemental fort
          </h2>
          <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
            L'usine a été conçue selon les normes environnementales les plus strictes. Elle dispose
            d'un système de traitement des eaux usées, d'une unité de valorisation des déchets
            organiques et fonctionne partiellement grâce à l'énergie solaire.
          </p>
          <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
            Cette approche responsable reflète l'engagement du Groupe Rishom en faveur du
            développement durable. L'objectif est de démontrer qu'il est possible de concilier
            croissance économique et respect de l'environnement.
          </p>

          {/* List */}
          <h3 className="text-2xl font-semibold text-[#3A3A3C] mt-8 mb-4">
            Caractéristiques techniques de l'usine :
          </h3>
          <ul className="list-disc list-inside space-y-2 text-lg text-[#3A3A3C] mb-8">
            <li>Capacité de traitement : 10 tonnes/jour</li>
            <li>Surface totale : 5 000 m²</li>
            <li>Chambres froides : 4 unités de 200 m³</li>
            <li>Lignes de conditionnement : 3 lignes automatisées</li>
            <li>Production d'énergie solaire : 150 kWc</li>
            <li>Certification : ISO 22000 (sécurité alimentaire)</li>
          </ul>

          {/* Section 4 */}
          <h2 className="text-3xl font-bold text-[#8B1538] mt-12 mb-6">
            Perspectives d'avenir
          </h2>
          <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
            Cette inauguration n'est que la première étape d'un projet plus ambitieux. Le Groupe
            Rishom prévoit l'ouverture de deux autres unités de transformation dans les régions du
            Centre-Nord et de l'Est d'ici 2026.
          </p>
          <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
            L'objectif à moyen terme est de traiter plus de 50 tonnes de produits agricoles par
            jour à l'échelle nationale et d'exporter vers les pays voisins de la sous-région
            ouest-africaine.
          </p>

          {/* Conclusion */}
          <div className="bg-[#F5F1E8] p-8 rounded-xl mt-12">
            <h3 className="text-2xl font-bold text-[#8B1538] mb-4">
              À propos de REV'I
            </h3>
            <p className="text-lg text-[#3A3A3C] leading-relaxed">
              Rishom Elevage & Valorisation (REV'I) est l'entité du Groupe Rishom spécialisée dans
              l'agro-business. Active dans l'élevage, la production végétale et la transformation
              agricole, REV'I contribue à la sécurité alimentaire du Burkina Faso tout en créant de
              la valeur ajoutée pour les producteurs locaux.
            </p>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
