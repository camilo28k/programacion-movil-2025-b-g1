import React from "react";
import { useHistory } from "react-router-dom";
import "../../theme/companyCard.css"; // reutilizamos los estilos base

interface ProductCardProps {
  imageSrc: string;      // Imagen del producto
  name: string;          // Nombre del producto (p. ej. "Salchipapa Mixta")
  price: string;         // Precio formateado (p. ej. "$ 20.000")
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  name,
  price,
}) => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/products_details"); // 👈 redirige al detalle
  };

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

        <button className="company-card-btn" onClick={handleClick}>
          Detalles
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
