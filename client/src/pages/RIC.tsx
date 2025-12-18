import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import RICHeroSection from "@/components/RIC/HeroSection";
import RICServicesSection from "@/components/RIC/ServicesSection";
import RICProcessSection from "@/components/RIC/ProcessSection";
import RICInvestmentSection from "@/components/RIC/InvestmentSection";
import RBFContactSection from "@/components/RBF/ContactSection";
import Footer from "@/components/Footer";

export default function RIC() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <RICHeroSection />
        <RICServicesSection />
        <RICProcessSection />
        <RICInvestmentSection />
        <RBFContactSection />
      </main>
      <Footer />
    </div>
  );
}
