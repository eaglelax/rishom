import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CSRHeroSection from "@/components/CSR/HeroSection";
import CSRPillarsSection from "@/components/CSR/PillarsSection";
import CSRImpactSection from "@/components/CSR/ImpactSection";
import CSRProjectsSection from "@/components/CSR/ProjectsSection";
import Footer from "@/components/Footer";

export default function CSR() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <CSRHeroSection />
        <CSRPillarsSection />
        <CSRImpactSection />
        <CSRProjectsSection />
      </main>
      <Footer />
    </div>
  );
}
