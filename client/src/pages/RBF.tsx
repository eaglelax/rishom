import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import RBFHeroSection from "@/components/RBF/HeroSection";
import RBFServicesSection from "@/components/RBF/ServicesSection";
import RBFProductsSection from "@/components/RBF/ProductsSection";
import RBFWhyChooseSection from "@/components/RBF/WhyChooseSection";
import RBFProjectsSection from "@/components/RBF/ProjectsSection";
import RBFContactSection from "@/components/RBF/ContactSection";
import Footer from "@/components/Footer";

export default function RBF() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <RBFHeroSection />
        <RBFServicesSection />
        <RBFProductsSection />
        <RBFWhyChooseSection />
        <RBFProjectsSection />
        <RBFContactSection />
      </main>
      <Footer />
    </div>
  );
}
