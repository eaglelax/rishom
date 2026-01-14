import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
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
import { Plus, Pencil, Trash2, Heart, Star, Shield, Target, Users, Lightbulb, Award, Zap } from "lucide-react";

interface CompanyValue {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  displayOrder: number;
  isActive: boolean;
}

const iconOptions = [
  { value: "heart", label: "Coeur", icon: Heart },
  { value: "star", label: "Étoile", icon: Star },
  { value: "shield", label: "Bouclier", icon: Shield },
  { value: "target", label: "Cible", icon: Target },
  { value: "users", label: "Équipe", icon: Users },
  { value: "lightbulb", label: "Innovation", icon: Lightbulb },
  { value: "award", label: "Excellence", icon: Award },
  { value: "zap", label: "Énergie", icon: Zap },
];

const getIconComponent = (iconName: string | null) => {
  const option = iconOptions.find(o => o.value === iconName);
  return option?.icon || Heart;
};

export default function AdminValues() {
  const { toast } = useToast();
  const [values, setValues] = useState<CompanyValue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CompanyValue | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "heart",
    displayOrder: 0,
    isActive: true,
  });

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/values");
      if (response.ok) {
        setValues(await response.json());
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
      title: "",
      description: "",
      icon: "heart",
      displayOrder: values.length,
      isActive: true,
    });
    setEditingItem(null);
  };

  const handleEdit = (item: CompanyValue) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      icon: item.icon || "heart",
      displayOrder: item.displayOrder,
      isActive: item.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingItem
        ? `/api/admin/values/${editingItem.id}`
        : "/api/admin/values";
      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: editingItem ? "Valeur mise à jour" : "Valeur créée",
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
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette valeur ?")) return;

    try {
      const response = await fetch(`/api/admin/values/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Valeur supprimée",
          description: "La valeur a été supprimée avec succès",
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
            <h1 className="text-3xl font-bold text-gray-900">Valeurs de l'entreprise</h1>
            <p className="text-gray-500 mt-1">
              Définissez les valeurs fondamentales du groupe
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-[#8B1538] hover:bg-[#7A1230]">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une valeur
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? "Modifier la valeur" : "Nouvelle valeur"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Titre *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Ex: Excellence"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Icône</Label>
                    <Select
                      value={formData.icon}
                      onValueChange={(value) => setFormData({ ...formData, icon: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <option.icon className="h-4 w-4" />
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Décrivez cette valeur..."
                    rows={3}
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
                    <Label>Active</Label>
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
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : values.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucune valeur définie</p>
                <p className="text-sm">Cliquez sur "Ajouter une valeur" pour commencer</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {values.sort((a, b) => a.displayOrder - b.displayOrder).map((item) => {
                  const IconComponent = getIconComponent(item.icon);
                  return (
                    <div
                      key={item.id}
                      className={`border rounded-lg p-5 ${!item.isActive ? "opacity-50" : ""}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#8B1538] to-[#C74634] rounded-xl flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                          {item.description && (
                            <p className="text-gray-600 text-sm mt-1 line-clamp-3">{item.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => handleEdit(item)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
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
