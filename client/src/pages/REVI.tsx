import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import REVIHeroSection from "@/components/REVI/HeroSection";
import REVISectorsSection from "@/components/REVI/SectorsSection";
import REVIValueChainSection from "@/components/REVI/ValueChainSection";
import REVIImpactSection from "@/components/REVI/ImpactSection";
import RBFContactSection from "@/components/RBF/ContactSection";
import Footer from "@/components/Footer";

export default function REVI() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <REVIHeroSection />
        <REVISectorsSection />
        <REVIValueChainSection />
        <REVIImpactSection />
        <RBFContactSection />
      </main>
      <Footer />
    </div>
  );
}
