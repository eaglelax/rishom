import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import PressHeroSection from "@/components/Press/HeroSection";
import PressPressReleases from "@/components/Press/PressReleases";
import PressMediaKit from "@/components/Press/MediaKit";
import PressContactPress from "@/components/Press/ContactPress";
import Footer from "@/components/Footer";

export default function Press() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <PressHeroSection />
        <PressPressReleases />
        <PressMediaKit />
        <PressContactPress />
      </main>
      <Footer />
    </div>
  );
}
