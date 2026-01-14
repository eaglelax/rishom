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
import {
  Plus,
  Pencil,
  Trash2,
  GraduationCap,
  Clock,
  Award,
  BookOpen,
  Users,
  Briefcase,
  LineChart,
  Calculator,
} from "lucide-react";

interface RbaProgram {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  duration: string | null;
  level: string | null;
  certificationType: string | null;
  targetAudience: string | null;
  displayOrder: number;
  isActive: boolean;
}

const iconOptions = [
  { value: "graduation-cap", label: "Diplôme", icon: GraduationCap },
  { value: "book-open", label: "Formation", icon: BookOpen },
  { value: "briefcase", label: "Business", icon: Briefcase },
  { value: "users", label: "Management", icon: Users },
  { value: "line-chart", label: "Finance", icon: LineChart },
  { value: "calculator", label: "Comptabilité", icon: Calculator },
  { value: "award", label: "Certification", icon: Award },
];

const levelOptions = [
  { value: "basic", label: "Débutant" },
  { value: "intermediate", label: "Intermédiaire" },
  { value: "advanced", label: "Avancé" },
  { value: "professional", label: "Professionnel" },
];

const getIconComponent = (iconName: string | null) => {
  const option = iconOptions.find(o => o.value === iconName);
  return option?.icon || GraduationCap;
};

export default function AdminPrograms() {
  const { toast } = useToast();
  const [programs, setPrograms] = useState<RbaProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<RbaProgram | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "graduation-cap",
    duration: "",
    level: "intermediate",
    certificationType: "",
    targetAudience: "",
    displayOrder: 0,
    isActive: true,
  });

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/programs");
      if (response.ok) {
        setPrograms(await response.json());
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
      title: "",
      description: "",
      icon: "graduation-cap",
      duration: "",
      level: "intermediate",
      certificationType: "",
      targetAudience: "",
      displayOrder: programs.length,
      isActive: true,
    });
    setEditingItem(null);
  };

  const handleEdit = (item: RbaProgram) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      icon: item.icon || "graduation-cap",
      duration: item.duration || "",
      level: item.level || "intermediate",
      certificationType: item.certificationType || "",
      targetAudience: item.targetAudience || "",
      displayOrder: item.displayOrder,
      isActive: item.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingItem
        ? `/api/admin/programs/${editingItem.id}`
        : "/api/admin/programs";
      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: editingItem ? "Programme mis à jour" : "Programme créé",
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
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce programme ?")) return;

    try {
      const response = await fetch(`/api/admin/programs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Programme supprimé",
          description: "Le programme a été supprimé avec succès",
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

  const getLevelLabel = (level: string | null) => {
    return levelOptions.find(l => l.value === level)?.label || level || "-";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Programmes RBA</h1>
            <p className="text-gray-500 mt-1">
              Gérez les programmes de formation de Rishom Business Academy
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-[#2E5A9C] hover:bg-[#1E4A8C]">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau programme
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? "Modifier le programme" : "Nouveau programme"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Titre du programme *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Ex: BTS Comptabilité-Gestion"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Icône</Label>
                    <Select
                      value={formData.icon}
                      onValueChange={(value) => setFormData({ ...formData, icon: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <option.icon className="h-4 w-4" />
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Décrivez le programme de formation..."
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Durée</Label>
                    <Input
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="Ex: 2 ans"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Niveau</Label>
                    <Select
                      value={formData.level}
                      onValueChange={(value) => setFormData({ ...formData, level: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {levelOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Type de certification</Label>
                    <Input
                      value={formData.certificationType}
                      onChange={(e) => setFormData({ ...formData, certificationType: e.target.value })}
                      placeholder="Ex: Diplôme d'État"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Public cible</Label>
                  <Textarea
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    placeholder="Décrivez le profil des participants visés..."
                    rows={2}
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
                    <Label>Programme actif</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" className="bg-[#2E5A9C] hover:bg-[#1E4A8C]">
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
                <div className="w-8 h-8 border-4 border-[#2E5A9C] border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : programs.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucun programme pour le moment</p>
                <p className="text-sm">Cliquez sur "Nouveau programme" pour commencer</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Programme</TableHead>
                    <TableHead>
                      <Clock className="h-4 w-4 inline mr-1" />
                      Durée
                    </TableHead>
                    <TableHead>Niveau</TableHead>
                    <TableHead>
                      <Award className="h-4 w-4 inline mr-1" />
                      Certification
                    </TableHead>
                    <TableHead className="w-24">Statut</TableHead>
                    <TableHead className="w-32 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {programs.sort((a, b) => a.displayOrder - b.displayOrder).map((item) => {
                    const IconComponent = getIconComponent(item.icon);
                    return (
                      <TableRow key={item.id} className={!item.isActive ? "opacity-50" : ""}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#2E5A9C]/10 rounded-lg flex items-center justify-center">
                              <IconComponent className="h-5 w-5 text-[#2E5A9C]" />
                            </div>
                            <div>
                              <p className="font-medium">{item.title}</p>
                              {item.description && (
                                <p className="text-xs text-gray-500 line-clamp-1 max-w-xs">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{item.duration || "-"}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                            {getLevelLabel(item.level)}
                          </span>
                        </TableCell>
                        <TableCell>{item.certificationType || "-"}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            item.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}>
                            {item.isActive ? "Actif" : "Inactif"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleEdit(item)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
