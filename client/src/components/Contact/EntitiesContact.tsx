import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";
import rbfLogo from "@assets/LOGOS_DEF-07_1766102890554.png";
import ricLogo from "@assets/LOGOS_DEF-09_1766165412954.png";
import reviLogo from "@assets/LOGOS_DEF-09_1766102890554.png";
import rbaLogo from "@assets/LOGOS_DEF-03_1766102890554.png";

const entities = [
  {
    name: "RBF",
    fullName: "Rishom BTP & Fournitures",
    color: "#C74634",
    logo: rbfLogo,
    phone: "+226 70 XX XX XX",
    email: "contact@rbf-burkina.com",
    address: "Zone Industrielle de Gounghin",
  },
  {
    name: "RIC",
    fullName: "Rishom Invest & Conseil",
    color: "#8B1538",
    logo: ricLogo,
    phone: "+226 70 XX XX XX",
    email: "contact@ric-burkina.com",
    address: "Avenue Kwame N'Krumah",
  },
  {
    name: "REV'I",
    fullName: "Rishom Elevage & Valorisation",
    color: "#058B5E",
    logo: reviLogo,
    phone: "+226 70 XX XX XX",
    email: "contact@revi-burkina.com",
    address: "Zone Agricole de Koudougou",
  },
  {
    name: "RBA",
    fullName: "Rishom Business Academy",
    color: "#2E5A9C",
    logo: rbaLogo,
    phone: "+226 70 XX XX XX",
    email: "contact@rba-burkina.com",
    address: "Secteur 30, Ouagadougou",
  },
];

export default function ContactEntitiesContact() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#8B1538] mb-4">
            Contacter une entité
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Contactez directement l'entité concernée par votre demande
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {entities.map((entity, index) => (
            <motion.div
              key={entity.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-none">
                <CardContent className="p-8">
                  <div className="h-16 flex items-start mb-4">
                    <img 
                      src={entity.logo} 
                      alt={entity.fullName}
                      className="h-14 w-auto object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-6">
                    {entity.fullName}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: entity.color }} />
                      <a
                        href={`tel:${entity.phone}`}
                        className="text-[#3A3A3C] hover:underline"
                      >
                        {entity.phone}
                      </a>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: entity.color }} />
                      <a
                        href={`mailto:${entity.email}`}
                        className="text-[#3A3A3C] hover:underline break-all"
                      >
                        {entity.email}
                      </a>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: entity.color }} />
                      <span className="text-[#3A3A3C]">{entity.address}</span>
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
