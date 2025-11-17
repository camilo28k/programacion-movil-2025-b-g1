// src/pages/ProductPov1.tsx
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import Product_entrepreneur from "../components/Product_entrepreneur";

interface LocationState {
  companyId?: string;
  companyName?: string;
}

const ProductPov1: React.FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();

  // 1️⃣ Intentar desde state
  let { companyId, companyName } = location.state || {};

  // 2️⃣ Fallback a localStorage
  if (!companyId) {
    const saved = localStorage.getItem("selectedCompany");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { id: string; name: string };
        companyId = parsed.id;
        companyName = parsed.name;
      } catch (e) {
        console.error("Error leyendo selectedCompany en ProductPov1", e);
      }
    }
  }

  const handleAddProduct = () => {
    if (!companyId) {
      alert("No se ha seleccionado ninguna empresa. Vuelve y entra desde una empresa.");
      return;
    }

    history.push("/products_form", {
      companyId,
      companyName,
    });
  };

  return (
    <HomeLayout
      backTo="/companies_entrepreneurs"
      heroImages={[
        "/assets/hamburguesa.png",
        "/assets/reloj.png",
        "/assets/zapato.png",
      ]}
      logoSrc="/assets/logo_blanco.png"
      title="Descubre lo que este emprendimiento tiene"
      titleHighlight="para ti"
      headerTitle={
        companyName
          ? `Empresa: ${companyName}`
          : "Empresa"
      }
      headerAction={
        <button
          className="home-actionBtn"
          onClick={handleAddProduct}
          aria-label="Agregar producto"
          title="Agregar producto"
        >
          +
        </button>
      }
    >
      <Product_entrepreneur />
    </HomeLayout>
  );
};

export default ProductPov1;
