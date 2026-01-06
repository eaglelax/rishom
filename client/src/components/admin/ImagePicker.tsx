import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImagePickerProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  aspectRatio?: "square" | "video" | "banner" | "logo";
}

export default function ImagePicker({
  label,
  value,
  onChange,
  required = false,
  aspectRatio = "video",
}: ImagePickerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    banner: "aspect-[3/1]",
    logo: "aspect-[2/1]",
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith("image/")) {
      setError("Veuillez sélectionner une image");
      return;
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 5MB");
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'upload");
      }

      const data = await response.json();
      onChange(data.url);
    } catch (err) {
      setError("Erreur lors de l'upload de l'image");
      console.error(err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label>
        {label} {required && "*"}
      </Label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {value ? (
        <div className="relative border rounded-lg overflow-hidden bg-gray-50">
          <img
            src={value}
            alt="Aperçu"
            className={`w-full object-cover ${aspectRatioClasses[aspectRatio]}`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x200?text=Image+non+disponible";
            }}
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="h-8 w-8 bg-white/90 hover:bg-white"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Upload className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="h-8 w-8 bg-white/90 hover:bg-white text-red-600 hover:text-red-700"
              onClick={handleRemove}
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#8B1538] hover:bg-[#8B1538]/5 transition-colors ${aspectRatioClasses[aspectRatio]} ${
            isUploading ? "pointer-events-none opacity-50" : ""
          }`}
        >
          {isUploading ? (
            <>
              <Loader2 className="h-8 w-8 text-[#8B1538] animate-spin mb-2" />
              <p className="text-sm text-gray-500">Upload en cours...</p>
            </>
          ) : (
            <>
              <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Cliquez pour sélectionner une image</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (max 5MB)</p>
            </>
          )}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
