import React from "react";
import { useHistory } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import Product_entrepreneur from "../components/Product_entrepreneur";

const ProductPov1: React.FC = () => {
  const history = useHistory();

  // 🔹 Función para navegar al formulario de producto
  const handleAddProduct = () => {
    history.push("/products_form");
  };

  return (
    <HomeLayout
      backTo="/companies_entrepreneurs"
      heroImages={[
        "/assets/salchipapa.png", // imagen principal de la empresa
        "/assets/hamburguesa.png"
      ]}
      logoSrc="/assets/logo_blanco.png"
      title="Prueba las mejores comidas de la universidad"
      titleHighlight="Corhuila"
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
      <Product_entrepreneur/>

    </HomeLayout>
  );
};

export default ProductPov1;
