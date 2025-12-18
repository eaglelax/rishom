import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import MaterialsHero from "@/components/RBFServices/MaterialsHero";
import MaterialsCategories from "@/components/RBFServices/MaterialsCategories";
import MaterialsDelivery from "@/components/RBFServices/MaterialsDelivery";
import RBFContactSection from "@/components/RBF/ContactSection";
import Footer from "@/components/Footer";

export default function RBFMaterials() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <MaterialsHero />
        <MaterialsCategories />
        <MaterialsDelivery />
        <RBFContactSection />
      </main>
      <Footer />
    </div>
  );
}
