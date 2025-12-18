import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import ArticleHeader from "@/components/NewsDetail/ArticleHeader";
import ArticleContent from "@/components/NewsDetail/ArticleContent";
import RelatedArticles from "@/components/NewsDetail/RelatedArticles";
import Footer from "@/components/Footer";

export default function NewsDetail() {
  const article = {
    category: "REV'I",
    categoryColor: "#058B5E",
    title: "Le Groupe Rishom inaugure sa nouvelle usine de transformation agricole",
    date: "15 Décembre 2025",
    readTime: "5 min",
    author: "Service Communication",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80",
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
