import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#8B1538] mb-6">
              Envoyez-nous un message
            </h2>
            <p className="text-lg text-[#3A3A3C] mb-8">
              Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
            </p>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#3A3A3C] mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1538]"
                    placeholder="Votre prénom"
                    data-testid="input-firstname"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3A3A3C] mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1538]"
                    placeholder="Votre nom"
                    data-testid="input-lastname"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#3A3A3C] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1538]"
                    placeholder="votre@email.com"
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3A3A3C] mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1538]"
                    placeholder="+226 XX XX XX XX"
                    data-testid="input-phone"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3A3A3C] mb-2">
                  Entreprise
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1538]"
                  placeholder="Nom de votre entreprise"
                  data-testid="input-company"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3A3A3C] mb-2">
                  Entité concernée
                </label>
                <select 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1538]"
                  data-testid="select-entity"
                >
                  <option value="">Sélectionnez une entité</option>
                  <option value="groupe">Groupe Rishom</option>
                  <option value="rbf">RBF - BTP & Fournitures</option>
                  <option value="ric">RIC - Invest & Conseil</option>
                  <option value="revi">REV'I - Elevage & Valorisation</option>
                  <option value="rba">RBA - Business Academy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3A3A3C] mb-2">
                  Sujet *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1538]"
                  placeholder="Objet de votre demande"
                  data-testid="input-subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3A3A3C] mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1538]"
                  placeholder="Décrivez votre demande en détail..."
                  data-testid="textarea-message"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#8B1538] text-white hover:bg-[#C4526D] font-semibold py-6 rounded-lg"
                data-testid="contact-submit"
              >
                Envoyer le message
              </Button>
            </form>
          </motion.div>

          {/* Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#8B1538] mb-6">
              Nos coordonnées
            </h2>

            <Card className="border-none bg-[#F5F1E8]">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#8B1538] mb-4">
                  Siège social
                </h3>
                <p className="text-[#3A3A3C] mb-2">
                  Avenue de l'Indépendance, Secteur 15<br />
                  Ouagadougou, Burkina Faso
                </p>
              </CardContent>
            </Card>

            <Card className="border-none bg-[#F5F1E8]">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#8B1538] mb-4">
                  Téléphone
                </h3>
                <p className="text-[#3A3A3C] mb-1">
                  Standard : +226 25 XX XX XX
                </p>
                <p className="text-[#3A3A3C]">
                  Mobile : +226 70 XX XX XX
                </p>
              </CardContent>
            </Card>

            <Card className="border-none bg-[#F5F1E8]">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#8B1538] mb-4">
                  Email
                </h3>
                <p className="text-[#3A3A3C] mb-1">
                  contact@rishom-group.com
                </p>
                <p className="text-[#3A3A3C]">
                  info@rishom-group.com
                </p>
              </CardContent>
            </Card>

            <Card className="border-none bg-[#F5F1E8]">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#8B1538] mb-4">
                  Horaires d'ouverture
                </h3>
                <p className="text-[#3A3A3C] mb-1">
                  Lundi - Vendredi : 8h00 - 17h00
                </p>
                <p className="text-[#3A3A3C]">
                  Samedi : 8h00 - 12h00
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
