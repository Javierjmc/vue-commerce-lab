import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import logo from "../../assets/logo-herbolario.png";
import { ChatbotWidget } from '@/components/chatbot/ChatbotWidget';
import { useAuth } from '@/context/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await login(email, password);
      setSuccess('¡Inicio de sesión exitoso!');
      setEmail('');
      setPassword('');
      // Redirigir a la página deseada
      navigate('/dashboard'); // Cambia esta ruta si es necesario
    } catch (err: any) {
      setError(err.message || 'Email o contraseña incorrectos.');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen dark:bg-gray-900 relative w-full">
      <div className="absolute top-8 left-16">
        <Link to="/">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </Link>
      </div>
      <div className="flex items-center justify-center flex-grow">
        <Card className="w-full max-w-sm shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <img src={logo} alt="Logo de la empresa" className="h-24" />
            </div>
            <CardTitle className="text-3xl font-bold">Iniciar Sesión</CardTitle>
            <CardDescription>Introduce tu email y contraseña para acceder a tu cuenta.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
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
                  <Link to="#" className="text-sm text-blue-600 hover:underline text-right">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                {error && <p className="text-red-600 text-sm text-center font-medium">{error}</p>}
                {success && <p className="text-green-600 text-sm text-center font-medium">{success}</p>}

                <Button type="submit" className="w-full mt-2">
                  Iniciar Sesión
                </Button>

                <div className="mt-4 text-center text-sm">
                  ¿No tienes una cuenta?{" "}
                  <Link to="/register" className="underline">
                    Regístrate
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

export default Login;
