import { Sparkles, Users, Heart } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full mb-6 animate-fade-in">
            <Users className="w-4 h-4 text-secondary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">
              Nuestra Comunidad
            </span>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Cuéntanos tu{" "}
            <span className="relative inline-block">
              Historia
              <Sparkles className="absolute -top-2 -right-6 w-6 h-6 text-accent animate-pulse-soft" />
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Tu experiencia puede inspirar a miles de personas en su camino hacia el bienestar. 
            Comparte cómo la medicina natural transformó tu vida.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary-foreground">500+</div>
              <div className="text-xs md:text-sm text-primary-foreground/80">Historias compartidas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary-foreground">15</div>
              <div className="text-xs md:text-sm text-primary-foreground/80">Años de confianza</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Heart className="w-6 h-6 md:w-8 md:h-8 text-secondary-foreground" fill="currentColor" />
              </div>
              <div className="text-xs md:text-sm text-primary-foreground/80">Comunidad unida</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 50L48 45.7C96 41 192 33 288 37.8C384 43 480 61 576 66.3C672 72 768 64 864 53.2C960 43 1056 29 1152 26.2C1248 23 1344 31 1392 34.8L1440 39V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
