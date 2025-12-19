import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import rbfLogo from "@assets/LOGOS_DEF-07_1766102890554.png";
import ricLogo from "@assets/LOGOS_DEF-01_1766102890554.png";
import reviLogo from "@assets/LOGOS_DEF-09_1766102890554.png";
import rbaLogo from "@assets/LOGOS_DEF-03_1766102890554.png";
import groupeLogo from "@assets/LOGOS_DEF-05_1766102890554.png";

const entities = [
  {
    name: "RBF",
    fullName: "Rishom BTP & Fournitures",
    color: "#C74634",
    logo: rbfLogo,
    description: "Leader en équipements BTP et solutions de construction",
    href: "/rbf",
  },
  {
    name: "RIC",
    fullName: "Rishom Invest & Conseil",
    color: "#8B1538",
    logo: ricLogo,
    description: "Conseil stratégique et investissement pour la croissance",
    href: "/ric",
  },
  {
    name: "REV'I",
    fullName: "Rishom Elevage & Valorisation",
    color: "#058B5E",
    logo: reviLogo,
    description: "Excellence en agro-business et valorisation agricole",
    href: "/revi",
  },
  {
    name: "RBA",
    fullName: "Rishom Business Academy",
    color: "#2E5A9C",
    logo: rbaLogo,
    description: "Formation professionnelle et développement des compétences",
    href: "/rba",
  },
  {
    name: "GROUPE",
    fullName: "Rishom Group",
    color: "#8B1538",
    logo: groupeLogo,
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
            return (
              <motion.div
                key={entity.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -12,
                  transition: { duration: 0.3 }
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card
                  className="h-full transition-all duration-300 cursor-pointer group border-none hover:shadow-[0_20px_40px_rgba(139,21,56,0.15)]"
                  data-testid={`entity-card-${entity.name.toLowerCase()}`}
                >
                  <CardHeader>
                    <div className="h-20 flex items-center justify-center mb-4">
                      <img 
                        src={entity.logo} 
                        alt={entity.fullName}
                        className="h-16 w-auto object-contain"
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
