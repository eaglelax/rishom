import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import PartnersHeroSection from "@/components/Partners/HeroSection";
import PartnersGrid from "@/components/Partners/PartnersGrid";
import PartnersBecomePartnerSection from "@/components/Partners/BecomePartnerSection";
import Footer from "@/components/Footer";

export default function Partners() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <PartnersHeroSection />
        <PartnersGrid />
        <PartnersBecomePartnerSection />
      </main>
      <Footer />
    </div>
  );
}
