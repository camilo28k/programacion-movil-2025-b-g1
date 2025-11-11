import React from "react";
import HomeLayout from "../layout/HomeLayout";
import Product_detail from "../components/Product_detail";

const ProductDetail: React.FC = () => {
  return (
    <HomeLayout
      backTo="/products_entrepreneurs"
      heroImages={[
        "/assets/salchipapa.png",
        "/assets/hamburguesa.png",
        "/assets/reloj.png",
      ]}
      logoSrc="/assets/logo_blanco.png"
      title="Prueba las mejores comidas de la universidad"
      titleHighlight="Corhuila"
      /* sin headerAction: este detalle no lleva botón de + */
    >
      <Product_detail />
    </HomeLayout>
  );
};

export default ProductDetail;
