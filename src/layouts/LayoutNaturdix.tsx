import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot"; // Importar el nuevo componente Chatbot

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <main className="flex-1">{children}</main>

      {/* Chatbot flotante */}
      <Chatbot />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
