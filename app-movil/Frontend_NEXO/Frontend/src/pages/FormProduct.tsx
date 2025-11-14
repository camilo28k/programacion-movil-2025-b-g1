import React from "react";
import HomeLayout from "../layout/HomeLayout";
import Create_product from "../components/Create_product";

const FormProduct: React.FC = () => {
  return (
    <HomeLayout
      backTo="/products_entrepreneurs"
      heroImages={[
        "/assets/hamburguesa.png",
        "/assets/reloj.png",
        "/assets/zapato.png",
      ]}
      logoSrc="/assets/logo_blanco.png"
      title="Prueba las mejores comidas de la universidad"
      titleHighlight="Corhuila"
    >
      <Create_product />
    </HomeLayout>
  );
};

export default FormProduct;
