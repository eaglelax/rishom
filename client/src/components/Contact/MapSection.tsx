import { motion } from "framer-motion";

export default function ContactMapSection() {
  return (
    <section className="py-20 bg-[#F5F1E8]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#8B1538] mb-8 text-center">
            Nous trouver
          </h2>
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <p className="text-[#707070] text-lg">
                Carte Google Maps (intégration iframe à ajouter)
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
