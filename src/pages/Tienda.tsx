import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { ListaProductos, ProductoNutricional } from "@/lib/productos";
import ProductCard from "@/components/ProductCard";
import { ShoppingBag } from "lucide-react";
import Layout from "../layouts/Layout";

const ITEMS_PER_PAGE = 8;

const Tienda = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { search } = useLocation();
  const searchQuery = new URLSearchParams(search).get("search")?.toLowerCase() || "";

  // Categorías
  const categories = useMemo(() => {
    const cats = ListaProductos.map((p) => p.categoriaPorPatologia);
    return ["all", ...new Set(cats)];
  }, []);

  // FILTRO PRINCIPAL: por categoría + por búsqueda
  const filteredProducts = useMemo(() => {
    let result = ListaProductos;

    // Filtrar por categoría
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
  }, [selectedCategory, searchQuery]);

  // Paginación
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  return (
    <Layout>
      <main className="container py-8">



        {/* Categorías */}
        <div className="mb-6 flex justify-center gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full border border-border ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-hover"
                  : "bg-background text-foreground hover:bg-primary/10"
              } transition`}
            >
              {cat}
            </button>
          ))}
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
