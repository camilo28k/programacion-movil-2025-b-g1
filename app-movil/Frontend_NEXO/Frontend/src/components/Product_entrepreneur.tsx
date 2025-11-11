import React from "react";
import ProductCard from "../components/Cards/ProductCard";
import "../theme/companyCard.css";

const Product_entrepreneur: React.FC = () => {
  return (
    <div className="companies-container">
      <ProductCard
        imageSrc="/assets/salchipapa.png"
        name="Salchipapa Mixta"
        price="$ 20.000"
        onClick={() => console.log("Detalles de Salchipapa Mixta")}
      />

      <ProductCard
        imageSrc="/assets/salchipapa.png"
        name="Salchipapa Costeña"
        price="$ 25.000"
        onClick={() => console.log("Detalles de Salchipapa Costeña")}
      />
    </div>
  );
};

export default Product_entrepreneur;
