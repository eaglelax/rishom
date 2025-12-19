import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import alumnusImage from "@assets/generated_images/rba_alumnus_male_portrait_burkina.png";
import alumnaImage from "@assets/generated_images/rba_alumna_female_portrait_burkina.png";
import entrepreneurImage from "@assets/generated_images/rba_entrepreneur_portrait_burkina.png";

const stories = [
  {
    id: 1,
    name: "Abdoulaye K.",
    program: "Conduite d'engins BTP",
    image: alumnusImage,
    testimonial: "Grâce à la formation RBA, j'ai obtenu mon certificat et je travaille maintenant sur de grands chantiers. Ma vie a changé.",
    company: "RBF",
  },
  {
    id: 2,
    name: "Fatimata S.",
    program: "Comptabilité",
    image: alumnaImage,
    testimonial: "Les formateurs sont excellents et le contenu très pratique. J'ai trouvé un emploi avant même la fin de ma formation.",
    company: "Cabinet d'audit",
  },
  {
    id: 3,
    name: "Ibrahim T.",
    program: "Entrepreneuriat",
    image: entrepreneurImage,
    testimonial: "La formation m'a donné les clés pour créer ma propre entreprise. Aujourd'hui, j'emploie 5 personnes.",
    company: "Entrepreneur",
  },
];

export default function RBASuccessStoriesSection() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2E5A9C] mb-4">
            Témoignages
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Ils ont réussi grâce à RBA
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-none">
                <CardContent className="p-8">
                  <Quote className="w-12 h-12 text-[#2E5A9C]/20 mb-4" />
                  <p className="text-[#3A3A3C] mb-6 italic">
                    "{story.testimonial}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-16 h-16 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-semibold text-[#2E5A9C] text-lg">
                        {story.name}
                      </h4>
                      <p className="text-sm text-[#707070]">{story.program}</p>
                      <p className="text-sm text-[#707070]">{story.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
