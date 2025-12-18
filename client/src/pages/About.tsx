import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import AboutHeroSection from "@/components/About/HeroSection";
import AboutHistorySection from "@/components/About/HistorySection";
import AboutValuesSection from "@/components/About/ValuesSection";
import AboutLeadershipSection from "@/components/About/LeadershipSection";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <AboutHeroSection />
        <AboutHistorySection />
        <AboutValuesSection />
        <AboutLeadershipSection />
        <StatsSection />
      </main>
      <Footer />
    </div>
  );
}
