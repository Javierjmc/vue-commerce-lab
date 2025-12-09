import { Link } from "react-router-dom";

export type BlogCategory = "recetas" | "salud" | "bienestar";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: BlogCategory;
  author: string;
  date: string;
  readTime: string;
}

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

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

export function BlogCard({ post, featured = false }: BlogCardProps) {  
  if (featured) {
    return (
      <Link to={`/blog/${post.id}`} className="block group">
        <article className="blog-card grid md:grid-cols-2 gap-0 overflow-hidden">
          <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <span className={`category-badge ${categoryStyles[post.category]} w-fit mb-4`}>
              {categoryLabels[post.category]}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors duration-300 leading-tight">
              {post.title}
            </h2>
            <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${post.id}`} className="block group">
      <article className="blog-card h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-5 flex flex-col flex-1">
          <span className={`category-badge ${categoryStyles[post.category]} w-fit mb-3`}>
            {categoryLabels[post.category]}
          </span>
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors duration-300 line-clamp-2 leading-snug">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{post.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-3 border-t border-border">
            <span className="font-medium">{post.author}</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
