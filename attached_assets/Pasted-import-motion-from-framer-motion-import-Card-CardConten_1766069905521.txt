import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Briefcase, ChevronRight } from "lucide-react";

const positions = [
  {
    id: 1,
    title: "Ingénieur BTP Senior",
    entity: "RBF",
    entityColor: "#C74634",
    location: "Ouagadougou",
    type: "CDI",
    department: "Technique",
    posted: "Il y a 2 jours",
  },
  {
    id: 2,
    title: "Consultant en Stratégie",
    entity: "RIC",
    entityColor: "#8B1538",
    location: "Ouagadougou",
    type: "CDI",
    department: "Conseil",
    posted: "Il y a 5 jours",
  },
  {
    id: 3,
    title: "Responsable Production Agricole",
    entity: "REV'I",
    entityColor: "#058B5E",
    location: "Koudougou",
    type: "CDI",
    department: "Production",
    posted: "Il y a 1 semaine",
  },
  {
    id: 4,
    title: "Formateur Métiers du BTP",
    entity: "RBA",
    entityColor: "#2E5A9C",
    location: "Bobo-Dioulasso",
    type: "CDD",
    department: "Formation",
    posted: "Il y a 3 jours",
  },
  {
    id: 5,
    title: "Chef de Projet Infrastructure",
    entity: "RBF",
    entityColor: "#C74634",
    location: "Ouagadougou",
    type: "CDI",
    department: "Projet",
    posted: "Il y a 1 jour",
  },
  {
    id: 6,
    title: "Analyste Financier",
    entity: "RIC",
    entityColor: "#8B1538",
    location: "Ouagadougou",
    type: "CDI",
    department: "Finance",
    posted: "Il y a 4 jours",
  },
];

export default function CareersOpenPositions() {
  return (
    <section className="py-20 md:py-32 bg-[#F5F1E8]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#8B1538] mb-4">
            Postes ouverts
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            {positions.length} opportunités à saisir dans nos différentes entités
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {positions.map((position, index) => (
            <motion.div
              key={position.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-none">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="px-3 py-1 rounded-full text-white text-sm font-semibold"
                          style={{ backgroundColor: position.entityColor }}
                        >
                          {position.entity}
                        </span>
                        <span className="text-sm text-[#707070]">
                          {position.posted}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-[#707070]">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {position.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {position.type}
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          {position.department}
                        </div>
                      </div>
                    </div>
                    <Button
                      className="bg-[#8B1538] text-white hover:bg-[#C4526D] font-semibold px-8 py-6 rounded-full group whitespace-nowrap"
                      data-testid={`apply-${position.id}`}
                    >
                      Postuler
                      <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
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
