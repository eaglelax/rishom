import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  categoryId: string | null;
  displayOrder: number;
}

interface FaqCategory {
  id: string;
  name: string;
  color: string | null;
  displayOrder: number;
}

interface GroupedFaq {
  category: FaqCategory;
  questions: FaqItem[];
}

export default function FAQCategories() {
  const [groupedFaq, setGroupedFaq] = useState<GroupedFaq[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [faqRes, categoriesRes] = await Promise.all([
          fetch("/api/faq"),
          fetch("/api/faq/categories")
        ]);

        if (faqRes.ok && categoriesRes.ok) {
          const faqItems: FaqItem[] = await faqRes.json();
          const categories: FaqCategory[] = await categoriesRes.json();

          // Grouper les questions par catégorie
          const grouped = categories
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map(category => ({
              category,
              questions: faqItems
                .filter(item => item.categoryId === category.id)
                .sort((a, b) => a.displayOrder - b.displayOrder)
            }))
            .filter(g => g.questions.length > 0);

          // Ajouter les questions sans catégorie
          const uncategorized = faqItems.filter(item => !item.categoryId);
          if (uncategorized.length > 0) {
            grouped.push({
              category: { id: "other", name: "Autres questions", color: "#8B1538", displayOrder: 999 },
              questions: uncategorized
            });
          }

          setGroupedFaq(grouped);
        }
      } catch (error) {
        console.error("Erreur chargement FAQ:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleItem = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (isLoading) {
    return (
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-12 h-12 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (groupedFaq.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {groupedFaq.map((group, catIndex) => (
            <motion.div
              key={group.category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12 last:mb-0"
            >
              <h2
                className="text-3xl md:text-4xl font-bold mb-8"
                style={{ color: group.category.color || "#8B1538" }}
              >
                {group.category.name}
              </h2>

              <div className="space-y-4">
                {group.questions.map((item, qIndex) => {
                  const key = `${catIndex}-${qIndex}`;
                  const isOpen = openItems[key];

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: qIndex * 0.05 }}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleItem(catIndex, qIndex)}
                        className="w-full flex items-center justify-between p-6 text-left bg-[#F5F1E8] hover:bg-[#F5F1E8]/70 transition-colors"
                        data-testid={`faq-toggle-${catIndex}-${qIndex}`}
                      >
                        <span className="text-lg font-semibold text-[#1A1A1A] pr-4">
                          {item.question}
                        </span>
                        <ChevronDown
                          className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          style={{ color: group.category.color || "#8B1538" }}
                        />
                      </button>

                      <motion.div
                        initial={false}
                        animate={{
                          height: isOpen ? "auto" : 0,
                          opacity: isOpen ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-white">
                          <p className="text-[#3A3A3C] leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
