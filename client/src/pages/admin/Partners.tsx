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
import { Plus, Pencil, Trash2, Building2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  displayOrder: number;
}

interface Partner {
  id: string;
  name: string;
  logoUrl: string | null;
  websiteUrl: string | null;
  description: string | null;
  categoryId: string | null;
  displayOrder: number;
  isActive: boolean;
}

export default function AdminPartners() {
  const { toast } = useToast();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    logoUrl: "",
    websiteUrl: "",
    description: "",
    categoryId: "",
    displayOrder: 0,
    isActive: true,
  });
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    displayOrder: 0,
  });

  const fetchData = async () => {
    try {
      const [partnersRes, categoriesRes] = await Promise.all([
        fetch("/api/admin/partners"),
        fetch("/api/admin/partners/categories"),
      ]);
      if (partnersRes.ok) setPartners(await partnersRes.json());
      if (categoriesRes.ok) setCategories(await categoriesRes.json());
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
      name: "",
      logoUrl: "",
      websiteUrl: "",
      description: "",
      categoryId: "",
      displayOrder: partners.length,
      isActive: true,
    });
    setEditingPartner(null);
  };

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      logoUrl: partner.logoUrl || "",
      websiteUrl: partner.websiteUrl || "",
      description: partner.description || "",
      categoryId: partner.categoryId || "",
      displayOrder: partner.displayOrder,
      isActive: partner.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingPartner
        ? `/api/admin/partners/${editingPartner.id}`
        : "/api/admin/partners";
      const method = editingPartner ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: editingPartner ? "Partenaire mis à jour" : "Partenaire ajouté",
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
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce partenaire ?")) return;

    try {
      const response = await fetch(`/api/admin/partners/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Partenaire supprimé",
          description: "Le partenaire a été supprimé avec succès",
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

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/admin/partners/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryForm),
      });

      if (response.ok) {
        toast({
          title: "Catégorie créée",
          description: "La catégorie a été créée avec succès",
        });
        setIsCategoryDialogOpen(false);
        setCategoryForm({ name: "", displayOrder: 0 });
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

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return "-";
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || "-";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Partenaires</h1>
            <p className="text-gray-500 mt-1">
              Gérez les partenaires du groupe
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Catégorie
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nouvelle catégorie</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCategorySubmit} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Nom *</Label>
                    <Input
                      value={categoryForm.name}
                      onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                      placeholder="Nom de la catégorie"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Ordre d'affichage</Label>
                    <Input
                      type="number"
                      value={categoryForm.displayOrder}
                      onChange={(e) => setCategoryForm({ ...categoryForm, displayOrder: parseInt(e.target.value) })}
                      min={0}
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button type="submit" className="bg-[#8B1538] hover:bg-[#7A1230]">
                      Créer
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="bg-[#8B1538] hover:bg-[#7A1230]">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un partenaire
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingPartner ? "Modifier le partenaire" : "Nouveau partenaire"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nom *</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nom du partenaire"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Catégorie</Label>
                      <Select
                        value={formData.categoryId}
                        onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner..." />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <ImagePicker
                    label="Logo"
                    value={formData.logoUrl}
                    onChange={(url) => setFormData({ ...formData, logoUrl: url })}
                    aspectRatio="logo"
                  />

                  <div className="space-y-2">
                    <Label>Site web</Label>
                    <Input
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Description du partenaire"
                      rows={3}
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
                      {editingPartner ? "Mettre à jour" : "Créer"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className="border-0 shadow-md">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : partners.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucun partenaire pour le moment</p>
                <p className="text-sm">Cliquez sur "Ajouter un partenaire" pour commencer</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {partners.map((partner) => (
                  <div key={partner.id} className="border rounded-lg p-4 flex flex-col">
                    <div className="h-20 flex items-center justify-center mb-3">
                      {partner.logoUrl ? (
                        <img
                          src={partner.logoUrl}
                          alt={partner.name}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.opacity = "0";
                          }}
                        />
                      ) : (
                        <Building2 className="h-12 w-12 text-gray-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-center">{partner.name}</p>
                      <p className="text-xs text-gray-500 text-center mt-1">
                        {getCategoryName(partner.categoryId)}
                      </p>
                    </div>
                    <div className="flex justify-center gap-2 mt-3 pt-3 border-t">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => handleEdit(partner)}
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(partner.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    {!partner.isActive && (
                      <div className="text-center mt-2">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          Inactif
                        </span>
                      </div>
                    )}
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
