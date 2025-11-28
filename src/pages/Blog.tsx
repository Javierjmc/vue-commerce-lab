import React from "react";
import Layout from "@/layouts/Layout";
import { blogPosts } from "@/lib/blog";
import ArticleCard from "@/components/ArticleCard";

const Blog = () => {
  return (
    <Layout>
      <section className="py-16 bg-gradient-to-r from-green-50 to-green-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-4 leading-tight">
              Nuestro Blog de Salud y Bienestar
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explora artículos, consejos y guías sobre nutrición natural, plantas medicinales y un estilo de vida saludable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogPosts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
