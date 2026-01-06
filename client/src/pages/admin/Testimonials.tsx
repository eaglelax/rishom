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
import { Plus, Pencil, Trash2, Quote, Star } from "lucide-react";

interface Testimonial {
  id: string;
  authorName: string;
  authorPosition: string | null;
  authorCompany: string | null;
  authorPhotoUrl: string | null;
  content: string;
  rating: number | null;
  displayOrder: number;
  isActive: boolean;
}

export default function AdminTestimonials() {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    authorName: "",
    authorPosition: "",
    authorCompany: "",
    authorPhotoUrl: "",
    content: "",
    rating: 5,
    displayOrder: 0,
    isActive: true,
  });

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/testimonials");
      if (response.ok) {
        setTestimonials(await response.json());
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
      authorName: "",
      authorPosition: "",
      authorCompany: "",
      authorPhotoUrl: "",
      content: "",
      rating: 5,
      displayOrder: testimonials.length,
      isActive: true,
    });
    setEditingTestimonial(null);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      authorName: testimonial.authorName,
      authorPosition: testimonial.authorPosition || "",
      authorCompany: testimonial.authorCompany || "",
      authorPhotoUrl: testimonial.authorPhotoUrl || "",
      content: testimonial.content,
      rating: testimonial.rating || 5,
      displayOrder: testimonial.displayOrder,
      isActive: testimonial.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingTestimonial
        ? `/api/admin/testimonials/${editingTestimonial.id}`
        : "/api/admin/testimonials";
      const method = editingTestimonial ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: editingTestimonial ? "Témoignage mis à jour" : "Témoignage ajouté",
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
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce témoignage ?")) return;

    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Témoignage supprimé",
          description: "Le témoignage a été supprimé avec succès",
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

  const renderStars = (rating: number | null) => {
    if (!rating) return null;
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Témoignages</h1>
            <p className="text-gray-500 mt-1">
              Gérez les témoignages clients
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-[#8B1538] hover:bg-[#7A1230]">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un témoignage
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingTestimonial ? "Modifier le témoignage" : "Nouveau témoignage"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nom de l'auteur *</Label>
                    <Input
                      value={formData.authorName}
                      onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                      placeholder="Prénom et Nom"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Poste</Label>
                    <Input
                      value={formData.authorPosition}
                      onChange={(e) => setFormData({ ...formData, authorPosition: e.target.value })}
                      placeholder="Directeur, Manager, etc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Entreprise</Label>
                    <Input
                      value={formData.authorCompany}
                      onChange={(e) => setFormData({ ...formData, authorCompany: e.target.value })}
                      placeholder="Nom de l'entreprise"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Note (1-5)</Label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-6 w-6 transition-colors ${
                              star <= formData.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300 hover:text-yellow-200"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <ImagePicker
                  label="Photo de l'auteur"
                  value={formData.authorPhotoUrl}
                  onChange={(url) => setFormData({ ...formData, authorPhotoUrl: url })}
                  aspectRatio="square"
                />

                <div className="space-y-2">
                  <Label>Témoignage *</Label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Le contenu du témoignage..."
                    rows={4}
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
                    {editingTestimonial ? "Mettre à jour" : "Créer"}
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
            ) : testimonials.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Quote className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucun témoignage pour le moment</p>
                <p className="text-sm">Cliquez sur "Ajouter un témoignage" pour commencer</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      {testimonial.authorPhotoUrl ? (
                        <img
                          src={testimonial.authorPhotoUrl}
                          alt={testimonial.authorName}
                          className="w-12 h-12 object-cover rounded-full"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/48x48";
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 bg-[#8B1538]/10 rounded-full flex items-center justify-center">
                          <Quote className="h-5 w-5 text-[#8B1538]" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{testimonial.authorName}</p>
                            {(testimonial.authorPosition || testimonial.authorCompany) && (
                              <p className="text-sm text-gray-500">
                                {testimonial.authorPosition}
                                {testimonial.authorPosition && testimonial.authorCompany && " - "}
                                {testimonial.authorCompany}
                              </p>
                            )}
                            {renderStars(testimonial.rating)}
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => handleEdit(testimonial)}
                            >
                              <Pencil className="h-3 w-3" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDelete(testimonial.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                          "{testimonial.content}"
                        </p>
                        {!testimonial.isActive && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded mt-2 inline-block">
                            Inactif
                          </span>
                        )}
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
