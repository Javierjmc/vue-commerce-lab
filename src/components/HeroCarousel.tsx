import { useState, useEffect } from "react";

interface HeroCarouselProps {
  images: string[];
  interval?: number; // Intervalo en milisegundos para cambiar de imagen, por defecto 5000ms
  children: React.ReactNode; // Contenido que se superpondrá al carrusel
}

const HeroCarousel = ({ images, interval = 5000, children }: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  if (!images || images.length === 0) {
    return null; // O un fallback, si no hay imágenes
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      <div className="absolute inset-0 bg-black/60" /> {/* Oscurecimiento */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {children}
      </div>
      {/* Indicadores de puntos */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            className={`
    h-3 w-3 rounded-full transition-all duration-300
    backdrop-blur-md border
    ${index === currentIndex
                ? "bg-white/90 border-white shadow-md scale-110"
                : "bg-white/20 border-white/10 hover:bg-white/30"
              }
  `}
            onClick={() => setCurrentIndex(index)}
          />

        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
