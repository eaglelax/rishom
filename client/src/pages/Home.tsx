import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EntitiesGrid from "@/components/EntitiesGrid";
import StatsSection from "@/components/StatsSection";
import NewsGrid from "@/components/NewsGrid";
import JoinUsSection from "@/components/JoinUsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <EntitiesGrid />
        <StatsSection />
        <NewsGrid />
        <JoinUsSection />
      </main>
      <Footer />
    </div>
  );
}
