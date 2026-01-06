import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ImagePicker from "@/components/admin/ImagePicker";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Building, ExternalLink } from "lucide-react";

interface Entity {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  description: string | null;
  logoUrl: string | null;
  headerImageUrl: string | null;
  primaryColor: string | null;
  websiteUrl: string | null;
  displayOrder: number;
  isActive: boolean;
}

export default function AdminEntities() {
  const { toast } = useToast();
  const [entities, setEntities] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState<Entity | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    slug: "",
    description: "",
    logoUrl: "",
    headerImageUrl: "",
    primaryColor: "#8B1538",
    websiteUrl: "",
    displayOrder: 0,
    isActive: true,
  });

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/entities");
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
    setFormData({
      name: "",
      shortName: "",
      slug: "",
      description: "",
      logoUrl: "",
      headerImageUrl: "",
      primaryColor: "#8B1538",
      websiteUrl: "",
      displayOrder: entities.length,
      isActive: true,
    });
    setEditingEntity(null);
  };

  const handleEdit = (entity: Entity) => {
    setEditingEntity(entity);
    setFormData({
      name: entity.name,
      shortName: entity.shortName,
      slug: entity.slug,
      description: entity.description || "",
      logoUrl: entity.logoUrl || "",
      headerImageUrl: entity.headerImageUrl || "",
      primaryColor: entity.primaryColor || "#8B1538",
      websiteUrl: entity.websiteUrl || "",
      displayOrder: entity.displayOrder,
      isActive: entity.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingEntity
        ? `/api/admin/entities/${editingEntity.id}`
        : "/api/admin/entities";
      const method = editingEntity ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          slug: formData.slug || generateSlug(formData.name),
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

    try {
      const response = await fetch(`/api/admin/entities/${id}`, {
        method: "DELETE",
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
              Gérez les filiales et entités du groupe
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
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingEntity ? "Modifier l'entité" : "Nouvelle entité"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nom complet *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Rishom Business Agency"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nom court *</Label>
                    <Input
                      value={formData.shortName}
                      onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                      placeholder="RBA"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Slug (URL)</Label>
                    <Input
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="Auto-généré si vide"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Couleur principale</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={formData.primaryColor}
                        onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                        className="w-14 h-10 p-1"
                      />
                      <Input
                        value={formData.primaryColor}
                        onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                        placeholder="#8B1538"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Description de l'entité..."
                    rows={3}
                  />
                </div>

                <ImagePicker
                  label="Logo"
                  value={formData.logoUrl}
                  onChange={(url) => setFormData({ ...formData, logoUrl: url })}
                  aspectRatio="logo"
                />

                <ImagePicker
                  label="Image d'en-tête"
                  value={formData.headerImageUrl}
                  onChange={(url) => setFormData({ ...formData, headerImageUrl: url })}
                  aspectRatio="banner"
                />

                <div className="space-y-2">
                  <Label>Site web</Label>
                  <Input
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    placeholder="https://..."
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
                    <Label>Active</Label>
                  </div>
                </div>


                <div className="flex justify-end gap-3 pt-4">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {entities.map((entity) => (
                  <div
                    key={entity.id}
                    className={`border rounded-lg overflow-hidden ${
                      !entity.isActive ? "opacity-60" : ""
                    }`}
                  >
                    <div
                      className="h-2"
                      style={{ backgroundColor: entity.primaryColor || "#8B1538" }}
                    />
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        {entity.logoUrl ? (
                          <img
                            src={entity.logoUrl}
                            alt={entity.name}
                            className="w-16 h-16 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://via.placeholder.com/64x64";
                            }}
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                            <Building className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{entity.shortName}</h3>
                            {entity.websiteUrl && (
                              <a
                                href={entity.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-[#8B1538]"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{entity.name}</p>
                          {entity.description && (
                            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                              {entity.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => handleEdit(entity)}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
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
