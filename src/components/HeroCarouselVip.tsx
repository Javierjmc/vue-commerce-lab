import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, ShoppingBag, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import banner images
import bannerRegalo from '@/assets/2.png';
import bannerNovedades from '@/assets/3.png';
import bannerCalidez from '@/assets/4.png';

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

const defaultSlides: Slide[] = [
  {
    id: 1,
    type: 'video',
    src: '',
    overlay: {
      title: '¡Quema la Grasa y',
      titleHighlight: 'Controla tu Peso!',
      subtitle: 'Productos naturales ricos en fibra que transforman tu bienestar',
      cta: {
        text: 'Explorar Productos',
        href: '/tienda',
      },
    },
  },
  {
    id: 2,
    type: 'image',
    src: bannerRegalo,
    alt: 'Haz un regalo que perdure - 50% de descuento',
  },
  {
    id: 3,
    type: 'image',
    src: bannerNovedades,
    alt: 'Traemos más novedades para ti',
  },
  {
    id: 4,
    type: 'image',
    src: bannerCalidez,
    alt: 'Regala calidez - Sacos térmicos',
  },
];

const HeroCarouselVip: React.FC<HeroCarouselProps> = ({ 
  videoComponent, 
  className 
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 40 },
    [Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();
    
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section 
      className={cn("relative w-full overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
        {/* Top gradient fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/20 to-transparent" />
        
        {/* Corner decorations */}
        <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-white/20 rounded-tl-3xl" />
        <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-white/20 rounded-tr-3xl" />
        <div className="absolute bottom-20 left-8 w-24 h-24 border-l-2 border-b-2 border-white/20 rounded-bl-3xl" />
        <div className="absolute bottom-20 right-8 w-24 h-24 border-r-2 border-b-2 border-white/20 rounded-br-3xl" />
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-secondary/20 to-transparent blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-[10%] w-80 h-80 rounded-full bg-gradient-to-br from-accent/15 to-transparent blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Main Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {defaultSlides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative flex-[0_0_100%] min-w-0 h-[400px] md:h-[500px]"
            >
              {slide.type === 'video' && videoComponent ? (
                <>
                  {/* Video Slide with Ken Burns */}
                  <div className={cn(
                    "absolute inset-0 w-full h-full",
                    selectedIndex === index && "animate-ken-burns"
                  )}>
                    {videoComponent}
                  </div>
                  
                  {/* Sophisticated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-secondary/20 z-10" />
                  
                  {/* Radial glow effect */}
                  <div className="absolute inset-0 bg-gradient-radial-glow z-10" />
                  
                  {/* Video Overlay Content */}
                  {slide.overlay && (
                    <div className="relative z-20 h-full flex items-center justify-center">
                      <div className="container mx-auto px-4 text-center">
                        {/* Animated badge */}
                        <div 
                          className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass border-white/20 text-white/90 text-sm font-medium animate-slide-up-fade"
                          style={{ animationDelay: '0.1s' }}
                        >
                          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                          Productos 100% Naturales
                        </div>
                        
                        {/* Title with gradient and reveal animation */}
                        {slide.overlay.title && (
                          <div className="overflow-hidden mb-2">
                            <h1 
                              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight animate-text-reveal"
                              style={{ animationDelay: '0.2s' }}
                            >
                              {slide.overlay.title}
                            </h1>
                          </div>
                        )}
                        
                        {slide.overlay.titleHighlight && (
                          <div className="overflow-hidden mb-6">
                            <h1 
                              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-accent via-secondary to-accent bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent animate-text-reveal"
                              style={{ animationDelay: '0.4s' }}
                            >
                              {slide.overlay.titleHighlight}
                            </h1>
                          </div>
                        )}
                        
                        {/* Subtitle with glass effect */}
                        {slide.overlay.subtitle && (
                          <div 
                            className="animate-slide-up-fade"
                            style={{ animationDelay: '0.6s' }}
                          >
                            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                              {slide.overlay.subtitle}
                            </p>
                          </div>
                        )}
                        
                        {/* CTA Button Group */}
                        {slide.overlay.cta && (
                          <div 
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up-fade"
                            style={{ animationDelay: '0.8s' }}
                          >
                            {/* Primary CTA */}
                            <a 
                              href={slide.overlay.cta.href}
                              className="group relative inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-lg md:text-xl overflow-hidden transition-all duration-500 hover:scale-105"
                            >
                              {/* Button background with animated gradient */}
                              <div className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-secondary bg-[length:200%_auto] animate-gradient-shift rounded-2xl" />
                              
                              {/* Glow effect */}
                              <div className="absolute inset-0 rounded-2xl animate-glow-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                              
                              {/* Shine effect */}
                              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                                <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-1000 ease-out" />
                              </div>
                              
                              {/* Button content */}
                              <div className="relative z-10 flex items-center gap-3 text-white">
                                <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300" />
                                <span className="drop-shadow-lg">{slide.overlay.cta.text}</span>
                              </div>
                            </a>
                            
                            {/* Secondary CTA */}
                            <button className="group inline-flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold text-white/90 glass hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40">
                              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                              </div>
                              <span>Ver Video</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Image Slide with Ken Burns effect */
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={slide.src}
                    alt={slide.alt || ''}
                    className={cn(
                      "w-full h-full object-cover object-center transition-transform duration-[20000ms] ease-out",
                      selectedIndex === index && "scale-110"
                    )}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Modern Design */}
      <button
        onClick={scrollPrev}
        className={cn(
          "absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30",
          "w-12 h-12 md:w-14 md:h-14 rounded-2xl",
          "glass border border-white/20",
          "flex items-center justify-center",
          "text-white hover:bg-white/20 hover:border-white/40",
          "transition-all duration-300 hover:scale-110",
          "opacity-0 group-hover:opacity-100",
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
        )}
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
      </button>
      
      <button
        onClick={scrollNext}
        className={cn(
          "absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30",
          "w-12 h-12 md:w-14 md:h-14 rounded-2xl",
          "glass border border-white/20",
          "flex items-center justify-center",
          "text-white hover:bg-white/20 hover:border-white/40",
          "transition-all duration-300 hover:scale-110",
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        )}
        aria-label="Siguiente"
      >
        <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
      </button>

      {/* Premium Indicator System */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
        <div className="flex items-center gap-6 px-6 py-3 rounded-full glass border border-white/20">
          {/* Slide counter */}
          <div className="text-white/80 text-sm font-medium tabular-nums">
            <span className="text-white font-bold">{String(selectedIndex + 1).padStart(2, '0')}</span>
            <span className="mx-1">/</span>
            <span>{String(scrollSnaps.length).padStart(2, '0')}</span>
          </div>
          
          {/* Separator */}
          <div className="w-px h-4 bg-white/30" />
          
          {/* Animated dots */}
          <div className="flex gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className="relative group p-1"
                aria-label={`Ir a slide ${index + 1}`}
              >
                <div className={cn(
                  "w-2 h-2 rounded-full transition-all duration-500",
                  selectedIndex === index
                    ? "bg-white scale-100"
                    : "bg-white/40 scale-75 group-hover:scale-100 group-hover:bg-white/70"
                )} />
                
                {/* Active indicator ring */}
                {selectedIndex === index && (
                  <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Elegant Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-secondary via-accent to-secondary bg-[length:200%_auto] animate-gradient-shift transition-all duration-500 ease-out"
          style={{ width: `${((selectedIndex + 1) / scrollSnaps.length) * 100}%` }}
        />
        {/* Shimmer effect on progress */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/4 animate-shimmer" />
      </div>

      {/* Side gradient accents */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black/30 to-transparent pointer-events-none z-20" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black/30 to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default HeroCarouselVip;