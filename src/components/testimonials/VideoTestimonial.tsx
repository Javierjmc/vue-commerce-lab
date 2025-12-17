import { Play } from "lucide-react";
import { useState } from "react";

interface VideoTestimonialProps {
  thumbnail: string;
  name: string;
  title: string;
  duration: string;
}

const VideoTestimonial = ({ thumbnail, name, title, duration }: VideoTestimonialProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article 
      className="video-testimonial group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={thumbnail}
        alt={`Video testimonio de ${name}`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
      
      {/* Play button */}
      <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center shadow-lg animate-pulse-soft">
          <Play className="w-7 h-7 text-secondary-foreground ml-1" fill="currentColor" />
        </div>
      </div>
      
      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-primary-foreground font-bold text-lg">{name}</p>
        <p className="text-primary-foreground/80 text-sm">{title}</p>
        <span className="inline-block mt-2 px-2 py-1 bg-accent/90 text-accent-foreground text-xs font-medium rounded">
          {duration}
        </span>
      </div>
    </article>
  );
};

export default VideoTestimonial;
