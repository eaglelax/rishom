import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import GovernanceHeroSection from "@/components/Governance/HeroSection";
import GovernanceStructureSection from "@/components/Governance/StructureSection";
import GovernancePrinciplesSection from "@/components/Governance/PrinciplesSection";
import GovernanceReportsSection from "@/components/Governance/ReportsSection";
import AboutLeadershipSection from "@/components/About/LeadershipSection";
import Footer from "@/components/Footer";

export default function Governance() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <GovernanceHeroSection />
        <GovernanceStructureSection />
        <GovernancePrinciplesSection />
        <AboutLeadershipSection />
        <GovernanceReportsSection />
      </main>
      <Footer />
    </div>
  );
}
