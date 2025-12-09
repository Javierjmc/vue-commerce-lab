import { useState, useMemo } from "react";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogCard, BlogCategory } from "@/components/blog/BlogCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { NewsletterCTA } from "@/components/blog/NewsletterCTA";
import { blogPosts } from "@/lib/blogPosts.ts";
import Layout from "@/layouts/Layout";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = activeCategory === "all" || post.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  console.log("BlogPosts disponibles:", blogPosts);

  console.log("Filtrados:", featuredPost);

  return (
    <Layout>
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <BlogHero />

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        {/* Filters Section */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-10">
          <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
          <div className="w-full md:w-72">
            <BlogSearch value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
              Artículo Destacado
            </h2>
            <BlogCard post={featuredPost} featured />
          </div>
        )}

        {/* Posts Grid */}
        {regularPosts.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-6">
              Últimos Artículos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No se encontraron artículos que coincidan con tu búsqueda.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 text-secondary font-medium hover:underline"
            >
              Ver todos los artículos
            </button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16">
          <NewsletterCTA />
        </div>
      </section>
    </main>
    </Layout>
  );
};

export default Blog;
