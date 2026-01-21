import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { User, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleNavigateDashboard = () => {
    navigate("/dashboard");
    setIsOpen(false);
  };

  if (!user) {
    return (
      <Button
        variant="ghost"
        size="icon"
        asChild
        className="p-2 md:p-3 rounded-full text-foreground/80 hover:bg-muted hover:text-primary transition-all duration-300 transform hover:scale-105"
      >
        <a href="/login" aria-label="Iniciar sesión">
          <User className="h-5 w-5 md:h-6 md:w-6" />
        </a>
      </Button>
    );
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menú de usuario"
        className="p-2 md:p-3 rounded-full text-foreground/80 hover:bg-muted hover:text-primary transition-all duration-300 transform hover:scale-105"
      >
        <User className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-4 border-b border-border">
            <p className="text-sm font-medium text-foreground truncate">
              {user.email}
            </p>
            <p className="text-xs text-muted-foreground">Cuenta activa</p>
          </div>

          <div className="p-2 space-y-1">
            <button
              onClick={handleNavigateDashboard}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors duration-200"
            >
              <Shield className="h-4 w-4" />
              Dashboard
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
