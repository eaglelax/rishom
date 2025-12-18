import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Download } from "lucide-react";

const pressReleases = [
  {
    id: 1,
    title: "Inauguration de l'usine de transformation agricole de Koudougou",
    date: "15 Décembre 2025",
    category: "Investissement",
    excerpt: "Le Groupe Rishom inaugure une usine ultramoderne de 80 millions FCFA créant 200 emplois.",
    pdfSize: "2.3 MB",
  },
  {
    id: 2,
    title: "Partenariat stratégique avec la Banque Africaine de Développement",
    date: "10 Décembre 2025",
    category: "Finance",
    excerpt: "Accord de financement de 50 millions USD pour le développement de nos activités.",
    pdfSize: "1.8 MB",
  },
  {
    id: 3,
    title: "Le Groupe Rishom certifié ISO 22000 pour la sécurité alimentaire",
    date: "5 Décembre 2025",
    category: "Qualité",
    excerpt: "REV'I obtient la certification internationale ISO 22000:2018.",
    pdfSize: "1.2 MB",
  },
  {
    id: 4,
    title: "Lancement du programme de formation gratuite pour 500 jeunes",
    date: "1 Décembre 2025",
    category: "Social",
    excerpt: "RBA lance un programme ambitieux de formation aux métiers d'avenir.",
    pdfSize: "1.5 MB",
  },
  {
    id: 5,
    title: "Résultats annuels 2024 : croissance de 25%",
    date: "20 Novembre 2025",
    category: "Résultats",
    excerpt: "Le Groupe Rishom affiche une croissance robuste et confirme ses ambitions.",
    pdfSize: "3.1 MB",
  },
];

export default function PressPressReleases() {
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#8B1538] mb-4">
            Communiqués de presse
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Les dernières actualités officielles du Groupe Rishom
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {pressReleases.map((release, index) => (
            <motion.div
              key={release.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-2xl transition-all duration-300 border-none">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="px-3 py-1 rounded-full bg-[#8B1538]/10 text-[#8B1538] text-xs font-semibold">
                          {release.category}
                        </span>
                        <div className="flex items-center gap-2 text-sm text-[#707070]">
                          <Calendar className="w-4 h-4" />
                          {release.date}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">
                        {release.title}
                      </h3>
                      <p className="text-[#3A3A3C]">{release.excerpt}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#8B1538] text-[#8B1538] hover:bg-[#8B1538] hover:text-white whitespace-nowrap"
                        data-testid={`download-press-release-${release.id}`}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        PDF ({release.pdfSize})
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#8B1538] hover:bg-[#8B1538]/10"
                      >
                        Lire en ligne
                      </Button>
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
