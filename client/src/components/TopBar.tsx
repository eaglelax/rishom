import { Facebook, Linkedin, Globe } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-[#8B1538] text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between text-sm">
          <p className="hidden md:block">
            Groupe Rishom, l'excellence entrepreneuriale en Afrique
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-xs">Suivez-nous</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B8956A] transition-colors"
                data-testid="linkedin-link"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B8956A] transition-colors"
                data-testid="facebook-link"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <select
                className="bg-transparent border-none text-white text-xs cursor-pointer focus:outline-none"
                data-testid="language-selector"
              >
                <option value="fr" className="text-black">Français</option>
                <option value="en" className="text-black">English</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
