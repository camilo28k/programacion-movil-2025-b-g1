import React from 'react';
import AuthLayout from '../layout/AuthLayout';
import TokenForm from '../components/TokenForm';

const Token: React.FC = () => (
  <AuthLayout backTo="/register">
    <TokenForm />
  </AuthLayout>
);

export default Token;
