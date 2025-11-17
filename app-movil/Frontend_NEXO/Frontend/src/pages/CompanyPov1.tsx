// src/pages/CompanyPov1.tsx
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import Company_entrepreneur from "../components/Company_entrepreneur";

interface LocationState {
  categoryId?: string;
  categoryName?: string;
}

const CompanyPov1: React.FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();

  // 1️⃣ Intentar obtenerlos del state
  const stateCategoryName = location.state?.categoryName;

  // 2️⃣ Fallback: intentar desde localStorage
  const storedCategory = localStorage.getItem("selectedCategory");
  const fallbackCategory = storedCategory ? JSON.parse(storedCategory) : null;

  const categoryName = stateCategoryName || fallbackCategory?.name;

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
      headerTitle={
        categoryName
          ? `Categoría: ${categoryName}`
          : "Categoría"
      } 
      headerAction={
        <button
          className="home-actionBtn"
          onClick={handleAddCompany}
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
