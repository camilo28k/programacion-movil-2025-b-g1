// src/pages/CompanyPov1.tsx
import React from "react";
import { useHistory } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import Company_entrepreneur from "../components/Company_entrepreneur";

const CompanyPov1: React.FC = () => {
  const history = useHistory();

  // 🔹 Función para navegar al formulario
  const handleAddCompany = () => {
    history.push("/companies_form");
  };

  return (
    <HomeLayout
      backTo="/home_entrepreneurs"
      heroImages={[
        "/assets/hamburguesa.png",
        "/assets/reloj.png",
        "/assets/zapato.png",
      ]}
      logoSrc="/assets/logo_blanco.png"
      title="Lo mejor de nuestros"
      titleHighlight="estudiantes"
      titleAfter="en un solo lugar"
      headerAction={
        <button
          className="home-actionBtn"
          onClick={handleAddCompany} // 👈 aquí la acción
          aria-label="Agregar compañía"
          title="Agregar compañía"
        >
          +
        </button>
      }
    >
      <Company_entrepreneur />
    </HomeLayout>
  );
};

export default CompanyPov1;
