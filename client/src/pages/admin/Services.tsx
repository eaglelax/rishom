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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Layers } from "lucide-react";

interface Entity {
  id: string;
  name: string;
  shortName: string;
}

interface Service {
  id: string;
  entityId: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  fullDescription: string | null;
  iconName: string | null;
  imageUrl: string | null;
  displayOrder: number;
  isActive: boolean;
}

export default function AdminServices() {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    entityId: "",
    name: "",
    slug: "",
    shortDescription: "",
    fullDescription: "",
    iconName: "",
    imageUrl: "",
    displayOrder: 0,
    isActive: true,
  });

  const iconSuggestions = [
    "briefcase", "chart-bar", "clipboard", "cog", "database", "file-text",
    "globe", "laptop", "lightbulb", "package", "shield", "truck",
    "users", "zap", "target", "trending-up"
  ];

  const fetchData = async () => {
    try {
      const [servicesRes, entitiesRes] = await Promise.all([
        fetch("/api/admin/services"),
        fetch("/api/admin/entities"),
      ]);
      if (servicesRes.ok) setServices(await servicesRes.json());
      if (entitiesRes.ok) setEntities(await entitiesRes.json());
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
      entityId: "",
      name: "",
      slug: "",
      shortDescription: "",
      fullDescription: "",
      iconName: "",
      imageUrl: "",
      displayOrder: services.length,
      isActive: true,
    });
    setEditingService(null);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      entityId: service.entityId,
      name: service.name,
      slug: service.slug,
      shortDescription: service.shortDescription || "",
      fullDescription: service.fullDescription || "",
      iconName: service.iconName || "",
      imageUrl: service.imageUrl || "",
      displayOrder: service.displayOrder,
      isActive: service.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.entityId) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une entité",
        variant: "destructive",
      });
      return;
    }

    try {
      const url = editingService
        ? `/api/admin/services/${editingService.id}`
        : "/api/admin/services";
      const method = editingService ? "PUT" : "POST";

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
          title: editingService ? "Service mis à jour" : "Service créé",
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
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) return;

    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Service supprimé",
          description: "Le service a été supprimé avec succès",
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

  const getEntityName = (entityId: string) => {
    const entity = entities.find((e) => e.id === entityId);
    return entity?.shortName || entity?.name || "-";
  };

  const groupedServices = services.reduce((acc, service) => {
    const entityId = service.entityId;
    if (!acc[entityId]) acc[entityId] = [];
    acc[entityId].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Services</h1>
            <p className="text-gray-500 mt-1">
              Gérez les services proposés par chaque entité
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-[#8B1538] hover:bg-[#7A1230]">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingService ? "Modifier le service" : "Nouveau service"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Entité *</Label>
                    <Select
                      value={formData.entityId}
                      onValueChange={(value) => setFormData({ ...formData, entityId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une entité" />
                      </SelectTrigger>
                      <SelectContent>
                        {entities.map((entity) => (
                          <SelectItem key={entity.id} value={entity.id}>
                            {entity.shortName || entity.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Nom du service *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Conseil en stratégie"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Slug (URL)</Label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="Auto-généré si vide"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description courte</Label>
                  <Textarea
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    placeholder="Résumé du service en quelques phrases"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description complète</Label>
                  <Textarea
                    value={formData.fullDescription}
                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                    placeholder="Description détaillée du service"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Icône (nom Lucide)</Label>
                  <Input
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    placeholder="Ex: briefcase, chart-bar"
                  />
                  <div className="flex flex-wrap gap-1 mt-1">
                    {iconSuggestions.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setFormData({ ...formData, iconName: icon })}
                        className={`text-xs px-2 py-1 rounded ${
                          formData.iconName === icon
                            ? "bg-[#8B1538] text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                <ImagePicker
                  label="Image du service"
                  value={formData.imageUrl}
                  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                  aspectRatio="video"
                />

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
                    {editingService ? "Mettre à jour" : "Créer"}
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
            ) : services.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Layers className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucun service pour le moment</p>
                <p className="text-sm">Cliquez sur "Ajouter un service" pour commencer</p>
              </div>
            ) : (
              <div className="p-4 space-y-6">
                {Object.entries(groupedServices).map(([entityId, entityServices]) => (
                  <div key={entityId}>
                    <h3 className="text-sm font-semibold text-[#8B1538] uppercase tracking-wider mb-3">
                      {getEntityName(entityId)}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {entityServices.map((service) => (
                        <div
                          key={service.id}
                          className={`border rounded-lg p-4 ${
                            !service.isActive ? "opacity-50 bg-gray-50" : ""
                          }`}
                        >
                          {service.imageUrl && (
                            <img
                              src={service.imageUrl}
                              alt={service.name}
                              className="w-full h-24 object-cover rounded mb-3"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                              }}
                            />
                          )}
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium">{service.name}</h4>
                              {service.shortDescription && (
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                  {service.shortDescription}
                                </p>
                              )}
                              {service.iconName && (
                                <p className="text-xs text-gray-400 mt-1">
                                  Icon: {service.iconName}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 mt-3 pt-3 border-t">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => handleEdit(service)}
                            >
                              <Pencil className="h-3 w-3" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDelete(service.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
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
