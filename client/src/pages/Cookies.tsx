import { motion } from "framer-motion";
import { ChevronRight, Cookie, Shield, Settings, BarChart, Target } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Cookies() {
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  const handleSavePreferences = () => {
    console.log("Préférences sauvegardées:", preferences);
    alert("Vos préférences ont été enregistrées avec succès.");
  };

  const handleAcceptAll = () => {
    setPreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    });
  };

  const handleRejectAll = () => {
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    });
  };

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
                <span>Gestion des cookies</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#8B1538] mb-4">
                Gestion des cookies
              </h1>
              <p className="text-xl text-[#3A3A3C]">
                Gérez vos préférences en matière de cookies
              </p>
              <p className="text-sm text-[#707070] mt-2">
                Dernière mise à jour : Décembre 2025
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-[#8B1538] mb-8">
                  Vos préférences
                </h2>

                <div className="space-y-6">
                  <Card className="border-2 border-[#8B1538]">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <Shield className="w-6 h-6 text-[#8B1538]" />
                            <h3 className="text-xl font-bold text-[#1A1A1A]">
                              Cookies nécessaires
                            </h3>
                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
                              Toujours actifs
                            </span>
                          </div>
                          <p className="text-[#3A3A3C] mb-2">
                            Ces cookies sont essentiels au fonctionnement du site et ne peuvent pas être désactivés.
                          </p>
                          <p className="text-sm text-[#707070]">
                            Exemples : cookies de session, préférences linguistiques, sécurité
                          </p>
                        </div>
                        <div className="ml-4">
                          <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-not-allowed">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-gray-200 hover:border-[#8B1538] transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <BarChart className="w-6 h-6 text-[#8B1538]" />
                            <h3 className="text-xl font-bold text-[#1A1A1A]">
                              Cookies analytiques
                            </h3>
                          </div>
                          <p className="text-[#3A3A3C] mb-2">
                            Ces cookies nous permettent de mesurer l'audience et d'améliorer notre site.
                          </p>
                          <p className="text-sm text-[#707070]">
                            Exemples : Google Analytics, nombre de visiteurs, pages populaires
                          </p>
                        </div>
                        <div className="ml-4">
                          <button
                            onClick={() =>
                              setPreferences({ ...preferences, analytics: !preferences.analytics })
                            }
                            className={`w-12 h-6 rounded-full relative transition-colors ${
                              preferences.analytics ? "bg-[#8B1538]" : "bg-gray-300"
                            }`}
                            data-testid="toggle-analytics"
                          >
                            <div
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                preferences.analytics ? "right-1" : "left-1"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-gray-200 hover:border-[#8B1538] transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Target className="w-6 h-6 text-[#8B1538]" />
                            <h3 className="text-xl font-bold text-[#1A1A1A]">
                              Cookies marketing
                            </h3>
                          </div>
                          <p className="text-[#3A3A3C] mb-2">
                            Ces cookies permettent d'afficher des publicités pertinentes et de mesurer leur efficacité.
                          </p>
                          <p className="text-sm text-[#707070]">
                            Exemples : Facebook Pixel, Google Ads, retargeting
                          </p>
                        </div>
                        <div className="ml-4">
                          <button
                            onClick={() =>
                              setPreferences({ ...preferences, marketing: !preferences.marketing })
                            }
                            className={`w-12 h-6 rounded-full relative transition-colors ${
                              preferences.marketing ? "bg-[#8B1538]" : "bg-gray-300"
                            }`}
                            data-testid="toggle-marketing"
                          >
                            <div
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                preferences.marketing ? "right-1" : "left-1"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-gray-200 hover:border-[#8B1538] transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Settings className="w-6 h-6 text-[#8B1538]" />
                            <h3 className="text-xl font-bold text-[#1A1A1A]">
                              Cookies fonctionnels
                            </h3>
                          </div>
                          <p className="text-[#3A3A3C] mb-2">
                            Ces cookies améliorent l'expérience utilisateur en mémorisant vos choix.
                          </p>
                          <p className="text-sm text-[#707070]">
                            Exemples : préférences d'affichage, formulaires pré-remplis
                          </p>
                        </div>
                        <div className="ml-4">
                          <button
                            onClick={() =>
                              setPreferences({ ...preferences, functional: !preferences.functional })
                            }
                            className={`w-12 h-6 rounded-full relative transition-colors ${
                              preferences.functional ? "bg-[#8B1538]" : "bg-gray-300"
                            }`}
                            data-testid="toggle-functional"
                          >
                            <div
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                preferences.functional ? "right-1" : "left-1"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex flex-wrap gap-4 mt-8">
                  <Button
                    size="lg"
                    onClick={handleSavePreferences}
                    className="bg-[#8B1538] text-white hover:bg-[#6B1028] font-semibold px-8"
                    data-testid="button-save-preferences"
                  >
                    Enregistrer mes préférences
                  </Button>
                  <Button
                    size="lg"
                    onClick={handleAcceptAll}
                    variant="outline"
                    className="border-[#8B1538] text-[#8B1538] hover:bg-[#8B1538] hover:text-white font-semibold px-8"
                    data-testid="button-accept-all"
                  >
                    Tout accepter
                  </Button>
                  <Button
                    size="lg"
                    onClick={handleRejectAll}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold px-8"
                    data-testid="button-reject-all"
                  >
                    Tout refuser
                  </Button>
                </div>
              </motion.div>
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
              <h2 className="text-3xl font-bold text-[#8B1538] mt-12 mb-6">
                Qu'est-ce qu'un cookie ?
              </h2>
              <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, 
                smartphone) lors de la visite d'un site web. Les cookies permettent au site de 
                reconnaître votre navigateur et de mémoriser certaines informations.
              </p>

              <h2 className="text-3xl font-bold text-[#8B1538] mt-12 mb-6">
                Types de cookies utilisés
              </h2>

              <h3 className="text-2xl font-semibold text-[#8B1538] mb-4">
                Cookies strictement nécessaires
              </h3>
              <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
                Ces cookies sont indispensables pour naviguer sur notre site et utiliser ses 
                fonctionnalités de base. Ils permettent notamment de :
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-[#3A3A3C] mb-6">
                <li>Mémoriser les informations de session</li>
                <li>Assurer la sécurité de la navigation</li>
                <li>Gérer les préférences de cookies</li>
              </ul>

              <h3 className="text-2xl font-semibold text-[#8B1538] mb-4">
                Cookies analytiques
              </h3>
              <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
                Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre 
                site en collectant des informations de manière anonyme :
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-[#3A3A3C] mb-6">
                <li>Nombre de visiteurs</li>
                <li>Pages les plus consultées</li>
                <li>Temps passé sur le site</li>
                <li>Source du trafic</li>
              </ul>

              <h3 className="text-2xl font-semibold text-[#8B1538] mb-4">
                Cookies marketing
              </h3>
              <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
                Ces cookies sont utilisés pour vous proposer des publicités pertinentes :
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-[#3A3A3C] mb-6">
                <li>Affichage de publicités ciblées</li>
                <li>Suivi des campagnes publicitaires</li>
                <li>Mesure de l'efficacité des annonces</li>
              </ul>

              <h3 className="text-2xl font-semibold text-[#8B1538] mb-4">
                Cookies fonctionnels
              </h3>
              <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
                Ces cookies permettent d'améliorer votre expérience sur notre site :
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-[#3A3A3C] mb-6">
                <li>Mémorisation des préférences d'affichage</li>
                <li>Pré-remplissage des formulaires</li>
                <li>Personnalisation du contenu</li>
              </ul>

              <h2 className="text-3xl font-bold text-[#8B1538] mt-12 mb-6">
                Durée de conservation
              </h2>
              <div className="bg-[#F5F1E8] p-6 rounded-xl mb-6">
                <p className="text-[#3A3A3C] mb-3">
                  <strong>Cookies de session :</strong> Supprimés à la fermeture du navigateur
                </p>
                <p className="text-[#3A3A3C] mb-3">
                  <strong>Cookies analytiques :</strong> 13 mois maximum
                </p>
                <p className="text-[#3A3A3C] mb-3">
                  <strong>Cookies marketing :</strong> 13 mois maximum
                </p>
                <p className="text-[#3A3A3C]">
                  <strong>Cookies de préférences :</strong> 12 mois
                </p>
              </div>

              <h2 className="text-3xl font-bold text-[#8B1538] mt-12 mb-6">
                Comment gérer les cookies ?
              </h2>
              <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
                Vous pouvez gérer vos préférences de cookies de plusieurs façons :
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-[#3A3A3C] mb-6">
                <li>Utiliser le panneau de préférences ci-dessus</li>
                <li>Configurer les paramètres de votre navigateur</li>
                <li>Utiliser des extensions de blocage de cookies</li>
              </ul>

              <h2 className="text-3xl font-bold text-[#8B1538] mt-12 mb-6">
                Contact
              </h2>
              <p className="text-lg text-[#3A3A3C] leading-relaxed mb-6">
                Pour toute question concernant notre politique de cookies, contactez-nous :
              </p>
              <div className="bg-[#F5F1E8] p-6 rounded-xl">
                <p className="text-[#3A3A3C] mb-2">
                  <strong>Email :</strong> dpo@rishom-group.com
                </p>
                <p className="text-[#3A3A3C]">
                  <strong>Téléphone :</strong> +226 70 00 00 00
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
