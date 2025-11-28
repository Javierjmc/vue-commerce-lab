import React from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "@/lib/blog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ArticleCardProps {
  post: BlogPost;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post }) => {
  return (
    <Card className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary leading-tight hover:text-green-700 transition-colors duration-200">
          <Link to={`/blog/${post.id}`}>{post.title}</Link>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground mt-1">
          Por <span className="font-medium text-gray-700">{post.author}</span> el {post.date}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed line-clamp-3">{post.summary}</p>
      </CardContent>
      <CardFooter className="pt-4">
        <Link to={`/blog/${post.id}`} className="w-full">
          <Button className="w-full bg-gradient-to-br from-[#0a5a3f] via-[#48ad08] to-[#2c8e1e] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            Leer Más
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
