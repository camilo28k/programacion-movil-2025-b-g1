import React from 'react';
import AuthLayout from '../layout/AuthLayout';
import RegisterForm from '../components/RegisterForm';


const Register: React.FC = () => (
  <AuthLayout backTo="/login">
    <RegisterForm />
  </AuthLayout>
);

export default Register;