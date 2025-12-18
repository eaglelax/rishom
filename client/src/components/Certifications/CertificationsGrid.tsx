import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Award, CheckCircle, Calendar } from "lucide-react";

const certifications = [
  {
    id: 1,
    name: "ISO 9001:2015",
    category: "Qualité",
    entity: "Groupe",
    description: "Système de management de la qualité certifié pour l'ensemble du groupe.",
    obtainedDate: "Janvier 2022",
    validUntil: "Janvier 2025",
    certifyingBody: "Bureau Veritas",
  },
  {
    id: 2,
    name: "ISO 14001:2015",
    category: "Environnement",
    entity: "REV'I",
    description: "Management environnemental pour nos activités agro-business.",
    obtainedDate: "Mars 2023",
    validUntil: "Mars 2026",
    certifyingBody: "SGS",
  },
  {
    id: 3,
    name: "ISO 22000:2018",
    category: "Sécurité alimentaire",
    entity: "REV'I",
    description: "Sécurité des denrées alimentaires pour l'usine de transformation.",
    obtainedDate: "Juin 2024",
    validUntil: "Juin 2027",
    certifyingBody: "AFNOR Certification",
  },
  {
    id: 4,
    name: "ISO 45001:2018",
    category: "Santé & Sécurité",
    entity: "RBF",
    description: "Management de la santé et sécurité au travail sur les chantiers.",
    obtainedDate: "Septembre 2023",
    validUntil: "Septembre 2026",
    certifyingBody: "Bureau Veritas",
  },
  {
    id: 5,
    name: "Label RSE Engagé",
    category: "RSE",
    entity: "Groupe",
    description: "Reconnaissance de nos pratiques responsables et durables.",
    obtainedDate: "Février 2024",
    validUntil: "Février 2026",
    certifyingBody: "AFNOR Certification",
  },
  {
    id: 6,
    name: "Certification Qualiopi",
    category: "Formation",
    entity: "RBA",
    description: "Qualité des actions de formation professionnelle.",
    obtainedDate: "Mai 2023",
    validUntil: "Mai 2026",
    certifyingBody: "AFNOR Certification",
  },
];

const entityColors: Record<string, string> = {
  Groupe: "#8B1538",
  RBF: "#C74634",
  RIC: "#8B1538",
  "REV'I": "#058B5E",
  RBA: "#2E5A9C",
};

export default function CertificationsGrid() {
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
            Nos certifications
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            {certifications.length} certifications actives garantissant l'excellence de nos pratiques
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-none">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${entityColors[cert.entity]}15` }}
                    >
                      <Award className="w-8 h-8" style={{ color: entityColors[cert.entity] }} />
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-white text-xs font-semibold whitespace-nowrap"
                      style={{ backgroundColor: entityColors[cert.entity] }}
                    >
                      {cert.entity}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#8B1538] mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-sm font-semibold text-[#707070] mb-4">
                    {cert.category}
                  </p>
                  <p className="text-[#3A3A3C] mb-6">{cert.description}</p>

                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-[#1A1A1A]">Obtenu :</span>
                        <span className="text-[#707070] ml-2">{cert.obtainedDate}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-[#8B1538] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-[#1A1A1A]">Valide jusqu'au :</span>
                        <span className="text-[#707070] ml-2">{cert.validUntil}</span>
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold text-[#1A1A1A]">Organisme :</span>
                      <span className="text-[#707070] ml-2">{cert.certifyingBody}</span>
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
