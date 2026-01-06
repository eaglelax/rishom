import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, User } from "lucide-react";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("admin_user", JSON.stringify(data.user));
        toast({
          title: "Connexion réussie",
          description: `Bienvenue ${data.user.username}`,
        });
        setLocation("/admin/dashboard");
      } else {
        toast({
          title: "Erreur de connexion",
          description: data.message || "Identifiants incorrects",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#8B1538] via-[#6B1028] to-[#4B0B1C] p-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-[#8B1538] to-[#C74634] rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">R</span>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Administration
            </CardTitle>
            <CardDescription className="text-gray-500 mt-2">
              Connectez-vous pour accéder au panneau d'administration
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 font-medium">
                Nom d'utilisateur
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Entrez votre nom d'utilisateur"
                  className="pl-10 h-12 border-gray-200 focus:border-[#8B1538] focus:ring-[#8B1538]"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Mot de passe
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Entrez votre mot de passe"
                  className="pl-10 pr-10 h-12 border-gray-200 focus:border-[#8B1538] focus:ring-[#8B1538]"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-[#8B1538] to-[#C74634] hover:from-[#7A1230] hover:to-[#B63D2D] text-white font-semibold text-base shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Connexion en cours...
                </div>
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <a href="/" className="text-sm text-gray-500 hover:text-[#8B1538] transition-colors">
              ← Retour au site
            </a>
          </div>
        </CardContent>
      </Card>

      <div className="absolute bottom-4 text-center text-white/60 text-sm">
        © {new Date().getFullYear()} Groupe Rishom. Tous droits réservés.
      </div>
    </div>
  );
}
