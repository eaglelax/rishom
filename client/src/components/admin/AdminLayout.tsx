import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Images,
  Newspaper,
  Briefcase,
  Users,
  Handshake,
  MessageSquareQuote,
  HelpCircle,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  Building2,
  GraduationCap,
  BarChart3,
  Clock,
  Heart,
  Globe,
  ChevronDown,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  children?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Carousel", href: "/admin/carousel", icon: Images },
  { title: "Actualités", href: "/admin/news", icon: Newspaper },
  {
    title: "Entités",
    href: "/admin/entities",
    icon: Building2,
    children: [
      { title: "Toutes les entités", href: "/admin/entities" },
      { title: "Services RBF", href: "/admin/services/rbf" },
      { title: "Services RIC", href: "/admin/services/ric" },
      { title: "Services REVI", href: "/admin/services/revi" },
      { title: "Programmes RBA", href: "/admin/programs/rba" },
    ],
  },
  { title: "Équipe", href: "/admin/team", icon: Users },
  { title: "Partenaires", href: "/admin/partners", icon: Handshake },
  { title: "Témoignages", href: "/admin/testimonials", icon: MessageSquareQuote },
  { title: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { title: "Offres d'emploi", href: "/admin/jobs", icon: Briefcase },
  { title: "Messages", href: "/admin/messages", icon: Mail },
  { title: "Statistiques", href: "/admin/statistics", icon: BarChart3 },
  { title: "Timeline", href: "/admin/timeline", icon: Clock },
  { title: "Valeurs", href: "/admin/values", icon: Heart },
  { title: "Réseaux sociaux", href: "/admin/social", icon: Globe },
  { title: "Paramètres", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location, setLocation] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("admin_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setLocation("/admin/login");
  };

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const isActive = (href: string) => location === href || location.startsWith(href + "/");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-8 h-8 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b z-50 flex items-center justify-between px-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#8B1538] to-[#C74634] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="font-semibold text-gray-900">Admin</span>
        </div>
        <div className="w-10" />
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-40 bg-white border-r transition-all duration-300",
          isSidebarOpen ? "w-64" : "w-20",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          {isSidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#8B1538] to-[#C74634] rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-900">Rishom</h1>
                <p className="text-xs text-gray-500">Administration</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-[#8B1538] to-[#C74634] rounded-xl flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-lg">R</span>
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:block p-1.5 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <nav className="p-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.title}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleExpanded(item.title)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left",
                        isActive(item.href)
                          ? "bg-[#8B1538]/10 text-[#8B1538]"
                          : "text-gray-600 hover:bg-gray-100"
                      )}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {isSidebarOpen && (
                        <>
                          <span className="flex-1 font-medium text-sm">{item.title}</span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              expandedItems.includes(item.title) && "rotate-180"
                            )}
                          />
                        </>
                      )}
                    </button>
                    {isSidebarOpen && expandedItems.includes(item.title) && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link key={child.href} href={child.href}>
                            <a
                              className={cn(
                                "block px-3 py-2 rounded-lg text-sm transition-colors",
                                isActive(child.href)
                                  ? "bg-[#8B1538]/10 text-[#8B1538] font-medium"
                                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                              )}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.title}
                            </a>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.href}>
                    <a
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                        isActive(item.href)
                          ? "bg-[#8B1538]/10 text-[#8B1538]"
                          : "text-gray-600 hover:bg-gray-100"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {isSidebarOpen && (
                        <span className="font-medium text-sm">{item.title}</span>
                      )}
                    </a>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </ScrollArea>

        {/* User & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t bg-white">
          {isSidebarOpen ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium text-sm">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-900">{user.username}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="w-full text-gray-500 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          )}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen transition-all duration-300 pt-16 lg:pt-0",
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        )}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
