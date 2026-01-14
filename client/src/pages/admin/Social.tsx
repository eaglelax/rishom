import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Pencil,
  Trash2,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ExternalLink,
  Save
} from "lucide-react";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  isActive: boolean;
  displayOrder: number;
}

const platformOptions = [
  { value: "facebook", label: "Facebook", icon: Facebook, color: "#1877F2" },
  { value: "twitter", label: "Twitter / X", icon: Twitter, color: "#1DA1F2" },
  { value: "instagram", label: "Instagram", icon: Instagram, color: "#E4405F" },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin, color: "#0A66C2" },
  { value: "youtube", label: "YouTube", icon: Youtube, color: "#FF0000" },
  { value: "website", label: "Site web", icon: Globe, color: "#8B1538" },
];

const getIconComponent = (platform: string) => {
  const option = platformOptions.find(o => o.value === platform);
  return option?.icon || Globe;
};

const getPlatformColor = (platform: string) => {
  const option = platformOptions.find(o => o.value === platform);
  return option?.color || "#8B1538";
};

export default function AdminSocial() {
  const { toast } = useToast();
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SocialLink | null>(null);
  const [formData, setFormData] = useState({
    platform: "facebook",
    url: "",
    isActive: true,
    displayOrder: 0,
  });

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/social");
      if (response.ok) {
        setLinks(await response.json());
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

  const resetForm = () => {
    setFormData({
      platform: "facebook",
      url: "",
      isActive: true,
      displayOrder: links.length,
    });
    setEditingItem(null);
  };

  const handleEdit = (item: SocialLink) => {
    setEditingItem(item);
    setFormData({
      platform: item.platform,
      url: item.url,
      isActive: item.isActive,
      displayOrder: item.displayOrder,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingItem
        ? `/api/admin/social/${editingItem.id}`
        : "/api/admin/social";
      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: editingItem ? "Lien mis à jour" : "Lien créé",
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
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce lien ?")) return;

    try {
      const response = await fetch(`/api/admin/social/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Lien supprimé",
          description: "Le lien a été supprimé avec succès",
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

  const handleQuickUpdate = async (item: SocialLink, changes: Partial<SocialLink>) => {
    try {
      const response = await fetch(`/api/admin/social/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, ...changes }),
      });

      if (response.ok) {
        toast({
          title: "Mise à jour",
          description: "Modification enregistrée",
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
            <h1 className="text-3xl font-bold text-gray-900">Réseaux sociaux</h1>
            <p className="text-gray-500 mt-1">
              Gérez les liens vers vos réseaux sociaux
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-[#8B1538] hover:bg-[#7A1230]">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un réseau
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? "Modifier le lien" : "Nouveau réseau social"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Plateforme *</Label>
                  <Select
                    value={formData.platform}
                    onValueChange={(value) => setFormData({ ...formData, platform: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {platformOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <option.icon className="h-4 w-4" style={{ color: option.color }} />
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>URL *</Label>
                  <Input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://..."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ordre d'affichage</Label>
                    <Input
                      type="number"
                      value={formData.displayOrder}
                      onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                      min={0}
                    />
                  </div>
                  <div className="flex items-center gap-3 pt-6">
                    <Switch
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    />
                    <Label>Actif</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" className="bg-[#8B1538] hover:bg-[#7A1230]">
                    {editingItem ? "Mettre à jour" : "Créer"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-[#8B1538]" />
              Vos réseaux sociaux
            </CardTitle>
            <CardDescription>
              Ces liens apparaissent dans la barre supérieure et le pied de page du site
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : links.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucun réseau social configuré</p>
                <p className="text-sm">Cliquez sur "Ajouter un réseau" pour commencer</p>
              </div>
            ) : (
              <div className="space-y-3">
                {links.sort((a, b) => a.displayOrder - b.displayOrder).map((item) => {
                  const IconComponent = getIconComponent(item.platform);
                  const color = getPlatformColor(item.platform);
                  const platformLabel = platformOptions.find(p => p.value === item.platform)?.label || item.platform;

                  return (
                    <div
                      key={item.id}
                      className={`flex items-center gap-4 p-4 border rounded-lg ${!item.isActive ? "opacity-50" : ""}`}
                    >
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${color}15` }}
                      >
                        <IconComponent className="h-6 w-6" style={{ color }} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">{platformLabel}</p>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-500 hover:text-[#8B1538] truncate block"
                        >
                          {item.url}
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <Switch
                          checked={item.isActive}
                          onCheckedChange={(checked) => handleQuickUpdate(item, { isActive: checked })}
                        />
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <ExternalLink className="h-4 w-4 text-gray-500" />
                        </a>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleEdit(item)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
