import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { updatePassword } from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseConfig";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Si no hay usuario autenticado, redirigir a login
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Acceso denegado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Debes estar autenticado para acceder al dashboard
              </p>
              <Button onClick={() => navigate("/login")} className="w-full">
                Ir a Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validaciones
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({
        type: "error",
        text: "Todos los campos son requeridos",
      });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({
        type: "error",
        text: "La nueva contraseña debe tener al menos 6 caracteres",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({
        type: "error",
        text: "Las contraseñas no coinciden",
      });
      return;
    }

    if (newPassword === currentPassword) {
      setMessage({
        type: "error",
        text: "La nueva contraseña debe ser diferente a la actual",
      });
      return;
    }

    setLoading(true);
    try {
      // Firebase require re-authenticación para cambiar contraseña
      // Primero, el usuario debe re-iniciar sesión
      // Usamos updatePassword directamente (requiere re-autenticación reciente)
      await updatePassword(user, newPassword);

      setMessage({
        type: "success",
        text: "Contraseña cambiada exitosamente",
      });

      // Limpiar formulario
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error: any) {
      console.error("Error al cambiar contraseña:", error);

      if (error.code === "auth/requires-recent-login") {
        setMessage({
          type: "error",
          text: "Por seguridad, debes iniciar sesión nuevamente para cambiar la contraseña",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (error.code === "auth/weak-password") {
        setMessage({
          type: "error",
          text: "La contraseña es demasiado débil",
        });
      } else {
        setMessage({
          type: "error",
          text: "Error al cambiar la contraseña. Intenta de nuevo.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-8 md:py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver atrás
        </button>

        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                <CardTitle>Cambiar contraseña</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                {user.email}
              </p>
            </CardHeader>

            <CardContent>
              {message && (
                <Alert
                  className={`mb-6 ${
                    message.type === "success"
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <AlertDescription
                    className={
                      message.type === "success"
                        ? "text-green-800"
                        : "text-red-800"
                    }
                  >
                    {message.text}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                {/* Contraseña actual */}
                <div className="space-y-2">
                  <label
                    htmlFor="current-password"
                    className="block text-sm font-medium"
                  >
                    Contraseña actual
                  </label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Ingresa tu contraseña actual"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      disabled={loading}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Nueva contraseña */}
                <div className="space-y-2">
                  <label
                    htmlFor="new-password"
                    className="block text-sm font-medium"
                  >
                    Nueva contraseña
                  </label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Ingresa tu nueva contraseña"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={loading}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirmar contraseña */}
                <div className="space-y-2">
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium"
                  >
                    Confirmar contraseña
                  </label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirma tu nueva contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={loading}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Botones */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? "Cambiando..." : "Cambiar contraseña"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>

              <p className="text-xs text-muted-foreground mt-4">
                Por seguridad, deberás re-iniciar sesión si tu última
                autenticación fue hace más de una hora.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <ChatbotWidget />
    </div>
  );
};

export default Dashboard;
