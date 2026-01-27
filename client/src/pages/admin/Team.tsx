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
import { Plus, Pencil, Trash2, Users, User } from "lucide-react";

interface Entity {
  id: string;
  name: string;
  shortName: string;
}

interface TeamMember {
  id: string;
  fullName: string;
  position: string;
  entityId: string | null;
  photoUrl: string | null;
  bio: string | null;
  linkedinUrl: string | null;
  email: string | null;
  displayOrder: number;
  isActive: boolean;
}

export default function AdminTeam() {
  const { toast } = useToast();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    position: "",
    entityId: "",
    photoUrl: "",
    bio: "",
    linkedinUrl: "",
    email: "",
    displayOrder: 0,
    isActive: true,
  });

  const fetchData = async () => {
    try {
      const [membersRes, entitiesRes] = await Promise.all([
        fetch("/api/admin/team"),
        fetch("/api/admin/entities"),
      ]);
      if (membersRes.ok) setMembers(await membersRes.json());
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
      fullName: "",
      position: "",
      entityId: "",
      photoUrl: "",
      bio: "",
      linkedinUrl: "",
      email: "",
      displayOrder: members.length,
      isActive: true,
    });
    setEditingMember(null);
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      fullName: member.fullName,
      position: member.position,
      entityId: member.entityId || "",
      photoUrl: member.photoUrl || "",
      bio: member.bio || "",
      linkedinUrl: member.linkedinUrl || "",
      email: member.email || "",
      displayOrder: member.displayOrder,
      isActive: member.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingMember
        ? `/api/admin/team/${editingMember.id}`
        : "/api/admin/team";
      const method = editingMember ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: editingMember ? "Membre mis à jour" : "Membre ajouté",
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
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) return;

    try {
      const response = await fetch(`/api/admin/team/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Membre supprimé",
          description: "Le membre a été supprimé avec succès",
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
    if (!entityId) return "Groupe";
    const entity = entities.find((e) => e.id === entityId);
    return entity?.shortName || entity?.name || "-";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Équipe dirigeante</h1>
            <p className="text-gray-500 mt-1">
              Gérez les membres de l'équipe de direction
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-[#8B1538] hover:bg-[#7A1230]">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un membre
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingMember ? "Modifier le membre" : "Nouveau membre"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nom complet *</Label>
                    <Input
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Prénom et Nom"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Poste *</Label>
                    <Input
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      placeholder="Directeur Général, etc."
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Entité</Label>
                    <Select
                      value={formData.entityId}
                      onValueChange={(value) => setFormData({ ...formData, entityId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Groupe Rishom" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Groupe Rishom</SelectItem>
                        {entities.map((entity) => (
                          <SelectItem key={entity.id} value={entity.id}>
                            {entity.shortName || entity.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@exemple.com"
                    />
                  </div>
                </div>

                <ImagePicker
                  label="Photo"
                  value={formData.photoUrl}
                  onChange={(url) => setFormData({ ...formData, photoUrl: url })}
                  aspectRatio="square"
                />

                <div className="space-y-2">
                  <Label>Biographie</Label>
                  <Textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Courte biographie..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>LinkedIn</Label>
                  <Input
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
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
                    {editingMember ? "Mettre à jour" : "Créer"}
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
            ) : members.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucun membre pour le moment</p>
                <p className="text-sm">Cliquez sur "Ajouter un membre" pour commencer</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {members.map((member) => (
                  <div key={member.id} className="border rounded-lg p-4 flex gap-4">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.fullName}
                        className="w-16 h-16 object-cover rounded-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.opacity = "0";
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{member.fullName}</p>
                          <p className="text-sm text-gray-500">{member.position}</p>
                          <p className="text-xs text-[#8B1538]">{getEntityName(member.entityId)}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => handleEdit(member)}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(member.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      {!member.isActive && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded mt-1 inline-block">
                          Inactif
                        </span>
                      )}
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
