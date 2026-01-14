import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ImagePicker from "@/components/admin/ImagePicker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Plus, Pencil, Trash2, Package, FolderOpen, Tag } from "lucide-react";

interface Entity {
  id: string;
  code: string;
  shortName: string;
  colorPrimary: string;
}

interface ProductCategory {
  id: string;
  entityId: string | null;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  displayOrder: number;
  isActive: boolean;
}

interface Product {
  id: string;
  categoryId: string | null;
  entityId: string | null;
  name: string;
  slug: string;
  description: string | null;
  specifications: string | null;
  imageUrl: string | null;
  price: string | null;
  isForRent: boolean;
  isForSale: boolean;
  displayOrder: number;
  isActive: boolean;
  isFeatured: boolean;
}

export default function AdminProducts() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("products");
  const [entities, setEntities] = useState<Entity[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEntity, setSelectedEntity] = useState<string>("");

  // Category dialog
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    entityId: "",
    name: "",
    slug: "",
    description: "",
    imageUrl: "",
    displayOrder: 0,
    isActive: true,
  });

  // Product dialog
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    categoryId: "",
    entityId: "",
    name: "",
    slug: "",
    description: "",
    specifications: "",
    imageUrl: "",
    price: "",
    isForRent: false,
    isForSale: true,
    displayOrder: 0,
    isActive: true,
    isFeatured: false,
  });

  const fetchData = async () => {
    try {
      const [entitiesRes, categoriesRes, productsRes] = await Promise.all([
        fetch("/api/admin/entities"),
        fetch("/api/admin/product-categories"),
        fetch("/api/admin/products"),
      ]);

      if (entitiesRes.ok) setEntities(await entitiesRes.json());
      if (categoriesRes.ok) setCategories(await categoriesRes.json());
      if (productsRes.ok) setProducts(await productsRes.json());
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const getEntityName = (entityId: string | null) => {
    if (!entityId) return "-";
    return entities.find(e => e.id === entityId)?.shortName || "-";
  };

  const getEntityColor = (entityId: string | null) => {
    if (!entityId) return "#8B1538";
    return entities.find(e => e.id === entityId)?.colorPrimary || "#8B1538";
  };

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return "-";
    return categories.find(c => c.id === categoryId)?.name || "-";
  };

  // Category handlers
  const resetCategoryForm = () => {
    setCategoryForm({
      entityId: selectedEntity,
      name: "",
      slug: "",
      description: "",
      imageUrl: "",
      displayOrder: categories.length,
      isActive: true,
    });
    setEditingCategory(null);
  };

  const handleEditCategory = (cat: ProductCategory) => {
    setEditingCategory(cat);
    setCategoryForm({
      entityId: cat.entityId || "",
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      imageUrl: cat.imageUrl || "",
      displayOrder: cat.displayOrder,
      isActive: cat.isActive,
    });
    setIsCategoryDialogOpen(true);
  };

  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingCategory
        ? `/api/admin/product-categories/${editingCategory.id}`
        : "/api/admin/product-categories";
      const method = editingCategory ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...categoryForm,
          slug: categoryForm.slug || generateSlug(categoryForm.name),
        }),
      });

      if (response.ok) {
        toast({ title: editingCategory ? "Catégorie mise à jour" : "Catégorie créée" });
        setIsCategoryDialogOpen(false);
        resetCategoryForm();
        fetchData();
      }
    } catch (error) {
      toast({ title: "Erreur", variant: "destructive" });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Supprimer cette catégorie ?")) return;
    try {
      await fetch(`/api/admin/product-categories/${id}`, { method: "DELETE" });
      toast({ title: "Catégorie supprimée" });
      fetchData();
    } catch (error) {
      toast({ title: "Erreur", variant: "destructive" });
    }
  };

  // Product handlers
  const resetProductForm = () => {
    setProductForm({
      categoryId: "",
      entityId: selectedEntity,
      name: "",
      slug: "",
      description: "",
      specifications: "",
      imageUrl: "",
      price: "",
      isForRent: false,
      isForSale: true,
      displayOrder: products.length,
      isActive: true,
      isFeatured: false,
    });
    setEditingProduct(null);
  };

  const handleEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({
      categoryId: prod.categoryId || "",
      entityId: prod.entityId || "",
      name: prod.name,
      slug: prod.slug,
      description: prod.description || "",
      specifications: prod.specifications || "",
      imageUrl: prod.imageUrl || "",
      price: prod.price || "",
      isForRent: prod.isForRent,
      isForSale: prod.isForSale,
      displayOrder: prod.displayOrder,
      isActive: prod.isActive,
      isFeatured: prod.isFeatured,
    });
    setIsProductDialogOpen(true);
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingProduct
        ? `/api/admin/products/${editingProduct.id}`
        : "/api/admin/products";
      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...productForm,
          slug: productForm.slug || generateSlug(productForm.name),
        }),
      });

      if (response.ok) {
        toast({ title: editingProduct ? "Produit mis à jour" : "Produit créé" });
        setIsProductDialogOpen(false);
        resetProductForm();
        fetchData();
      }
    } catch (error) {
      toast({ title: "Erreur", variant: "destructive" });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Supprimer ce produit ?")) return;
    try {
      await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      toast({ title: "Produit supprimé" });
      fetchData();
    } catch (error) {
      toast({ title: "Erreur", variant: "destructive" });
    }
  };

  // Filtrage par entité
  const filteredCategories = selectedEntity
    ? categories.filter(c => c.entityId === selectedEntity)
    : categories;
  const filteredProducts = selectedEntity
    ? products.filter(p => p.entityId === selectedEntity)
    : products;

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Produits & Catalogue</h1>
            <p className="text-gray-500 mt-1">
              Gérez les produits et équipements du groupe
            </p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedEntity || "all"} onValueChange={(v) => setSelectedEntity(v === "all" ? "" : v)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Toutes les entités" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les entités</SelectItem>
                {entities.map(e => (
                  <SelectItem key={e.id} value={e.id}>{e.shortName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="products" className="gap-2">
              <Package className="h-4 w-4" />
              Produits ({filteredProducts.length})
            </TabsTrigger>
            <TabsTrigger value="categories" className="gap-2">
              <FolderOpen className="h-4 w-4" />
              Catégories ({filteredCategories.length})
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Produits</CardTitle>
                  <CardDescription>Liste des produits et équipements</CardDescription>
                </div>
                <Dialog open={isProductDialogOpen} onOpenChange={(open) => {
                  setIsProductDialogOpen(open);
                  if (!open) resetProductForm();
                }}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#8B1538] hover:bg-[#7A1230]">
                      <Plus className="h-4 w-4 mr-2" />
                      Nouveau produit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingProduct ? "Modifier le produit" : "Nouveau produit"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmitProduct} className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nom *</Label>
                          <Input
                            value={productForm.name}
                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Entité</Label>
                          <Select value={productForm.entityId} onValueChange={(v) => setProductForm({ ...productForm, entityId: v })}>
                            <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                            <SelectContent>
                              {entities.map(e => <SelectItem key={e.id} value={e.id}>{e.shortName}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Catégorie</Label>
                          <Select value={productForm.categoryId} onValueChange={(v) => setProductForm({ ...productForm, categoryId: v })}>
                            <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                            <SelectContent>
                              {categories.filter(c => !productForm.entityId || c.entityId === productForm.entityId).map(c => (
                                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Prix</Label>
                          <Input
                            value={productForm.price}
                            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                            placeholder="Ex: 500 000 XOF"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={productForm.description}
                          onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Spécifications techniques</Label>
                        <Textarea
                          value={productForm.specifications}
                          onChange={(e) => setProductForm({ ...productForm, specifications: e.target.value })}
                          rows={3}
                        />
                      </div>
                      <ImagePicker
                        label="Image du produit"
                        value={productForm.imageUrl}
                        onChange={(url) => setProductForm({ ...productForm, imageUrl: url })}
                      />
                      <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                          <Switch checked={productForm.isForSale} onCheckedChange={(c) => setProductForm({ ...productForm, isForSale: c })} />
                          <Label>À vendre</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch checked={productForm.isForRent} onCheckedChange={(c) => setProductForm({ ...productForm, isForRent: c })} />
                          <Label>En location</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch checked={productForm.isFeatured} onCheckedChange={(c) => setProductForm({ ...productForm, isFeatured: c })} />
                          <Label>Mis en avant</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch checked={productForm.isActive} onCheckedChange={(c) => setProductForm({ ...productForm, isActive: c })} />
                          <Label>Actif</Label>
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsProductDialogOpen(false)}>Annuler</Button>
                        <Button type="submit" className="bg-[#8B1538] hover:bg-[#7A1230]">
                          {editingProduct ? "Mettre à jour" : "Créer"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {filteredProducts.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Aucun produit</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.map(prod => (
                      <div key={prod.id} className={`border rounded-lg overflow-hidden ${!prod.isActive ? "opacity-50" : ""}`}>
                        {prod.imageUrl ? (
                          <img src={prod.imageUrl} alt={prod.name} className="w-full h-40 object-cover" />
                        ) : (
                          <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                            <Package className="h-12 w-12 text-gray-300" />
                          </div>
                        )}
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className="px-2 py-0.5 text-xs rounded text-white"
                              style={{ backgroundColor: getEntityColor(prod.entityId) }}
                            >
                              {getEntityName(prod.entityId)}
                            </span>
                            {prod.isFeatured && (
                              <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded">Vedette</span>
                            )}
                          </div>
                          <h3 className="font-semibold">{prod.name}</h3>
                          {prod.price && <p className="text-sm text-[#8B1538] font-medium">{prod.price}</p>}
                          <p className="text-xs text-gray-500 mt-1">{getCategoryName(prod.categoryId)}</p>
                          <div className="flex justify-end gap-2 mt-3 pt-3 border-t">
                            <Button size="icon" variant="ghost" onClick={() => handleEditProduct(prod)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => handleDeleteProduct(prod.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <Card className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Catégories</CardTitle>
                  <CardDescription>Organisez vos produits par catégories</CardDescription>
                </div>
                <Dialog open={isCategoryDialogOpen} onOpenChange={(open) => {
                  setIsCategoryDialogOpen(open);
                  if (!open) resetCategoryForm();
                }}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#8B1538] hover:bg-[#7A1230]">
                      <Plus className="h-4 w-4 mr-2" />
                      Nouvelle catégorie
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingCategory ? "Modifier la catégorie" : "Nouvelle catégorie"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmitCategory} className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nom *</Label>
                          <Input
                            value={categoryForm.name}
                            onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Entité</Label>
                          <Select value={categoryForm.entityId} onValueChange={(v) => setCategoryForm({ ...categoryForm, entityId: v })}>
                            <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                            <SelectContent>
                              {entities.map(e => <SelectItem key={e.id} value={e.id}>{e.shortName}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={categoryForm.description}
                          onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                          rows={2}
                        />
                      </div>
                      <ImagePicker
                        label="Image"
                        value={categoryForm.imageUrl}
                        onChange={(url) => setCategoryForm({ ...categoryForm, imageUrl: url })}
                      />
                      <div className="flex items-center gap-2">
                        <Switch checked={categoryForm.isActive} onCheckedChange={(c) => setCategoryForm({ ...categoryForm, isActive: c })} />
                        <Label>Active</Label>
                      </div>
                      <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>Annuler</Button>
                        <Button type="submit" className="bg-[#8B1538] hover:bg-[#7A1230]">
                          {editingCategory ? "Mettre à jour" : "Créer"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {filteredCategories.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Aucune catégorie</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredCategories.map(cat => (
                      <div key={cat.id} className={`border rounded-lg p-4 ${!cat.isActive ? "opacity-50" : ""}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            {cat.imageUrl ? (
                              <img src={cat.imageUrl} alt={cat.name} className="w-12 h-12 rounded object-cover" />
                            ) : (
                              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                                <FolderOpen className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                            <div>
                              <h4 className="font-medium">{cat.name}</h4>
                              <p className="text-xs text-gray-500">{getEntityName(cat.entityId)}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-3 pt-3 border-t">
                          <Button size="icon" variant="ghost" onClick={() => handleEditCategory(cat)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => handleDeleteCategory(cat.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
