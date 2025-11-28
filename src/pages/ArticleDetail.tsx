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
        <section className="py-20 text-center bg-gray-50">
          <h1 className="text-4xl font-bold text-red-600">Artículo no encontrado</h1>
          <p className="mt-4 text-lg text-gray-700">Lo sentimos, el artículo que buscas no existe.</p>
          <Link to="/blog" className="mt-8 inline-block">
            <Button className="bg-primary hover:bg-green-700 text-white">
              Volver al Blog
            </Button>
          </Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <Link to="/blog" className="flex items-center text-primary hover:text-green-700 transition-colors duration-200">
              <ChevronLeft className="w-5 h-5 mr-2" />
              <span className="text-lg font-medium">Volver a todos los artículos</span>
            </Link>
          </div>

          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-96 object-cover rounded-xl shadow-lg mb-8"
          />

          <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Por <span className="font-semibold text-gray-800">{post.author}</span> el {post.date}
          </p>

          <div className="prose prose-lg max-w-none text-gray-800 space-y-6">
            {post.content.map((paragraph, index) => (
              <p key={index} className="leading-relaxed text-lg">
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
