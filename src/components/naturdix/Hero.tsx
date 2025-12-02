import heroImage from "@/assets/farmacia.jpg";
import { ButtonNaturdix } from "@/components/naturdix/ButtonNaturdix";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full h-[500px] overflow-hidden flex items-center justify-center">
      <img
        src={heroImage}
        alt="Naturdix - Tu herbolario de confianza"
        className="w-full h-full object-cover absolute inset-0"
      />
      <div className="absolute inset-0 bg-black/80"></div> {/* Ajusta la opacidad para mejor contraste */}
      <div className="relative z-10 text-center text-primary-foreground px-4 animate-fade-in animate-delay-200">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 drop-shadow-lg leading-tight">
          Tu Salud, Nuestra Pasión
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl font-medium mb-8 drop-shadow-md max-w-3xl mx-auto opacity-90">
          Descubre el poder de la naturaleza para tu bienestar integral.
        </p>
        <Link to="/tienda">
          <ButtonNaturdix
            variant="hero"
            size="xl"
            className="transition-all duration-300 ease-out shadow-xl hover:shadow-2xl active:scale-98"
          >
            Explorar Productos
          </ButtonNaturdix>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
