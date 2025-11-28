import React from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/layouts/Layout";
import { productCombos } from "@/lib/combos";
import { ListaProductos } from "@/lib/productos";
import ProductCard from "@/components/ProductCard";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ComboDetail = () => {
  const { id } = useParams<{ id: string }>();
  const combo = productCombos.find((c) => c.id === id);

  if (!combo) {
    return (
      <Layout>
        <section className="py-20 text-center bg-gray-50">
          <h1 className="text-4xl font-bold text-red-600">Combo no encontrado</h1>
          <p className="mt-4 text-lg text-gray-700">Lo sentimos, el combo que buscas no existe.</p>
          <Link to="/tienda" className="mt-8 inline-block">
            <Button className="bg-primary hover:bg-green-700 text-white">
              Volver a la Tienda
            </Button>
          </Link>
        </section>
      </Layout>
    );
  }

  const productsInCombo = ListaProductos.filter(product => combo.productsIncludedIds.includes(product.id));

  return (
    <Layout>
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <Link to="/" className="flex items-center text-primary hover:text-green-700 transition-colors duration-200">
              <ChevronLeft className="w-5 h-5 mr-2" />
              <span className="text-lg font-medium">Volver al inicio</span>
            </Link>
          </div>

          <Card className="rounded-3xl shadow-xl p-8 bg-white border border-gray-200 mb-12">
            <CardHeader className="text-center">
              <CardTitle className="text-5xl md:text-6xl font-extrabold text-primary mb-4 leading-tight">
                {combo.name}
              </CardTitle>
              <p className="text-xl text-muted-foreground italic mb-6">{combo.tagline}</p>
              
              <div className="mb-8">
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-full max-w-lg mx-auto"
                >
                  <CarouselContent>
                    {productsInCombo.map((product, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 flex justify-center">
                        <ProductCard product={product} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-gray-800 leading-relaxed mb-8">
                {combo.description}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <span className="text-gray-500 line-through text-2xl">Precio Original: {combo.originalPrice}</span>
                <span className="text-5xl font-extrabold text-red-600">Precio Combo: {combo.comboPrice}</span>
              </div>
              <Button className="py-4 px-8 text-xl font-bold
                bg-gradient-to-br from-[#0a5a3f] via-[#48ad08] to-[#2c8e1e]
                text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300
                hover:scale-[1.01] active:scale-[0.99] transform"
              >
                Añadir Combo al Carrito
              </Button>
            </CardContent>
          </Card>

          <h2 className="text-4xl font-extrabold text-primary text-center mb-10 mt-16">
            Productos Incluidos en este Combo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productsInCombo.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ComboDetail;
