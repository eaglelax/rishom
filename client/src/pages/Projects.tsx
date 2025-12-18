import { useState } from "react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import ProjectsHeroSection from "@/components/Projects/HeroSection";
import ProjectsFilterSection from "@/components/Projects/FilterSection";
import ProjectsGrid from "@/components/Projects/ProjectsGrid";
import Footer from "@/components/Footer";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <ProjectsHeroSection />
        <ProjectsFilterSection
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <ProjectsGrid activeFilter={activeFilter} />
      </main>
      <Footer />
    </div>
  );
}
