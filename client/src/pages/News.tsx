import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import NewsHeroSection from "@/components/News/HeroSection";
import NewsFeaturedArticle from "@/components/News/FeaturedArticle";
import NewsArticlesList from "@/components/News/ArticlesList";
import Footer from "@/components/Footer";

export default function News() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <NewsHeroSection />
        <NewsFeaturedArticle />
        <NewsArticlesList />
      </main>
      <Footer />
    </div>
  );
}
