import React from 'react';
import AuthLayout from '../layout/AuthLayout';
import LoginForm from '../components/LoginForm';

const Login: React.FC = () => (
  <AuthLayout backTo="/enter">
    <LoginForm />
  </AuthLayout>
);

export default Login;
