import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ImagePicker from "@/components/admin/ImagePicker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Building2,
  Globe,
  Phone,
  Mail,
  MapPin,
  Clock,
  Save,
  Settings as SettingsIcon,
  Image,
  Search,
} from "lucide-react";

interface SiteConfig {
  id?: string;
  companyName: string;
  companyShortName: string;
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string;
  defaultLanguage: string;
  timezone: string;
  currency: string;
  googleAnalyticsId: string;
  faviconUrl: string;
  ogImageUrl: string;
}

interface ContactInfo {
  id?: string;
  locationName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  phoneMobile: string;
  email: string;
  emailSecondary: string;
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  isMainOffice: boolean;
}

const defaultConfig: SiteConfig = {
  companyName: "Groupe Rishom",
  companyShortName: "Rishom",
  siteTitle: "Groupe Rishom - Excellence entrepreneuriale en Afrique",
  siteDescription: "Groupe Rishom, acteur majeur du développement africain avec 4 filiales spécialisées : BTP, Conseil, Agrobusiness et Formation.",
  siteKeywords: "Rishom, Burkina Faso, BTP, Conseil, Agriculture, Formation, Afrique",
  defaultLanguage: "FR",
  timezone: "Africa/Ouagadougou",
  currency: "XOF",
  googleAnalyticsId: "",
  faviconUrl: "",
  ogImageUrl: "",
};

const defaultContact: ContactInfo = {
  locationName: "Siège social",
  address: "Avenue de l'Indépendance, Secteur 15",
  city: "Ouagadougou",
  postalCode: "",
  country: "Burkina Faso",
  phone: "+226 25 XX XX XX",
  phoneMobile: "+226 70 XX XX XX",
  email: "contact@rishom-group.com",
  emailSecondary: "info@rishom-group.com",
  openingHours: {
    weekdays: "08:00 - 17:00",
    saturday: "08:00 - 12:00",
    sunday: "Fermé",
  },
  isMainOffice: true,
};

export default function AdminSettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [contact, setContact] = useState<ContactInfo>(defaultContact);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [configRes, contactRes] = await Promise.all([
          fetch("/api/admin/settings"),
          fetch("/api/admin/contact-info"),
        ]);

        if (configRes.ok) {
          const data = await configRes.json();
          if (data) setConfig({ ...defaultConfig, ...data });
        }

        if (contactRes.ok) {
          const data = await contactRes.json();
          if (data && data.length > 0) {
            const mainOffice = data.find((c: ContactInfo) => c.isMainOffice) || data[0];
            setContact({ ...defaultContact, ...mainOffice });
          }
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSaveConfig = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/settings", {
        method: config.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.id) setConfig({ ...config, id: data.id });
        toast({
          title: "Configuration sauvegardée",
          description: "Les paramètres du site ont été mis à jour",
        });
      } else {
        throw new Error("Erreur");
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveContact = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/contact-info", {
        method: contact.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.id) setContact({ ...contact, id: data.id });
        toast({
          title: "Coordonnées sauvegardées",
          description: "Les informations de contact ont été mises à jour",
        });
      } else {
        throw new Error("Erreur");
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-500 mt-1">
            Configuration générale du site et coordonnées
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="general" className="gap-2">
              <SettingsIcon className="h-4 w-4" />
              Général
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <Phone className="h-4 w-4" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="seo" className="gap-2">
              <Search className="h-4 w-4" />
              SEO
            </TabsTrigger>
            <TabsTrigger value="media" className="gap-2">
              <Image className="h-4 w-4" />
              Médias
            </TabsTrigger>
          </TabsList>

          {/* Onglet Général */}
          <TabsContent value="general">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-[#8B1538]" />
                  Informations de l'entreprise
                </CardTitle>
                <CardDescription>
                  Nom et identité de l'entreprise affichés sur le site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Nom complet de l'entreprise</Label>
                    <Input
                      value={config.companyName}
                      onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
                      placeholder="Groupe Rishom"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nom court</Label>
                    <Input
                      value={config.companyShortName}
                      onChange={(e) => setConfig({ ...config, companyShortName: e.target.value })}
                      placeholder="Rishom"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Langue par défaut</Label>
                    <Input
                      value={config.defaultLanguage}
                      onChange={(e) => setConfig({ ...config, defaultLanguage: e.target.value })}
                      placeholder="FR"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fuseau horaire</Label>
                    <Input
                      value={config.timezone}
                      onChange={(e) => setConfig({ ...config, timezone: e.target.value })}
                      placeholder="Africa/Ouagadougou"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Devise</Label>
                    <Input
                      value={config.currency}
                      onChange={(e) => setConfig({ ...config, currency: e.target.value })}
                      placeholder="XOF"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveConfig}
                    disabled={isSaving}
                    className="bg-[#8B1538] hover:bg-[#7A1230]"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Enregistrement..." : "Enregistrer"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Contact */}
          <TabsContent value="contact">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#8B1538]" />
                  Coordonnées du siège
                </CardTitle>
                <CardDescription>
                  Informations de contact affichées dans le footer et la page contact
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Nom du lieu</Label>
                    <Input
                      value={contact.locationName}
                      onChange={(e) => setContact({ ...contact, locationName: e.target.value })}
                      placeholder="Siège social"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Pays</Label>
                    <Input
                      value={contact.country}
                      onChange={(e) => setContact({ ...contact, country: e.target.value })}
                      placeholder="Burkina Faso"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Adresse</Label>
                  <Textarea
                    value={contact.address}
                    onChange={(e) => setContact({ ...contact, address: e.target.value })}
                    placeholder="Avenue de l'Indépendance, Secteur 15"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Ville</Label>
                    <Input
                      value={contact.city}
                      onChange={(e) => setContact({ ...contact, city: e.target.value })}
                      placeholder="Ouagadougou"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Code postal</Label>
                    <Input
                      value={contact.postalCode}
                      onChange={(e) => setContact({ ...contact, postalCode: e.target.value })}
                      placeholder="01 BP 1234"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Téléphone fixe
                    </Label>
                    <Input
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      placeholder="+226 25 XX XX XX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Téléphone mobile
                    </Label>
                    <Input
                      value={contact.phoneMobile}
                      onChange={(e) => setContact({ ...contact, phoneMobile: e.target.value })}
                      placeholder="+226 70 XX XX XX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email principal
                    </Label>
                    <Input
                      type="email"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      placeholder="contact@rishom-group.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email secondaire
                    </Label>
                    <Input
                      type="email"
                      value={contact.emailSecondary}
                      onChange={(e) => setContact({ ...contact, emailSecondary: e.target.value })}
                      placeholder="info@rishom-group.com"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Horaires d'ouverture
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-500">Lundi - Vendredi</Label>
                      <Input
                        value={contact.openingHours.weekdays}
                        onChange={(e) => setContact({
                          ...contact,
                          openingHours: { ...contact.openingHours, weekdays: e.target.value }
                        })}
                        placeholder="08:00 - 17:00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-500">Samedi</Label>
                      <Input
                        value={contact.openingHours.saturday}
                        onChange={(e) => setContact({
                          ...contact,
                          openingHours: { ...contact.openingHours, saturday: e.target.value }
                        })}
                        placeholder="08:00 - 12:00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-500">Dimanche</Label>
                      <Input
                        value={contact.openingHours.sunday}
                        onChange={(e) => setContact({
                          ...contact,
                          openingHours: { ...contact.openingHours, sunday: e.target.value }
                        })}
                        placeholder="Fermé"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveContact}
                    disabled={isSaving}
                    className="bg-[#8B1538] hover:bg-[#7A1230]"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Enregistrement..." : "Enregistrer"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet SEO */}
          <TabsContent value="seo">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-[#8B1538]" />
                  Optimisation SEO
                </CardTitle>
                <CardDescription>
                  Métadonnées pour le référencement et les réseaux sociaux
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Titre du site</Label>
                  <Input
                    value={config.siteTitle}
                    onChange={(e) => setConfig({ ...config, siteTitle: e.target.value })}
                    placeholder="Groupe Rishom - Excellence entrepreneuriale en Afrique"
                  />
                  <p className="text-xs text-gray-500">
                    Apparaît dans l'onglet du navigateur et les résultats de recherche
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Description du site</Label>
                  <Textarea
                    value={config.siteDescription}
                    onChange={(e) => setConfig({ ...config, siteDescription: e.target.value })}
                    placeholder="Description pour les moteurs de recherche..."
                    rows={3}
                  />
                  <p className="text-xs text-gray-500">
                    160 caractères max recommandés. Actuellement: {config.siteDescription.length}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Mots-clés</Label>
                  <Input
                    value={config.siteKeywords}
                    onChange={(e) => setConfig({ ...config, siteKeywords: e.target.value })}
                    placeholder="Rishom, Burkina Faso, BTP, Conseil..."
                  />
                  <p className="text-xs text-gray-500">
                    Séparez les mots-clés par des virgules
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>ID Google Analytics</Label>
                  <Input
                    value={config.googleAnalyticsId}
                    onChange={(e) => setConfig({ ...config, googleAnalyticsId: e.target.value })}
                    placeholder="G-XXXXXXXXXX ou UA-XXXXXXXX-X"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveConfig}
                    disabled={isSaving}
                    className="bg-[#8B1538] hover:bg-[#7A1230]"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Enregistrement..." : "Enregistrer"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Médias */}
          <TabsContent value="media">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5 text-[#8B1538]" />
                  Images du site
                </CardTitle>
                <CardDescription>
                  Favicon et image de partage sur les réseaux sociaux
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ImagePicker
                  label="Favicon"
                  value={config.faviconUrl}
                  onChange={(url) => setConfig({ ...config, faviconUrl: url })}
                  aspectRatio="square"
                />
                <p className="text-xs text-gray-500 -mt-4">
                  Image carrée de 32x32 ou 64x64 pixels recommandée
                </p>

                <ImagePicker
                  label="Image Open Graph (partage réseaux sociaux)"
                  value={config.ogImageUrl}
                  onChange={(url) => setConfig({ ...config, ogImageUrl: url })}
                  aspectRatio="banner"
                />
                <p className="text-xs text-gray-500 -mt-4">
                  Image de 1200x630 pixels recommandée pour un affichage optimal
                </p>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveConfig}
                    disabled={isSaving}
                    className="bg-[#8B1538] hover:bg-[#7A1230]"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Enregistrement..." : "Enregistrer"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
