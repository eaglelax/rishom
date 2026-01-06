import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Mail, MailOpen, Eye, MessageSquare } from "lucide-react";

interface Message {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminMessages() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/messages");
      if (response.ok) {
        setMessages(await response.json());
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

  const handleView = async (message: Message) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);

    if (!message.isRead) {
      try {
        await fetch(`/api/admin/messages/${message.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isRead: true }),
        });
        fetchData();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) return;

    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Message supprimé",
          description: "Le message a été supprimé avec succès",
        });
        fetchData();
        if (selectedMessage?.id === id) {
          setIsDialogOpen(false);
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };

  const toggleRead = async (message: Message) => {
    try {
      await fetch(`/api/admin/messages/${message.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !message.isRead }),
      });
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-500 mt-1">
              {unreadCount > 0 ? (
                <span className="text-[#8B1538] font-medium">{unreadCount} non lu{unreadCount > 1 ? "s" : ""}</span>
              ) : (
                "Tous les messages ont été lus"
              )}
            </p>
          </div>
        </div>

        <Card className="border-0 shadow-md">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : messages.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucun message pour le moment</p>
                <p className="text-sm">Les messages du formulaire de contact apparaîtront ici</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10"></TableHead>
                    <TableHead>Expéditeur</TableHead>
                    <TableHead>Sujet</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-32 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.map((message) => (
                    <TableRow
                      key={message.id}
                      className={`cursor-pointer ${!message.isRead ? "bg-blue-50/50" : ""}`}
                      onClick={() => handleView(message)}
                    >
                      <TableCell>
                        {message.isRead ? (
                          <MailOpen className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Mail className="h-4 w-4 text-[#8B1538]" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className={`${!message.isRead ? "font-semibold" : "font-medium"}`}>
                            {message.fullName}
                          </p>
                          <p className="text-sm text-gray-500">{message.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className={`truncate max-w-xs ${!message.isRead ? "font-medium" : ""}`}>
                          {message.subject || "(Sans sujet)"}
                        </p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          {message.message}
                        </p>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {formatDate(message.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleView(message)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => toggleRead(message)}
                            title={message.isRead ? "Marquer comme non lu" : "Marquer comme lu"}
                          >
                            {message.isRead ? (
                              <Mail className="h-4 w-4" />
                            ) : (
                              <MailOpen className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(message.id)}
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

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Message de {selectedMessage?.fullName}</DialogTitle>
            </DialogHeader>
            {selectedMessage && (
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-medium">
                      <a href={`mailto:${selectedMessage.email}`} className="text-[#8B1538] hover:underline">
                        {selectedMessage.email}
                      </a>
                    </p>
                  </div>
                  {selectedMessage.phone && (
                    <div>
                      <p className="text-gray-500">Téléphone</p>
                      <p className="font-medium">
                        <a href={`tel:${selectedMessage.phone}`} className="text-[#8B1538] hover:underline">
                          {selectedMessage.phone}
                        </a>
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-500">Date</p>
                    <p className="font-medium">{formatDate(selectedMessage.createdAt)}</p>
                  </div>
                  {selectedMessage.subject && (
                    <div>
                      <p className="text-gray-500">Sujet</p>
                      <p className="font-medium">{selectedMessage.subject}</p>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-gray-500 text-sm mb-2">Message</p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t">
                  <Button
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDelete(selectedMessage.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </Button>
                  <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || "Votre message"}`}>
                    <Button className="bg-[#8B1538] hover:bg-[#7A1230]">
                      <Mail className="h-4 w-4 mr-2" />
                      Répondre
                    </Button>
                  </a>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
