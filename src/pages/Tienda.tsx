import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { ListaProductos, ProductoNutricional } from "@/lib/productos";
import ProductCard from "@/components/ProductCard";
import { ShoppingBag } from "lucide-react";
import Layout from "../layouts/Layout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ITEMS_PER_PAGE = 8;

const Tienda = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedClasificacion, setSelectedClasificacion] = useState("all"); // Nuevo estado para clasificación
  const [currentPage, setCurrentPage] = useState(1);

  const { search } = useLocation();
  const searchQuery = new URLSearchParams(search).get("search")?.toLowerCase() || "";

  // Categorías (Patologías)
  const categories = useMemo(() => {
    const cats = ListaProductos.map((p) => p.categoriaPorPatologia);
    return ["all", ...new Set(cats)].sort((a, b) => a.localeCompare(b)); // Ordenar alfabéticamente
  }, []);

  // Clasificaciones por Función Principal
  const clasificaciones = useMemo(() => {
    const clasifs = ListaProductos.map((p) => p.clasificacionFuncionPrincipal);
    return ["all", ...new Set(clasifs)].sort((a, b) => a.localeCompare(b)); // Ordenar alfabéticamente
  }, []);

  // FILTRO PRINCIPAL: por clasificación + por categoría + por búsqueda
  const filteredProducts = useMemo(() => {
    let result = ListaProductos;

    // Filtrar por clasificación de función principal
    if (selectedClasificacion !== "all") {
      result = result.filter((p) => p.clasificacionFuncionPrincipal === selectedClasificacion);
    }

    // Filtrar por categoría (patología)
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.categoriaPorPatologia === selectedCategory);
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      result = result.filter((p) =>
        p.producto.toLowerCase().includes(searchQuery)
      );
    }

    return result;
  }, [selectedCategory, selectedClasificacion, searchQuery]); // Incluir selectedClasificacion en las dependencias

  // Paginación
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  return (
    <Layout>
      <main className="container py-8">
        <div className="mb-8 flex flex-col md:flex-row justify-center items-center gap-6">
          {/* Filtro por Clasificación Función Principal */}
          <div className="flex flex-col gap-2">
            <label htmlFor="clasificacion-select" className="text-center text-lg font-semibold">Clasificación Principal:</label>
            <Select
              value={selectedClasificacion}
              onValueChange={(value) => {
                setSelectedClasificacion(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger id="clasificacion-select" className="w-[250px]">
                <SelectValue placeholder="Selecciona una clasificación" />
              </SelectTrigger>
              <SelectContent>
                {clasificaciones.map((clasif) => (
                  <SelectItem key={clasif} value={clasif}>
                    {clasif === "all" ? "Todas las clasificaciones" : clasif}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filtro por Categoría (Patología) */}
          <div className="flex flex-col gap-2">
            <label htmlFor="category-select" className="text-center text-lg font-semibold">Categoría por Patología:</label>
            <Select
              value={selectedCategory}
              onValueChange={(value) => {
                setSelectedCategory(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger id="category-select" className="w-[250px]">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat === "all" ? "Todas las categorías" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Si no hay productos */}
        {filteredProducts.length === 0 && (
          <p className="text-center text-lg text-muted-foreground mt-10">
            No se encontraron productos que coincidan con la búsqueda.
          </p>
        )}

        {/* Lista de productos */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
              className="px-3 py-1 border rounded hover:bg-primary/10 transition disabled:opacity-50"
            >
              Anterior
            </button>

            <span>{currentPage} / {totalPages}</span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded hover:bg-primary/10 transition disabled:opacity-50"
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
