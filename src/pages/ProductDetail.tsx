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
import ImageMagnifier from "@/components/ui/ImageMagnifier";
import ProductCard from "@/components/ProductCard";
import { useRef, useEffect } from "react";
import Footer from "@/components/Footer"; // Importar el Footer

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Estado para la imagen actual
  const mainCarouselRef = useRef<any>(null);

  const product = ListaProductos.find((p) => p.id.toString() === id);

  useEffect(() => {
    if (mainCarouselRef.current) {
      mainCarouselRef.current.scrollTo(currentImageIndex);
    }
  }, [currentImageIndex]);

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

  const currentStock: number = 999; // Asumiendo un stock temporal, ya que no está en ProductoNutricional

  const relatedProducts = ListaProductos.filter(
    (p) =>
      p.categoriaPorPatologia === product.categoriaPorPatologia &&
      p.id !== product.id
  ).slice(0, 4); // Limitar a 4 productos relacionados

  return (
    <div className="min-h-screen bg-background flex flex-col"> {/* Añadir flex-col para el layout */}
      <Navbar />
      
      <main className="container flex-1 py-6 md:py-8 px-4 md:px-6"> {/* Ajustar padding y flex-1 */}
        <Button
          variant="ghost"
          className="mb-4 md:mb-6 gap-2 text-base"
          onClick={() => navigate("/tienda")}
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a la tienda
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contenedor de la izquierda (Carrusel Principal y Miniaturas) */}
          <div className="flex flex-col gap-4">
            {/* Carrusel de Imágenes */}
            <Carousel className="w-full max-w-sm sm:max-w-md lg:max-w-full mx-auto" setApi={(api) => { {/* Ajustar max-width */}
              if (api) {
                api.on("select", () => {
                  setCurrentImageIndex(api.selectedScrollSnap());
                });
                mainCarouselRef.current = api; // Guardar la API del carrusel principal
              }
            }}>
              <CarouselContent>
                {product.imagenes.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square overflow-hidden bg-muted">
                      <ImageMagnifier
                        src={image}
                        alt={`${product.titulo} - ${index + 1}`}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            {/* Miniaturas del Carrusel */}
            <Carousel
              opts={{
                align: "start",
                dragFree: true,
              }}
              className="w-full max-w-sm sm:max-w-md lg:max-w-full mx-auto mt-4"
            >
              <CarouselContent className="-ml-1">
                {product.imagenes.map((image, index) => (
                  <CarouselItem key={index} className="basis-1/4 pl-1">
                    <div
                      className={`aspect-square cursor-pointer overflow-hidden rounded-lg border-2 ${currentImageIndex === index ? "border-primary" : "border-transparent"}
                      `}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Detalles del Producto (columna derecha) */}
          <div className="flex flex-col gap-5 md:gap-6"> {/* Ajustar gap */}
            <div>
              <Badge className="mb-2 text-sm">{product.categoriaPorPatologia}</Badge> {/* Ajustar tamaño del Badge */}
              <h1 className="mb-3 text-3xl md:text-4xl font-bold">{product.titulo}</h1> {/* Ajustar tamaño del título */}
              <p className="text-base md:text-lg text-muted-foreground">
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
            <div className="text-sm text-muted-foreground space-y-2"> {/* Ajustar espaciado */}
              <p><strong>Clasificación:</strong> {product.clasificacionFuncionPrincipal}</p>
              <p><strong>Subcategoría:</strong> {product.subcategoriaPorPatologia}</p>
              <p><strong>Subtítulo:</strong> {product.subtitulo}</p>
              <p className="mt-3 md:mt-4">{product.textoDePresentacionCta}</p> {/* Ajustar margen */}
            </div>
 
            <div className="flex items-center gap-4">
              <span className="text-3xl md:text-4xl font-bold text-primary"> {/* Ajustar tamaño del precio */}
                {product.pvp}
              </span>
              <span className="text-sm md:text-base text-muted-foreground"> {/* Ajustar tamaño del stock */}
                {currentStock > 0 ? `${currentStock} disponibles` : "Sin stock"}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4"> {/* Ajustar flex para botones */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="h-10 w-10 text-lg"
                >
                  -
                </Button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span> {/* Ajustar tamaño del texto */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                  disabled={quantity >= currentStock}
                  className="h-10 w-10 text-lg"
                >
                  +
                </Button>
              </div>
              <Button
                className="flex-1 gap-2 text-base py-2"
                onClick={handleAddToCart}
                disabled={currentStock === 0}
              >
                <ShoppingCart className="h-5 w-5" />
                Añadir al carrito
              </Button>
            </div>
          </div>
        </div>

        {/* Productos Relacionados */}
        {relatedProducts.length > 0 && (
          <section className="mt-10 md:mt-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Productos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"> {/* Ajustar grid y gap */}
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer /> {/* Añadir el Footer aquí */}
    </div>
  );
};

export default ProductDetail;
