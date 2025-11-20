import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare, Users, Award } from "lucide-react";
import testimonialHero from "@/assets/testimonial-hero.jpg";
import Layout from "@/layouts/Layout";

const Testimonios = () => {
  const testimonials = [
    {
      name: "Ana Martínez",
      location: "Madrid",
      text: "Increíble transformación en solo 3 meses. Los productos son de excelente calidad y el seguimiento personalizado marcó la diferencia.",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    },
    {
      name: "Carlos Ruiz",
      location: "Barcelona",
      text: "Después de probar muchos productos, finalmente encontré lo que funcionó para mí. El equipo es muy profesional y atento.",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    {
      name: "Laura Gómez",
      location: "Valencia",
      text: "No solo perdí peso, también gané energía y bienestar. Los suplementos son 100% naturales y se nota la calidad.",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laura",
    },
    {
      name: "Roberto Silva",
      location: "Sevilla",
      text: "El coaching personalizado fue clave. Me enseñaron a cambiar mis hábitos de forma sostenible. Totalmente recomendado.",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
    },
    {
      name: "Isabel Torres",
      location: "Bilbao",
      text: "Llevo 6 meses usando los productos y no puedo estar más feliz. Mi salud ha mejorado notablemente.",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabel",
    },
    {
      name: "Javier López",
      location: "Málaga",
      text: "El mejor cambio que he hecho en mi vida. Sandra y su equipo son increíbles, siempre dispuestos a ayudar.",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Javier",
    },
  ];

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

      {/* Stats Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-secondary-foreground">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-accent-foreground" />
                </div>
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Community Section */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground text-center py-4 mb-12 rounded-lg">
            <h2 className="text-3xl font-bold">NUESTRA COMUNIDAD</h2>
            <p className="text-lg mt-2">Miles de personas transformando sus vidas cada día</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-hover transition-all duration-300 hover:scale-105 bg-card shadow-card">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full bg-muted"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-card-foreground">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                
                <p className="text-muted-foreground leading-relaxed">"{testimonial.text}"</p>
              </Card>
            ))}
          </div>
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
                <li>✓ 100% productos naturales certificados</li>
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