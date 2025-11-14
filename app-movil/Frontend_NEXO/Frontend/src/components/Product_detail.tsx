import React from "react";
import ProductDetailCard from "./Cards/ProductDetailCard";
import "../theme/productDetail.css";

const Product_detail: React.FC = () => {
  return (
    <div className="pd-wrap">
      <ProductDetailCard
        imageSrc="/assets/salchipapa.png"
        name="Salchipapa Mixta"
        description="Chorizo las brisas, Carne desmechada, Papa a la francesa, Salsas"
        oldPrice="$ 20.000"
        price="$ 18.000"
        onContact={() => console.log("Contactar por WhatsApp / Teléfono")}
      />
    </div>
  );
};

export default Product_detail;
