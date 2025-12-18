import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function RBFContactSection() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-[#C74634] mb-6">
              Contactez-nous
            </h2>
            <p className="text-xl text-[#3A3A3C] mb-8">
              Notre équipe est à votre disposition pour étudier vos besoins et vous proposer les meilleures solutions.
            </p>

            <div className="space-y-6">
              <Card className="border-none bg-[#F5F1E8]">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C74634]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#C74634]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#C74634] mb-2">Téléphone</h3>
                    <p className="text-[#3A3A3C]">+226 70 00 00 00</p>
                    <p className="text-[#3A3A3C]">+226 70 00 00 01</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none bg-[#F5F1E8]">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C74634]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#C74634]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#C74634] mb-2">Email</h3>
                    <p className="text-[#3A3A3C]">contact@rbf-burkina.com</p>
                    <p className="text-[#3A3A3C]">commercial@rbf-burkina.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none bg-[#F5F1E8]">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C74634]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#C74634]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#C74634] mb-2">Adresse</h3>
                    <p className="text-[#3A3A3C]">
                      Zone Industrielle de Gounghin<br />
                      Ouagadougou, Burkina Faso
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none bg-[#F5F1E8]">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C74634]/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#C74634]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#C74634] mb-2">Horaires</h3>
                    <p className="text-[#3A3A3C]">Lundi - Vendredi : 7h30 - 17h30</p>
                    <p className="text-[#3A3A3C]">Samedi : 8h00 - 12h00</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="border-none shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-[#C74634] mb-6">
                  Demande de devis
                </h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#3A3A3C] mb-2">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74634]"
                        placeholder="Votre nom"
                        data-testid="input-name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#3A3A3C] mb-2">
                        Entreprise
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74634]"
                        placeholder="Nom de l'entreprise"
                        data-testid="input-company"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#3A3A3C] mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74634]"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74634]"
                        placeholder="+226 XX XX XX XX"
                        data-testid="input-phone"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#3A3A3C] mb-2">
                      Type de service
                    </label>
                    <select 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74634]"
                      data-testid="select-service"
                    >
                      <option value="achat">Achat d'équipements</option>
                      <option value="location">Location d'engins</option>
                      <option value="materiaux">Matériaux de construction</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#3A3A3C] mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74634]"
                      placeholder="Décrivez votre projet et vos besoins..."
                      data-testid="textarea-message"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#C74634] text-white hover:bg-[#C74634]/90 font-semibold py-6 rounded-lg"
                    data-testid="contact-submit"
                  >
                    Envoyer la demande
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
