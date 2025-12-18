import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import RentalHero from "@/components/RBFServices/RentalHero";
import RentalFleet from "@/components/RBFServices/RentalFleet";
import RentalOptions from "@/components/RBFServices/RentalOptions";
import RBFContactSection from "@/components/RBF/ContactSection";
import Footer from "@/components/Footer";

export default function RBFRental() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <RentalHero />
        <RentalFleet />
        <RentalOptions />
        <RBFContactSection />
      </main>
      <Footer />
    </div>
  );
}
