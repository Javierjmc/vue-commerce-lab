import { Button } from "@/components/ui/button";
import { ShoppingCart, Truck, Shield, Heart } from "lucide-react";
// import heroImage from "@/assets/hero-wellness.jpg";
import bgHeroUno from "@/assets/bg-hero-1.jpg";
import bgHeroDos from "@/assets/bg-hero-2.png";
import bgHeroTres from "@/assets/bg-hero-3.jpg"
import bgHeroCuatro from "@/assets/bg-hero-4.png"
import Layout from "@/layouts/Layout";
import { Link } from "react-router-dom";
import { ListaProductos, ProductoNutricional } from "../lib/productos";
import ProductCard from "@/components/ProductCard";
import HeroCarousel from "@/components/HeroCarousel";
import { productCombos } from "@/lib/combos"; // Importar los combos
import ComboCard from "@/components/ComboCard"; // Importar el componente ComboCard

const Index = () => {
  const products: ProductoNutricional[] = ListaProductos.filter(p => p.destacado);
  const carouselImages = [bgHeroUno, bgHeroDos, bgHeroTres, bgHeroCuatro];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <HeroCarousel images={carouselImages}>
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
      relative px-24 py-6 text-2xl font-extrabold tracking-wide
      rounded-2xl overflow-hidden
      bg-gradient-to-br from-[#0a5a3f] via-[#48ad08] to-[#2c8e1e]
      shadow-xl shadow-[#48ad08]/40
      transition-all duration-500 
      hover:scale-110 hover:shadow-3xl hover:shadow-[#48ad08]/60
      hover:brightness-110 hover:-translate-y-1
      group border border-white/10
    "
  >
    {/* Glow exterior animado */}
    <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent opacity-20 blur-xl group-hover:opacity-30 transition-all duration-500" />

    {/* Glow lineal borde interno */}
    <span className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/40 transition-all duration-500" />

    {/* Shine animado diagonal */}
    <span className="absolute top-0 left-[-150%] h-full w-1/2 bg-white/20 rotate-12 group-hover:translate-x-[350%] transition-transform duration-700 ease-out" />

    {/* Contenido */}
    <div className="flex items-center justify-center gap-4 relative z-10">
      <ShoppingCart className="w-7 h-7 group-hover:scale-125 transition-transform duration-500" />
      <span className="drop-shadow-lg">Ver Productos</span>
    </div>
  </Button>
</Link>
       
            </div>
          </div>
        </HeroCarousel>
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
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Combos Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold text-primary mb-6 leading-tight">
              Ofertas Exclusivas en Combos
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Descubre nuestras combinaciones perfectas para un bienestar completo a precios irresistibles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {productCombos.map((combo) => (
              <ComboCard key={combo.id} combo={combo} />
            ))}
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