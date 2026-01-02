import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

// Images
import bannerRegalo from '@/assets/2.png';
import bannerNovedades from '@/assets/3.png';
import bannerCalidez from '@/assets/4.png';
import bannerAnoNuevo from '@/assets/bg-hero-5.jpg';
import bannerProductosNaturdix from '@/assets/bg-hero-6.png';

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

const slides: Slide[] = [  
  { id: 1, type: 'image', src: bannerAnoNuevo, alt: 'Regalos especiales', overlay: { cta: { text: 'Descargar Agenda', href: '/tienda' } } },
  { id: 2, type: 'image', src: bannerProductosNaturdix, alt: 'Nuevas novedades', overlay: { cta: { text: 'Explorar Productos', href: 'https://recursos-gtc.vercel.app/assets/_Agenda%20Vitasfera%202026.pdf' } } },

];

const HeroCarouselVip: React.FC<HeroCarouselProps> = ({ videoComponent, className }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', () => setSelectedIndex(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <section
      className={cn('relative w-full overflow-hidden', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* CAROUSEL */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="
                relative flex-[0_0_100%]
                aspect-[13/4]
                min-h-[320px]
                md:min-h-[400px]
                lg:min-h-[550px]
              "
            >
              {/* VIDEO SLIDE */}
              {slide.type === 'video' && videoComponent ? (
                <>
                  <div className="absolute inset-0">{videoComponent}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                  <div className="relative z-10 h-full flex items-center">
                    <div className="container mx-auto px-6 text-center">
                      <h1 className="text-4xl md:text-6xl font-black text-white">
                        {slide.overlay?.title}
                      </h1>
                      <h1 className="text-4xl md:text-6xl font-black bg-white bg-clip-text text-transparent mb-4">
                        {slide.overlay?.titleHighlight}
                      </h1>
                      <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl mx-auto">
                        {slide.overlay?.subtitle}
                      </p>

                      {slide.overlay?.cta && (
                        <a
                          href={slide.overlay.cta.href}
                          className="
                            px-8 py-4 rounded-2xl text-white font-bold
                            bg-gradient-to-r from-primary/80 to-primary
                            hover:scale-105 transition-transform
                          "
                        >
                          <ShoppingBag className="inline w-5 h-5 mr-2" />
                          {slide.overlay.cta.text}
                        </a>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                /* IMAGE SLIDE */
                <div className="absolute inset-0 overflow-hidden">
                  {/* BLUR BACKGROUND */}
                  <img
                    src={slide.src}
                    aria-hidden
                    className="
                      absolute inset-0 w-full h-full
                      object-cover
                      scale-110
                      blur-2xl
                      opacity-40
                    "
                  />

                  {/* MAIN IMAGE */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      className="w-full h-full object-cover max-w-[1400px]"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />

                    {/* BUTTON OVER IMAGE */}
                    {slide.overlay?.cta && (
                      <div className="absolute bottom-8 w-full flex justify-center z-20">
                        <a
                          href={slide.overlay.cta.href}
                          className="
                            px-8 py-4 rounded-2xl text-white font-bold
                            bg-gradient-to-r from-primary/70 to-primary
                            hover:scale-105 transition-transform
                          "
                        >
                          <ShoppingBag className="inline w-5 h-5 mr-2" />
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

      {/* NAVIGATION */}
      <button
        onClick={scrollPrev}
        className={cn(
          'absolute left-6 top-1/2 -translate-y-1/2 z-20',
          'w-12 h-12 rounded-xl glass text-white flex items-center justify-center',
          'transition-opacity',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
      >
        <ChevronLeft />
      </button>

      <button
        onClick={scrollNext}
        className={cn(
          'absolute right-6 top-1/2 -translate-y-1/2 z-20',
          'w-12 h-12 rounded-xl glass text-white flex items-center justify-center',
          'transition-opacity',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
      >
        <ChevronRight />
      </button>

      {/* INDICATORS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={cn(
              'w-2 h-2 rounded-full transition-all',
              selectedIndex === i ? 'bg-white scale-100' : 'bg-white/40 scale-75'
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarouselVip;
