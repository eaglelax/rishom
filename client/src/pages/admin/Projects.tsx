import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoute } from "wouter";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Plus, Pencil, Trash2, FolderKanban, MapPin, Calendar, Building, Eye, EyeOff, Star, StarOff } from "lucide-react";
import ImagePicker from "@/components/admin/ImagePicker";
import type { Project, Entity } from "@shared/schema";

interface ProjectFormData {
  entityId: string;
  title: string;
  slug: string;
  client: string;
  location: string;
  year: number | null;
  description: string;
  challenges: string;
  solutions: string;
  results: string;
  imageUrl: string;
  galleryUrls: string[];
  projectType: string;
  budget: string;
  duration: string;
  displayOrder: number;
  isActive: boolean;
  isFeatured: boolean;
}

const defaultFormData: ProjectFormData = {
  entityId: "",
  title: "",
  slug: "",
  client: "",
  location: "",
  year: new Date().getFullYear(),
  description: "",
  challenges: "",
  solutions: "",
  results: "",
  imageUrl: "",
  galleryUrls: [],
  projectType: "",
  budget: "",
  duration: "",
  displayOrder: 0,
  isActive: true,
  isFeatured: false,
};

const projectTypes = [
  "Construction",
  "Rénovation",
  "Infrastructure",
  "Conseil",
  "Étude",
  "Formation",
  "Agriculture",
  "Élevage",
  "Transformation",
  "Distribution",
  "Autre",
];

export default function AdminProjects() {
  const [, params] = useRoute("/admin/projects/:entity?");
  const entityFilter = params?.entity?.toUpperCase() || "";

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>(defaultFormData);

  // Fetch entities
  const { data: entities = [] } = useQuery<Entity[]>({
    queryKey: ["/api/entities"],
  });

  // Fetch projects
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/admin/projects"],
  });

  // Filter projects by entity
  const filteredProjects = entityFilter
    ? projects.filter((p) => {
        const entity = entities.find((e) => e.id === p.entityId);
        return entity?.code?.toUpperCase() === entityFilter;
      })
    : projects;

  // Get entity name by ID
  const getEntityName = (entityId: string | null) => {
    if (!entityId) return "Non assigné";
    const entity = entities.find((e) => e.id === entityId);
    return entity?.code || "Inconnu";
  };

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: ProjectFormData) => {
      const token = localStorage.getItem("admin_token");
      const res = await fetch("/api/admin/projects", {
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
      queryClient.invalidateQueries({ queryKey: ["/api/admin/projects"] });
      toast({ title: "Projet créé avec succès" });
      closeDialog();
    },
    onError: () => {
      toast({ title: "Erreur lors de la création", variant: "destructive" });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ProjectFormData }) => {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`/api/admin/projects/${id}`, {
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
      queryClient.invalidateQueries({ queryKey: ["/api/admin/projects"] });
      toast({ title: "Projet mis à jour avec succès" });
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
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/projects"] });
      toast({ title: "Projet supprimé avec succès" });
      setIsDeleteDialogOpen(false);
      setProjectToDelete(null);
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

  const openCreateDialog = () => {
    setEditingProject(null);
    const initialEntityId = entityFilter
      ? entities.find((e) => e.code?.toUpperCase() === entityFilter)?.id || ""
      : "";
    setFormData({ ...defaultFormData, entityId: initialEntityId });
    setIsDialogOpen(true);
  };

  const openEditDialog = (project: Project) => {
    setEditingProject(project);
    setFormData({
      entityId: project.entityId || "",
      title: project.title,
      slug: project.slug,
      client: project.client || "",
      location: project.location || "",
      year: project.year,
      description: project.description || "",
      challenges: project.challenges || "",
      solutions: project.solutions || "",
      results: project.results || "",
      imageUrl: project.imageUrl || "",
      galleryUrls: (project.galleryUrls as string[]) || [],
      projectType: project.projectType || "",
      budget: project.budget || "",
      duration: project.duration || "",
      displayOrder: project.displayOrder,
      isActive: project.isActive,
      isFeatured: project.isFeatured,
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingProject(null);
    setFormData(defaultFormData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      deleteMutation.mutate(projectToDelete.id);
    }
  };

  const toggleActive = async (project: Project) => {
    updateMutation.mutate({
      id: project.id,
      data: {
        entityId: project.entityId || "",
        title: project.title,
        slug: project.slug,
        client: project.client || "",
        location: project.location || "",
        year: project.year,
        description: project.description || "",
        challenges: project.challenges || "",
        solutions: project.solutions || "",
        results: project.results || "",
        imageUrl: project.imageUrl || "",
        galleryUrls: (project.galleryUrls as string[]) || [],
        projectType: project.projectType || "",
        budget: project.budget || "",
        duration: project.duration || "",
        displayOrder: project.displayOrder,
        isActive: !project.isActive,
        isFeatured: project.isFeatured,
      },
    });
  };

  const toggleFeatured = async (project: Project) => {
    updateMutation.mutate({
      id: project.id,
      data: {
        entityId: project.entityId || "",
        title: project.title,
        slug: project.slug,
        client: project.client || "",
        location: project.location || "",
        year: project.year,
        description: project.description || "",
        challenges: project.challenges || "",
        solutions: project.solutions || "",
        results: project.results || "",
        imageUrl: project.imageUrl || "",
        galleryUrls: (project.galleryUrls as string[]) || [],
        projectType: project.projectType || "",
        budget: project.budget || "",
        duration: project.duration || "",
        displayOrder: project.displayOrder,
        isActive: project.isActive,
        isFeatured: !project.isFeatured,
      },
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Projets & Réalisations
              {entityFilter && (
                <span className="ml-2 text-lg font-normal text-gray-500">
                  ({entityFilter})
                </span>
              )}
            </h1>
            <p className="text-gray-500 mt-1">
              Gérez les projets et réalisations de l'entreprise
            </p>
          </div>
          <Button onClick={openCreateDialog} className="bg-[#8B1538] hover:bg-[#6d1029]">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau projet
          </Button>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FolderKanban className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucun projet
              </h3>
              <p className="text-gray-500 text-center mb-4">
                Commencez par ajouter votre premier projet
              </p>
              <Button onClick={openCreateDialog} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un projet
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card key={project.id} className={!project.isActive ? "opacity-60" : ""}>
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <FolderKanban className="h-12 w-12 text-gray-300" />
                    </div>
                  )}
                  {project.isFeatured && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Vedette
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-white/90 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                    {getEntityName(project.entityId)}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
                  <CardDescription className="flex flex-wrap gap-2 text-xs">
                    {project.client && (
                      <span className="flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        {project.client}
                      </span>
                    )}
                    {project.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {project.location}
                      </span>
                    )}
                    {project.year && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {project.year}
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {project.description || "Aucune description"}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleActive(project)}
                        title={project.isActive ? "Désactiver" : "Activer"}
                      >
                        {project.isActive ? (
                          <Eye className="h-4 w-4 text-green-600" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFeatured(project)}
                        title={project.isFeatured ? "Retirer des vedettes" : "Mettre en vedette"}
                      >
                        {project.isFeatured ? (
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        ) : (
                          <StarOff className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(project)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(project)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Create/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Modifier le projet" : "Nouveau projet"}
              </DialogTitle>
              <DialogDescription>
                {editingProject
                  ? "Modifiez les informations du projet"
                  : "Remplissez les informations du nouveau projet"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="entityId">Entité</Label>
                  <Select
                    value={formData.entityId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, entityId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une entité" />
                    </SelectTrigger>
                    <SelectContent>
                      {entities.map((entity) => (
                        <SelectItem key={entity.id} value={entity.id}>
                          {entity.code} - {entity.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectType">Type de projet</Label>
                  <Select
                    value={formData.projectType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, projectType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setFormData({
                        ...formData,
                        title,
                        slug: formData.slug || generateSlug(title),
                      });
                    }}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="auto-genere-si-vide"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) =>
                      setFormData({ ...formData, client: e.target.value })
                    }
                    placeholder="Nom du client"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Localisation</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="Ville, Pays"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Année</Label>
                  <Input
                    id="year"
                    type="number"
                    min="1990"
                    max="2100"
                    value={formData.year || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        year: e.target.value ? parseInt(e.target.value) : null,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget</Label>
                  <Input
                    id="budget"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    placeholder="Ex: 500 000 000 XOF"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Durée</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    placeholder="Ex: 18 mois"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  placeholder="Description générale du projet..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="challenges">Défis</Label>
                <Textarea
                  id="challenges"
                  value={formData.challenges}
                  onChange={(e) =>
                    setFormData({ ...formData, challenges: e.target.value })
                  }
                  rows={2}
                  placeholder="Les défis rencontrés..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="solutions">Solutions</Label>
                <Textarea
                  id="solutions"
                  value={formData.solutions}
                  onChange={(e) =>
                    setFormData({ ...formData, solutions: e.target.value })
                  }
                  rows={2}
                  placeholder="Les solutions apportées..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="results">Résultats</Label>
                <Textarea
                  id="results"
                  value={formData.results}
                  onChange={(e) =>
                    setFormData({ ...formData, results: e.target.value })
                  }
                  rows={2}
                  placeholder="Les résultats obtenus..."
                />
              </div>

              <ImagePicker
                label="Image principale"
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="displayOrder">Ordre d'affichage</Label>
                  <Input
                    id="displayOrder"
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        displayOrder: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="space-y-4 pt-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isActive">Actif</Label>
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, isActive: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isFeatured">En vedette</Label>
                    <Switch
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, isFeatured: checked })
                      }
                    />
                  </div>
                </div>
              </div>

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
                    : editingProject
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
                Êtes-vous sûr de vouloir supprimer le projet "{projectToDelete?.title}" ?
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
