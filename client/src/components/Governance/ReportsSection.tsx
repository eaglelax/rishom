import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar } from "lucide-react";

const reports = [
  {
    title: "Rapport Annuel 2024",
    type: "Rapport d'activité",
    date: "Mars 2025",
    size: "8.5 MB",
    description: "Bilan complet de l'année 2024 avec états financiers consolidés.",
  },
  {
    title: "Rapport Gouvernance 2024",
    type: "Gouvernance",
    date: "Février 2025",
    size: "2.1 MB",
    description: "Détail de la structure de gouvernance et des comités.",
  },
  {
    title: "Rapport RSE 2024",
    type: "Responsabilité Sociétale",
    date: "Janvier 2025",
    size: "5.3 MB",
    description: "Indicateurs de performance extra-financière et actions RSE.",
  },
  {
    title: "Comptes Consolidés 2023",
    type: "États financiers",
    date: "Avril 2024",
    size: "3.2 MB",
    description: "États financiers audités par cabinet externe.",
  },
];

export default function GovernanceReportsSection() {
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
            Rapports et publications
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Accédez à nos rapports annuels et documents de gouvernance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {reports.map((report, index) => (
            <motion.div
              key={report.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-none">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#8B1538]/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-[#8B1538]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h3 className="text-xl font-bold text-[#1A1A1A]">
                          {report.title}
                        </h3>
                        <span className="text-xs bg-[#8B1538]/10 text-[#8B1538] px-2 py-1 rounded-full font-semibold whitespace-nowrap">
                          {report.type}
                        </span>
                      </div>
                      <p className="text-[#3A3A3C] mb-4">{report.description}</p>
                      <div className="flex items-center gap-4 text-sm text-[#707070] mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {report.date}
                        </div>
                        <span>•</span>
                        <span>{report.size}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#8B1538] text-[#8B1538] hover:bg-[#8B1538] hover:text-white"
                        data-testid={`download-report-${index}`}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger PDF
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
