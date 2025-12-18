import TopBar from "@/components/TopBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      {/* Header will be added here */}
      
      {/* Hero Section placeholder */}
      <section className="min-h-[60vh] bg-gradient-to-br from-[#8B1538] to-[#3A3A3C] flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Groupe Rishom</h1>
          <p className="text-xl md:text-2xl opacity-80">Bâtir l'Afrique de demain</p>
        </div>
      </section>
      
      {/* More sections will be added as components are provided */}
    </div>
  );
}
