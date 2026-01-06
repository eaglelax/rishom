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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, GripVertical, Image } from "lucide-react";

interface Slide {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  imageAltText: string | null;
  linkUrl: string | null;
  ctaText: string | null;
  colorCode: string | null;
  isActive: boolean;
  displayOrder: number;
}

export default function AdminCarousel() {
  const { toast } = useToast();
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    imageUrl: "",
    imageAltText: "",
    linkUrl: "",
    ctaText: "",
    colorCode: "#8B1538",
    isActive: true,
    displayOrder: 0,
  });

  const fetchSlides = async () => {
    try {
      const response = await fetch("/api/admin/carousel");
      if (response.ok) {
        const data = await response.json();
        setSlides(data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      imageUrl: "",
      imageAltText: "",
      linkUrl: "",
      ctaText: "",
      colorCode: "#8B1538",
      isActive: true,
      displayOrder: slides.length,
    });
    setEditingSlide(null);
  };

  const handleEdit = (slide: Slide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle || "",
      imageUrl: slide.imageUrl,
      imageAltText: slide.imageAltText || "",
      linkUrl: slide.linkUrl || "",
      ctaText: slide.ctaText || "",
      colorCode: slide.colorCode || "#8B1538",
      isActive: slide.isActive,
      displayOrder: slide.displayOrder,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.imageUrl) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une image",
        variant: "destructive",
      });
      return;
    }

    try {
      const url = editingSlide
        ? `/api/admin/carousel/${editingSlide.id}`
        : "/api/admin/carousel";
      const method = editingSlide ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: editingSlide ? "Slide mis à jour" : "Slide créé",
          description: "Les modifications ont été enregistrées",
        });
        setIsDialogOpen(false);
        resetForm();
        fetchSlides();
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
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce slide ?")) return;

    try {
      const response = await fetch(`/api/admin/carousel/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Slide supprimé",
          description: "Le slide a été supprimé avec succès",
        });
        fetchSlides();
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (slide: Slide) => {
    try {
      await fetch(`/api/admin/carousel/${slide.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...slide, isActive: !slide.isActive }),
      });
      fetchSlides();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Carousel</h1>
            <p className="text-gray-500 mt-1">
              Gérez les slides du carousel de la page d'accueil
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-[#8B1538] hover:bg-[#7A1230]">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un slide
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingSlide ? "Modifier le slide" : "Nouveau slide"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Titre *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Titre du slide"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Couleur</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={formData.colorCode}
                        onChange={(e) => setFormData({ ...formData, colorCode: e.target.value })}
                        className="w-14 h-10 p-1"
                      />
                      <Input
                        value={formData.colorCode}
                        onChange={(e) => setFormData({ ...formData, colorCode: e.target.value })}
                        placeholder="#8B1538"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Sous-titre</Label>
                  <Textarea
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Sous-titre du slide"
                    rows={2}
                  />
                </div>

                <ImagePicker
                  label="Image du slide"
                  value={formData.imageUrl}
                  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                  required
                  aspectRatio="banner"
                />

                <div className="space-y-2">
                  <Label>Texte alternatif de l'image</Label>
                  <Input
                    value={formData.imageAltText}
                    onChange={(e) => setFormData({ ...formData, imageAltText: e.target.value })}
                    placeholder="Description de l'image"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Lien (URL)</Label>
                    <Input
                      value={formData.linkUrl}
                      onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                      placeholder="/page ou https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Texte du bouton</Label>
                    <Input
                      value={formData.ctaText}
                      onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                      placeholder="En savoir plus"
                    />
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
                    {editingSlide ? "Mettre à jour" : "Créer"}
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
            ) : slides.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Image className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucun slide pour le moment</p>
                <p className="text-sm">Cliquez sur "Ajouter un slide" pour commencer</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead className="w-20">Image</TableHead>
                    <TableHead>Titre</TableHead>
                    <TableHead>Lien</TableHead>
                    <TableHead className="w-24">Statut</TableHead>
                    <TableHead className="w-32 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {slides.map((slide) => (
                    <TableRow key={slide.id}>
                      <TableCell>
                        <div className="flex items-center gap-2 text-gray-400">
                          <GripVertical className="h-4 w-4" />
                          {slide.displayOrder}
                        </div>
                      </TableCell>
                      <TableCell>
                        <img
                          src={slide.imageUrl}
                          alt={slide.imageAltText || slide.title}
                          className="w-16 h-10 object-cover rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/64x40";
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{slide.title}</p>
                          {slide.subtitle && (
                            <p className="text-sm text-gray-500 truncate max-w-xs">
                              {slide.subtitle}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {slide.linkUrl ? (
                          <span className="text-sm text-blue-600">{slide.linkUrl}</span>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={slide.isActive}
                          onCheckedChange={() => toggleActive(slide)}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleEdit(slide)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(slide.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
