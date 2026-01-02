import { useState, useMemo, useRef, useEffect } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ListaProductos } from "@/lib/productos";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

/* ======================================================
  ADVANCED SEARCH BAR – PRO UX
====================================================== */

const AdvancedSearchBar = () => {
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState("");
  const [clasificacion, setClasificacion] = useState("all");
  const [categoriaPatologia, setCategoriaPatologia] = useState("all");
  const [subcategoriaPatologia, setSubcategoriaPatologia] = useState("all");
  const [openSuggestions, setOpenSuggestions] = useState(false);

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
    SUGERENCIAS
  ====================================================== */

  const suggestions = useMemo(() => {
    const term = search.toLowerCase();

    return ListaProductos.filter(p => {
      return (
        (!search ||
          p.titulo.toLowerCase().includes(term) ||
          p.subtitulo.toLowerCase().includes(term)) &&
        (clasificacion === "all" ||
          p.clasificacionFuncionPrincipal === clasificacion) &&
        (categoriaPatologia === "all" ||
          p.categoriaPorPatologia === categoriaPatologia) &&
        (subcategoriaPatologia === "all" ||
          p.subcategoriaPorPatologia?.includes(subcategoriaPatologia))
      );
    }).slice(0, 6);
  }, [search, clasificacion, categoriaPatologia, subcategoriaPatologia]);

  /* ======================================================
    HANDLERS
  ====================================================== */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenSuggestions(false);

    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (clasificacion !== "all") params.set("clasificacion", clasificacion);
    if (categoriaPatologia !== "all") params.set("categoriaPatologia", categoriaPatologia);
    if (subcategoriaPatologia !== "all") params.set("subcategoriaPatologia", subcategoriaPatologia);

    navigate(`/tienda?${params.toString()}`);
  };

  const clearAll = () => {
    setSearch("");
    setClasificacion("all");
    setCategoriaPatologia("all");
    setSubcategoriaPatologia("all");
  };

  /* ======================================================
    CLICK FUERA
  ====================================================== */

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpenSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ======================================================
    UI
  ====================================================== */

  return (
    <div ref={wrapperRef} className="relative w-full max-w-6xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="
          flex items-center
          rounded-xl
          overflow-hidden
          bg-white/70 backdrop-blur-xl        
          focus-within:ring-2 focus-within:ring-accent
          transition-all
        "
      >
        {/* CLASIFICACIÓN */}
        <FilterDropdown
          label="Clasificación"
          value={clasificacion}
          onChange={setClasificacion}
          options={clasificaciones}
        />

        {/* CATEGORÍA PATOLOGÍA */}
        <FilterDropdown
          label="Patología"
          value={categoriaPatologia}
          onChange={(v) => {
            setCategoriaPatologia(v);
            setSubcategoriaPatologia("all");
          }}
          options={categoriasPatologia}
        />

        {/* SUBCATEGORÍA */}
        <FilterDropdown
          label="Subcategoría"
          value={subcategoriaPatologia}
          onChange={setSubcategoriaPatologia}
          options={subcategoriasPatologia}
          disabled={categoriaPatologia === "all"}
        />

        {/* SEARCH */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpenSuggestions(true);
            }}
            onFocus={() => setOpenSuggestions(true)}
            placeholder="Buscar por producto, beneficio o necesidad…"
            className="
              w-full h-12
              pl-12 pr-10
              bg-transparent
              text-sm
              focus:outline-none
            "
          />

          {(search || clasificacion !== "all" || categoriaPatologia !== "all") && (
            <button
              type="button"
              onClick={clearAll}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* =======================
        SUGERENCIAS
      ======================= */}
      {openSuggestions && suggestions.length > 0 && (
        <div
          className="
            absolute z-50 mt-3 w-full
            bg-white
            border rounded-2xl
            shadow-2xl
            overflow-hidden
          "
        >
          {suggestions.map(p => (
            <div
              key={p.id}
              onClick={() => navigate(`/product/${p.id}`)}
              className="
                flex items-center gap-4
                px-5 py-4
                cursor-pointer
                hover:bg-muted
                transition
              "
            >
              <img
                src={p.imagenes[0]}
                alt={p.titulo}
                className="w-14 h-14 rounded-xl object-cover"
              />

              <div className="flex flex-col">
                <span className="text-sm font-semibold">{p.titulo}</span>
                <span className="text-xs text-muted-foreground">
                  {p.subtitulo}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearchBar;

/* ======================================================
  FILTER DROPDOWN
====================================================== */

interface FilterProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  disabled?: boolean;
}

const FilterDropdown = ({
  label,
  value,
  onChange,
  options,
  disabled,
}: FilterProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        disabled={disabled}
        variant="ghost"
        className="
          h-12 px-4
          text-sm font-medium
          rounded-none
          border-r last:border-none
          flex items-center gap-2
          hover:bg-primary
          disabled:opacity-40          
        "
      >
        {value === "all" ? label : value}
        <ChevronDown className="w-4 h-4 opacity-60" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent className="max-h-72 overflow-y-auto rounded-xl">
      <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
        <DropdownMenuRadioItem value="all">Todos</DropdownMenuRadioItem>
        {options
          .filter(o => o !== "all")
          .map(opt => (
            <DropdownMenuRadioItem key={opt} value={opt}>
              {opt}
            </DropdownMenuRadioItem>
          ))}
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);
