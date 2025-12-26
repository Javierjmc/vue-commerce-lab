import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare, Users, Award, ArrowLeft, ArrowRight } from "lucide-react";
import testimonialHero from "@/assets/testimonial-hero.jpg";
import Layout from "@/layouts/Layout";
import { testimoniosVitasfera, Testimonio } from "@/lib/testimonios"; // Importar testimoniosVitasfera y el tipo Testimonio
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"; // Importar componentes del carrusel
import HeroSection from "@/components/testimonials/HeroSection";
import FeaturedTestimonials from "@/components/testimonials/FeaturedTestimonials";
import ShareStorySection from "@/components/testimonials/ShareStorySection";

const Testimonios = () => {
  const testimonials: Testimonio[] = testimoniosVitasfera; // Usar el array importado

  const stats = [
    { icon: Users, value: "5,000+", label: "Clientes Satisfechos" },
    { icon: Star, value: "4.9/5", label: "Calificación Promedio" },
    { icon: Award, value: "15+", label: "Años de Experiencia" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${testimonialHero})` }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Historias de Transformación
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in">
            Descubre cómo nuestros clientes han cambiado sus vidas
          </p>
        </div>
      </section>

      <HeroSection />
      <FeaturedTestimonials />
      <ShareStorySection />



      

      {/* Community Section */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground text-center py-4 mb-12 rounded-lg">
            <h2 className="text-3xl font-bold">NUESTRA COMUNIDAD</h2>
            <p className="text-lg mt-2">Miles de personas transformando sus vidas cada día</p>
          </div>

          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <Card className="p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-card shadow-xl rounded-xl border-t-4 border-primary max-h-[300px] flex flex-col">
                    <div className="flex items-start gap-4 mb-4">
                      {testimonial.imagenAutor && (
                        <img
                          src={testimonial.imagenAutor}
                          alt={testimonial.autor}
                          className="w-16 h-16 rounded-full object-cover ring-2 ring-primary ring-offset-2"
                        />
                      )}
                      <div>
                        <h3 className="font-bold text-xl text-primary tracking-tight">{testimonial.autor}</h3>
                        <p className="text-sm text-gray-500">{testimonial.tipoAutor} {testimonial.fecha && `• ${testimonial.fecha}`}</p>
                        <div className="flex mt-1">
                          {[...Array(testimonial.calificacion)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-lg text-gray-700 leading-relaxed italic flex-grow mb-4 overflow-y-auto">"{testimonial.texto}"</p>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
              ¿Sabías Que...?
            </h2>
            <p className="text-lg text-muted-foreground">
              Estos son algunos de los logros de nuestra increíble comunidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-black">
            <Card className="p-8 bg-gray-200 shadow-hover">
              <h3 className="text-2xl font-bold mb-4">Transformaciones Reales</h3>
              <ul className="space-y-3 text-lg">
                <li>✓ Más de 3,000 kg de peso saludable perdidos</li>
                <li>✓ 95% de clientes logran sus objetivos</li>
                <li>✓ Mejora promedio del 80% en energía diaria</li>
              </ul>
            </Card>

            <Card className="p-8 bg-accent text-accent-foreground shadow-hover">
              <h3 className="text-2xl font-bold mb-4">Compromiso con la Salud</h3>
              <ul className="space-y-3 text-lg">                
                <li>✓ Seguimiento personalizado incluido</li>
                <li>✓ Garantía de satisfacción total</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Testimonios;