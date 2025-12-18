import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import RBAHeroSection from "@/components/RBA/HeroSection";
import RBAProgramsSection from "@/components/RBA/ProgramsSection";
import RBAAdvantagesSection from "@/components/RBA/AdvantagesSection";
import RBASuccessStoriesSection from "@/components/RBA/SuccessStoriesSection";
import RBFContactSection from "@/components/RBF/ContactSection";
import Footer from "@/components/Footer";

export default function RBA() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <RBAHeroSection />
        <RBAProgramsSection />
        <RBAAdvantagesSection />
        <RBASuccessStoriesSection />
        <RBFContactSection />
      </main>
      <Footer />
    </div>
  );
}
