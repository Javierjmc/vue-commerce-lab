import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Nosotras from "./pages/Nosotras";
import Testimonios from "./pages/Testimonios";
import Privacidad from "./pages/Privacidad";
import Contacto from "./pages/Contacto"; // Importar la nueva página de Contacto
import Blog from "./pages/Blog"; // Importar la página principal del Blog
import BlogPost from "./pages/BlogPost"; // Importar la página de detalle del artículo
import ComboDetail from "./pages/ComboDetail"; // Restaurar la importación de la página de detalle del Combo
import ScrollToTop from "./components/ScrollToTop";
import PrivateRoute from './components/auth/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Naturdix from './pages/Naturdix';
import Tienda from "./pages/Tienda";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ScrollToTop />
      <Routes>
          <Route path="/" element={<Index />} />          
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/nuestro-equipo" element={<Nosotras />} />
          <Route path="/testimonios" element={<Testimonios />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/contacto" element={<Contacto />} /> {/* Añadir la ruta de Contacto */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/combo/:id" element={<ComboDetail />} /> {/* Restaurar la ruta para el detalle del Combo */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/naturdix" element={<Naturdix />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
