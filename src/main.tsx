import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.tsx"; // Importar AuthProvider
import { CartProvider } from "./context/CartContext.tsx"; // Importar CartProvider
import { BrowserRouter } from "react-router-dom"; // Importar BrowserRouter


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
