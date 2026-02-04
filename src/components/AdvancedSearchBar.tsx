import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Search, ChevronDown, X, Mic, MicOff, Clock, TrendingUp, Sparkles, Loader2, Filter, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ListaProductos, ProductoNutricional } from "@/lib/productos";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* ======================================================
  ADVANCED SEARCH BAR – PREMIUM UX DESIGN
====================================================== */

interface AdvancedSearchBarProps {
  onSearchSubmit?: () => void;
}

const AdvancedSearchBar = ({ onSearchSubmit }: AdvancedSearchBarProps) => {
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [clasificacion, setClasificacion] = useState("all");
  const [categoriaPatologia, setCategoriaPatologia] = useState("all");
  const [subcategoriaPatologia, setSubcategoriaPatologia] = useState("all");
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Cargar historial desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem("searchHistory");
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading search history", e);
      }
    }
  }, []);

  // Debounce para la búsqueda
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  /* ======================================================
    CATEGORÍAS (DERIVADAS)
  ====================================================== */

  const clasificaciones = useMemo(
    () => [
      "all",
      ...new Set(ListaProductos.map(p => p.clasificacionFuncionPrincipal)),
    ],
    []
  );

  const categoriasPatologia = useMemo(
    () => [
      "all",
      ...new Set(ListaProductos.map(p => p.categoriaPorPatologia)),
    ],
    []
  );

  const subcategoriasPatologia = useMemo(() => {
    if (categoriaPatologia === "all") return ["all"];
    const subs = ListaProductos
      .filter(p => p.categoriaPorPatologia === categoriaPatologia)
      .flatMap(p => p.subcategoriaPorPatologia || []);
    return ["all", ...new Set(subs)];
  }, [categoriaPatologia]);

  /* ======================================================
    BÚSQUEDA INTELIGENTE
  ====================================================== */

  // Función de búsqueda difusa mejorada
  const fuzzySearch = useCallback((text: string, query: string): number => {
    if (!query) return 0;
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    
    // Coincidencia exacta
    if (lowerText === lowerQuery) return 100;
    
    // Coincidencia al inicio
    if (lowerText.startsWith(lowerQuery)) return 90;
    
    // Contiene la palabra completa
    if (lowerText.includes(lowerQuery)) return 70;
    
    // Coincidencia de palabras individuales
    const queryWords = lowerQuery.split(/\s+/);
    const textWords = lowerText.split(/\s+/);
    const matchedWords = queryWords.filter(qw => 
      textWords.some(tw => tw.includes(qw) || qw.includes(tw))
    );
    if (matchedWords.length > 0) {
      return (matchedWords.length / queryWords.length) * 50;
    }
    
    return 0;
  }, []);

  // Búsqueda mejorada en múltiples campos
  const searchInProduct = useCallback((product: ProductoNutricional, query: string): number => {
    if (!query) return 0;
    
    const searchFields = [
      product.producto,
      product.titulo,
      product.subtitulo,
      product.subtituloComplemento,
      product.clasificacionFuncionPrincipal,
      product.categoriaPorPatologia,
      product.descripcionExtendida || "",
      ...(product.ingredientesClave || []),
      ...(product.beneficiosClave || []),
    ].filter(Boolean);

    const scores = searchFields.map(field => fuzzySearch(field, query));
    return Math.max(...scores);
  }, [fuzzySearch]);

  /* ======================================================
    SUGERENCIAS MEJORADAS
  ====================================================== */

  const suggestions = useMemo(() => {
    if (!debouncedSearch && !clasificacion && !categoriaPatologia && !subcategoriaPatologia) {
      return [];
    }

    let results = ListaProductos;

    // Filtrar por categorías
    if (clasificacion !== "all") {
      results = results.filter(p => p.clasificacionFuncionPrincipal === clasificacion);
    }
    if (categoriaPatologia !== "all") {
      results = results.filter(p => p.categoriaPorPatologia === categoriaPatologia);
    }
    if (subcategoriaPatologia !== "all") {
      results = results.filter(p => p.subcategoriaPorPatologia?.includes(subcategoriaPatologia));
    }

    // Búsqueda por texto
    if (debouncedSearch) {
      const scoredResults = results.map(product => ({
        product,
        score: searchInProduct(product, debouncedSearch),
      }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

      return scoredResults.map(item => item.product);
    }

    // Si solo hay filtros, mostrar productos destacados primero
    return results
      .sort((a, b) => {
        if (a.destacado && !b.destacado) return -1;
        if (!a.destacado && b.destacado) return 1;
        return 0;
      })
      .slice(0, 6);
  }, [debouncedSearch, clasificacion, categoriaPatologia, subcategoriaPatologia, searchInProduct]);

  /* ======================================================
    HIGHLIGHT DE TÉRMINOS
  ====================================================== */

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-gradient-to-r from-primary/30 to-primary/20 text-primary font-bold rounded px-1 py-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  /* ======================================================
    HANDLERS
  ====================================================== */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenSuggestions(false);
    setSelectedIndex(-1);

    // Guardar en historial
    if (search.trim()) {
      const newHistory = [search.trim(), ...searchHistory.filter(h => h !== search.trim())].slice(0, 10);
      setSearchHistory(newHistory);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    }

    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (clasificacion !== "all") params.set("clasificacion", clasificacion);
    if (categoriaPatologia !== "all") params.set("categoriaPatologia", categoriaPatologia);
    if (subcategoriaPatologia !== "all") params.set("subcategoriaPatologia", subcategoriaPatologia);

    navigate(`/tienda?${params.toString()}`);
    onSearchSubmit?.();
  };

  const clearAll = () => {
    setSearch("");
    setDebouncedSearch("");
    setClasificacion("all");
    setCategoriaPatologia("all");
    setSubcategoriaPatologia("all");
    setOpenSuggestions(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleProductClick = (product: ProductoNutricional) => {
    setOpenSuggestions(false);
    navigate(`/product/${product.id}`);
    onSearchSubmit?.();
  };

  const handleHistoryClick = (term: string) => {
    setSearch(term);
    setOpenSuggestions(true);
    inputRef.current?.focus();
  };

  const removeFromHistory = (term: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newHistory = searchHistory.filter(h => h !== term);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  /* ======================================================
    BÚSQUEDA POR VOZ
  ====================================================== */

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Tu navegador no soporta búsqueda por voz");
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "es-ES";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setSearch(transcript);
      setOpenSuggestions(true);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopVoiceSearch = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  /* ======================================================
    ATAJOS DE TECLADO
  ====================================================== */

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!openSuggestions) return;

      if (e.key === "Escape") {
        setOpenSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault();
        handleProductClick(suggestions[selectedIndex]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openSuggestions, suggestions, selectedIndex]);

  // Scroll a la sugerencia seleccionada
  useEffect(() => {
    if (selectedIndex >= 0 && suggestionsRef.current) {
      const selectedElement = suggestionsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  /* ======================================================
    CLICK FUERA
  ====================================================== */

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpenSuggestions(false);
        setShowHistory(false);
        setSelectedIndex(-1);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ======================================================
    FORMATO DE PRECIO
  ====================================================== */

  const formatPrice = (price: string) => {
    if (!price || price === "" || price === "N/A") return "Consultar precio";
    return price.includes("€") ? price : `${price}€`;
  };

  // Contar filtros activos
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (clasificacion !== "all") count++;
    if (categoriaPatologia !== "all") count++;
    if (subcategoriaPatologia !== "all") count++;
    return count;
  }, [clasificacion, categoriaPatologia, subcategoriaPatologia]);

  /* ======================================================
    UI PREMIUM
  ====================================================== */

  return (
    <div ref={wrapperRef} className="relative w-full max-w-7xl mx-auto px-1 md:px-2">
      <form
        onSubmit={handleSubmit}
        className={cn(
          "relative flex items-center rounded-2xl overflow-hidden",
          "bg-white dark:bg-gray-900",
          "backdrop-blur-2xl",
          "border-2",
          isFocused ? "border-primary shadow-[0_16px_64px_-12px_hsl(158_64%_22%_/_0.25)]" : "border-border/80 shadow-[0_8px_32px_-8px_hsl(158_64%_22%_/_0.12)]",
          "transition-all duration-500 ease-out",
          "hover:border-primary/50 hover:shadow-[0_12px_48px_-12px_hsl(158_64%_22%_/_0.18)]",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/8 before:via-transparent before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 before:pointer-events-none before:z-0",
          isFocused && "before:opacity-100",
          "after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-br after:from-primary/0 after:via-primary/0 after:to-primary/8 after:opacity-0 after:transition-opacity after:duration-500 after:pointer-events-none after:z-0"
        )}
      >
        {/* Efecto de brillo animado mejorado */}
        <div 
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
            width: '40%',
            animation: 'shimmer-slide 4s ease-in-out infinite',
            filter: 'blur(1px)'
          }}
        />
        
        {/* CLASIFICACIÓN */}
        <div className="relative z-10">
          <FilterDropdown
            label="Clasificación"
            value={clasificacion}
            onChange={setClasificacion}
            options={clasificaciones}
            icon={<Filter className="w-3.5 h-3.5" />}
          />
        </div>

        {/* CATEGORÍA PATOLOGÍA */}
        <div className="relative z-10">
          <FilterDropdown
            label="Patología"
            value={categoriaPatologia}
            onChange={(v) => {
              setCategoriaPatologia(v);
              setSubcategoriaPatologia("all");
            }}
            options={categoriasPatologia}
            icon={<Zap className="w-3.5 h-3.5" />}
          />
        </div>

        {/* SUBCATEGORÍA */}
        <div className="relative z-10">
          <FilterDropdown
            label="Subcategoría"
            value={subcategoriaPatologia}
            onChange={setSubcategoriaPatologia}
            options={subcategoriasPatologia}
            disabled={categoriaPatologia === "all"}
            icon={<ChevronDown className="w-3.5 h-3.5" />}
          />
        </div>

        {/* SEARCH INPUT */}
        <div className="relative flex-1 z-10">
          {/* Icono de búsqueda con efecto mejorado */}
          <div className="absolute left-5 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className={cn(
              "relative transition-all duration-300",
              isFocused && "scale-110"
            )}>
              <Search className={cn(
                "w-5 h-5 md:w-6 md:h-6 transition-all duration-300",
                isFocused ? "text-primary drop-shadow-sm" : "text-muted-foreground/70"
              )} />
              {isFocused && (
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-pulse-soft pointer-events-none" />
              )}
            </div>
          </div>
          
          {/* Indicador de carga mejorado */}
          {isLoading && (
            <div className="absolute left-14 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
              <div className="relative">
                <Loader2 className="w-4 h-4 md:w-5 md:h-5 text-primary animate-spin" />
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-sm pointer-events-none" />
              </div>
            </div>
          )}

          <input
            ref={inputRef}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpenSuggestions(true);
              setShowHistory(false);
              setSelectedIndex(-1);
            }}
            onFocus={() => {
              setIsFocused(true);
              if (searchHistory.length > 0 && !search) {
                setShowHistory(true);
              } else {
                setOpenSuggestions(true);
              }
            }}
            onBlur={() => {
              // Delay para permitir clicks en sugerencias
              setTimeout(() => setIsFocused(false), 200);
            }}
            placeholder="Buscar por producto, beneficio o necesidad…"
            className={cn(
              "relative w-full h-16 md:h-20 pl-14 pr-32",
              "bg-transparent",
              "text-sm md:text-base font-medium",
              "text-foreground",
              "focus:outline-none",
              "placeholder:text-muted-foreground/60",
              "transition-all duration-300",
              "z-20"
            )}
          />

          {/* Contador de filtros activos */}
          {activeFiltersCount > 0 && (
            <div className="absolute left-16 top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-20 pointer-events-none">
              <Badge className="h-5 px-2.5 text-xs font-bold bg-primary/15 text-primary border border-primary/40 shadow-sm">
                {activeFiltersCount} {activeFiltersCount === 1 ? 'filtro' : 'filtros'}
              </Badge>
            </div>
          )}

          {/* Botones de acción mejorados */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 z-20">
            {/* Botón de voz con efecto premium */}
            <button
              type="button"
              onClick={isListening ? stopVoiceSearch : startVoiceSearch}
              className={cn(
                "relative p-2.5 rounded-xl transition-all duration-300",
                "group overflow-hidden",
                "border border-transparent",
                isListening
                  ? "bg-destructive/15 text-destructive border-destructive/30 shadow-md shadow-destructive/20"
                  : "text-muted-foreground/80 hover:text-primary hover:bg-primary/10 hover:border-primary/20"
              )}
              title="Búsqueda por voz"
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4 relative z-10 animate-pulse" />
                  <div className="absolute inset-0 bg-destructive/20 rounded-xl animate-ping pointer-events-none" />
                </>
              ) : (
                <Mic className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              )}
            </button>

            {/* Botón limpiar mejorado */}
            {(search || activeFiltersCount > 0) && (
              <button
                type="button"
                onClick={clearAll}
                className={cn(
                  "p-2.5 rounded-xl",
                  "text-muted-foreground/80 hover:text-foreground",
                  "hover:bg-muted/80 border border-transparent hover:border-border",
                  "transition-all duration-300",
                  "hover:scale-110 active:scale-95"
                )}
                title="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </form>

      {/* =======================
        HISTORIAL DE BÚSQUEDAS PREMIUM
      ======================= */}
      {showHistory && searchHistory.length > 0 && !search && (
        <div
          className={cn(
            "absolute z-50 mt-4 w-full",
            "bg-white dark:bg-gray-900",
            "backdrop-blur-2xl",
            "border-2 border-border/80 rounded-2xl",
            "shadow-[0_20px_60px_-12px_hsl(158_64%_22%_/_0.25)]",
            "overflow-hidden",
            "animate-fade-in-up"
          )}
        >
          {/* Header con gradiente */}
          <div className="px-5 py-3.5 border-b-2 border-border/60 bg-primary/8 flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-primary/15 border border-primary/20">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-bold text-foreground">Búsquedas recientes</span>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {searchHistory.map((term, idx) => (
              <div
                key={idx}
                onClick={() => handleHistoryClick(term)}
                className={cn(
                  "flex items-center justify-between",
                  "px-5 py-3.5",
                  "cursor-pointer",
                  "transition-all duration-200",
                  "group",
                  "hover:bg-primary/10 border-l-4 border-transparent hover:border-primary/40",
                  "border-b border-border/40 last:border-0"
                )}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="p-1.5 rounded-lg bg-muted/60 group-hover:bg-primary/15 border border-transparent group-hover:border-primary/20 transition-all">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground/70 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm font-medium truncate text-foreground/80 group-hover:text-primary transition-colors">
                    {term}
                  </span>
                </div>
                <button
                  onClick={(e) => removeFromHistory(term, e)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-destructive/15 text-muted-foreground/70 hover:text-destructive border border-transparent hover:border-destructive/20 transition-all duration-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =======================
        SUGERENCIAS PREMIUM
      ======================= */}
      {openSuggestions && (suggestions.length > 0 || search) && (
        <div
          ref={suggestionsRef}
          className={cn(
            "absolute z-50 mt-4 w-full",
            "bg-white dark:bg-gray-900",
            "backdrop-blur-2xl",
            "border-2 border-border/80 rounded-2xl",
            "shadow-[0_24px_72px_-12px_hsl(158_64%_22%_/_0.3)]",
            "overflow-hidden",
            "animate-fade-in-up",
            "max-h-[600px] overflow-y-auto",
            "scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
          )}
        >
          {suggestions.length > 0 ? (
            <>
              {/* Header premium */}
              <div className="sticky top-0 z-10 px-5 py-3.5 border-b-2 border-border/60 bg-primary/8 backdrop-blur-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-primary/15 border border-primary/20">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    {suggestions.length} {suggestions.length === 1 ? "resultado" : "resultados"}
                  </span>
                </div>
                {debouncedSearch && (
                  <Badge variant="secondary" className="text-xs font-semibold bg-primary/15 text-primary border border-primary/30">
                    "{debouncedSearch}"
                  </Badge>
                )}
              </div>

              {/* Lista de productos premium */}
              {suggestions.map((p, idx) => (
                <div
                  key={p.id}
                  onClick={() => handleProductClick(p)}
                  className={cn(
                    "flex items-center gap-4 px-5 py-4",
                    "cursor-pointer transition-all duration-300",
                    "group relative",
                    "border-b border-border/50 last:border-0",
                    selectedIndex === idx
                      ? "bg-primary/15 border-l-4 border-primary shadow-sm"
                      : "hover:bg-primary/8 border-l-4 border-transparent hover:border-primary/40"
                  )}
                >
                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                  
                  {/* Imagen con efectos */}
                  <div className="relative flex-shrink-0">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      <img
                        src={p.imagenes[0]}
                        alt={p.titulo}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                      {/* Overlay gradiente */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    {/* Badge destacado premium */}
                    {p.destacado && (
                      <div className="absolute -top-1 -right-1 bg-gradient-to-br from-primary to-primary/80 rounded-full p-1.5 shadow-lg animate-pulse-soft">
                        <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-base font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
                          {highlightText(p.titulo, debouncedSearch)}
                        </div>
                        <div className="text-xs text-muted-foreground/80 line-clamp-2 leading-relaxed">
                          {highlightText(p.subtitulo, debouncedSearch)}
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <div className="text-base font-extrabold text-primary">
                          {formatPrice(p.pvp)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Badges mejorados */}
                    <div className="flex items-center gap-2 flex-wrap mt-2">
                      <Badge 
                        variant="secondary" 
                        className="text-xs px-2.5 py-1 font-semibold bg-primary/15 text-primary border border-primary/30 hover:bg-primary/20 transition-colors"
                      >
                        {p.clasificacionFuncionPrincipal}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="text-xs px-2.5 py-1 font-medium border-border/60 hover:border-primary/50 bg-muted/30 transition-colors"
                      >
                        {p.categoriaPorPatologia}
                      </Badge>
                    </div>
                  </div>

                  {/* Indicador de selección */}
                  {selectedIndex === idx && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className="px-5 py-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted/60 border border-border/60 flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground/60" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">
                No se encontraron productos
              </p>
              <p className="text-xs text-muted-foreground/80">
                Intenta con otros términos o ajusta los filtros
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearchBar;

/* ======================================================
  FILTER DROPDOWN PREMIUM
====================================================== */

interface FilterProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  disabled?: boolean;
  icon?: React.ReactNode;
}

const FilterDropdown = ({
  label,
  value,
  onChange,
  options,
  disabled,
  icon,
}: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasActiveFilter = value !== "all";

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={disabled}
          variant="ghost"
          className={cn(
            "relative h-16 md:h-20 px-5 md:px-7",
            "text-xs md:text-sm font-semibold",
            "rounded-none first:rounded-l-2xl last:rounded-r-2xl",
            "border-r-2 last:border-0",
            hasActiveFilter 
              ? "border-primary/40 bg-primary/10 text-primary shadow-sm" 
              : "border-border/60 hover:border-primary/40",
            "flex items-center gap-2.5",
            "transition-all duration-300",
            "group overflow-hidden",
            hasActiveFilter
              ? "bg-primary/12 text-primary"
              : "bg-transparent hover:bg-primary/8 hover:text-primary text-foreground/80",
            disabled && "opacity-40 cursor-not-allowed",
            isOpen && "bg-primary/15 text-primary border-primary/50 shadow-inner",
            "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/5 before:via-transparent before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 before:pointer-events-none",
            "hover:before:opacity-100"
          )}
        >
          {hasActiveFilter && (
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary animate-pulse" />
          )}
          {icon && (
            <span className={cn(
              "transition-colors duration-300",
              hasActiveFilter ? "text-primary" : "text-muted-foreground group-hover:text-primary"
            )}>
              {icon}
            </span>
          )}
          <span className="max-w-[160px] md:max-w-[200px] truncate">
            {value === "all" ? label : value}
          </span>
          <ChevronDown className={cn(
            "w-4 h-4 transition-all duration-300 flex-shrink-0",
            hasActiveFilter ? "text-primary" : "text-muted-foreground/60 group-hover:text-primary",
            isOpen && "rotate-180"
          )} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        className={cn(
          "max-h-80 overflow-y-auto rounded-xl w-[260px]",
          "bg-white dark:bg-gray-900",
          "backdrop-blur-2xl",
          "border-2 border-border/80",
          "shadow-[0_20px_60px_-12px_hsl(158_64%_22%_/_0.3)]",
          "p-3",
          "mt-2",
          "z-50"
        )}
        align="start"
      >
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          <DropdownMenuRadioItem 
            value="all" 
            className={cn(
              "font-bold rounded-lg mb-2 px-4 py-2.5",
              "bg-muted/30 border border-border/40",
              "focus:bg-primary/15 focus:text-primary focus:border-primary/40",
              "transition-all duration-200",
              "hover:bg-primary/10 hover:text-primary",
              "cursor-pointer"
            )}
          >
            Todos
          </DropdownMenuRadioItem>
          {options
            .filter(o => o !== "all")
            .map(opt => (
              <DropdownMenuRadioItem 
                key={opt} 
                value={opt}
                className={cn(
                  "rounded-lg my-1 px-4 py-2.5",
                  "bg-transparent border border-transparent",
                  "focus:bg-primary/15 focus:text-primary focus:border-primary/30",
                  "transition-all duration-200",
                  "hover:bg-primary/10 hover:text-primary hover:border-primary/20",
                  "cursor-pointer",
                  "text-foreground/90"
                )}
              >
                {opt}
              </DropdownMenuRadioItem>
            ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Extender Window interface para TypeScript
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}
