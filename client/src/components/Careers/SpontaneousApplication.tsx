import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function CareersSpontaneousApplication() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-[#8B1538] mb-4">
              Candidature spontanée
            </h2>
            <p className="text-xl text-[#3A3A3C]">
              Vous ne trouvez pas le poste qui vous correspond ? Envoyez-nous votre candidature.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#3A3A3C] mb-2">
                  Prénom *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1538]"
                  placeholder="Votre prénom"
                  data-testid="input-spontaneous-firstname"
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
                  data-testid="input-spontaneous-lastname"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#3A3A3C] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1538]"
                  placeholder="votre@email.com"
                  data-testid="input-spontaneous-email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3A3A3C] mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1538]"
                  placeholder="+226 XX XX XX XX"
                  data-testid="input-spontaneous-phone"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3A3A3C] mb-2">
                Entité souhaitée
              </label>
              <select 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1538]"
                data-testid="select-spontaneous-entity"
              >
                <option value="">Toutes les entités</option>
                <option value="rbf">RBF - BTP & Fournitures</option>
                <option value="ric">RIC - Invest & Conseil</option>
                <option value="revi">REV'I - Elevage & Valorisation</option>
                <option value="rba">RBA - Business Academy</option>
                <option value="groupe">Groupe Rishom (Holding)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3A3A3C] mb-2">
                Domaine de compétence
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1538]"
                placeholder="Ex: Ingénierie, Finance, Marketing..."
                data-testid="input-spontaneous-domain"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3A3A3C] mb-2">
                Message de motivation *
              </label>
              <textarea
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1538]"
                placeholder="Parlez-nous de vous et de vos motivations..."
                data-testid="textarea-spontaneous-motivation"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3A3A3C] mb-2">
                CV (PDF, max 5 Mo) *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#8B1538] transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-[#8B1538] mx-auto mb-4" />
                <p className="text-[#3A3A3C] mb-2">
                  Cliquez pour télécharger ou glissez votre fichier ici
                </p>
                <p className="text-sm text-[#707070]">
                  Format PDF uniquement, 5 Mo maximum
                </p>
                <input type="file" accept=".pdf" className="hidden" data-testid="input-spontaneous-cv" />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-[#8B1538] text-white hover:bg-[#C4526D] font-semibold py-6 rounded-lg"
              data-testid="submit-application"
            >
              Envoyer ma candidature
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
