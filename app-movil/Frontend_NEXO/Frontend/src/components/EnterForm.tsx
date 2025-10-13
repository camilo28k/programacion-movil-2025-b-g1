import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import EnterLayout from '../layout/EnterLayout';
import '../theme/enter.css';

const EnterForm: React.FC = () => {
  const history = useHistory();
  const [background, setBackground] = useState('/assets/hamburguesa.png');

  const images = [
    '/assets/hamburguesa.png',
    '/assets/reloj.png',
    '/assets/zapato.png',
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      setBackground(images[index]);
    }, 3000); // cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    history.push('/login');
  };

  return (
    <EnterLayout background={background}>
      {/* Logo arriba */}
      <div className="enter-logo">
        <img src="/assets/logo_blanco.png" alt="CORHUILA" />
      </div>

      {/* Botón abajo */}
      <button className="enter-button" onClick={handleEnter}>
        Entrar
      </button>
    </EnterLayout>
  );
};

export default EnterForm;
