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
    name: "Yolanda Plaza",
    location: "Madrid, España",
    story: "El trato siempre es muy bueno, se nota que tienen conocimiento sobre los productos que venden y sobre sus efectos en la salud, siempre te atienden con una sonrisa y son muy amables. Tuve que descambiar un producto y no me pusieron ningún problema, es más me asesoraron más sobre los otros productos. Tiene alimentación ecológica, miel, tes, huevos... Pocos herbolarios cuenta con tanta variedad lo cual se agradece, así como el asesoramiento y el trato. Y dispone de grandes marcas de vitaminas.",
    image: "https://lh3.googleusercontent.com/a/ACg8ocIvLIGwas8rlpAjAjDyDsNtiPjip44G7FrwFI8R5Fbu2S7TDQ=w72-h72-p-rp-mo-ba5-br100",
    transformation: "Mejor digestión",
  },
  {
    name: "ALCALA DE HENARES NOMASVELLO DEPILACIÓN",
    location: "Barcelona, España",
    story: "Encantada siempre de la atención y consejos recibidos y de poder aclarar cualquier duda. Siempre con gran variedad de productos. Muy buen trato y cercanía.",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjW9bPR3pulMd8Njo2e-L3UudTpFFa0zDVcDDFzqmSsWgIxpydj7=w72-h72-p-rp-mo-br100",
    transformation: "Más energía",
  },
  {
    name: "Diana Calabuig",
    location: "Valencia, España",
    story: "El mejor de Alcalá, lo recomiendo, buena atención, buen asesoramiento, quien nos a atendido un encanto. UN DIEZ",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjX1-VEIZZs_W7IzoafmAD9aEs0bdkNrSX3d71WRN1RSPN9emE-4=w72-h72-p-rp-mo-ba3-br100",
    transformation: "Mejor sueño",
  },
  {
    name: "Ivan Causapie",
    location: "Sevilla, España",
    story: "Solo decir gracias, desde la atención vía whatsapp a la presencial de 10, rápidas, atentas , un trato excelente, si buscas servicio, calidad precio, no lo dudes.",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjVgFR1b_C1ezqPeEiOEpwnHX7Ec349sh1TG4fS8pSqpOxiW6C8N=w72-h72-p-rp-mo-ba4-br100",
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
