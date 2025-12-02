import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  image: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  badge?: string;
}

const ProductCardNaturdix = ({ image, name, description, price, originalPrice, badge }: ProductCardProps) => {
  return (
    <div className="bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group animate-fade-in">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {badge && (
          <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground font-bold z-10">
            {badge}
          </Badge>
        )}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-card-foreground text-sm mb-1 line-clamp-2">{name}</h3>
        <p className="text-muted-foreground text-xs mb-3 line-clamp-1">{description}</p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">CAJA</span>
          </div>
          <div className="text-right">
            {originalPrice && (
              <span className="text-xs text-muted-foreground line-through block">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-black text-secondary">${price.toFixed(2)}</span>
          </div>
        </div>
        <Button variant="secondary" className="w-full" size="sm">
          COMPRAR
        </Button>
      </div>
    </div>
  );
};

export default ProductCardNaturdix;
