import { motion } from "framer-motion";
import { ChevronRight, Shield, Lock, Eye, UserCheck, Database, Globe } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      
      <main>
        <section className="py-20 bg-gradient-to-br from-[#8B1538]/10 to-[#F5F1E8]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 text-[#707070] text-sm mb-6">
                <a href="/" className="hover:text-[#8B1538] transition-colors">
                  Accueil
                </a>
                <ChevronRight className="w-4 h-4" />
                <span>Politique de confidentialité</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#8B1538] mb-4">
                Politique de confidentialité
              </h1>
              <p className="text-xl text-[#3A3A3C]">
                Protection et traitement de vos données personnelles
              </p>
              <p className="text-sm text-[#707070] mt-2">
                Dernière mise à jour : Décembre 2025
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                {[
                  { icon: Shield, label: "Sécurité" },
                  { icon: Lock, label: "Confidentialité" },
                  { icon: Eye, label: "Transparence" },
                  { icon: UserCheck, label: "Consentement" },
                  { icon: Database, label: "Conformité" },
                  { icon: Globe, label: "Vos droits" },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex flex-col items-center text-center p-4 rounded-xl bg-[#F5F1E8]"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#8B1538]/10 flex items-center justify-center mb-3">
                        <Icon className="w-6 h-6 text-[#8B1538]" />
                      </div>
                      <span className="text-sm font-semibold text-[#1A1A1A]">
                        {item.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto prose prose-lg"
            >
              <p className="text-xl text-[#3A3A3C] leading-relaxed mb-8">
                Le Groupe Rishom accorde une grande importance à la protection de vos données 
                personnelles. Cette politique de confidentialité vous informe sur la manière dont 
                nous collectons, utilisons, stockons et protégeons vos informations personnelles 
                lorsque vous utilisez notre site web.
              </p>

              <h2 className="text-3xl font-bold text-[#8B1538] mt-12 mb-6">
                1. Responsable du traitement des données
              </h2>
              <div className="bg-[#F5F1E8] p-6 rounded-xl mb-6">
                <p className="text-[#3A3A3C] mb-2">
                  <strong>Responsable :</strong> Groupe Rishom SA
                </p>
                <p className="text-[#3A3A3C] mb-2">
                  <strong>Adresse :</strong> Avenue de l'Indépendance, Secteur 15, Ouagadougou, Burkina Faso
                </p>
                <p className="text-[#3A3A3C] mb-2">
                  <strong>Email :</strong> dpo@rishom-group.com
                </p>
                <p className="text-[#3A3A3C]">
                  <strong>Téléphone :</strong> +226 70 00 00 00
                </p>
              </div>

              <h2 className="text-3xl font-bold text-[#8B1538] mt-12 mb-6">
                2. Données collectées
              </h2>
              <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
                Nous collectons les catégories de données suivantes :
              </p>

              <h3 className="text-2xl font-semibold text-[#8B1538] mb-4">
                2.1. Données d'identification
              </h3>
              <ul className="list-disc list-inside space-y-2 text-lg text-[#3A3A3C] mb-6">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Adresse postale</li>
                <li>Entreprise et fonction</li>
              </ul>

              <h3 className="text-2xl font-semibold text-[#8B1538] mb-4">
                2.2. Données de navigation
              </h3>
              <ul className="list-disc list-inside space-y-2 text-lg text-[#3A3A3C] mb-6">
                <li>Adresse IP</li>
                <li>Type de navigateur</li>
                <li>Pages visitées</li>
                <li>Durée de visite</li>
                <li>Données de localisation approximative</li>
              </ul>

              <h3 className="text-2xl font-semibold text-[#8B1538] mb-4">
                2.3. Données de formulaires
              </h3>
              <ul className="list-disc list-inside space-y-2 text-lg text-[#3A3A3C] mb-6">
                <li>Demandes de devis</li>
                <li>Candidatures (CV, lettre de motivation)</li>
                <li>Messages de contact</li>
                <li>Inscriptions à la newsletter</li>
              </ul>

              <h2 className="text-3xl font-bold text-[#8B1538] mt-12 mb-6">
                3. Finalités du traitement
              </h2>
              <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
                Vos données personnelles sont collectées pour les finalités suivantes :
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-[#3A3A3C] mb-6">
                <li>Traiter vos demandes de contact et de devis</li>
                <li>Gérer votre candidature à nos offres d'emploi</li>
                <li>Vous envoyer notre newsletter (avec votre consentement)</li>
                <li>Améliorer l'expérience utilisateur sur notre site</li>
                <li>Réaliser des statistiques de fréquentation</li>
                <li>Respecter nos obligations légales et réglementaires</li>
              </ul>

              <h2 className="text-3xl font-bold text-[#8B1538] mt-12 mb-6">
                4. Base légale du traitement
              </h2>
              <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
                Le traitement de vos données personnelles repose sur les bases légales suivantes :
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-[#3A3A3C] mb-6">
                <li><strong>Consentement :</strong> Newsletter, cookies non essentiels</li>
                <li><strong>Exécution d'un contrat :</strong> Traitement des demandes de devis et commandes</li>
                <li><strong>Intérêt légitime :</strong> Amélioration du site, prospection commerciale</li>
                <li><strong>Obligation légale :</strong> Conservation des documents comptables et fiscaux</li>
              </ul>

              <h2 className="text-3xl font-bold text-[#8B1538] mt-12 mb-6">
                5. Durée de conservation
              </h2>
              <div className="bg-[#F5F1E8] p-6 rounded-xl mb-6">
                <p className="text-[#3A3A3C] mb-3">
                  <strong>Données de contact :</strong> 3 ans à compter du dernier contact
                </p>
                <p className="text-[#3A3A3C] mb-3">
                  <strong>Candidatures :</strong> 2 ans après la réception
                </p>
                <p className="text-[#3A3A3C] mb-3">
                  <strong>Newsletter :</strong> Jusqu'à désinscription
                </p>
                <p className="text-[#3A3A3C]">
                  <strong>Données de navigation :</strong> 13 mois maximum
                </p>
              </div>

              <h2 className="text-3xl font-bold text-[#8B1538] mt-12 mb-6">
                6. Destinataires des données
              </h2>
              <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
                Vos données personnelles peuvent être transmises aux destinataires suivants :
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-[#3A3A3C] mb-6">
                <li>Services internes du Groupe Rishom (RH, commercial, marketing)</li>
                <li>Prestataires techniques (hébergement, maintenance)</li>
                <li>Partenaires commerciaux (avec votre consentement)</li>
                <li>Autorités compétentes (sur demande légale)</li>
              </ul>

              <h2 className="text-3xl font-bold text-[#8B1538] mt-12 mb-6">
                7. Sécurité des données
              </h2>
              <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées 
                pour protéger vos données personnelles contre la destruction, la perte, l'altération, 
                la divulgation ou l'accès non autorisé :
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-[#3A3A3C] mb-6">
                <li>Chiffrement SSL/TLS des données en transit</li>
                <li>Contrôle d'accès strict aux données</li>
                <li>Sauvegarde régulière des données</li>
                <li>Formation du personnel à la protection des données</li>
              </ul>

              <h2 className="text-3xl font-bold text-[#8B1538] mt-12 mb-6">
                8. Vos droits
              </h2>
              <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
                Conformément à la réglementation applicable, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-[#3A3A3C] mb-6">
                <li><strong>Droit d'accès :</strong> Obtenir une copie de vos données</li>
                <li><strong>Droit de rectification :</strong> Corriger vos données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> Supprimer vos données sous certaines conditions</li>
                <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</li>
                <li><strong>Droit à la limitation :</strong> Limiter le traitement de vos données</li>
                <li><strong>Droit à la portabilité :</strong> Récupérer vos données dans un format structuré</li>
                <li><strong>Droit de retirer votre consentement :</strong> À tout moment pour les traitements basés sur le consentement</li>
              </ul>

              <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
                Pour exercer vos droits, contactez-nous à : <strong>dpo@rishom-group.com</strong>
              </p>

              <h2 className="text-3xl font-bold text-[#8B1538] mt-12 mb-6">
                9. Droit de réclamation
              </h2>
              <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une 
                réclamation à l'autorité de contrôle compétente.
              </p>

              <h2 className="text-3xl font-bold text-[#8B1538] mt-12 mb-6">
                10. Modifications de la politique
              </h2>
              <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout 
                moment. Les modifications prendront effet dès leur publication sur ce site.
              </p>

              <h2 className="text-3xl font-bold text-[#8B1538] mt-12 mb-6">
                11. Contact
              </h2>
              <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
                Pour toute question concernant cette politique de confidentialité ou vos données 
                personnelles, contactez notre Délégué à la Protection des Données :
              </p>
              <div className="bg-[#F5F1E8] p-6 rounded-xl">
                <p className="text-[#3A3A3C] mb-2">
                  <strong>Email :</strong> dpo@rishom-group.com
                </p>
                <p className="text-[#3A3A3C] mb-2">
                  <strong>Téléphone :</strong> +226 70 00 00 00
                </p>
                <p className="text-[#3A3A3C]">
                  <strong>Adresse :</strong> Groupe Rishom SA, Avenue de l'Indépendance, 
                  Secteur 15, Ouagadougou, Burkina Faso
                </p>
              </div>
            </motion.article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
