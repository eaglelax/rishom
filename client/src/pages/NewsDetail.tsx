import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import ArticleHeader from "@/components/NewsDetail/ArticleHeader";
import ArticleContent from "@/components/NewsDetail/ArticleContent";
import RelatedArticles from "@/components/NewsDetail/RelatedArticles";
import Footer from "@/components/Footer";
import foodFactoryImage from "@assets/generated_images/revi_food_factory_burkina.png";

export default function NewsDetail() {
  const article = {
    category: "REV'I",
    categoryColor: "#058B5E",
    title: "Le Groupe Rishom inaugure sa nouvelle usine de transformation agricole",
    date: "15 Décembre 2025",
    readTime: "5 min",
    author: "Service Communication",
    image: foodFactoryImage,
  };

  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <ArticleHeader {...article} />
        <ArticleContent />
        <RelatedArticles />
      </main>
      <Footer />
    </div>
  );
}
