import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Truck, Shield, Heart } from "lucide-react";
import heroImage from "@/assets/hero-wellness.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import Layout from "@/layouts/Layout";
import { Link } from "react-router-dom";

const Index = () => {
  const products = [
    {
      id: 1,
      name: "Vitamina C 1000mg",
      image: product1,
      price: "$24.99",
      originalPrice: "$29.99",
      rating: 4.8,
      reviews: 256,
      badge: "OFERTA",
    },
    {
      id: 2,
      name: "Extracto Herbal",
      image: product2,
      price: "$18.99",
      rating: 4.9,
      reviews: 189,
      badge: "NUEVO",
    },
    {
      id: 3,
      name: "Fibra Orgánica",
      image: product3,
      price: "$21.99",
      originalPrice: "$26.99",
      rating: 4.7,
      reviews: 312,
      badge: "PACK",
    },
    {
      id: 4,
      name: "Fibra Orgánica",
      image: product3,
      price: "$21.99",
      originalPrice: "$26.99",
      rating: 4.7,
      reviews: 312,
      badge: "PACK",
    },
    {
      id: 5,
      name: "Fibra Orgánica",
      image: product3,
      price: "$21.99",
      originalPrice: "$26.99",
      rating: 4.7,
      reviews: 312,
      badge: "PACK",
    }, 
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            ¿Quema la Grasa y Controla tu Peso!
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in">
            Producto rico en fibra que mejora la salud
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/tienda">
            <Button
                className="
                relative px-20 py-6 text-2xl font-bold 
                bg-gradient-to-r from-[#09573c] via-[#4fac05] to-[#2e901f] 
                text-white shadow-lg shadow-[#4fac05]/50
                overflow-hidden transition-all duration-500 
                hover:scale-105 hover:shadow-2xl hover:brightness-110
                group
                "
            >
                {/* Overlay animado */}
                <span className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                
                {/* Contenido */}
                <div className="flex items-center justify-center gap-3 relative z-10">
                <ShoppingCart className="w-6 h-6 animate-bounce" />
                Ver Productos
                </div>
            </Button>
            </Link>       
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="bg-secondary py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-secondary-foreground">
            <div className="flex items-center justify-center gap-3">
              <Truck className="w-8 h-8" />
              <span className="font-semibold text-lg">ENVÍOS GRATIS</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Shield className="w-8 h-8" />
              <span className="font-semibold text-lg">CALIDAD GARANTIZADA</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Heart className="w-8 h-8" />
              <span className="font-semibold text-lg">100% NATURAL</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
              PRODUCTOS DE ALTA CALIDAD QUE IMPACTAN VIDA
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transformamos tu bienestar con productos naturales respaldados por la ciencia
            </p>
          </div>

          {/* Featured Products */}
          <div className="mb-12">
            <div className="bg-primary text-primary-foreground text-center py-3 mb-8 rounded-lg">
              <h3 className="text-2xl font-bold">DESTACADO DE TEMPORADA</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden bg-white hover:shadow-hover transition-all duration-300 hover:scale-105 bg-card shadow-card">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground">
                      {product.badge}
                    </Badge>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-card-foreground">{product.name}</h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "fill-accent text-accent"
                                : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-primary">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-md">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      COMPRAR
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para transformar tu salud?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a miles de personas que ya están viviendo mejor con nuestros productos naturales
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow">
            Comenzar Ahora
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;