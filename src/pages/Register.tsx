import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // Importa el icono de flecha izquierda

const Register: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8 relative">
      <div className="absolute top-8 left-16">
        <Link to="/">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </Link>
      </div>
      <div className="flex items-center justify-center flex-grow">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <img src="/src/assets/logo-herbolario.png" alt="Logo de la empresa" className="h-16" />
            </div>
            <CardTitle className="text-3xl font-bold">Regístrate</CardTitle>
            <CardDescription>Crea tu cuenta para disfrutar de todas nuestras funcionalidades.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Tu Nombre Completo"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@ejemplo.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input id="password" type="password" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                  <Input id="confirm-password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
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
    </div>
  );
};

export default Register;
