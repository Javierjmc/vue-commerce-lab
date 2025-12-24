import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ListaProductos } from "@/lib/productos";
import ProductCard from "@/components/ProductCard";
import { 
  Filter, 
  Leaf, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  Search,
  X,
  SlidersHorizontal,
  Grid3X3,
  LayoutGrid,
  Heart,
  Flower2,
  Brain,
  Bone,
  Pill,
  Droplets,
  Sun
} from "lucide-react";
import Layout from "../layouts/Layout";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 8;

// Iconos para categorías
const categoryIcons: Record<string, React.ReactNode> = {
  "Sistema Inmune": <Heart className="h-4 w-4" />,
  "Sistema Digestivo": <Droplets className="h-4 w-4" />,
  "Sistema Nervioso": <Brain className="h-4 w-4" />,
  "Sistema Osteoarticular": <Bone className="h-4 w-4" />,
  "Adaptógenos": <Flower2 className="h-4 w-4" />,
  "Vitaminas": <Sun className="h-4 w-4" />,
  "Ácidos Grasos": <Pill className="h-4 w-4" />,
  "Minerales": <Sparkles className="h-4 w-4" />,
  "Proteínas": <Leaf className="h-4 w-4" />,
  "Antiinflamatorio": <Flower2 className="h-4 w-4" />,
};

const Tienda = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const initialSearchQuery = searchParams.get("search")?.toLowerCase() || "";
  const initialCategoryParam = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState(initialCategoryParam);
  const [selectedClasificacion, setSelectedClasificacion] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "large">("grid");

  const searchQuery = initialSearchQuery;

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "all");
    if (clasificaciones.includes(searchParams.get("category") || "")) {
      setSelectedClasificacion(searchParams.get("category") || "all");
    } else {
      setSelectedClasificacion("all");
    }
    setCurrentPage(1);
  }, [searchParams]);

  const categories = useMemo(() => {
    const cats = ListaProductos.map((p) => p.categoriaPorPatologia);
    return ["all", ...new Set(cats)];
  }, []);

  const clasificaciones = useMemo(() => {
    const clasifs = ListaProductos.map((p) => p.clasificacionFuncionPrincipal);
    return ["all", ...new Set(clasifs)];
  }, []);

  const updateUrlParams = (newSearchTerm: string, newCategory: string, newClasificacion: string) => {
    const params = new URLSearchParams();
    if (newSearchTerm) params.set("search", newSearchTerm);
    if (newCategory !== "all") params.set("category", newCategory);
    if (newClasificacion !== "all" && newCategory === "all") params.set("category", newClasificacion);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const featuredProducts = useMemo(() => {
    const shuffled = [...ListaProductos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3); // Selecciona 3 productos destacados aleatorios
  }, []);

  const filteredProducts = useMemo(() => {
    let result = ListaProductos;
    const currentCategoryInUrl = searchParams.get("category") || "all";

    if (currentCategoryInUrl !== "all") {
      if (categories.includes(currentCategoryInUrl)) {
        result = result.filter((p) => p.categoriaPorPatologia === currentCategoryInUrl);
      } else if (clasificaciones.includes(currentCategoryInUrl)) {
        result = result.filter((p) => p.clasificacionFuncionPrincipal === currentCategoryInUrl);
      }
    }

    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.producto.toLowerCase().includes(searchQuery) ||
          p.titulo.toLowerCase().includes(searchQuery) ||
          p.subtitulo.toLowerCase().includes(searchQuery)
      );
    }

    return result;
  }, [searchQuery, searchParams, categories, clasificaciones]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedClasificacion("all");
    navigate(location.pathname);
  };

  const hasActiveFilters = selectedCategory !== "all" || selectedClasificacion !== "all" || searchQuery;
  const activeFiltersCount = [selectedCategory !== "all", selectedClasificacion !== "all", !!searchQuery].filter(Boolean).length;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden border border-gray-200" style={{ background: 'linear-gradient(135deg, hsl(158 64% 18%) 0%, hsl(142 52% 28%) 50%, hsl(84 50% 35%) 100%)' }}>
        {/* Animated decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/5 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-white/5 blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/3 blur-2xl animate-float" style={{ animationDelay: '-1.5s' }} />
        
        <div className="container relative py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-8 animate-fade-in-up">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-semibold text-white">
                Más de {ListaProductos.length} productos 100% naturales
              </span>
            </div>
            
            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span className="text-white drop-shadow-lg">Nuestra</span>{" "}
              <span className="text-gradient">Tienda</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Descubre productos naturales de la más alta calidad para cuidar tu salud y bienestar de forma integral
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="hero-stat min-w-[120px]">
                <div className="text-3xl md:text-4xl font-bold text-white">+500</div>
                <div className="text-sm text-white/70 mt-1">Productos</div>
              </div>
              <div className="hero-stat min-w-[120px]">
                <div className="text-3xl md:text-4xl font-bold text-white">{categories.length - 1}</div>
                <div className="text-sm text-white/70 mt-1">Categorías</div>
              </div>
              <div className="hero-stat min-w-[120px]">
                <div className="text-3xl md:text-4xl font-bold text-white">100%</div>
                <div className="text-sm text-white/70 mt-1">Natural</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L48 108C96 96 192 72 288 60C384 48 480 48 576 54C672 60 768 72 864 78C960 84 1056 84 1152 78C1248 72 1344 60 1392 54L1440 48V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" fill="oklch(92.8% 0.006 264.531)"/>
          </svg>
        </div>
      </section>

      {/* Sección de Productos Destacados */ }
      <section className="relative overflow-hidden py-4">
        {/* Animated decorative elements for featured section */ }
        <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-white/10 blur-2xl animate-float" />
        <div className="absolute bottom-10 left-1/4 w-32 h-32 rounded-full bg-white/10 blur-3xl animate-float" style={{ animationDelay: '-2s' }} />

        <div className="container relative px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              <Sparkles className="inline-block h-8 w-8 mr-2 text-primary/60" /> <span className="text-primary">Nuestros Favoritos</span>
            </h2>
            <p className="text-lg text-black/80 max-w-2xl mx-auto leading-relaxed">
              Descubre nuestra selección especial de productos naturales de la más alta calidad, elegidos pensando en tu bienestar.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} viewMode="large" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container py-12 md:py-16 px-4 md:px-6 border-4">
        {/* Control Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
          {/* Left: Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  className="gap-2.5 rounded-full px-5 h-12 border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300 font-semibold"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros
                  {activeFiltersCount > 0 && (
                    <span className="ml-1 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[340px] sm:w-[420px] p-0 overflow-y-auto border-0">
                {/* Filter Header */}
                <div className="gradient-hero p-8">
                  <SheetHeader>
                    <SheetTitle className="text-2xl font-bold text-white flex items-center gap-3">
                      <div className="p-2 rounded-xl glass">
                        <Filter className="h-5 w-5" />
                      </div>
                      Filtrar Productos
                    </SheetTitle>
                  </SheetHeader>
                  <p className="text-white/70 text-sm mt-2">
                    Encuentra exactamente lo que buscas
                  </p>
                </div>
                
                {/* Filter Body */}
                <div className="p-6 space-y-8">
                  {/* Quick Stats */}
                  <div className="flex gap-3">
                    <div className="flex-1 bg-muted rounded-2xl p-4 text-center">
                      <div className="text-2xl font-bold text-primary">{filteredProducts.length}</div>
                      <div className="text-xs text-muted-foreground mt-1">Productos</div>
                    </div>
                    <div className="flex-1 bg-muted rounded-2xl p-4 text-center">
                      <div className="text-2xl font-bold text-secondary">{activeFiltersCount}</div>
                      <div className="text-xs text-muted-foreground mt-1">Filtros activos</div>
                    </div>
                  </div>

                  {/* Clasificación Principal */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-1.5 rounded-lg bg-secondary/10">
                        <Leaf className="h-4 w-4 text-secondary" />
                      </div>
                      <h3 className="font-semibold text-lg">Por Función</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {clasificaciones.map((clasif) => (
                        <button
                          key={clasif}
                          className={`filter-chip flex items-center gap-2 ${selectedClasificacion === clasif ? 'filter-chip-active' : 'filter-chip-inactive'}`}
                          onClick={() => {
                            setSelectedClasificacion(clasif);
                            updateUrlParams(searchQuery, "all", clasif);
                            setCurrentPage(1);
                          }}
                        >
                          {clasif !== "all" && categoryIcons[clasif]}
                          {clasif === "all" ? "Todas" : clasif}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-border" />

                  {/* Categoría por Patología */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-1.5 rounded-lg bg-accent/10">
                        <Heart className="h-4 w-4 text-accent" />
                      </div>
                      <h3 className="font-semibold text-lg">Por Necesidad</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          className={`filter-chip ${selectedCategory === cat ? 'filter-chip-active' : 'filter-chip-inactive'}`}
                          onClick={() => {
                            setSelectedCategory(cat);
                            updateUrlParams(searchQuery, cat, "all");
                            setCurrentPage(1);
                          }}
                        >
                          {cat === "all" ? "Todas" : cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters Button */}
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      className="w-full gap-2 rounded-full h-12 border-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50"
                      onClick={clearFilters}
                    >
                      <X className="h-4 w-4" />
                      Limpiar todos los filtros
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Active Filters Pills */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2">
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border-0">
                    <Search className="h-3 w-3" />
                    "{searchQuery}"
                    <button onClick={() => navigate(location.pathname)} className="ml-1 hover:bg-primary/20 rounded-full p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedCategory !== "all" && (
                  <Badge variant="secondary" className="gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-secondary/10 text-secondary border-0">
                    {selectedCategory}
                    <button onClick={() => {
                      setSelectedCategory("all");
                      updateUrlParams(searchQuery, "all", selectedClasificacion);
                    }} className="ml-1 hover:bg-secondary/20 rounded-full p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedClasificacion !== "all" && selectedCategory === "all" && (
                  <Badge variant="secondary" className="gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-accent/10 text-accent border-0">
                    {selectedClasificacion}
                    <button onClick={() => {
                      setSelectedClasificacion("all");
                      updateUrlParams(searchQuery, selectedCategory, "all");
                    }} className="ml-1 hover:bg-accent/20 rounded-full p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Right: View toggle & Results count */}
          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="flex items-center gap-1 p-1 bg-muted rounded-full">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-full transition-all duration-300 ${viewMode === "grid" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("large")}
                className={`p-2.5 rounded-full transition-all duration-300 ${viewMode === "large" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>

            {/* Results count */}
            <div className="text-sm text-muted-foreground">
              <span className="font-bold text-2xl text-foreground">{filteredProducts.length}</span>
              <span className="ml-2">productos</span>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-24 animate-fade-in-up">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-muted flex items-center justify-center">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-3xl font-bold mb-3">No se encontraron productos</h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Intenta con otros filtros o términos de búsqueda
            </p>
            <Button onClick={clearFilters} size="lg" className="gap-2 rounded-full px-8">
              <X className="h-4 w-4" />
              Limpiar filtros
            </Button>
          </div>
        )}

        {/* Products Grid */}
        <div className={`grid gap-6 md:gap-8 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
          {paginatedProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ProductCard product={product} viewMode={viewMode} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-primary text-white hover:bg-primary/90 transition-all duration-300 rounded-full px-4 py-2 flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-12 h-12 rounded-full font-semibold transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-primary text-primary-foreground shadow-lg scale-110'
                      : 'bg-card border border-border hover:bg-muted hover:scale-105'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-primary text-white hover:bg-primary/90 transition-all duration-300 rounded-full px-4 py-2 flex items-center gap-2"
            >
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Tienda;
