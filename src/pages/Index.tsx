import { Button } from "@/components/ui/button";
import { ShoppingCart, Truck, Shield, Heart } from "lucide-react";
import React from 'react';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedVideo } from '@cloudinary/react';
import Layout from "@/layouts/Layout";
import { Link } from "react-router-dom";
import { ListaProductos, ProductoNutricional } from "../lib/productos";
import ProductCard from "@/components/ProductCard";
import { productCombos } from "@/lib/combos"; // Importar los combos
import ComboCard from "@/components/ComboCard"; // Importar el componente ComboCard

const Index = () => {
  const products: ProductoNutricional[] = ListaProductos.filter(p => p.destacado);
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dax2r7ro2',
    },
  });
  const video = cld.video("1_axql3b"); // Usar el publicId del video

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[450px] md:h-[550px] flex items-center justify-center overflow-hidden"> {/* Ajustar altura del Hero */}
        <AdvancedVideo
          cldVid={video}
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <div className="relative z-20 container mx-auto px-4 text-center text-primary-foreground">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 animate-fade-in"> {/* Ajustar tamaño del título */}
              ¡Quema la Grasa y Controla tu Peso!
            </h1>
            <p className="text-lg md:text-2xl mb-6 md:mb-8 max-w-2xl mx-auto animate-fade-in"> {/* Ajustar tamaño y margen del párrafo */}
              Producto rico en fibra que mejora la salud
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
<Link to="/tienda">
  <Button
    className="
      relative px-16 py-4 md:px-24 md:py-6 text-xl md:text-2xl font-extrabold tracking-wide {/* Ajustar padding y texto */}
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
    <div className="flex items-center justify-center gap-3 md:gap-4 relative z-10"> {/* Ajustar gap */}
      <ShoppingCart className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-125 transition-transform duration-500" /> {/* Ajustar tamaño del icono */}
      <span className="drop-shadow-lg">Ver Productos</span>
    </div>
  </Button>
</Link>
       
            </div>
          </div>
        
      </section>

      

      {/* Features Banner */}
      <section className="bg-secondary py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center text-secondary-foreground"> {/* Ajustar gap */}
            <div className="flex items-center justify-center gap-2 md:gap-3"> {/* Ajustar gap */}
              <Truck className="w-7 h-7 md:w-8 md:h-8" /> {/* Ajustar tamaño del icono */}
              <span className="font-semibold text-base md:text-lg">ENVÍOS GRATIS</span> {/* Ajustar tamaño del texto */}
            </div>
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <Shield className="w-7 h-7 md:w-8 md:h-8" />
              <span className="font-semibold text-base md:text-lg">CALIDAD GARANTIZADA</span>
            </div>
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <Heart className="w-7 h-7 md:w-8 md:h-8" />
              <span className="font-semibold text-base md:text-lg">100% NATURAL</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-12 md:py-16 bg-gradient-card"> {/* Ajustar padding */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-12"> {/* Ajustar margen */}
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 md:mb-4"> {/* Ajustar tamaño del título */}
              PRODUCTOS DE ALTA CALIDAD QUE IMPACTAN VIDA
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"> {/* Ajustar tamaño del párrafo */}
              Transformamos tu bienestar con productos naturales respaldados por la ciencia
            </p>
          </div>

          {/* Featured Products */}
          <div className="mb-10 md:mb-12"> {/* Ajustar margen */}
            <div className="bg-primary text-primary-foreground text-center py-2 md:py-3 mb-6 md:mb-8 rounded-lg"> {/* Ajustar padding y margen */}
              <h3 className="text-xl md:text-2xl font-bold">DESTACADO DE TEMPORADA</h3> {/* Ajustar tamaño del título */}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8"> {/* Ajustar grid */}
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Combos Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-green-50 to-emerald-100"> {/* Ajustar padding */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16"> {/* Ajustar margen */}
            <h2 className="text-4xl md:text-6xl font-extrabold text-primary mb-4 md:mb-6 leading-tight"> {/* Ajustar tamaño del título */}
              Ofertas Exclusivas en Combos
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"> {/* Ajustar tamaño del párrafo */}
              Descubre nuestras combinaciones perfectas para un bienestar completo a precios irresistibles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 max-w-6xl mx-auto"> {/* Ajustar grid */}
            {productCombos.map((combo) => (
              <ComboCard key={combo.id} combo={combo} />
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground"> {/* Ajustar padding */}
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6"> {/* Ajustar tamaño del título */}
            ¿Listo para transformar tu salud?
          </h2>
          <p className="text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto"> {/* Ajustar tamaño y margen del párrafo */}
            Únete a miles de personas que ya están viviendo mejor con nuestros productos naturales
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow py-3 px-8 text-lg"> {/* Ajustar padding y texto */}
            Comenzar Ahora
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;