import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CareersHeroSection from "@/components/Careers/HeroSection";
import CareersBenefitsSection from "@/components/Careers/BenefitsSection";
import CareersOpenPositions from "@/components/Careers/OpenPositions";
import CareersSpontaneousApplication from "@/components/Careers/SpontaneousApplication";
import Footer from "@/components/Footer";

export default function Careers() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <CareersHeroSection />
        <CareersBenefitsSection />
        <CareersOpenPositions />
        <CareersSpontaneousApplication />
      </main>
      <Footer />
    </div>
  );
}
