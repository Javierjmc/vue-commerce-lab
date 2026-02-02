import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

// Tipado de las slides
interface Slide {
  id: number;
  type: 'video' | 'image';
  src: string;
  alt?: string;
  overlay?: {
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
    cta?: {
      text: string;
      href: string;
    };
  };
}

interface HeroCarouselProps {
  videoComponent?: React.ReactNode;
  className?: string;
}

// Datos de las slides (Podrías mover esto a un archivo de constantes)
import bannerRegalo from '@/assets/2.png';
import bannerProductosNaturdix from '@/assets/bg-hero-6.png';

const slides: Slide[] = [  
  { 
    id: 1, 
    type: 'video', 
    src: "", 
    alt: 'Regalos especiales para ti', 
    overlay: { 
      cta: { text: 'Descargar Agenda', href: 'https://recursos-gtc.vercel.app/assets/_Agenda%20Vitasfera%202026.pdf' } 
    } 
  },
  { 
    id: 2, 
    type: 'image', 
    src: bannerProductosNaturdix, 
    alt: 'Nuevos productos Naturdix', 
    overlay: { 
      cta: { text: 'Explorar Productos', href: '/tienda' } 
    } 
  },
];

const HeroCarouselVip: React.FC<HeroCarouselProps> = ({ videoComponent, className }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, skipSnaps: false },
    [Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section 
      className={cn('relative w-full overflow-hidden group', className)}
      aria-label="Hero Carousel"
    >
      {/* CONTENEDOR EMBLA */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative flex-[0_0_100%] min-w-0 w-full min-h-[350px] md:min-h-[450px] lg:min-h-[550px]"
            >
              {/* VIDEO SLIDE */}
              {slide.type === 'video' && videoComponent ? (
                <div className="absolute inset-0 w-full h-full">
                  <div className="absolute inset-0 z-0">{videoComponent}</div>
                  <div className="absolute inset-0 bg-black/30 z-10" />
                  
                  <div className="relative z-20 h-full flex items-center justify-center text-center px-6">
                    <div className="max-w-4xl">
                      <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                        {slide.overlay?.title} <br />
                        <span className="text-primary-foreground">{slide.overlay?.titleHighlight}</span>
                      </h2>
                      <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                        {slide.overlay?.subtitle}
                      </p>
                      {slide.overlay?.cta && (
                        <div className="mt-8">
                           <a
                            href={slide.overlay.cta.href}
                            className="inline-flex items-center px-8 py-4 rounded-xl text-white font-bold bg-primary hover:bg-primary/90 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                          >
                            <ShoppingBag className="w-5 h-5 mr-2" />
                            {slide.overlay.cta.text}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* IMAGE SLIDE */
                <div className="absolute inset-0 w-full h-full">
                  {/* Fondo difuminado para evitar bordes vacíos en pantallas ultra-anchas */}
                  <img
                    src={slide.src}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-30"
                    aria-hidden="true"
                  />
                  
                  {/* Imagen Principal */}
                  <div className="relative h-full w-full flex items-center justify-center">
                    <img
                      src={slide.src}
                      alt={slide.alt || 'Banner imagen'}
                      className="w-full h-full object-cover"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />

                    {/* Botón sobre la imagen */}
                    {slide.overlay?.cta && (
                      <div className="absolute bottom-10 left-0 w-full flex justify-center px-4">
                        <a
                          href={slide.overlay.cta.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-10 py-4 rounded-full text-white font-bold bg-gradient-to-r from-primary to-emerald-500 hover:from-primary hover:to-emerald-400 transition-all shadow-lg shadow-white transform hover:-translate-y-1"
                        >
                          <ShoppingBag className="w-5 h-5 mr-2" />
                          {slide.overlay.cta.text}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* NAVEGACIÓN (Solo visible en Hover en desktop) */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/80 hover:bg-white text-emerald-900 flex items-center justify-center shadow-md transition-opacity opacity-0 group-hover:opacity-100 hidden md:flex"
        aria-label="Anterior slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/80 hover:bg-white text-emerald-900 flex items-center justify-center shadow-md transition-opacity opacity-0 group-hover:opacity-100 hidden md:flex"
        aria-label="Siguiente slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* INDICADORES (Dots) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={cn(
              'h-2.5 rounded-full transition-all duration-300',
              selectedIndex === i ? 'bg-white w-8' : 'bg-white/50 w-2.5 hover:bg-white/80'
            )}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarouselVip;