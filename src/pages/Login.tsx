import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import Layout from '../layouts/Layout'; // Asegúrate de que la ruta sea correcta

const Login: React.FC = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] py-12">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Login;