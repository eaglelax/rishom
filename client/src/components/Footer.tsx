import { useState, useEffect } from "react";
import { Facebook, Linkedin, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";

interface Entity {
  id: string;
  code: string;
  fullName: string;
  shortName: string;
  colorPrimary: string;
  logoUrl: string | null;
  logoWhiteUrl: string | null;
  pageSlug: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  displayOrder: number;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  isActive: boolean;
}

const socialIcons: Record<string, React.ElementType> = {
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
};

export default function Footer() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [groupeEntity, setGroupeEntity] = useState<Entity | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    // Charger les entités
    const fetchEntities = async () => {
      try {
        const response = await fetch("/api/entities");
        if (response.ok) {
          const data: Entity[] = await response.json();
          const sorted = data.sort((a, b) => a.displayOrder - b.displayOrder);
          setEntities(sorted.filter(e => e.code !== "GROUPE"));
          const groupe = sorted.find(e => e.code === "GROUPE");
          if (groupe) setGroupeEntity(groupe);
        }
      } catch (error) {
        console.error("Erreur chargement entités:", error);
      }
    };

    // Charger les réseaux sociaux
    const fetchSocial = async () => {
      try {
        const response = await fetch("/api/social");
        if (response.ok) {
          const data = await response.json();
          setSocialLinks(data.filter((s: SocialLink) => s.isActive));
        }
      } catch (error) {
        console.error("Erreur chargement réseaux sociaux:", error);
      }
    };

    fetchEntities();
    fetchSocial();
  }, []);

  // Logo du groupe (utiliser logoWhiteUrl ou logoUrl avec filter CSS)
  const groupeLogo = groupeEntity?.logoWhiteUrl || groupeEntity?.logoUrl;

  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 - About */}
          <div>
            {groupeLogo ? (
              <img
                src={groupeLogo}
                alt="Groupe Rishom"
                className="h-14 w-auto mb-4"
                style={!groupeEntity?.logoWhiteUrl ? { filter: "brightness(0) invert(1)" } : undefined}
              />
            ) : (
              <div className="text-2xl font-bold text-white mb-4">GROUPE RISHOM</div>
            )}
            <p className="text-white/70 text-sm mb-6">
              Acteur majeur du développement africain, le Groupe Rishom
              intervient dans 5 secteurs clés à travers ses entités
              spécialisées.
            </p>
            <div className="flex gap-4">
              {socialLinks.length > 0 ? (
                socialLinks.map((social) => {
                  const Icon = socialIcons[social.platform.toLowerCase()] || Linkedin;
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#8B1538] flex items-center justify-center transition-colors"
                      data-testid={`footer-${social.platform.toLowerCase()}`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })
              ) : (
                <>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#8B1538] flex items-center justify-center transition-colors"
                    data-testid="footer-linkedin"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#8B1538] flex items-center justify-center transition-colors"
                    data-testid="footer-facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/a-propos"
                  className="text-white/70 hover:text-[#8B1538] transition-colors text-sm"
                >
                  À propos
                </a>
              </li>
              <li>
                <a
                  href="/#entities"
                  className="text-white/70 hover:text-[#8B1538] transition-colors text-sm"
                >
                  Nos entités
                </a>
              </li>
              <li>
                <a
                  href="/projets"
                  className="text-white/70 hover:text-[#8B1538] transition-colors text-sm"
                >
                  Projets
                </a>
              </li>
              <li>
                <a
                  href="/actualites"
                  className="text-white/70 hover:text-[#8B1538] transition-colors text-sm"
                >
                  Actualités
                </a>
              </li>
              <li>
                <a
                  href="/carrieres"
                  className="text-white/70 hover:text-[#8B1538] transition-colors text-sm"
                >
                  Carrières
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-white/70 hover:text-[#8B1538] transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Entities (dynamique) */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nos entités</h3>
            <ul className="space-y-3">
              {entities.length > 0 ? (
                entities.map((entity) => (
                  <li key={entity.id}>
                    <a
                      href={`/${entity.pageSlug || entity.code.toLowerCase()}`}
                      className="text-white/70 transition-colors text-sm"
                      style={{ ["--hover-color" as string]: entity.colorPrimary }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = entity.colorPrimary)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                    >
                      {entity.code} - {entity.shortName}
                    </a>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <a href="/rbf" className="text-white/70 hover:text-[#C74634] transition-colors text-sm">
                      RBF - BTP & Fournitures
                    </a>
                  </li>
                  <li>
                    <a href="/ric" className="text-white/70 hover:text-[#8B1538] transition-colors text-sm">
                      RIC - Invest & Conseil
                    </a>
                  </li>
                  <li>
                    <a href="/revi" className="text-white/70 hover:text-[#058B5E] transition-colors text-sm">
                      REV'I - Elevage & Valorisation
                    </a>
                  </li>
                  <li>
                    <a href="/rba" className="text-white/70 hover:text-[#2E5A9C] transition-colors text-sm">
                      RBA - Business Academy
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Column 4 - Contact (dynamique depuis Groupe) */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#8B1538] flex-shrink-0 mt-1" />
                <span className="text-white/70 text-sm">
                  {groupeEntity?.address
                    ? `${groupeEntity.address}, ${groupeEntity.city || ""}, ${groupeEntity.country || ""}`
                    : "Ouagadougou, Burkina Faso"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#8B1538] flex-shrink-0" />
                <a
                  href={`tel:${groupeEntity?.phone || "+22670000000"}`}
                  className="text-white/70 hover:text-[#8B1538] transition-colors text-sm"
                >
                  {groupeEntity?.phone || "+226 70 00 00 00"}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#8B1538] flex-shrink-0" />
                <a
                  href={`mailto:${groupeEntity?.email || "contact@rishom-group.com"}`}
                  className="text-white/70 hover:text-[#8B1538] transition-colors text-sm"
                >
                  {groupeEntity?.email || "contact@rishom-group.com"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#8B1538] py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-center text-white text-sm">
              © {new Date().getFullYear()} Groupe Rishom. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="/mentions-legales" className="text-white/80 hover:text-white transition-colors">
                Mentions légales
              </a>
              <a href="/politique-confidentialite" className="text-white/80 hover:text-white transition-colors">
                Confidentialité
              </a>
              <a href="/cookies" className="text-white/80 hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
