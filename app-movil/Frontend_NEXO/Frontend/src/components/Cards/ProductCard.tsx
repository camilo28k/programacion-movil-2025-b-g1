// src/components/Cards/ProductCard.tsx
import React from "react";
import "../../theme/companyCard.css";

interface ProductCardProps {
  imageSrc: string;      // Imagen del producto
  name: string;          // Nombre del producto
  price: string;         // Precio formateado
  onClick?: () => void;  // 👉 el padre maneja la navegación al detalle
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  name,
  price,
  onClick,
}) => {
  return (
    <div className="company-card">
      <div className="company-card-image">
        <img src={imageSrc} alt={name} />
      </div>

      <div className="company-card-body">
        <h3 className="company-card-title">{name}</h3>
        <p
          style={{
            fontSize: "15px",
            fontWeight: "600",
            color: "#a34a2b",
            margin: "4px 0 10px",
          }}
        >
          {price}
        </p>

        <button
          className="company-card-btn"
          onClick={onClick}
        >
          Detalles
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
