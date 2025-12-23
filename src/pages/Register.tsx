import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import Layout from '../layouts/Layout'; // Asegúrate de que la ruta sea correcta

const Register: React.FC = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] py-12">
        <RegisterForm />
      </div>
    </Layout>
  );
};

export default Register;