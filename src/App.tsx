import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Tienda from "./pages/Tienda";
import Nosotras from "./pages/Nosotras";
import Testimonios from "./pages/Testimonios";
import Privacidad from "./pages/Privacidad";
import Contacto from "./pages/Contacto"; // Importar la nueva página de Contacto
import Blog from "./pages/Blog"; // Importar la página principal del Blog
import ArticleDetail from "./pages/ArticleDetail"; // Importar la página de detalle del artículo
import ComboDetail from "./pages/ComboDetail"; // Restaurar la importación de la página de detalle del Combo
import ScrollToTop from "./components/ScrollToTop";
import Login from './pages/Login';
import Register from './pages/Register';
import Naturdix from './pages/Naturdix';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/nosotras" element={<Nosotras />} />
          <Route path="/testimonios" element={<Testimonios />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/contacto" element={<Contacto />} /> {/* Añadir la ruta de Contacto */}
          <Route path="/blog" element={<Blog />} /> {/* Ruta para la página principal del Blog */}
          <Route path="/blog/:id" element={<ArticleDetail />} /> {/* Ruta para el detalle del artículo */}
          <Route path="/combo/:id" element={<ComboDetail />} /> {/* Restaurar la ruta para el detalle del Combo */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/naturdix" element={<Naturdix />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
