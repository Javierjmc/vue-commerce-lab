import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { ButtonNaturdix } from "@/components/naturdix/ButtonNaturdix";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-[#09573c] via-[#4fac05] to-[#2e901f] text-primary-foreground py-2">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-bold">
            CONVIÉRTETE EN UN EMBAJADOR NATURDIX
          </p>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-black text-primary tracking-tight">
                NATURDIX
                <span className="inline-block w-3 h-3 bg-secondary rounded-full ml-1"></span>
              </h1>
            </div>

            {/* Search bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Input
                  placeholder="¿Qué buscas?"
                  className="w-full pl-4 pr-10 h-11 border-2 border-primary focus:border-secondary rounded-full transition-colors"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <ButtonNaturdix variant="offers" size="lg" className="hidden sm:flex">
                OFERTAS
              </ButtonNaturdix>
              <Link to="/login">
                <ButtonNaturdix variant="ghost" size="icon" className="text-primary">
                  <User className="h-5 w-5" />
                </ButtonNaturdix>
              </Link>
              <ButtonNaturdix variant="ghost" size="icon" className="text-primary relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </ButtonNaturdix>
              <ButtonNaturdix
                variant="ghost"
                size="icon"
                className="md:hidden text-primary"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </ButtonNaturdix>
            </div>
          </div>

          {/* Search bar - Mobile */}
          <div className="md:hidden mt-4">
            <div className="relative w-full">
              <Input
                placeholder="¿Qué buscas?"
                className="w-full pl-4 pr-10 h-10 border-2 border-primary focus:border-secondary rounded-full transition-colors"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-primary dark:bg-primary-dark">
        <div className="container mx-auto px-4">
          {/* Desktop nav */}
          <ul className="hidden md:flex items-center justify-center gap-8 py-3">
            <li>
              <Link to="/" className="text-primary-foreground font-semibold hover:text-secondary transition-colors">
                INICIO
              </Link>
            </li>
            <li>
              <a href="#productos" className="text-primary-foreground font-semibold hover:text-secondary transition-colors">
                PRODUCTOS
              </a>
            </li>
            <li>
              <a href="#mayorista" className="text-primary-foreground font-semibold hover:text-secondary transition-colors">
                VENTAS AL MAYOR
              </a>
            </li>
            <li>
              <a href="#nosotros" className="text-primary-foreground font-semibold hover:text-secondary transition-colors">
                QUIÉNES SOMOS
              </a>
            </li>
            <li>
              <a href="#contacto" className="text-primary-foreground font-semibold hover:text-secondary transition-colors">
                CONTÁCTANOS
              </a>
            </li>
          </ul>

          {/* Mobile nav */}
          {isMenuOpen && (
            <ul className="md:hidden flex flex-col items-center gap-4 py-4 bg-primary dark:bg-primary-dark">
              <li>
                <Link to="/" className="text-primary-foreground font-semibold hover:text-secondary transition-colors">
                  INICIO
                </Link>
              </li>
              <li>
                <a href="#productos" className="text-primary-foreground font-semibold hover:text-secondary transition-colors">
                  PRODUCTOS
                </a>
              </li>
              <li>
                <a href="#mayorista" className="text-primary-foreground font-semibold hover:text-secondary transition-colors">
                  VENTAS AL MAYOR
                </a>
              </li>
              <li>
                <a href="#nosotros" className="text-primary-foreground font-semibold hover:text-secondary transition-colors">
                  QUIÉNES SOMOS
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-primary-foreground font-semibold hover:text-secondary transition-colors">
                  CONTÁCTANOS
                </a>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
