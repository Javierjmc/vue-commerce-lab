import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ListaProductos, ProductoNutricional } from "@/lib/productos";
import ProductCard from "@/components/ProductCard";
import { Filter, ShoppingBag } from "lucide-react";
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

const Tienda = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const initialSearchQuery = searchParams.get("search")?.toLowerCase() || "";
  const initialCategoryParam = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState(initialCategoryParam);
  const [selectedClasificacion, setSelectedClasificacion] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const searchQuery = initialSearchQuery;

  // Efecto para sincronizar los estados con los parámetros de la URL cuando la URL cambia
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "all");
    // Si la categoría de la URL es una clasificación principal, también la establecemos
    if (clasificaciones.includes(searchParams.get("category") || "")) {
      setSelectedClasificacion(searchParams.get("category") || "all");
    } else {
      setSelectedClasificacion("all"); // Resetea si no es una clasificación principal
    }
    setCurrentPage(1);
  }, [searchParams]);

  // Categorías (Patologías)
  const categories = useMemo(() => {
    const cats = ListaProductos.map((p) => p.categoriaPorPatologia);
    return ["all", ...new Set(cats)];
  }, []);

  // Clasificaciones por Función Principal
  const clasificaciones = useMemo(() => {
    const clasifs = ListaProductos.map((p) => p.clasificacionFuncionPrincipal);
    return ["all", ...new Set(clasifs)];
  }, []);

  // Función para actualizar la URL con los nuevos parámetros de búsqueda
  const updateUrlParams = (newSearchTerm: string, newCategory: string, newClasificacion: string) => {
    const params = new URLSearchParams();
    if (newSearchTerm) {
      params.set("search", newSearchTerm);
    }
    if (newCategory !== "all") {
      params.set("category", newCategory);
    }
    // Considerar si la clasificación principal debe ir en un parámetro separado o fusionarse con 'category'
    // Por simplicidad, si selectedClasificacion es diferente de 'all', lo usaremos como 'category' si no hay una categoría más específica.
    if (newClasificacion !== "all" && newCategory === "all") {
        params.set("category", newClasificacion);
    }
    navigate(`${location.pathname}?${params.toString()}`);
  };

  // FILTRO PRINCIPAL: por clasificación + por categoría + por búsqueda
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

    // Filtrar por término de búsqueda
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

  // Paginación
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  return (
    <Layout>
      <main className="container py-8 px-4 md:px-6"> {/* Ajustar padding del main */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6">Nuestros Productos</h2> {/* Ajustar tamaño del título */}
          <p className="text-base md:text-lg text-center text-muted-foreground mb-6 md:mb-8"> {/* Ajustar tamaño del párrafo */}
            Explora nuestra amplia selección de productos naturales para tu bienestar.
          </p>

          {/* Botón para abrir los filtros */}
          <div className="flex justify-center mb-8">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-5 w-5" />
                  Filtrar Productos
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[350px] p-4"> {/* Ajustar ancho y padding del SheetContent */}
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold">Opciones de Filtro</SheetTitle> {/* Ajustar tamaño del título */}
                </SheetHeader>
                <div className="flex flex-col gap-6 py-4">
                  {/* Filtro por Clasificación Función Principal */}
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Clasificación Principal:</h3>
                    <div className="flex flex-wrap gap-2">
                      {clasificaciones.map((clasif) => (
                        <Badge
                          key={clasif}
                          variant={selectedClasificacion === clasif ? "default" : "secondary"}
                          className={`cursor-pointer px-3 py-1 text-sm rounded-full ${selectedClasificacion === clasif ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-muted text-muted-foreground hover:bg-muted/80"} transition-colors`}
                          onClick={() => {
                            setSelectedClasificacion(clasif);
                            updateUrlParams(searchQuery, "all", clasif);
                            setCurrentPage(1);
                          }}
                        >
                          {clasif === "all" ? "Todas" : clasif}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Filtro por Categoría (Patología) */}
                  <div>
                    <h3 className="font-semibold text-lg mb-2 mt-4">Categoría por Patología:</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <Badge
                          key={cat}
                          variant={selectedCategory === cat ? "default" : "secondary"}
                          className={`cursor-pointer px-3 py-1 text-sm rounded-full ${selectedCategory === cat ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-muted text-muted-foreground hover:bg-muted/80"} transition-colors`}
                          onClick={() => {
                            setSelectedCategory(cat);
                            updateUrlParams(searchQuery, cat, "all");
                            setCurrentPage(1);
                          }}
                        >
                          {cat === "all" ? "Todas" : cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Si no hay productos */}
        {filteredProducts.length === 0 && (
          <p className="text-center text-lg text-muted-foreground mt-10">
            No se encontraron productos que coincidan con la búsqueda.
          </p>
        )}

        {/* Lista de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"> {/* Ajustar grid */}
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-3">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-md hover:bg-primary/10 transition disabled:opacity-50 text-base"
            >
              Anterior
            </button>

            <span className="text-lg font-medium">{currentPage} / {totalPages}</span> {/* Ajustar tamaño del texto */}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-md hover:bg-primary/10 transition disabled:opacity-50 text-base"
            >
              Siguiente
            </button>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Tienda;
