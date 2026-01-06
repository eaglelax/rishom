import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin } from "lucide-react";

// Images de fallback locales
import entrepreneurImage from "@assets/generated_images/burkinabe_entrepreneur_futuristic_vision.png";
import dataAnalystImage from "@assets/generated_images/ric_data_analyst_burkinabe_woman.png";
import alumnusImage from "@assets/generated_images/rba_alumnus_male_portrait_burkina.png";
import alumnaImage from "@assets/generated_images/rba_alumna_female_portrait_burkina.png";

interface LeadershipMember {
  id: string;
  name: string;
  position: string;
  bio: string | null;
  photoUrl: string | null;
  linkedinUrl: string | null;
  displayOrder: number;
}

// Fallback images par index
const fallbackImages = [entrepreneurImage, dataAnalystImage, alumnusImage, alumnaImage];

export default function AboutLeadershipSection() {
  const [leaders, setLeaders] = useState<LeadershipMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const response = await fetch("/api/team");
        if (response.ok) {
          const data = await response.json();
          setLeaders(data);
        }
      } catch (error) {
        console.error("Erreur chargement équipe:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  const getImageUrl = (member: LeadershipMember, index: number): string => {
    if (member.photoUrl && (member.photoUrl.startsWith("/images/") || member.photoUrl.startsWith("/uploads/") || member.photoUrl.startsWith("http"))) {
      return member.photoUrl;
    }
    return fallbackImages[index % fallbackImages.length];
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

  if (leaders.length === 0) {
    return null;
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
            Notre direction
          </h2>
          <p className="text-xl text-[#3A3A3C] max-w-3xl mx-auto">
            Une équipe de leaders expérimentés au service de notre vision
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-none overflow-hidden">
                <div className="relative h-80">
                  <img
                    src={getImageUrl(leader, index)}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {leader.name}
                    </h3>
                    <p className="text-white/90 text-sm">{leader.position}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  {leader.bio && <p className="text-[#3A3A3C] mb-4">{leader.bio}</p>}
                  {leader.linkedinUrl && (
                    <a
                      href={leader.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#8B1538] hover:text-[#C4526D] transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span className="font-semibold">Profil LinkedIn</span>
                    </a>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
