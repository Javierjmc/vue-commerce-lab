import { useState, useMemo, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ListaProductos, ProductoNutricional } from "@/lib/productos";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdvancedSearchBarProps {
  onSearchSubmit?: (searchTerm: string, category: string) => void;
  initialSearchTerm?: string;
  initialCategory?: string;
}

const AdvancedSearchBar = ({
  onSearchSubmit,
  initialSearchTerm = "",
  initialCategory = "all",
}: AdvancedSearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  // Obtener categorías únicas de productos
  const categories = useMemo(() => {
    const allCategories = ListaProductos.flatMap((p) => [
      p.categoriaPorPatologia,
      p.clasificacionFuncionPrincipal,
    ]);
    return ["all", ...new Set(allCategories)];
  }, []);

  // Filtrar productos para sugerencias
  const filteredSuggestions = useMemo(() => {
    if (!searchTerm && selectedCategory === "all") return [];

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return ListaProductos.filter((product) => {
      const matchesSearchTerm =
        !searchTerm || product.titulo.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.subtitulo.toLowerCase().includes(lowerCaseSearchTerm);

      const matchesCategory =
        selectedCategory === "all" ||
        product.categoriaPorPatologia === selectedCategory ||
        product.clasificacionFuncionPrincipal === selectedCategory;

      return matchesSearchTerm && matchesCategory;
    }).slice(0, 5); // Limitar a 5 sugerencias
  }, [searchTerm, selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (onSearchSubmit) {
      onSearchSubmit(searchTerm, selectedCategory);
    }
    else {
      let queryString = "";
      if (searchTerm) {
        queryString += `search=${encodeURIComponent(searchTerm)}`;
      }
      if (selectedCategory !== "all") {
        queryString += `${queryString ? "&" : ""}category=${encodeURIComponent(selectedCategory)}`;
      }
      navigate(`/tienda${queryString ? `?${queryString}` : ""}`);
    }
  };

  const handleSuggestionClick = (productId: number) => {
    setShowSuggestions(false);
    navigate(`/product/${productId}`);
  };

  // Cerrar sugerencias al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex-1 max-w-md" ref={searchRef}>
      <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
        <DropdownMenu onOpenChange={setShowSuggestions}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="rounded-r-none border-r-0 h-10 px-3 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
            >
              {selectedCategory === "all" ? "Categoría" : selectedCategory}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px] max-h-60 overflow-y-auto">
            <DropdownMenuRadioGroup
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              {categories.map((cat) => (
                <DropdownMenuRadioItem key={cat} value={cat}>
                  {cat === "all" ? "Todas" : cat}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Buscar productos..."
            className="w-full rounded-l-none rounded-r-xl border border-border bg-background/60 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all h-10"
          />
          <Search className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            aria-label="Buscar"
          >
            <Search size={20} />
          </Button>
        </div>
      </form>

      {showSuggestions && (searchTerm || selectedCategory !== "all") && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-border rounded-b-md shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
          {filteredSuggestions.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(product.id)}
            >
              <img src={product.imagenes[0]} alt={product.titulo} className="w-10 h-10 object-cover rounded" />
              <div>
                <p className="font-medium text-sm">{product.titulo}</p>
                <p className="text-xs text-muted-foreground">{product.subtitulo}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearchBar;
