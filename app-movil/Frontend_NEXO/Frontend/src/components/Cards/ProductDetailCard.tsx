import React from "react";
import "../../theme/productDetail.css";

export interface ProductDetailProps {
  imageSrc: string;          // imagen circular del producto
  name: string;              // "Salchipapa Mixta"
  description: string;       // texto con ingredientes / detalle
  oldPrice?: string;         // "$ 20.000" (opcional)
  price: string;             // "$ 18.000"
  phone?: string;            // número de WhatsApp del vendedor
  ctaText?: string;          // "Contactar" por defecto
}

const ProductDetailCard: React.FC<ProductDetailProps> = ({
  imageSrc,
  name,
  description,
  oldPrice,
  price,
  phone = "573202817466", // 👈 número por defecto (ejemplo, cámbialo)
  ctaText = "Contactar",
}) => {
  // función para abrir WhatsApp
  const handleContact = () => {
    const message = `Hola 👋, estoy interesado en el producto *${name}* que vi en Nexo UH.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="pd-card">
      {/* avatar circular encima */}
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
