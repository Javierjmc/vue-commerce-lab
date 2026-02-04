import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, User, Share2, Bookmark } from "lucide-react";
import { blogPosts, getBlogContent } from "@/lib/blogPosts.ts";
import { BlogCard, BlogCategory } from "@/components/blog/BlogCard";
import { NewsletterCTA } from "@/components/blog/NewsletterCTA";

const categoryLabels: Record<BlogCategory, string> = {
  recetas: "Recetas",
  salud: "Salud",
  bienestar: "Bienestar",
};

const categoryStyles: Record<BlogCategory, string> = {
  recetas: "category-badge-recipes",
  salud: "category-badge-health",
  bienestar: "category-badge-wellness",
};

// El contenido del artículo se carga dinámicamente desde blogPosts.ts

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Artículo no encontrado</h1>
          <Link to="/blog" className="text-secondary hover:underline">
            Volver al blog
          </Link>
        </div>
      </main>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  // Obtener el contenido del artículo
  const articleContent = getBlogContent(post.id);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-[40vh] min-h-[300px] max-h-[450px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <article className="container mx-auto px-4 -mt-32 relative z-10">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
        </Link>

        {/* Article Header */}
        <header className="bg-card rounded-2xl shadow-card p-6 md:p-10 mb-8 animate-fade-in">
          <span className={`category-badge ${categoryStyles[post.category]} mb-4`}>
            {categoryLabels[post.category]}
          </span>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
            {post.title}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground border-t border-border pt-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-medium text-foreground">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-muted transition-colors" title="Compartir">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-muted transition-colors" title="Guardar">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          <div className="bg-card rounded-2xl shadow-card p-6 md:p-10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-secondary prose-a:no-underline hover:prose-a:underline">
              {articleContent.split('\n').map((line, index) => {
                if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-bold text-foreground mt-10 mb-4">{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('### ')) {
                  return <h3 key={index} className="text-xl font-semibold text-foreground mt-8 mb-3">{line.replace('### ', '')}</h3>;
                }
                if (line.startsWith('- **')) {
                  const match = line.match(/- \*\*(.+?)\*\*: (.+)/);
                  if (match) {
                    return (
                      <li key={index} className="text-muted-foreground ml-4 mb-2">
                        <strong className="text-foreground">{match[1]}:</strong> {match[2]}
                      </li>
                    );
                  }
                }
                if (line.startsWith('- ')) {
                  return <li key={index} className="text-muted-foreground ml-4 mb-2">{line.replace('- ', '')}</li>;
                }
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={index} className="font-semibold text-foreground mt-4 mb-2">{line.replace(/\*\*/g, '')}</p>;
                }
                if (line.trim() === '') {
                  return null;
                }
                return <p key={index} className="text-muted-foreground leading-relaxed mb-4">{line}</p>;
              })}
            </div>

            {/* Author Card */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{post.author}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Especialista en salud natural y bienestar integral. Apasionado por compartir conocimientos sobre nutrición y estilo de vida saludable.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* CTA Card */}
            <div className="bg-card rounded-2xl shadow-card p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3 className="font-bold text-foreground mb-3">¿Necesitas asesoría personalizada?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Nuestros expertos pueden ayudarte a encontrar los productos naturales perfectos para ti.
              </p>
              <button className="w-full py-3 rounded-full gradient-cta text-secondary-foreground font-semibold hover:shadow-hover transition-all duration-300">
                Agenda una cita
              </button>
            </div>

            {/* Categories */}
            <div className="bg-card rounded-2xl shadow-card p-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <h3 className="font-bold text-foreground mb-4">Categorías</h3>
              <div className="space-y-2">
                {(['recetas', 'salud', 'bienestar'] as BlogCategory[]).map((cat) => (
                  <Link
                    key={cat}
                    to={`/blog?category=${cat}`}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted transition-colors text-sm"
                  >
                    <span className="text-foreground">{categoryLabels[cat]}</span>
                    <span className="text-muted-foreground">
                      {blogPosts.filter(p => p.category === cat).length}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Artículos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <div
                  key={relatedPost.id}
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <BlogCard post={relatedPost} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter */}
        <div className="mt-16 mb-16">
          <NewsletterCTA />
        </div>
      </article>
    </main>
  );
};

export default BlogPost;
