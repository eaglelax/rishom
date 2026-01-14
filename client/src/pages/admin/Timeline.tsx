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
import { Plus, Pencil, Trash2, Calendar, Clock } from "lucide-react";

interface Milestone {
  id: string;
  year: number;
  title: string;
  description: string | null;
  imageUrl: string | null;
  displayOrder: number;
  isActive: boolean;
}

export default function AdminTimeline() {
  const { toast } = useToast();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Milestone | null>(null);
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    title: "",
    description: "",
    imageUrl: "",
    displayOrder: 0,
    isActive: true,
  });

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/timeline");
      if (response.ok) {
        setMilestones(await response.json());
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
      year: new Date().getFullYear(),
      title: "",
      description: "",
      imageUrl: "",
      displayOrder: milestones.length,
      isActive: true,
    });
    setEditingItem(null);
  };

  const handleEdit = (item: Milestone) => {
    setEditingItem(item);
    setFormData({
      year: item.year,
      title: item.title,
      description: item.description || "",
      imageUrl: item.imageUrl || "",
      displayOrder: item.displayOrder,
      isActive: item.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingItem
        ? `/api/admin/timeline/${editingItem.id}`
        : "/api/admin/timeline";
      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: editingItem ? "Jalon mis à jour" : "Jalon créé",
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
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce jalon ?")) return;

    try {
      const response = await fetch(`/api/admin/timeline/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Jalon supprimé",
          description: "Le jalon a été supprimé avec succès",
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
            <h1 className="text-3xl font-bold text-gray-900">Timeline / Historique</h1>
            <p className="text-gray-500 mt-1">
              Gérez les jalons de l'histoire du groupe
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-[#8B1538] hover:bg-[#7A1230]">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un jalon
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? "Modifier le jalon" : "Nouveau jalon"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Année *</Label>
                    <Input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      min={1900}
                      max={2100}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Ordre d'affichage</Label>
                    <Input
                      type="number"
                      value={formData.displayOrder}
                      onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                      min={0}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Titre *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: Création du groupe Rishom"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Décrivez cet événement..."
                    rows={3}
                  />
                </div>

                <ImagePicker
                  label="Image (optionnelle)"
                  value={formData.imageUrl}
                  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                  aspectRatio="banner"
                />

                <div className="flex items-center gap-3">
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                  <Label>Actif (visible sur le site)</Label>
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
            ) : milestones.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucun jalon pour le moment</p>
                <p className="text-sm">Cliquez sur "Ajouter un jalon" pour commencer</p>
              </div>
            ) : (
              <div className="relative p-6">
                {/* Timeline line */}
                <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#8B1538] to-[#C74634]" />

                <div className="space-y-6">
                  {milestones.sort((a, b) => a.year - b.year).map((item, index) => (
                    <div
                      key={item.id}
                      className={`relative flex gap-6 ${!item.isActive ? "opacity-50" : ""}`}
                    >
                      {/* Year circle */}
                      <div className="relative z-10 flex-shrink-0 w-24 h-24 bg-gradient-to-br from-[#8B1538] to-[#C74634] rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">{item.year}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-white border rounded-lg p-4 shadow-sm">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                            {item.description && (
                              <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
                            )}
                            {item.imageUrl && (
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="mt-3 rounded-lg max-h-32 object-cover"
                              />
                            )}
                          </div>
                          <div className="flex gap-2 ml-4">
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
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
