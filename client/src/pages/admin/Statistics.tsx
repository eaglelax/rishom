import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
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
import { Plus, Pencil, Trash2, BarChart3 } from "lucide-react";

interface Statistic {
  id: string;
  label: string;
  value: string;
  suffix: string | null;
  iconName: string | null;
  displayOrder: number;
  isActive: boolean;
}

export default function AdminStatistics() {
  const { toast } = useToast();
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStat, setEditingStat] = useState<Statistic | null>(null);
  const [formData, setFormData] = useState({
    label: "",
    value: "",
    suffix: "",
    iconName: "",
    displayOrder: 0,
    isActive: true,
  });

  const iconSuggestions = [
    "users", "building", "globe", "trophy", "star", "briefcase",
    "chart-bar", "clock", "check-circle", "award", "target", "trending-up"
  ];

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/statistics");
      if (response.ok) {
        setStatistics(await response.json());
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
      label: "",
      value: "",
      suffix: "",
      iconName: "",
      displayOrder: statistics.length,
      isActive: true,
    });
    setEditingStat(null);
  };

  const handleEdit = (stat: Statistic) => {
    setEditingStat(stat);
    setFormData({
      label: stat.label,
      value: stat.value,
      suffix: stat.suffix || "",
      iconName: stat.iconName || "",
      displayOrder: stat.displayOrder,
      isActive: stat.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingStat
        ? `/api/admin/statistics/${editingStat.id}`
        : "/api/admin/statistics";
      const method = editingStat ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: editingStat ? "Statistique mise à jour" : "Statistique créée",
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
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette statistique ?")) return;

    try {
      const response = await fetch(`/api/admin/statistics/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Statistique supprimée",
          description: "La statistique a été supprimée avec succès",
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
            <h1 className="text-3xl font-bold text-gray-900">Statistiques</h1>
            <p className="text-gray-500 mt-1">
              Gérez les chiffres clés affichés sur le site
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-[#8B1538] hover:bg-[#7A1230]">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une statistique
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingStat ? "Modifier la statistique" : "Nouvelle statistique"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Label *</Label>
                  <Input
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="Ex: Années d'expérience"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Valeur *</Label>
                    <Input
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                      placeholder="Ex: 25"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Suffixe</Label>
                    <Input
                      value={formData.suffix}
                      onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
                      placeholder="Ex: +, %, ans"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Icône (nom Lucide)</Label>
                  <Input
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    placeholder="Ex: users, building, globe"
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
                    {editingStat ? "Mettre à jour" : "Créer"}
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
            ) : statistics.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucune statistique pour le moment</p>
                <p className="text-sm">Cliquez sur "Ajouter une statistique" pour commencer</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {statistics.map((stat) => (
                  <div
                    key={stat.id}
                    className={`border rounded-lg p-4 text-center ${
                      !stat.isActive ? "opacity-50 bg-gray-50" : ""
                    }`}
                  >
                    <div className="text-3xl font-bold text-[#8B1538]">
                      {stat.value}
                      {stat.suffix && <span className="text-xl">{stat.suffix}</span>}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                    {stat.iconName && (
                      <p className="text-xs text-gray-400 mt-1">Icon: {stat.iconName}</p>
                    )}
                    <div className="flex justify-center gap-2 mt-3 pt-3 border-t">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => handleEdit(stat)}
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(stat.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
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
