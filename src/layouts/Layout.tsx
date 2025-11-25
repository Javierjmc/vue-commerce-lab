import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MessageCircle } from "lucide-react"; // Usaremos MessageCircle como un icono de chat genérico

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <main className="flex-1">{children}</main>

      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/XXXXXXXXXXX" // Reemplaza XXXXXXXXXXX con tu número de WhatsApp
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-600"
        aria-label="Chatear por WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
