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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Pencil, Trash2, HelpCircle } from "lucide-react";

interface Category {
  id: string;
  name: string;
  displayOrder: number;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  categoryId: string | null;
  displayOrder: number;
  isActive: boolean;
}

export default function AdminFaq() {
  const { toast } = useToast();
  const [items, setItems] = useState<FaqItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FaqItem | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
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
      const [itemsRes, categoriesRes] = await Promise.all([
        fetch("/api/admin/faq"),
        fetch("/api/admin/faq/categories"),
      ]);
      if (itemsRes.ok) setItems(await itemsRes.json());
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
      question: "",
      answer: "",
      categoryId: "",
      displayOrder: items.length,
      isActive: true,
    });
    setEditingItem(null);
  };

  const handleEdit = (item: FaqItem) => {
    setEditingItem(item);
    setFormData({
      question: item.question,
      answer: item.answer,
      categoryId: item.categoryId || "",
      displayOrder: item.displayOrder,
      isActive: item.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingItem
        ? `/api/admin/faq/${editingItem.id}`
        : "/api/admin/faq";
      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: editingItem ? "Question mise à jour" : "Question ajoutée",
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
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette question ?")) return;

    try {
      const response = await fetch(`/api/admin/faq/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Question supprimée",
          description: "La question a été supprimée avec succès",
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
      const response = await fetch("/api/admin/faq/categories", {
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
    if (!categoryId) return "Sans catégorie";
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || "Sans catégorie";
  };

  const groupedItems = items.reduce((acc, item) => {
    const categoryId = item.categoryId || "uncategorized";
    if (!acc[categoryId]) acc[categoryId] = [];
    acc[categoryId].push(item);
    return acc;
  }, {} as Record<string, FaqItem[]>);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">FAQ</h1>
            <p className="text-gray-500 mt-1">
              Gérez les questions fréquentes
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
                  Ajouter une question
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingItem ? "Modifier la question" : "Nouvelle question"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Question *</Label>
                    <Input
                      value={formData.question}
                      onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                      placeholder="La question..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Réponse *</Label>
                    <Textarea
                      value={formData.answer}
                      onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                      placeholder="La réponse..."
                      rows={5}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Catégorie</Label>
                      <Select
                        value={formData.categoryId}
                        onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sans catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Sans catégorie</SelectItem>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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

                  <div className="flex items-center gap-3">
                    <Switch
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    />
                    <Label>Actif</Label>
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
        </div>

        <Card className="border-0 shadow-md">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : items.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucune question pour le moment</p>
                <p className="text-sm">Cliquez sur "Ajouter une question" pour commencer</p>
              </div>
            ) : (
              <div className="p-4 space-y-6">
                {Object.entries(groupedItems).map(([categoryId, categoryItems]) => (
                  <div key={categoryId}>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      {categoryId === "uncategorized"
                        ? "Sans catégorie"
                        : getCategoryName(categoryId)}
                    </h3>
                    <Accordion type="single" collapsible className="space-y-2">
                      {categoryItems.map((item) => (
                        <AccordionItem key={item.id} value={item.id} className="border rounded-lg px-4">
                          <div className="flex items-center">
                            <AccordionTrigger className="flex-1 text-left">
                              <span className={!item.isActive ? "text-gray-400" : ""}>
                                {item.question}
                              </span>
                            </AccordionTrigger>
                            <div className="flex gap-1 ml-2">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(item);
                                }}
                              >
                                <Pencil className="h-3 w-3" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(item.id);
                                }}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <AccordionContent>
                            <p className="text-gray-600 whitespace-pre-wrap">{item.answer}</p>
                            {!item.isActive && (
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded mt-2 inline-block">
                                Inactif
                              </span>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
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
