import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CertificationsHeroSection from "@/components/Certifications/HeroSection";
import CertificationsGrid from "@/components/Certifications/CertificationsGrid";
import CertificationsCommitmentsSection from "@/components/Certifications/CommitmentsSection";
import Footer from "@/components/Footer";

export default function Certifications() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <CertificationsHeroSection />
        <CertificationsGrid />
        <CertificationsCommitmentsSection />
      </main>
      <Footer />
    </div>
  );
}
