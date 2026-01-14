import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, FileText, Eye, EyeOff, ExternalLink, Search } from "lucide-react";
import ImagePicker from "@/components/admin/ImagePicker";

interface PageContent {
  id: string;
  pageSlug: string;
  pageTitle: string;
  pageDescription: string | null;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImageUrl: string | null;
  heroImageAlt: string | null;
  contentBlocks: any;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  pageSlug: string;
  pageTitle: string;
  pageDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  heroImageAlt: string;
  contentBlocks: any[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  isPublished: boolean;
}

const defaultFormData: FormData = {
  pageSlug: "",
  pageTitle: "",
  pageDescription: "",
  heroTitle: "",
  heroSubtitle: "",
  heroImageUrl: "",
  heroImageAlt: "",
  contentBlocks: [],
  seoTitle: "",
  seoDescription: "",
  seoKeywords: "",
  isPublished: false,
};

// Liste des pages prédéfinies du site
const predefinedPages = [
  { slug: "a-propos", title: "À propos" },
  { slug: "histoire", title: "Notre Histoire" },
  { slug: "gouvernance", title: "Gouvernance" },
  { slug: "rse", title: "RSE" },
  { slug: "certifications", title: "Certifications" },
  { slug: "partenaires", title: "Partenaires" },
  { slug: "carrieres", title: "Carrières" },
  { slug: "presse", title: "Presse" },
  { slug: "contact", title: "Contact" },
  { slug: "faq", title: "FAQ" },
  { slug: "mentions-legales", title: "Mentions légales" },
  { slug: "politique-confidentialite", title: "Politique de confidentialité" },
  { slug: "cookies", title: "Politique des cookies" },
  { slug: "innovation", title: "Innovation" },
  { slug: "developpement-durable", title: "Développement durable" },
  { slug: "investisseurs", title: "Investisseurs" },
];

export default function AdminPages() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<PageContent | null>(null);
  const [pageToDelete, setPageToDelete] = useState<PageContent | null>(null);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [activeTab, setActiveTab] = useState("content");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch pages
  const { data: pages = [], isLoading } = useQuery<PageContent[]>({
    queryKey: ["/api/admin/pages"],
  });

  // Filter pages
  const filteredPages = pages.filter(
    (page) =>
      page.pageTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.pageSlug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const token = localStorage.getItem("admin_token");
      const res = await fetch("/api/admin/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erreur lors de la création");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pages"] });
      toast({ title: "Page créée avec succès" });
      closeDialog();
    },
    onError: () => {
      toast({ title: "Erreur lors de la création", variant: "destructive" });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`/api/admin/pages/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erreur lors de la mise à jour");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pages"] });
      toast({ title: "Page mise à jour avec succès" });
      closeDialog();
    },
    onError: () => {
      toast({ title: "Erreur lors de la mise à jour", variant: "destructive" });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`/api/admin/pages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pages"] });
      toast({ title: "Page supprimée avec succès" });
      setIsDeleteDialogOpen(false);
      setPageToDelete(null);
    },
    onError: () => {
      toast({ title: "Erreur lors de la suppression", variant: "destructive" });
    },
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const openCreateDialog = (predefinedSlug?: string, predefinedTitle?: string) => {
    setEditingPage(null);
    setFormData({
      ...defaultFormData,
      pageSlug: predefinedSlug || "",
      pageTitle: predefinedTitle || "",
      seoTitle: predefinedTitle || "",
    });
    setActiveTab("content");
    setIsDialogOpen(true);
  };

  const openEditDialog = (page: PageContent) => {
    setEditingPage(page);
    setFormData({
      pageSlug: page.pageSlug,
      pageTitle: page.pageTitle,
      pageDescription: page.pageDescription || "",
      heroTitle: page.heroTitle || "",
      heroSubtitle: page.heroSubtitle || "",
      heroImageUrl: page.heroImageUrl || "",
      heroImageAlt: page.heroImageAlt || "",
      contentBlocks: page.contentBlocks || [],
      seoTitle: page.seoTitle || "",
      seoDescription: page.seoDescription || "",
      seoKeywords: page.seoKeywords || "",
      isPublished: page.isPublished,
    });
    setActiveTab("content");
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingPage(null);
    setFormData(defaultFormData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPage) {
      updateMutation.mutate({ id: editingPage.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (page: PageContent) => {
    setPageToDelete(page);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (pageToDelete) {
      deleteMutation.mutate(pageToDelete.id);
    }
  };

  const togglePublish = async (page: PageContent) => {
    updateMutation.mutate({
      id: page.id,
      data: {
        pageSlug: page.pageSlug,
        pageTitle: page.pageTitle,
        pageDescription: page.pageDescription || "",
        heroTitle: page.heroTitle || "",
        heroSubtitle: page.heroSubtitle || "",
        heroImageUrl: page.heroImageUrl || "",
        heroImageAlt: page.heroImageAlt || "",
        contentBlocks: page.contentBlocks || [],
        seoTitle: page.seoTitle || "",
        seoDescription: page.seoDescription || "",
        seoKeywords: page.seoKeywords || "",
        isPublished: !page.isPublished,
      },
    });
  };

  // Check which predefined pages already exist
  const existingPageSlugs = new Set(pages.map((p) => p.pageSlug));
  const missingPredefinedPages = predefinedPages.filter(
    (p) => !existingPageSlugs.has(p.slug)
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pages statiques</h1>
            <p className="text-gray-500 mt-1">
              Gérez le contenu des pages de votre site
            </p>
          </div>
          <Button onClick={() => openCreateDialog()} className="bg-[#8B1538] hover:bg-[#6d1029]">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle page
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher une page..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Missing Predefined Pages Suggestion */}
        {missingPredefinedPages.length > 0 && (
          <Card className="bg-amber-50 border-amber-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-amber-800">
                Pages suggérées à créer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {missingPredefinedPages.map((page) => (
                  <Button
                    key={page.slug}
                    variant="outline"
                    size="sm"
                    onClick={() => openCreateDialog(page.slug, page.title)}
                    className="bg-white hover:bg-amber-100 border-amber-300"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {page.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pages List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredPages.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery ? "Aucune page trouvée" : "Aucune page"}
              </h3>
              <p className="text-gray-500 text-center mb-4">
                {searchQuery
                  ? "Essayez une autre recherche"
                  : "Commencez par créer votre première page"}
              </p>
              {!searchQuery && (
                <Button onClick={() => openCreateDialog()} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Créer une page
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredPages.map((page) => (
              <Card key={page.id} className={!page.isPublished ? "border-dashed" : ""}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{page.pageTitle}</h3>
                        {page.isPublished ? (
                          <Badge variant="default" className="bg-green-500">
                            Publiée
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Brouillon</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">/{page.pageSlug}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => togglePublish(page)}
                      title={page.isPublished ? "Dépublier" : "Publier"}
                    >
                      {page.isPublished ? (
                        <Eye className="h-4 w-4 text-green-600" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                    >
                      <a href={`/${page.pageSlug}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(page)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(page)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Create/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPage ? "Modifier la page" : "Nouvelle page"}
              </DialogTitle>
              <DialogDescription>
                {editingPage
                  ? "Modifiez le contenu de la page"
                  : "Créez une nouvelle page pour votre site"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content">Contenu</TabsTrigger>
                  <TabsTrigger value="hero">En-tête</TabsTrigger>
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                </TabsList>

                {/* Tab: Content */}
                <TabsContent value="content" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pageTitle">Titre de la page *</Label>
                      <Input
                        id="pageTitle"
                        value={formData.pageTitle}
                        onChange={(e) => {
                          const title = e.target.value;
                          setFormData({
                            ...formData,
                            pageTitle: title,
                            pageSlug: formData.pageSlug || generateSlug(title),
                          });
                        }}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pageSlug">Slug (URL) *</Label>
                      <Input
                        id="pageSlug"
                        value={formData.pageSlug}
                        onChange={(e) =>
                          setFormData({ ...formData, pageSlug: e.target.value })
                        }
                        placeholder="ex: a-propos"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pageDescription">Description</Label>
                    <Textarea
                      id="pageDescription"
                      value={formData.pageDescription}
                      onChange={(e) =>
                        setFormData({ ...formData, pageDescription: e.target.value })
                      }
                      rows={4}
                      placeholder="Contenu principal de la page..."
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <Label htmlFor="isPublished">Statut de publication</Label>
                      <p className="text-sm text-gray-500">
                        {formData.isPublished
                          ? "Cette page est visible sur le site"
                          : "Cette page n'est pas visible sur le site"}
                      </p>
                    </div>
                    <Switch
                      id="isPublished"
                      checked={formData.isPublished}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, isPublished: checked })
                      }
                    />
                  </div>
                </TabsContent>

                {/* Tab: Hero */}
                <TabsContent value="hero" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="heroTitle">Titre de l'en-tête</Label>
                    <Input
                      id="heroTitle"
                      value={formData.heroTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, heroTitle: e.target.value })
                      }
                      placeholder="Titre affiché dans la bannière"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="heroSubtitle">Sous-titre de l'en-tête</Label>
                    <Textarea
                      id="heroSubtitle"
                      value={formData.heroSubtitle}
                      onChange={(e) =>
                        setFormData({ ...formData, heroSubtitle: e.target.value })
                      }
                      rows={2}
                      placeholder="Sous-titre ou description courte"
                    />
                  </div>

                  <ImagePicker
                    label="Image d'en-tête"
                    value={formData.heroImageUrl}
                    onChange={(url) => setFormData({ ...formData, heroImageUrl: url })}
                  />

                  <div className="space-y-2">
                    <Label htmlFor="heroImageAlt">Texte alternatif de l'image</Label>
                    <Input
                      id="heroImageAlt"
                      value={formData.heroImageAlt}
                      onChange={(e) =>
                        setFormData({ ...formData, heroImageAlt: e.target.value })
                      }
                      placeholder="Description de l'image pour l'accessibilité"
                    />
                  </div>
                </TabsContent>

                {/* Tab: SEO */}
                <TabsContent value="seo" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="seoTitle">Titre SEO</Label>
                    <Input
                      id="seoTitle"
                      value={formData.seoTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, seoTitle: e.target.value })
                      }
                      maxLength={60}
                      placeholder="Titre pour les moteurs de recherche (max 60 car.)"
                    />
                    <p className="text-xs text-gray-500">
                      {formData.seoTitle.length}/60 caractères
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seoDescription">Description SEO</Label>
                    <Textarea
                      id="seoDescription"
                      value={formData.seoDescription}
                      onChange={(e) =>
                        setFormData({ ...formData, seoDescription: e.target.value })
                      }
                      maxLength={160}
                      rows={3}
                      placeholder="Description pour les moteurs de recherche (max 160 car.)"
                    />
                    <p className="text-xs text-gray-500">
                      {formData.seoDescription.length}/160 caractères
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seoKeywords">Mots-clés</Label>
                    <Input
                      id="seoKeywords"
                      value={formData.seoKeywords}
                      onChange={(e) =>
                        setFormData({ ...formData, seoKeywords: e.target.value })
                      }
                      placeholder="mot-clé1, mot-clé2, mot-clé3"
                    />
                    <p className="text-xs text-gray-500">
                      Séparez les mots-clés par des virgules
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={closeDialog}>
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="bg-[#8B1538] hover:bg-[#6d1029]"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? "Enregistrement..."
                    : editingPage
                    ? "Mettre à jour"
                    : "Créer"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer la page "{pageToDelete?.pageTitle}" ?
                Cette action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
}
