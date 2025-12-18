import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import FAQHeroSection from "@/components/FAQ/HeroSection";
import FAQCategories from "@/components/FAQ/FAQCategories";
import FAQStillQuestions from "@/components/FAQ/StillQuestions";
import Footer from "@/components/Footer";

export default function FAQ() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <FAQHeroSection />
        <FAQCategories />
        <FAQStillQuestions />
      </main>
      <Footer />
    </div>
  );
}
