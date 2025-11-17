// src/components/Cards/ProductDetailCard.tsx
import React from "react";
import "../../theme/productDetail.css";

export interface ProductDetailProps {
  imageSrc: string;
  name: string;
  description: string;
  oldPrice?: string;
  price: string;
  phone?: string;   // viene del usuario (registro / login)
  ctaText?: string;
}

const ProductDetailCard: React.FC<ProductDetailProps> = ({
  imageSrc,
  name,
  description,
  oldPrice,
  price,
  phone, // puedes dejar este fallback o quitarlo
  ctaText = "Contactar",
}) => {
  const handleContact = () => {
    if (!phone) {
      alert("No se encontró un número de contacto para este emprendedor.");
      return;
    }

    const message = `Hola, estoy interesado/a en el producto *${name}* que vi en Nexo UH.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="pd-card">
      <div className="pd-avatar">
        <img src={imageSrc} alt={name} />
      </div>

      <div className="pd-body">
        <h2 className="pd-title">{name}</h2>

        <p className="pd-desc">{description}</p>

        <div className="pd-priceRow">
          {oldPrice && <span className="pd-price-old">{oldPrice}</span>}
          {oldPrice && <span className="pd-price-sep"> - </span>}
          <span className="pd-price-new">{price}</span>
        </div>

        <button className="pd-btn" onClick={handleContact}>
          {ctaText}
        </button>
      </div>
    </div>
  );
};

export default ProductDetailCard;
