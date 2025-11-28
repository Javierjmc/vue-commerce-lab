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
    <Card className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group bg-white border border-gray-200">
      <div className="relative">
        <img
          src={combo.imageUrl}
          alt={combo.name}
          className="w-full h-56 object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        {discountPercentage > 0 && (
          <Badge className="absolute top-4 left-4 bg-red-500 text-white text-md font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
            <Tag className="w-4 h-4" />
            -{discountPercentage}%
          </Badge>
        )}
      </div>
      <CardHeader className="text-center pt-6 pb-3">
        <CardTitle className="text-4xl font-extrabold text-primary mb-2 leading-tight">{combo.name}</CardTitle>
        <CardDescription className="text-lg text-muted-foreground italic">{combo.tagline}</CardDescription>
      </CardHeader>
      <CardContent className="px-6 text-center">
        <p className="text-gray-700 mb-4 text-base leading-relaxed line-clamp-3">{combo.description}</p>
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-gray-500 line-through text-xl">{combo.originalPrice}</span>
          <span className="text-5xl font-extrabold text-red-600">{combo.comboPrice}</span>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link to={`/tienda?combo=${combo.id}`} className="w-full">
          <Button className="w-full py-3 text-lg font-semibold
            bg-gradient-to-br from-[#0a5a3f] via-[#48ad08] to-[#2c8e1e]
            text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300
            hover:scale-[1.01] active:scale-[0.99] transform"
          >
            Ver Combo
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ComboCard;
