// src/components/Product_detail.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import ProductDetailCard from "./Cards/ProductDetailCard";
import "../theme/productDetail.css";

interface LocationState {
  productId?: string;
  title?: string;
  description?: string;
  price?: number;
  is_promotion?: boolean;
  promotion_price?: number | null;
  url?: string;
  companyName?: string;
  phone?: string;
}

const Product_detail: React.FC = () => {
  const location = useLocation<LocationState>();
  const {
    title,
    description,
    price,
    is_promotion,
    promotion_price,
    url,
    phone: statePhone,
  } = location.state || {};

  if (!title || price == null) {
    return (
      <p style={{ padding: 16 }}>
        No se encontró información del producto. Vuelve e intenta de nuevo.
      </p>
    );
  }

  const storedPhone = localStorage.getItem("user_phone") || undefined;
  const phone = statePhone || storedPhone;

  const priceText =
    is_promotion && promotion_price != null
      ? `$ ${promotion_price}`
      : `$ ${price}`;

  const oldPriceText =
    is_promotion && promotion_price != null ? `$ ${price}` : undefined;

  return (
    <div className="pd-wrap">
      <ProductDetailCard
        imageSrc={url || "/assets/default.png"}
        name={title}
        description={description || "Sin descripción"}
        oldPrice={oldPriceText}
        price={priceText}
        phone={phone}
      />
    </div>
  );
};

export default Product_detail;
