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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, FileText, Download, ExternalLink } from "lucide-react";

interface Entity {
  id: string;
  shortName: string;
  colorPrimary: string;
}

interface PressRelease {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  excerpt: string | null;
  content: string | null;
  pdfUrl: string | null;
  pdfSize: string | null;
  imageUrl: string | null;
  entityId: string | null;
  publishedAt: string | null;
  isPublished: boolean;
  displayOrder: number;
}

export default function AdminPressReleases() {
  const { toast } = useToast();
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRelease, setEditingRelease] = useState<PressRelease | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    content: "",
    pdfUrl: "",
    pdfSize: "",
    imageUrl: "",
    entityId: "",
    isPublished: false,
    displayOrder: 0,
  });

  const fetchData = async () => {
    try {
      const [releasesRes, entitiesRes] = await Promise.all([
        fetch("/api/admin/press-releases"),
        fetch("/api/entities"),
      ]);
      if (releasesRes.ok) setPressReleases(await releasesRes.json());
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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      category: "",
      excerpt: "",
      content: "",
      pdfUrl: "",
      pdfSize: "",
      imageUrl: "",
      entityId: "",
      isPublished: false,
      displayOrder: 0,
    });
    setEditingRelease(null);
  };

  const handleEdit = (release: PressRelease) => {
    setEditingRelease(release);
    setFormData({
      title: release.title,
      slug: release.slug,
      category: release.category || "",
      excerpt: release.excerpt || "",
      content: release.content || "",
      pdfUrl: release.pdfUrl || "",
      pdfSize: release.pdfSize || "",
      imageUrl: release.imageUrl || "",
      entityId: release.entityId || "",
      isPublished: release.isPublished,
      displayOrder: release.displayOrder,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingRelease
        ? `/api/admin/press-releases/${editingRelease.id}`
        : "/api/admin/press-releases";
      const method = editingRelease ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          slug: formData.slug || generateSlug(formData.title),
          entityId: formData.entityId || null,
        }),
      });

      if (response.ok) {
        toast({
          title: editingRelease ? "Communiqué mis à jour" : "Communiqué créé",
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
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce communiqué ?")) return;

    try {
      const response = await fetch(`/api/admin/press-releases/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Communiqué supprimé",
          description: "Le communiqué a été supprimé avec succès",
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

  const getEntityName = (entityId: string | null) => {
    if (!entityId) return "Groupe Rishom";
    const entity = entities.find((e) => e.id === entityId);
    return entity?.shortName || "Groupe Rishom";
  };

  const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const categories = [
    "Résultats financiers",
    "Partenariat",
    "Nomination",
    "Événement",
    "Projet",
    "RSE",
    "Innovation",
    "Autre",
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Communiqués de presse</h1>
            <p className="text-gray-500 mt-1">
              Gérez les communiqués de presse officiels
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-[#8B1538] hover:bg-[#7A1230]">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau communiqué
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingRelease ? "Modifier le communiqué" : "Nouveau communiqué"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Titre *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Titre du communiqué"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Slug</Label>
                    <Input
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="Auto-généré si vide"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Catégorie</Label>
                    <Select
                      value={formData.category || "none"}
                      onValueChange={(value) => setFormData({ ...formData, category: value === "none" ? "" : value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Aucune</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Entité</Label>
                    <Select
                      value={formData.entityId || "groupe"}
                      onValueChange={(value) => setFormData({ ...formData, entityId: value === "groupe" ? "" : value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="groupe">Groupe Rishom</SelectItem>
                        {entities.map((entity) => (
                          <SelectItem key={entity.id} value={entity.id}>
                            {entity.shortName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Résumé</Label>
                  <Textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Résumé du communiqué"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Contenu</Label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Contenu complet du communiqué"
                    rows={8}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>URL du PDF</Label>
                    <Input
                      value={formData.pdfUrl}
                      onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Taille du PDF</Label>
                    <Input
                      value={formData.pdfSize}
                      onChange={(e) => setFormData({ ...formData, pdfSize: e.target.value })}
                      placeholder="ex: 2.5 MB"
                    />
                  </div>
                </div>

                <ImagePicker
                  label="Image"
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
                      onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="flex items-center gap-3 pt-8">
                    <Switch
                      checked={formData.isPublished}
                      onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })}
                    />
                    <Label>Publié</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" className="bg-[#8B1538] hover:bg-[#7A1230]">
                    {editingRelease ? "Mettre à jour" : "Créer"}
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
            ) : pressReleases.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucun communiqué pour le moment</p>
                <p className="text-sm">Cliquez sur "Nouveau communiqué" pour commencer</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Entité</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-20">PDF</TableHead>
                    <TableHead className="w-24">Statut</TableHead>
                    <TableHead className="w-32 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pressReleases.map((release) => (
                    <TableRow key={release.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{release.title}</p>
                          {release.excerpt && (
                            <p className="text-sm text-gray-500 truncate max-w-xs">
                              {release.excerpt}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {release.category ? (
                          <span className="px-2 py-1 text-xs rounded-full bg-[#8B1538]/10 text-[#8B1538]">
                            {release.category}
                          </span>
                        ) : "-"}
                      </TableCell>
                      <TableCell>{getEntityName(release.entityId)}</TableCell>
                      <TableCell>{formatDate(release.publishedAt)}</TableCell>
                      <TableCell>
                        {release.pdfUrl ? (
                          <a href={release.pdfUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4 text-[#8B1538]" />
                          </a>
                        ) : "-"}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          release.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {release.isPublished ? "Publié" : "Brouillon"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {release.isPublished && (
                            <a href={`/presse/${release.slug}`} target="_blank" rel="noopener noreferrer">
                              <Button size="icon" variant="ghost">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </a>
                          )}
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleEdit(release)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(release.id)}
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
