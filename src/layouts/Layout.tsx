import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      {/* Navbar */}
      <Navbar />
      {/* Contenido principal */}
      <main className="flex-1">{children}</main>
      {/* Chatbot flotante */}
      {/* <Chatbot /> */}
      <ChatbotWidget />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
