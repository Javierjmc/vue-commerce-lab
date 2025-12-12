import VideoTestimonial from "./VideoTestimonial";
import TestimonialCard from "./TestimonialCard";

const videoTestimonials = [
  {
    thumbnail: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=400&fit=crop",
    name: "Ana María",
    title: "Mi camino hacia el bienestar digestivo",
    duration: "2:45",
  },
  {
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
    name: "Carmen Rodríguez",
    title: "Recuperé mi energía después de años",
    duration: "3:12",
  },
];

const textTestimonials = [
  {
    name: "Laura Martínez",
    location: "Madrid, España",
    story: "Después de años luchando con problemas digestivos, encontré en Vitasfera la solución natural que buscaba. Los productos no solo mejoraron mi digestión, sino que también me dieron una energía que no había sentido en años. ¡Gracias por cambiar mi vida!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    transformation: "Mejor digestión",
  },
  {
    name: "Roberto González",
    location: "Barcelona, España",
    story: "Soy deportista amateur y buscaba algo natural para mejorar mi rendimiento. Los suplementos de Vitasfera me han ayudado a recuperarme mejor después del ejercicio y a mantener mi sistema inmune fuerte durante todo el año.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    transformation: "Más energía",
  },
  {
    name: "Elena Pérez",
    location: "Valencia, España",
    story: "Como madre de tres hijos, el estrés y el cansancio eran mis compañeros diarios. Desde que incorporé los productos de Vitasfera a mi rutina, duermo mejor, tengo más paciencia y mi piel luce más radiante. Mi familia también ha notado el cambio.",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop",
    transformation: "Mejor sueño",
  },
  {
    name: "Miguel Ángel Ruiz",
    location: "Sevilla, España",
    story: "A mis 60 años pensaba que ya no había solución para mis dolores articulares. Los productos naturales de Vitasfera me han dado una nueva oportunidad. Ahora puedo jugar con mis nietos sin limitaciones.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    transformation: "Más movilidad",
  },
];

const FeaturedTestimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-background border-t-0">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-sm font-semibold rounded-full mb-4">
            Testimonios Destacados
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Historias que inspiran
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conoce las experiencias de personas reales que han transformado su vida 
            con la medicina natural de Vitasfera.
          </p>
        </div>

        {/* Video testimonials */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {videoTestimonials.map((video, index) => (
            <div 
              key={index} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <VideoTestimonial {...video} />
            </div>
          ))}
        </div>

        {/* Text testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {textTestimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTestimonials;
