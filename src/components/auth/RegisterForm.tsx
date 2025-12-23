import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import logo from "../../assets/logo-herbolario.png";
import { ChatbotWidget } from '@/components/chatbot/ChatbotWidget';
import { useAuth } from '@/context/AuthContext';

const Register: React.FC = () => {
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validación básica
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      await register(email, password, name); // Si tu register soporta nombre, si no solo email y password
      setSuccess('¡Registro exitoso! Ahora puedes iniciar sesión.');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error, inténtalo de nuevo.');
    }
  };

  return (
    <div className="flex flex-col items-center dark:bg-gray-900 relative w-full min-h-screen">
      <div className="absolute top-8 left-16">
        <Link to="/">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </Link>
      </div>
      <div className="flex items-center justify-center flex-grow">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <img src={logo} alt="Logo de la empresa" className="h-24" />
            </div>
            <CardTitle className="text-3xl font-bold">Regístrate</CardTitle>
            <CardDescription>Crea tu cuenta para disfrutar de todas nuestras funcionalidades.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Tu Nombre Completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                {error && <p className="text-red-600 text-sm text-center font-medium">{error}</p>}
                {success && <p className="text-green-600 text-sm text-center font-medium">{success}</p>}

                <Button type="submit" className="w-full mt-2">
                  Registrarse
                </Button>

                <div className="mt-4 text-center text-sm">
                  ¿Ya tienes una cuenta?{" "}
                  <Link to="/login" className="underline">
                    Inicia Sesión
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <ChatbotWidget />
    </div>
  );
};

export default Register;
