import { useState, useEffect } from "react";
import { Menu, Search, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import groupeRishomLogo from "@assets/LOGOS_DEF-05_1766102890554.png";

interface DropdownItem {
  label: string;
  href: string;
}

interface MenuItem {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems: MenuItem[] = [
    { label: "À propos", href: "/a-propos" },
    { 
      label: "Nos entités", 
      href: "/groupe",
      dropdown: [
        { label: "Groupe Rishom", href: "/groupe" },
        { label: "RBF - BTP & Fournitures", href: "/rbf" },
        { label: "RIC - Ingénierie & Conseil", href: "/ric" },
        { label: "REV'I - Agrobusiness", href: "/revi" },
        { label: "RBA - Business Academy", href: "/rba" },
      ]
    },
    { 
      label: "Projets", 
      href: "/projets",
      dropdown: [
        { label: "Tous les projets", href: "/projets" },
        { label: "Projets BTP", href: "/rbf/equipements" },
        { label: "Projets Conseil", href: "/ric/projets" },
        { label: "Projets Agricoles", href: "/revi/projets" },
        { label: "Programmes de formation", href: "/rba/programmes" },
      ]
    },
    { 
      label: "Actualités", 
      href: "/actualites",
      dropdown: [
        { label: "Toutes les actualités", href: "/actualites" },
        { label: "Communiqués de presse", href: "/presse" },
      ]
    },
    { label: "Carrières", href: "/carrieres" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <motion.header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/98 backdrop-blur-sm shadow-lg' 
          : 'bg-white shadow-sm'
      }`}
      initial={false}
      animate={{ 
        height: isScrolled ? "64px" : "80px"
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <a href="/" className="flex items-center" data-testid="logo-link">
            <motion.img 
              src={groupeRishomLogo} 
              alt="Groupe Rishom" 
              className="w-auto transition-all"
              animate={{ height: isScrolled ? "36px" : "48px" }}
              transition={{ duration: 0.3 }}
            />
          </a>

          <nav className="hidden lg:flex items-center gap-6">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center gap-1 text-[#3A3A3C] hover:text-[#8B1538] transition-colors font-medium text-sm py-2"
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  )}
                </a>

                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 pt-2"
                    >
                      <div className="bg-white rounded-md shadow-xl border border-border min-w-[220px] py-2">
                        {item.dropdown.map((subItem, subIndex) => (
                          <a
                            key={`${item.label}-${subIndex}`}
                            href={subItem.href}
                            className="block px-4 py-2.5 text-sm text-[#3A3A3C] hover:bg-[#8B1538]/5 hover:text-[#8B1538] transition-colors"
                            data-testid={`nav-dropdown-${subItem.label.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              data-testid="search-button"
              className="hover:text-[#8B1538]"
            >
              <Search className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="mobile-menu-button"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden pb-4 border-t bg-white">
            <div className="flex flex-col gap-2 pt-4">
              {menuItems.map((item) => (
                <div key={item.label}>
                  <a
                    href={item.href}
                    className="block text-[#3A3A3C] hover:text-[#8B1538] transition-colors font-medium py-2"
                    onClick={() => !item.dropdown && setIsMenuOpen(false)}
                    data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.label}
                  </a>
                  {item.dropdown && (
                    <div className="pl-4 border-l-2 border-[#8B1538]/20 ml-2 space-y-1">
                      {item.dropdown.map((subItem, subIndex) => (
                        <a
                          key={`mobile-${item.label}-${subIndex}`}
                          href={subItem.href}
                          className="block text-sm text-[#3A3A3C]/80 hover:text-[#8B1538] transition-colors py-1.5"
                          onClick={() => setIsMenuOpen(false)}
                          data-testid={`mobile-nav-dropdown-${subItem.label.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        )}
      </div>
    </motion.header>
  );
}
