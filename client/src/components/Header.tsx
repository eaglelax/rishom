import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "À propos", href: "#about" },
    { label: "Nos entités", href: "#entities" },
    { label: "Nos métiers", href: "#services" },
    { label: "Projets", href: "#projects" },
    { label: "Actualités", href: "#news" },
    { label: "Carrières", href: "#careers" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center" data-testid="logo-link">
            <div className="text-[#8B1538] font-bold text-2xl">
              GROUPE RISHOM
            </div>
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
    </header>
  );
}
