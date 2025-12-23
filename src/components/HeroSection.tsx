import { useEffect, useState } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background gradient base */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Botanical pattern overlay */}
      <div className="absolute inset-0 pattern-botanical opacity-30" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent/10 blur-3xl animate-float" />
      <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-primary/10 blur-3xl animate-float delay-300" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-gold/10 blur-2xl animate-float delay-500" />
      
      <div className="relative z-10 container max-w-6xl mx-auto px-4 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 min-h-[calc(100vh-6rem)]">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            {/* Anniversary badge */}
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-sm font-semibold text-primary-foreground tracking-wide">
                15 años transformando vidas
              </span>
            </div>

            {/* Main title */}
            <h1 
              className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground mb-6 leading-tight shadow-hero-text transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="block">Nuestra</span>
              <span className="text-gradient-green">Historia</span>
            </h1>

            {/* Story text */}
            <div 
              className={`space-y-4 text-base md:text-lg text-primary-foreground/90 max-w-xl mx-auto lg:mx-0 leading-relaxed transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p>
                <span className="text-gold font-semibold">Vitasfera</span> nació en 2010. 
                Después de años, entendimos que no solo vendemos productos, sino que sembramos la{' '}
                <strong className="text-primary-foreground font-semibold">
                  responsabilidad de guiar a las personas a vivir de una mejor manera.
                </strong>
              </p>
              
              <p>
                Hoy, que cumplimos 15 años, somos la unidad{' '}
                <strong className="text-primary-foreground font-semibold">Vitasfera</strong>. 
                Nuestra misión es transformar la salud de las personas a través de un método que{' '}
                <strong className="text-primary-foreground font-semibold">
                  no le haga perder su esencia.
                </strong>
              </p>

              {/* <p>
                Ofrecemos nuestra propia marca de confianza,{' '}
                <span className="text-gold font-bold">Naturdix,</span> y fórmulas personalizadas de{' '}
                <span className="text-gold font-bold">Flor de Bach</span> que aportan gran detalle 
                y beneficios a la salud.
              </p> */}

            </div>

            {/* CTA Buttons */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <a href="/naturdix" target="_blank" className="px-8 py-4 rounded-xl font-bold text-foreground gradient-gold shadow-gold hover:scale-105 transition-transform duration-300">
                Conoce Naturdix
              </a>
              </div>
          </div>

          {/* 360 Video Container */}
          <div 
            className={`flex-1 w-full max-w-2xl order-1 lg:order-2 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-3 rounded-3xl border-2 border-accent/30 animate-border-glow" />
              <div className="absolute -inset-6 rounded-3xl border border-primary/20" />
              
              {/* Glow effect behind iframe */}
              <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-2xl transform scale-95" />
              
              {/* Main iframe container */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-deep-green/50 backdrop-blur-sm">
                <div className="aspect-[4/3] md:aspect-video">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!4v1765788675547!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQzQ5SVNWZ1FF!2m2!1d40.48526533052401!2d-3.358141976326846!3f263.3981712493067!4f8.327561276894329!5f0.7820865974627469"
                    className="w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Vista 360 de Vitasfera"
                  />
                </div>
                
                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 p-4 gradient-hero-overlay">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                      <span className="text-sm font-medium text-primary-foreground/90">
                        Vista 360° interactiva
                      </span>
                    </div>
                    <span className="text-xs text-primary-foreground/70">
                      Arrastra para explorar
                    </span>
                  </div>
                </div>
              </div>

              {/* Corner decorations */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-gold rounded-tl-lg" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-gold rounded-tr-lg" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-gold rounded-bl-lg" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-gold rounded-br-lg" />
            </div>

            {/* Trust indicators below video */}
            <div 
              className={`flex justify-center gap-6 mt-6 transition-all duration-700 delay-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium">15 años</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm font-medium">+10k clientes</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm font-medium">100% natural</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      {/* <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="white"
          />
        </svg>
      </div> */}
    </section>
  );
};

export default HeroSection;
