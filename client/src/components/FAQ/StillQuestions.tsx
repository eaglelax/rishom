import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail } from "lucide-react";

export default function FAQStillQuestions() {
  return (
    <section className="py-20 md:py-32 bg-[#F5F1E8]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#8B1538] mb-6">
            Vous ne trouvez pas la réponse ?
          </h2>
          <p className="text-xl text-[#3A3A3C] mb-12">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-[#8B1538]/10 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-7 h-7 text-[#8B1538]" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">
                Chat en ligne
              </h3>
              <p className="text-sm text-[#707070] mb-4">
                Lundi - Vendredi<br />
                8h - 17h
              </p>
              <Button
                size="sm"
                className="bg-[#8B1538] text-white hover:bg-[#6B1028]"
                data-testid="button-start-chat"
              >
                Démarrer le chat
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-[#8B1538]/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-[#8B1538]" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">
                Par téléphone
              </h3>
              <p className="text-sm text-[#707070] mb-4">
                +226 70 00 00 00<br />
                Lundi - Samedi
              </p>
              <Button
                size="sm"
                variant="outline"
                className="border-[#8B1538] text-[#8B1538] hover:bg-[#8B1538] hover:text-white"
                data-testid="button-call"
              >
                Appeler
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-[#8B1538]/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-[#8B1538]" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">
                Par email
              </h3>
              <p className="text-sm text-[#707070] mb-4">
                Réponse sous 24h<br />
                7j/7
              </p>
              <a href="/contact">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#8B1538] text-[#8B1538] hover:bg-[#8B1538] hover:text-white"
                  data-testid="button-email"
                >
                  Nous écrire
                </Button>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
