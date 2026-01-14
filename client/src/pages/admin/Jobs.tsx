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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Briefcase, MapPin, Clock } from "lucide-react";

interface Entity {
  id: string;
  name: string;
  shortName: string;
}

interface JobOffer {
  id: string;
  title: string;
  entityId: string | null;
  location: string | null;
  contractType: string | null;
  description: string;
  requirements: string | null;
  applicationEmail: string | null;
  applicationUrl: string | null;
  salaryRange: string | null;
  isActive: boolean;
  expiresAt: string | null;
  createdAt: string;
}

export default function AdminJobs() {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<JobOffer[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOffer | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    entityId: "",
    location: "",
    contractType: "CDI",
    description: "",
    requirements: "",
    applicationEmail: "",
    applicationUrl: "",
    salaryRange: "",
    isActive: true,
    expiresAt: "",
  });

  const contractTypes = ["CDI", "CDD", "Stage", "Alternance", "Freelance", "Intérim"];

  const fetchData = async () => {
    try {
      const [jobsRes, entitiesRes] = await Promise.all([
        fetch("/api/admin/jobs"),
        fetch("/api/admin/entities"),
      ]);
      if (jobsRes.ok) setJobs(await jobsRes.json());
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

  const resetForm = () => {
    setFormData({
      title: "",
      entityId: "",
      location: "",
      contractType: "CDI",
      description: "",
      requirements: "",
      applicationEmail: "",
      applicationUrl: "",
      salaryRange: "",
      isActive: true,
      expiresAt: "",
    });
    setEditingJob(null);
  };

  const handleEdit = (job: JobOffer) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      entityId: job.entityId || "",
      location: job.location || "",
      contractType: job.contractType || "CDI",
      description: job.description,
      requirements: job.requirements || "",
      applicationEmail: job.applicationEmail || "",
      applicationUrl: job.applicationUrl || "",
      salaryRange: job.salaryRange || "",
      isActive: job.isActive,
      expiresAt: job.expiresAt ? job.expiresAt.split("T")[0] : "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingJob
        ? `/api/admin/jobs/${editingJob.id}`
        : "/api/admin/jobs";
      const method = editingJob ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: editingJob ? "Offre mise à jour" : "Offre créée",
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
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) return;

    try {
      const response = await fetch(`/api/admin/jobs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Offre supprimée",
          description: "L'offre a été supprimée avec succès",
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
    return entity?.shortName || entity?.name || "-";
  };

  const formatDate = (date: string | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("fr-FR");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Offres d'emploi</h1>
            <p className="text-gray-500 mt-1">
              Gérez les offres d'emploi du groupe
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-[#8B1538] hover:bg-[#7A1230]">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle offre
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingJob ? "Modifier l'offre" : "Nouvelle offre d'emploi"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Titre du poste *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Ex: Développeur Full Stack"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Entité</Label>
                    <Select
                      value={formData.entityId || "groupe"}
                      onValueChange={(value) => setFormData({ ...formData, entityId: value === "groupe" ? "" : value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Groupe Rishom" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="groupe">Groupe Rishom</SelectItem>
                        {entities.map((entity) => (
                          <SelectItem key={entity.id} value={entity.id}>
                            {entity.shortName || entity.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Localisation</Label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Ex: Douala, Cameroun"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Type de contrat</Label>
                    <Select
                      value={formData.contractType}
                      onValueChange={(value) => setFormData({ ...formData, contractType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {contractTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Salaire (fourchette)</Label>
                    <Input
                      value={formData.salaryRange}
                      onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                      placeholder="Ex: 500k - 800k FCFA"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description du poste *</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Décrivez le poste, les missions..."
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Profil recherché</Label>
                  <Textarea
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="Compétences requises, expérience..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email de candidature</Label>
                    <Input
                      type="email"
                      value={formData.applicationEmail}
                      onChange={(e) => setFormData({ ...formData, applicationEmail: e.target.value })}
                      placeholder="recrutement@rishom.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>URL de candidature</Label>
                    <Input
                      value={formData.applicationUrl}
                      onChange={(e) => setFormData({ ...formData, applicationUrl: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date d'expiration</Label>
                    <Input
                      type="date"
                      value={formData.expiresAt}
                      onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center gap-3 pt-6">
                    <Switch
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    />
                    <Label>Offre active</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" className="bg-[#8B1538] hover:bg-[#7A1230]">
                    {editingJob ? "Mettre à jour" : "Créer"}
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
            ) : jobs.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucune offre d'emploi pour le moment</p>
                <p className="text-sm">Cliquez sur "Nouvelle offre" pour commencer</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Poste</TableHead>
                    <TableHead>Entité</TableHead>
                    <TableHead>
                      <MapPin className="h-4 w-4 inline mr-1" />
                      Lieu
                    </TableHead>
                    <TableHead>
                      <Clock className="h-4 w-4 inline mr-1" />
                      Contrat
                    </TableHead>
                    <TableHead>Expiration</TableHead>
                    <TableHead className="w-24">Statut</TableHead>
                    <TableHead className="w-32 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-xs text-gray-500">
                            Publié le {formatDate(job.createdAt)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{getEntityName(job.entityId)}</TableCell>
                      <TableCell>{job.location || "-"}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 text-xs bg-gray-100 rounded">
                          {job.contractType || "-"}
                        </span>
                      </TableCell>
                      <TableCell>{formatDate(job.expiresAt)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          job.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {job.isActive ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleEdit(job)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(job.id)}
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
