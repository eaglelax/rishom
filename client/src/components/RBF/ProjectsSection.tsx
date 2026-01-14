import DynamicProjectsSection from "@/components/shared/DynamicProjectsSection";

export default function RBFProjectsSection() {
  return (
    <DynamicProjectsSection
      entitySlug="rbf"
      title="Projets réalisés"
      subtitle="Des références majeures dans toute l'Afrique de l'Ouest"
      allButtonText="Voir tous nos projets"
      allButtonLink="/projets"
      limit={3}
    />
  );
}
