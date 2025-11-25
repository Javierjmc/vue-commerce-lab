import { useParams, useNavigate } from "react-router-dom";
import { ListaProductos, ProductoNutricional } from "@/lib/productos";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, ArrowLeft, Check } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = ListaProductos.find((p) => p.id.toString() === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-8 text-center">
          <h1 className="text-2xl font-bold">Producto no encontrado</h1>
          <Button onClick={() => navigate("/tienda")} className="mt-4">
            Volver a la tienda
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const currentStock = 999; // Asumiendo un stock temporal, ya que no está en ProductoNutricional

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate("/tienda")}
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a la tienda
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Carrusel de Imágenes */}
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {product.imagenes.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                    <img
                      src={image}
                      alt={`${product.titulo} - ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="flex flex-col gap-6">
            <div>
              <Badge className="mb-2">{product.categoriaPorPatologia}</Badge>
              <h1 className="mb-4 text-3xl font-bold">{product.titulo}</h1>
              <p className="text-lg text-muted-foreground">
                {product.subtituloComplemento}
              </p>
            </div>

            {/* Se eliminan las características ya que no están en ProductoNutricional */}
            {/* <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 font-semibold">Características:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
            </CardContent>
            </Card> */}

            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-primary">
                {product.pvp}
              </span>
              <span className="text-muted-foreground">
                {currentStock > 0 ? `${currentStock} disponibles` : "Sin stock"}
              </span>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                  disabled={quantity >= currentStock}
                >
                  +
                </Button>
              </div>
              <Button
                className="flex-1 gap-2"
                onClick={handleAddToCart}
                disabled={currentStock === 0}
              >
                <ShoppingCart className="h-5 w-5" />
                Añadir al carrito
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
