import { ProductoNutricional } from "@/lib/productos";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: ProductoNutricional;
  viewMode?: "grid" | "large";
}

const ProductCard = ({ product, viewMode = "grid" }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast({
      title: "¡Añadido al carrito!",
      description: `${product.titulo} se ha añadido correctamente.`,
    });
  };

  return (
    <Link to={`/product/${product.id}`} className="block group">
      <article className={`product-card h-full flex ${viewMode === "large" ? "flex-row" : "flex-col"}`}>
        {/* Image Container */}
        <div className={`relative overflow-hidden bg-gradient-to-br from-muted to-muted/50  ${viewMode === "large" ? "w-2/5 aspect-square" : "aspect-square"}`}>
          <img
            src={product.imagenes[0]}
            alt={product.titulo}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 "
            loading="lazy"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          {/* Quick view button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <Button
                size="sm"
                className="gap-2 rounded-full px-6 bg-emerald-200/80 text-foreground hover:bg-emerald-200 shadow-lg backdrop-blur-sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <Eye className="h-4 w-4" />
                Ver detalles
              </Button>
            </div>
          </div>

          {/* Category Badge */}
          {/* <div className="absolute top-4 right-4">
            <span className="badge-category bg-green-100/90">
              {product.categoriaPorPatologia}
            </span>
          </div> */}

          {/* Featured Badge */}
          {product.destacado && (
            <div className="absolute top-4 left-4">
              <span className="badge-floating flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" />
                Destacado
              </span>
            </div>
          )}

          {/* Rating */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-sm font-medium">4.8</span>
          </div>
        </div>
        
        {/* Content */}
        <div className={`relative z-10 flex-1 flex flex-col p-5 ${viewMode === "large" ? "p-6" : "p-5"}`}>
          {/* Classification tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block text-xs font-bold text-secondary uppercase tracking-wider bg-secondary/10 px-2.5 py-1 rounded-full">
              {product.clasificacionFuncionPrincipal}
            </span>
          </div>
          
          {/* Title */}
          <h3 className={`font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-300 ${viewMode === "large" ? "text-xl" : "text-lg"}`}>
            {product.titulo}
          </h3>
          
          {/* Description */}
          <p className={`text-muted-foreground mb-4 flex-grow ${viewMode === "large" ? "line-clamp-3 text-base" : "line-clamp-2 text-sm"}`}>
            {product.subtituloComplemento || product.subtitulo}
          </p>
          
          {/* Price and Action */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Precio</span>
              <span className={`font-bold text-primary ${viewMode === "large" ? "text-3xl" : "text-2xl"}`}>
                {product.pvp}
              </span>
            </div>
            
            <Button
              size="icon"
              className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 group/btn"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5 transition-transform group-hover/btn:scale-110" />
            </Button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;