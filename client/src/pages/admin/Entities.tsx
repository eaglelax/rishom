import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ImagePicker from "@/components/admin/ImagePicker";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Building, ExternalLink, Phone, Mail, MapPin, Clock } from "lucide-react";

interface Entity {
  id: string;
  code: string;
  fullName: string;
  shortName: string;
  description: string | null;
  colorPrimary: string;
  colorSecondary: string | null;
  logoUrl: string | null;
  logoWhiteUrl: string | null;
  logoDarkUrl: string | null;
  pageSlug: string | null;
  aboutText: string | null;
  // Contact fields
  address: string | null;
  city: string | null;
  country: string | null;
  postalCode: string | null;
  phone: string | null;
  phone2: string | null;
  email: string | null;
  email2: string | null;
  mapUrl: string | null;
  latitude: string | null;
  longitude: string | null;
  openingHours: string | null;
  displayOrder: number;
  isActive: boolean;
}

interface FormData {
  code: string;
  fullName: string;
  shortName: string;
  description: string;
  colorPrimary: string;
  colorSecondary: string;
  logoUrl: string;
  logoWhiteUrl: string;
  logoDarkUrl: string;
  pageSlug: string;
  aboutText: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
  phone2: string;
  email: string;
  email2: string;
  mapUrl: string;
  latitude: string;
  longitude: string;
  openingHours: string;
  displayOrder: number;
  isActive: boolean;
}

const defaultFormData: FormData = {
  code: "",
  fullName: "",
  shortName: "",
  description: "",
  colorPrimary: "#8B1538",
  colorSecondary: "",
  logoUrl: "",
  logoWhiteUrl: "",
  logoDarkUrl: "",
  pageSlug: "",
  aboutText: "",
  address: "",
  city: "",
  country: "Burkina Faso",
  postalCode: "",
  phone: "",
  phone2: "",
  email: "",
  email2: "",
  mapUrl: "",
  latitude: "",
  longitude: "",
  openingHours: "",
  displayOrder: 0,
  isActive: true,
};

export default function AdminEntities() {
  const { toast } = useToast();
  const [entities, setEntities] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState<Entity | null>(null);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [activeTab, setActiveTab] = useState("general");

  const fetchData = async () => {
    try {
      const response = await fetch("/api/entities");
      if (response.ok) {
        setEntities(await response.json());
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const resetForm = () => {
    setFormData({ ...defaultFormData, displayOrder: entities.length });
    setEditingEntity(null);
    setActiveTab("general");
  };

  const handleEdit = (entity: Entity) => {
    setEditingEntity(entity);
    setFormData({
      code: entity.code,
      fullName: entity.fullName,
      shortName: entity.shortName,
      description: entity.description || "",
      colorPrimary: entity.colorPrimary,
      colorSecondary: entity.colorSecondary || "",
      logoUrl: entity.logoUrl || "",
      logoWhiteUrl: entity.logoWhiteUrl || "",
      logoDarkUrl: entity.logoDarkUrl || "",
      pageSlug: entity.pageSlug || "",
      aboutText: entity.aboutText || "",
      address: entity.address || "",
      city: entity.city || "",
      country: entity.country || "Burkina Faso",
      postalCode: entity.postalCode || "",
      phone: entity.phone || "",
      phone2: entity.phone2 || "",
      email: entity.email || "",
      email2: entity.email2 || "",
      mapUrl: entity.mapUrl || "",
      latitude: entity.latitude || "",
      longitude: entity.longitude || "",
      openingHours: entity.openingHours || "",
      displayOrder: entity.displayOrder,
      isActive: entity.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("admin_token");

    try {
      const url = editingEntity
        ? `/api/admin/entities/${editingEntity.id}`
        : "/api/admin/entities";
      const method = editingEntity ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          pageSlug: formData.pageSlug || generateSlug(formData.shortName),
        }),
      });

      if (response.ok) {
        toast({
          title: editingEntity ? "Entité mise à jour" : "Entité créée",
          description: "Les modifications ont été enregistrées",
        });
        setIsDialogOpen(false);
        resetForm();
        fetchData();
      } else {
        throw new Error("Erreur");
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette entité ?")) return;
    const token = localStorage.getItem("admin_token");

    try {
      const response = await fetch(`/api/admin/entities/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast({
          title: "Entité supprimée",
          description: "L'entité a été supprimée avec succès",
        });
        fetchData();
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Entités</h1>
            <p className="text-gray-500 mt-1">
              Gérez les filiales et entités du groupe avec leurs coordonnées
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-[#8B1538] hover:bg-[#7A1230]">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une entité
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingEntity ? "Modifier l'entité" : "Nouvelle entité"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="general">Général</TabsTrigger>
                    <TabsTrigger value="logos">Logos</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                    <TabsTrigger value="location">Localisation</TabsTrigger>
                  </TabsList>

                  {/* Tab: Général */}
                  <TabsContent value="general" className="space-y-4 mt-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Code *</Label>
                        <Input
                          value={formData.code}
                          onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                          placeholder="RBF"
                          maxLength={10}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Nom court *</Label>
                        <Input
                          value={formData.shortName}
                          onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                          placeholder="Rishom BF"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Slug (URL)</Label>
                        <Input
                          value={formData.pageSlug}
                          onChange={(e) => setFormData({ ...formData, pageSlug: e.target.value })}
                          placeholder="Auto-généré si vide"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Nom complet *</Label>
                      <Input
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Rishom Business Formation"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Couleur principale *</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={formData.colorPrimary}
                            onChange={(e) => setFormData({ ...formData, colorPrimary: e.target.value })}
                            className="w-14 h-10 p-1"
                          />
                          <Input
                            value={formData.colorPrimary}
                            onChange={(e) => setFormData({ ...formData, colorPrimary: e.target.value })}
                            placeholder="#8B1538"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Couleur secondaire</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={formData.colorSecondary || "#000000"}
                            onChange={(e) => setFormData({ ...formData, colorSecondary: e.target.value })}
                            className="w-14 h-10 p-1"
                          />
                          <Input
                            value={formData.colorSecondary}
                            onChange={(e) => setFormData({ ...formData, colorSecondary: e.target.value })}
                            placeholder="#C74634"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description courte</Label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Description brève de l'entité..."
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Texte À propos</Label>
                      <Textarea
                        value={formData.aboutText}
                        onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
                        placeholder="Texte détaillé pour la page À propos..."
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Ordre d'affichage</Label>
                        <Input
                          type="number"
                          value={formData.displayOrder}
                          onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                          min={0}
                        />
                      </div>
                      <div className="flex items-center gap-3 pt-6">
                        <Switch
                          checked={formData.isActive}
                          onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                        />
                        <Label>Active</Label>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Tab: Logos */}
                  <TabsContent value="logos" className="space-y-4 mt-4">
                    <ImagePicker
                      label="Logo principal"
                      value={formData.logoUrl}
                      onChange={(url) => setFormData({ ...formData, logoUrl: url })}
                    />
                    <ImagePicker
                      label="Logo blanc (pour fonds sombres)"
                      value={formData.logoWhiteUrl}
                      onChange={(url) => setFormData({ ...formData, logoWhiteUrl: url })}
                    />
                    <ImagePicker
                      label="Logo sombre (pour fonds clairs)"
                      value={formData.logoDarkUrl}
                      onChange={(url) => setFormData({ ...formData, logoDarkUrl: url })}
                    />
                  </TabsContent>

                  {/* Tab: Contact */}
                  <TabsContent value="contact" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Téléphone principal</Label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+226 25 XX XX XX"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Téléphone secondaire</Label>
                        <Input
                          value={formData.phone2}
                          onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
                          placeholder="+226 70 XX XX XX"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Email principal</Label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="contact@entity.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email secondaire</Label>
                        <Input
                          type="email"
                          value={formData.email2}
                          onChange={(e) => setFormData({ ...formData, email2: e.target.value })}
                          placeholder="info@entity.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Horaires d'ouverture</Label>
                      <Textarea
                        value={formData.openingHours}
                        onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                        placeholder="Lundi - Vendredi: 8h00 - 18h00&#10;Samedi: 8h00 - 12h00&#10;Dimanche: Fermé"
                        rows={4}
                      />
                    </div>
                  </TabsContent>

                  {/* Tab: Localisation */}
                  <TabsContent value="location" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Adresse</Label>
                      <Textarea
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="123 Avenue de l'Indépendance"
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Ville</Label>
                        <Input
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="Ouagadougou"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Code postal</Label>
                        <Input
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          placeholder="01 BP 1234"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Pays</Label>
                        <Input
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          placeholder="Burkina Faso"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Latitude</Label>
                        <Input
                          value={formData.latitude}
                          onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                          placeholder="12.3714"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Longitude</Label>
                        <Input
                          value={formData.longitude}
                          onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                          placeholder="-1.5197"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>URL Google Maps (iframe)</Label>
                      <Input
                        value={formData.mapUrl}
                        onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
                        placeholder="https://www.google.com/maps/embed?..."
                      />
                      <p className="text-xs text-gray-500">
                        Collez l'URL d'intégration Google Maps pour afficher une carte
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" className="bg-[#8B1538] hover:bg-[#7A1230]">
                    {editingEntity ? "Mettre à jour" : "Créer"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-0 shadow-md">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : entities.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucune entité pour le moment</p>
                <p className="text-sm">Cliquez sur "Ajouter une entité" pour commencer</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {entities.map((entity) => (
                  <div
                    key={entity.id}
                    className={`border rounded-lg overflow-hidden ${
                      !entity.isActive ? "opacity-60" : ""
                    }`}
                  >
                    <div
                      className="h-2"
                      style={{ backgroundColor: entity.colorPrimary || "#8B1538" }}
                    />
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        {entity.logoUrl ? (
                          <img
                            src={entity.logoUrl}
                            alt={entity.fullName}
                            className="w-16 h-16 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                            <Building className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className="px-2 py-0.5 text-xs font-bold text-white rounded"
                              style={{ backgroundColor: entity.colorPrimary }}
                            >
                              {entity.code}
                            </span>
                            <h3 className="font-semibold">{entity.shortName}</h3>
                          </div>
                          <p className="text-sm text-gray-500">{entity.fullName}</p>
                          {entity.description && (
                            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                              {entity.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Contact Info Summary */}
                      <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-2 text-xs text-gray-500">
                        {entity.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span className="truncate">{entity.phone}</span>
                          </div>
                        )}
                        {entity.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            <span className="truncate">{entity.email}</span>
                          </div>
                        )}
                        {entity.city && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{entity.city}, {entity.country}</span>
                          </div>
                        )}
                        {entity.openingHours && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span className="truncate">Horaires définis</span>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-end gap-2 mt-3 pt-3 border-t">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(entity)}
                        >
                          <Pencil className="h-3 w-3 mr-1" />
                          Modifier
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(entity.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
