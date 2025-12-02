import ProductCardNaturdix from "./ProductCardNaturdix";
import { ListaProductos, ProductoNutricional } from "@/lib/productos";

// Helper function to parse price string to number
const parsePrice = (priceString: string): number | undefined => {
  const cleanedPrice = priceString.replace("€", "").replace(",", ".").trim();
  const price = parseFloat(cleanedPrice);
  return isNaN(price) ? undefined : price;
};

const FeaturedProducts = () => {
  // Filtrar los productos para incluir solo los que tienen al menos una imagen
  const productsToDisplay = ListaProductos.filter(product => product.imagenes && product.imagenes.length > 0);

  return (
    <section id="productos" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="bg-accent text-accent-foreground py-3 px-6 rounded-lg mb-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide">
            Producto de Alta Temporada
          </h2>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {productsToDisplay.map((product: ProductoNutricional, index) => (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 100}ms` }}
              className="animate-fade-in"
            >
              <ProductCardNaturdix
                image={product.imagenes[0]}
                name={product.titulo}
                description={product.subtitulo}
                price={parsePrice(product.pvp) || 0} // Default to 0 if parsing fails
                originalPrice={parsePrice(product.precioCosto)}
                badge={product.destacado ? "DESTACADO" : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
