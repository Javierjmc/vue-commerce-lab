import { ProductoNutricional } from "@/lib/productos";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: ProductoNutricional;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-hover)]">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.imagenes[0]}
            alt={product.titulo}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <Badge className="absolute right-2 top-2">{product.categoriaPorPatologia}</Badge>
        </div>
        
        <CardContent className="p-4">
          <h3 className="mb-2 line-clamp-1 text-lg font-semibold">{product.titulo}</h3>
          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
            {product.subtituloComplemento}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              {product.pvp}
            </span>
            {/* <span className="text-sm text-muted-foreground">
              Stock: {product.stock}
            </span> */}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            Añadir al carrito
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;