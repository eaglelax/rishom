import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import ContactHeroSection from "@/components/Contact/HeroSection";
import ContactForm from "@/components/Contact/ContactForm";
import ContactMapSection from "@/components/Contact/MapSection";
import ContactEntitiesContact from "@/components/Contact/EntitiesContact";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <ContactHeroSection />
        <ContactForm />
        <ContactMapSection />
        <ContactEntitiesContact />
      </main>
      <Footer />
    </div>
  );
}
