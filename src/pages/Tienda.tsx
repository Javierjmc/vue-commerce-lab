import { useState, useMemo } from "react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { ShoppingBag } from "lucide-react";
import Layout from "../layouts/Layout";

const ITEMS_PER_PAGE = 8; // Número de productos por página

const Tienda = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const cats = products.map((p) => p.category);
    return ["all", ...new Set(cats)];
  }, []);

  // Filtrar productos por categoría
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Paginación
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  return (
    <Layout>
      <main className="container py-8">
        {/* Banner */}
        <div className="mb-8 text-center animate-fade-in">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-primary/10 p-3 shadow-card">
              <ShoppingBag className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="mb-2 text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Bienvenido a Herbolario Vitasfera
          </h1>
          <p className="text-lg text-secondary-foreground">
            Los mejores productos tecnológicos al mejor precio
          </p>
        </div>

        {/* Filtros por categoría */}
        <div className="mb-6 flex justify-center gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1); // Resetear a la primera página al cambiar categoría
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

        {/* Productos */}
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
            <span>
              {currentPage} / {totalPages}
            </span>
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
