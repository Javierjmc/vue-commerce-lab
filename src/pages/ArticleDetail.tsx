import React from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/layouts/Layout";
import { blogPosts } from "@/lib/blog";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <Layout>
        <section className="py-16 md:py-20 text-center bg-gray-50">
          <h1 className="text-3xl md:text-4xl font-bold text-red-600">Artículo no encontrado</h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-700">Lo sentimos, el artículo que buscas no existe.</p>
          <Link to="/blog" className="mt-6 md:mt-8 inline-block">
            <Button className="bg-primary hover:bg-green-700 text-white py-2 px-6 text-base">
              Volver al Blog
            </Button>
          </Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12 md:py-16 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6 md:mb-8">
            <Link to="/blog" className="flex items-center text-primary hover:text-green-700 transition-colors duration-200">
              <ChevronLeft className="w-4 h-4 mr-1 md:mr-2" />
              <span className="text-base md:text-lg font-medium">Volver a todos los artículos</span>
            </Link>
          </div>

          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-xl shadow-lg mb-6 md:mb-8"
          />

          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 md:mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
            Por <span className="font-semibold text-gray-800">{post.author}</span> el {post.date}
          </p>

          <div className="prose prose-base md:prose-lg max-w-none text-gray-800 space-y-4 md:space-y-6">
            {post.content.map((paragraph, index) => (
              <p key={index} className="leading-relaxed text-base md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ArticleDetail;
