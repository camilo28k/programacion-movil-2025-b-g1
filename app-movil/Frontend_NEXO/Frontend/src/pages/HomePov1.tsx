// src/pages/Home.tsx
import React from 'react';
import HomeLayout from '../layout/HomeLayout';
import Home_entrepreneur from '../components/Home_ entrepreneur';

const HomePov1: React.FC = () => (
    <HomeLayout
        backTo="/login"
        heroImages={[
            "/assets/hamburguesa.png",
            "/assets/reloj.png",
            "/assets/zapato.png",
        ]}
        heroImageSrc="/assets/hamburguesa.png"
        logoSrc="/assets/logo_blanco.png"
        title="Lo mejor de nuestros"
        titleHighlight="estudiantes"
        titleAfter="en un solo lugar"

    >
        {/* 👇 Aquí va el contenido de las categorías */}
      <Home_entrepreneur />
    </HomeLayout>
);

export default HomePov1;
