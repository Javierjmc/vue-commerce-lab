import { Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  location: string;
  story: string;
  image: string;
  transformation: string;
}

const TestimonialCard = ({ name, location, story, image, transformation }: TestimonialCardProps) => {
  return (
    <article className="testimonial-card group relative overflow-hidden">
      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote className="w-16 h-16 text-secondary" />
      </div>
      
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <img
            src={image}
            alt={`Foto de ${name}`}
            className="w-16 h-16 rounded-full object-cover border-3 border-secondary"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
            <span className="text-accent-foreground text-xs">✓</span>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{location}</p>
          <span className="inline-block mt-1 px-2 py-0.5 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
            {transformation}
          </span>
        </div>
      </div>
      
      <p className="text-foreground/80 leading-relaxed text-sm">
        "{story}"
      </p>
    </article>
  );
};

export default TestimonialCard;
