import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Building2, Briefcase, Sprout, GraduationCap } from "lucide-react";

const entities = [
  {
    name: "RBF",
    fullName: "Rishom BTP & Fournitures",
    color: "#C74634",
    icon: Building2,
    description: "Leader en équipements BTP et solutions de construction",
    href: "/rbf",
  },
  {
    name: "RIC",
    fullName: "Rishom Invest & Conseil",
    color: "#8B1538",
    icon: Briefcase,
    description: "Conseil stratégique et investissement pour la croissance",
    href: "/ric",
  },
  {
    name: "REV'I",
    fullName: "Rishom Elevage & Valorisation",
    color: "#058B5E",
    icon: Sprout,
    description: "Excellence en agro-business et valorisation agricole",
    href: "/revi",
  },
  {
    name: "RBA",
    fullName: "Rishom Business Academy",
    color: "#2E5A9C",
    icon: GraduationCap,
    description: "Formation professionnelle et développement des compétences",
    href: "/rba",
  },
  {
    name: "GROUPE",
    fullName: "Rishom Group",
    color: "#8B1538",
    icon: Building2,
    description: "Holding et coordination stratégique du groupe",
    href: "/groupe",
  },
];

export default function EntitiesGrid() {
  return (
    <section id="entities" className="py-20 md:py-32 bg-[#F5F1E8]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#8B1538] mb-4">
            Nos entités
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Cinq expertises complémentaires au service de votre réussite
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {entities.map((entity, index) => {
            const Icon = entity.icon;
            return (
              <motion.div
                key={entity.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group border-none"
                  data-testid={`entity-card-${entity.name.toLowerCase()}`}
                >
                  <CardHeader>
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${entity.color}15` }}
                    >
                      <Icon
                        className="w-8 h-8"
                        style={{ color: entity.color }}
                      />
                    </div>
                    <CardTitle
                      className="text-2xl font-semibold mb-2"
                      style={{ color: entity.color }}
                    >
                      {entity.name}
                    </CardTitle>
                    <p className="text-sm font-medium text-[#3A3A3C]">
                      {entity.fullName}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#707070] mb-4">{entity.description}</p>
                    <a
                      href={entity.href}
                      className="inline-flex items-center font-semibold hover:gap-3 transition-all group"
                      style={{ color: entity.color }}
                    >
                      Découvrir
                      <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
