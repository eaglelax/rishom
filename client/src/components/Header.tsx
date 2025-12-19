import { useState, useEffect } from "react";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import groupeRishomLogo from "@assets/LOGOS_DEF-05_1766102890554.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: "À propos", href: "/a-propos" },
    { label: "Nos entités", href: "/#entities" },
    { label: "Projets", href: "/projets" },
    { label: "Actualités", href: "/actualites" },
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
          {/* Logo */}
          <a href="/" className="flex items-center" data-testid="logo-link">
            <motion.img 
              src={groupeRishomLogo} 
              alt="Groupe Rishom" 
              className="w-auto transition-all"
              animate={{ height: isScrolled ? "36px" : "48px" }}
              transition={{ duration: 0.3 }}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[#3A3A3C] hover:text-[#8B1538] transition-colors font-medium text-sm"
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Search & Mobile Menu */}
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4 border-t">
            <div className="flex flex-col gap-4 pt-4">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[#3A3A3C] hover:text-[#8B1538] transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                  data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </motion.header>
  );
}
