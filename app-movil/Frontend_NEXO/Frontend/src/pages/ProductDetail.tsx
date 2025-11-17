// src/pages/ProductDetail.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import Product_detail from "../components/Product_detail";

interface LocationState {
  companyName?: string;
}

// src/pages/ProductDetail.tsx
const ProductDetail: React.FC = () => {
  const location = useLocation<LocationState>();

  let { companyName } = location.state || {};

  if (!companyName) {
    const saved = localStorage.getItem("selectedCompany");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { id: string; name: string };
        companyName = parsed.name;
      } catch (e) {
        console.error("Error leyendo selectedCompany en ProductDetail", e);
      }
    }
  }

  return (
    <HomeLayout
      // ❌ backTo="/products_entrepreneurs"
      heroImages={[
        "/assets/hamburguesa.png",
        "/assets/reloj.png",
        "/assets/zapato.png",
      ]}
      logoSrc="/assets/logo_blanco.png"
      title="Descubre lo que este emprendimiento tiene"
      titleHighlight="para ti"
      headerTitle={companyName ? `Empresa: ${companyName}` : "Empresa"}
    >
      <Product_detail />
    </HomeLayout>
  );
};


export default ProductDetail;
