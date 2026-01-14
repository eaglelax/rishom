import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Download, FileText, ExternalLink } from "lucide-react";
import { Link } from "wouter";

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
  publishedAt: string | null;
}

export default function PressPressReleases() {
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPressReleases = async () => {
      try {
        const response = await fetch("/api/press-releases");
        if (response.ok) {
          const data = await response.json();
          setPressReleases(data);
        }
      } catch (error) {
        console.error("Erreur chargement communiqués:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPressReleases();
  }, []);

  const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  if (isLoading) {
    return (
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-12 h-12 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (pressReleases.length === 0) {
    return (
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#8B1538] mb-4">
              Communiqués de presse
            </h2>
            <p className="text-xl text-[#707070]">
              Aucun communiqué de presse disponible pour le moment.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#8B1538] mb-4">
            Communiqués de presse
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Les dernières actualités officielles du Groupe Rishom
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {pressReleases.map((release, index) => (
            <motion.div
              key={release.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-2xl transition-all duration-300 border-none">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        {release.category && (
                          <span className="px-3 py-1 rounded-full bg-[#8B1538]/10 text-[#8B1538] text-xs font-semibold">
                            {release.category}
                          </span>
                        )}
                        <div className="flex items-center gap-2 text-sm text-[#707070]">
                          <Calendar className="w-4 h-4" />
                          {formatDate(release.publishedAt)}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">
                        {release.title}
                      </h3>
                      {release.excerpt && (
                        <p className="text-[#3A3A3C]">{release.excerpt}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      {release.pdfUrl && (
                        <a href={release.pdfUrl} target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#8B1538] text-[#8B1538] hover:bg-[#8B1538] hover:text-white whitespace-nowrap w-full"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            PDF {release.pdfSize && `(${release.pdfSize})`}
                          </Button>
                        </a>
                      )}
                      <Link href={`/presse/${release.slug}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#8B1538] hover:bg-[#8B1538]/10 w-full"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Lire en ligne
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
