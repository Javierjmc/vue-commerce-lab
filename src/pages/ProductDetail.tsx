import { useParams, useNavigate, Link } from "react-router-dom";
import { ListaProductos, ProductoNutricional } from "@/lib/productos";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  ArrowLeft, 
  Check, 
  BookText, 
  FlaskConical, 
  Sparkles, 
  Pill, 
  MessageSquare,
  Leaf,
  Shield,
  Truck,
  Heart,
  Clock,
  Star,
  ChevronRight,
  AlertCircle,
  Package
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useState, useRef, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ImageMagnifier from "@/components/ui/ImageMagnifier";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import FeaturesBanner from "@/components/FeaturesBanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const mainCarouselRef = useRef<any>(null);

  const product = ListaProductos.find((p) => p.id.toString() === id);

  useEffect(() => {
    if (mainCarouselRef.current) {
      mainCarouselRef.current.scrollTo(currentImageIndex);
    }
  }, [currentImageIndex]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-16 text-center">
          <div className="max-w-md mx-auto">
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Producto no encontrado</h1>
            <p className="text-muted-foreground mb-6">
              Lo sentimos, el producto que buscas no existe o ha sido eliminado.
            </p>
            <Button onClick={() => navigate("/tienda")} className="gradient-cta">
              Volver a la tienda
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const currentStock: number = 999;

  const relatedProducts = ListaProductos.filter(
    (p) =>
      p.categoriaPorPatologia === product.categoriaPorPatologia &&
      p.id !== product.id
  ).slice(0, 4);

  // Feature badges data
  const featureBadges = [
    { icon: Leaf, label: "100% Natural" },
    { icon: Shield, label: "Sin GMO" },
    { icon: Heart, label: "Vegano" },
    { icon: Star, label: "Premium" },
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--product-bg))] flex flex-col">
      <Navbar />

      {/* Breadcrumb */}
      <div className="container px-4 md:px-6 py-4">
        <nav className="breadcrumb-container">
          <Link to="/" className="breadcrumb-link">Inicio</Link>
          <ChevronRight className="w-4 h-4 breadcrumb-separator" />
          <Link to="/tienda" className="breadcrumb-link">Tienda</Link>
          <ChevronRight className="w-4 h-4 breadcrumb-separator" />
          <Link to={`/tienda?categoria=${product.categoriaPorPatologia}`} className="breadcrumb-link">
            {product.categoriaPorPatologia}
          </Link>
          <ChevronRight className="w-4 h-4 breadcrumb-separator" />
          <span className="breadcrumb-current truncate max-w-[200px]">{product.titulo}</span>
        </nav>
      </div>

      <main className="container flex-1 px-4 md:px-6 pb-8">
        {/* Main product section */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          
          {/* Left column - Gallery */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-[80px_1fr] gap-4">
              {/* Thumbnails */}
              <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
                {product.imagenes.map((image, index) => (
                  <button
                    key={index}
                    className={`product-thumbnail ${
                      currentImageIndex === index 
                        ? "product-thumbnail-active" 
                        : "product-thumbnail-inactive"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`Vista ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="product-gallery">
                <Carousel 
                  className="w-full" 
                  setApi={(api) => {
                    if (api) {
                      api.on("select", () => {
                        setCurrentImageIndex(api.selectedScrollSnap());
                      });
                      mainCarouselRef.current = api;
                    }
                  }}
                >
                  <CarouselContent>
                    {product.imagenes.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-square overflow-hidden bg-card rounded-2xl">
                          <ImageMagnifier
                            src={image}
                            alt={`${product.titulo} - ${index + 1}`}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-card/90 hover:bg-card shadow-md" />
                  <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-card/90 hover:bg-card shadow-md" />
                </Carousel>

                {/* Image counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-foreground/80 text-background text-sm font-medium">
                  {currentImageIndex + 1} / {product.imagenes.length}
                </div>
              </div>
            </div>

            {/* Feature badges - below gallery */}
            <div className="mt-6 grid grid-cols-4 gap-3">
              {featureBadges.map((badge, index) => (
                <div key={index} className="feature-badge">
                  <badge.icon className="feature-badge-icon" />
                  <span className="feature-badge-text">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Product info & Purchase panel */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Product header */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-secondary/10 text-secondary border-0 font-semibold">
                    {product.categoriaPorPatologia}
                  </Badge>
                  <Badge variant="outline" className="font-medium">
                    {product.subcategoriaPorPatologia}
                  </Badge>
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                  {product.titulo}
                </h1>

                <p className="text-lg text-gray-800 leading-relaxed">
                  {product.subtituloComplemento}
                </p>

                {/* Rating placeholder */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    (4.8) · 127 valoraciones
                  </span>
                </div>
              </div>

              {/* Purchase panel */}
              <div className="product-panel space-y-5">
                {/* Urgency banner */}
                <div className="urgency-banner">
                  <AlertCircle className="w-5 h-5 text-[hsl(var(--warning))] flex-shrink-0" />
                  <span>
                    <strong className="text-[hsl(var(--warning))]">¡Date prisa!</strong> Este producto se ha comprado 43 veces en las últimas 24h
                  </span>
                </div>

                {/* Price section */}
                <div className="flex items-baseline gap-4 flex-wrap">
                  <span className="price-display">{product.pvp}</span>
                  {/* Simulated original price */}
                  <span className="price-original">24,90€</span>
                  <span className="discount-badge">-20%</span>
                </div>
                <p className="savings-badge flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  ¡Ahorras 5,00€!
                </p>

                {/* Quantity selector */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">Cantidad</label>
                  <div className="quantity-selector">
                    <button
                      className="quantity-btn"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <span className="quantity-display">{quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                      disabled={quantity >= currentStock}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to cart button */}
                <button
                  className="add-to-cart-btn flex items-center justify-center gap-3 animate-pulse-glow"
                  onClick={handleAddToCart}
                  disabled={currentStock === 0}
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span>AÑADIR</span>
                  <span className="text-xl">→</span>
                  <span>{product.pvp}</span>
                </button>

                {/* Stock & shipping info */}
                <div className="space-y-3 pt-2">
                  <div className="stock-indicator stock-indicator-available">
                    <Check className="w-5 h-5" />
                    <span>En stock. Envío inmediato.</span>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Cons. Pref.: 12/2026</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      <span>60 cápsulas</span>
                    </div>
                  </div>
                </div>

                {/* Trust indicators */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="w-5 h-5 text-secondary" />
                    <span>Envío gratis +60€</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-5 h-5 text-secondary" />
                    <span>Pago 100% seguro</span>
                  </div>
                </div>
              </div>

              {/* Additional info */}
              <div className="text-sm text-muted-foreground space-y-1 bg-card rounded-xl p-4 border border-border">
                <p><strong className="text-foreground">Clasificación:</strong> {product.clasificacionFuncionPrincipal}</p>
                <p><strong className="text-foreground">Subtítulo:</strong> {product.subtitulo}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Banner */}
        <section className="mt-12">
          <FeaturesBanner />
        </section>

        {/* Tabs Section */}
        <section className="mt-12 md:mt-16">
          <Tabs defaultValue="descripcion" className="w-full">
            <TabsList className="product-tabs-list w-full lg:w-auto lg:inline-flex">
              <TabsTrigger value="descripcion" className="product-tab-trigger">
                <BookText className="h-4 w-4" /> 
                <span className="hidden sm:inline">Descripción</span>
              </TabsTrigger>
              <TabsTrigger value="ingredientes" className="product-tab-trigger">
                <FlaskConical className="h-4 w-4" /> 
                <span className="hidden sm:inline">Ingredientes</span>
              </TabsTrigger>
              <TabsTrigger value="beneficios" className="product-tab-trigger">
                <Sparkles className="h-4 w-4" /> 
                <span className="hidden sm:inline">Beneficios</span>
              </TabsTrigger>
              <TabsTrigger value="como-tomar" className="product-tab-trigger">
                <Pill className="h-4 w-4" /> 
                <span className="hidden sm:inline">Cómo tomar</span>
              </TabsTrigger>
              <TabsTrigger value="preguntas-frecuentes" className="product-tab-trigger">
                <MessageSquare className="h-4 w-4" /> 
                <span className="hidden sm:inline">FAQs</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="descripcion" className="product-tab-content animate-fade-in-up">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Descripción del Producto</h3>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                {product.descripcionExtendida ? (
                  <p>{product.descripcionExtendida}</p>
                ) : (
                  <>
                    <p className="mb-4">
                      <strong className="text-foreground">{product.titulo}</strong> es un complemento alimenticio de alta calidad, 
                      formulado con ingredientes naturales cuidadosamente seleccionados para apoyar tu bienestar general.
                    </p>
                    <p className="mb-4">
                      {product.textoDePresentacionCta}
                    </p>
                    <p>
                      Nuestra fórmula exclusiva combina la tradición herbolaria con la investigación científica más avanzada, 
                      garantizando la máxima eficacia y pureza en cada cápsula.
                    </p>
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="ingredientes" className="product-tab-content animate-fade-in-up">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Ingredientes Clave</h3>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                {product.ingredientesClave && product.ingredientesClave.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {product.ingredientesClave.map((ingrediente, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                        <Leaf className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span>{ingrediente}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {["Extractos naturales de alta biodisponibilidad", "Vitaminas y minerales esenciales", "Antioxidantes potentes", "Sin aditivos artificiales"].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                        <Leaf className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="beneficios" className="product-tab-content animate-fade-in-up">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Beneficios Principales</h3>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                {product.beneficiosClave && product.beneficiosClave.length > 0 ? (
                  <div className="space-y-4">
                    {product.beneficiosClave.map((beneficio, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-secondary/5 border border-secondary/20">
                        <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span>{beneficio}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {[
                      "Apoya el funcionamiento óptimo del organismo",
                      "Ingredientes 100% naturales y de alta calidad",
                      "Fórmula respaldada por estudios científicos",
                      "Sin efectos secundarios conocidos"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-secondary/5 border border-secondary/20">
                        <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="como-tomar" className="product-tab-content animate-fade-in-up">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Dosis y Uso Recomendado</h3>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <div className="p-6 rounded-xl bg-secondary/5 border border-secondary/20">
                  <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <Pill className="w-5 h-5 text-secondary" />
                    Modo de empleo
                  </h4>
                  <p>
                    Tomar {product.dosis || "1-2 cápsulas"} al día, preferiblemente con las comidas principales 
                    y acompañado de un vaso de agua.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-muted/50">
                    <h5 className="font-semibold text-foreground mb-2">✓ Recomendaciones</h5>
                    <ul className="space-y-1 text-sm">
                      <li>• Mantener una dieta equilibrada</li>
                      <li>• Hidratarse correctamente</li>
                      <li>• Ser constante en la toma</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50">
                    <h5 className="font-semibold text-foreground mb-2">⚠️ Precauciones</h5>
                    <ul className="space-y-1 text-sm">
                      <li>• No exceder la dosis recomendada</li>
                      <li>• Consultar en caso de embarazo</li>
                      <li>• Mantener fuera del alcance de los niños</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preguntas-frecuentes" className="product-tab-content animate-fade-in-up">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Preguntas Frecuentes</h3>
              <Accordion type="single" collapsible className="w-full space-y-3">
                {[
                  {
                    question: "¿Puedo tomar este producto si tengo alguna condición médica?",
                    answer: "Si tiene alguna condición médica preexistente, está embarazada o en período de lactancia, o está tomando otros medicamentos, consulte a su médico antes de consumir este producto."
                  },
                  {
                    question: "¿Cuánto tiempo tardaré en ver resultados?",
                    answer: "Los resultados pueden variar según la persona y su estilo de vida. Se recomienda un uso continuo durante al menos 4-8 semanas para observar los beneficios completos del producto."
                  },
                  {
                    question: "¿Tiene efectos secundarios?",
                    answer: "Este producto está formulado con ingredientes naturales y generalmente es bien tolerado. Sin embargo, en caso de experimentar alguna reacción adversa, suspenda su uso y consulte a un profesional de la salud."
                  },
                  {
                    question: "¿Este producto es apto para vegetarianos/veganos?",
                    answer: "Sí, nuestros productos están formulados pensando en todos. La información detallada sobre alérgenos y dietas se encuentra en la etiqueta del producto."
                  },
                  {
                    question: "¿Cuál es la política de devolución?",
                    answer: "Ofrecemos una garantía de satisfacción de 30 días. Si no está satisfecho con su compra, puede solicitar un reembolso completo sin preguntas."
                  }
                ].map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-xl px-6 bg-card">
                    <AccordionTrigger className="text-left hover:no-underline hover:text-secondary py-5">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-products-section">
            <div className="flex items-center justify-between mb-8">
              <h2 className="related-products-title">Productos Relacionados</h2>
              <Link 
                to={`/tienda?categoria=${product.categoriaPorPatologia}`}
                className="text-sm font-semibold text-secondary hover:underline flex items-center gap-1"
              >
                Ver todos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default ProductDetail;