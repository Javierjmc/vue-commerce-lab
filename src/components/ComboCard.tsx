import React from "react";
import { ProductCombo } from "@/lib/combos";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ComboCardProps {
  combo: ProductCombo;
}

const ComboCard: React.FC<ComboCardProps> = ({ combo }) => {
  const calculateDiscountPercentage = (original: string, discounted: string) => {
    const originalNum = parseFloat(original.replace("€", "").replace(",", "."));
    const discountedNum = parseFloat(discounted.replace("€", "").replace(",", "."));
    if (originalNum <= 0) return 0;
    const discount = ((originalNum - discountedNum) / originalNum) * 100;
    return Math.round(discount);
  };

  const discountPercentage = calculateDiscountPercentage(combo.originalPrice, combo.comboPrice);

  return (
    <Link to={`/combo/${combo.id}`}> {/* Envolver toda la Card en Link */}
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-hover)]"> {/* Clases de Card de ProductCard */}
        <div className="relative aspect-square overflow-hidden bg-muted"> {/* Clases de imagen de ProductCard */}
          <img
            src={combo.imageUrl}
            alt={combo.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy" // Añadir lazy loading
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          {discountPercentage > 0 && (
            <Badge className="absolute top-4 left-4 bg-red-500 text-white text-md font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
              <Tag className="w-4 h-4" />
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        <CardContent className="p-4"> {/* Unificar CardHeader y CardContent aquí */}
          <h3 className="mb-2 line-clamp-1 text-lg font-semibold">{combo.name}</h3> {/* Estilo de título de ProductCard */}
          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground italic"> {/* Estilo de subtítulo de ProductCard */}
            {combo.tagline}
          </p>
          <p className="mb-4 text-sm text-muted-foreground line-clamp-3">{combo.description}</p> {/* Descripción del combo */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground line-through">{combo.originalPrice}</span>
            <span className="text-2xl font-bold text-primary">{combo.comboPrice}</span> {/* Estilo de precio de ProductCard */}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full gap-2"
          >
            Ver Combo
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ComboCard;
