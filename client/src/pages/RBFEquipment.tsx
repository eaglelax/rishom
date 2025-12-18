import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import EquipmentHero from "@/components/RBFServices/EquipmentHero";
import EquipmentCategories from "@/components/RBFServices/EquipmentCategories";
import EquipmentSpecifications from "@/components/RBFServices/EquipmentSpecifications";
import RBFContactSection from "@/components/RBF/ContactSection";
import Footer from "@/components/Footer";

export default function RBFEquipment() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <EquipmentHero />
        <EquipmentCategories />
        <EquipmentSpecifications />
        <RBFContactSection />
      </main>
      <Footer />
    </div>
  );
}
