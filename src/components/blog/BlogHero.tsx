import heroImage from "@/assets/bg-hero-4.png";

export function BlogHero() {
  return (
    <section className="relative h-[50vh] min-h-[400px] max-h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Blog Vitasfera - Salud y bienestar natural"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero" />
      </div>
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center">
        <span className="inline-block px-4 py-1 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-4 animate-fade-in backdrop-blur-sm border border-accent/30">
          Vitasfera Blog
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Salud & Bienestar Natural
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Descubre recetas saludables, consejos de expertos y todo lo que necesitas saber sobre productos naturales para tu bienestar
        </p>
      </div>
    </section>
  );
}
