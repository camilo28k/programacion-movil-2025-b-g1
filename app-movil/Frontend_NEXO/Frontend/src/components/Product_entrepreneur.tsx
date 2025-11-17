// src/pages/Product_entrepreneur.tsx
import React, { useEffect, useState } from "react";
import ProductCard from "../components/Cards/ProductCard";
import "../theme/companyCard.css";
import { productService } from "../api/AuthService";
import { useLocation, useHistory } from "react-router-dom";

interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  is_promotion?: boolean;
  promotion_price?: number | null;
  url?: string;
  company_id: string;
}

interface LocationState {
  companyId?: string;
  companyName?: string;
}

const Product_entrepreneur: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const location = useLocation<LocationState>();
  const history = useHistory();

  // 1️⃣ Intentar desde location.state
  let { companyId, companyName } = location.state || {};

  // 2️⃣ Si no viene en state, intentamos desde localStorage
  if (!companyId) {
    const saved = localStorage.getItem("selectedCompany");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { id: string; name: string };
        companyId = parsed.id;
        companyName = parsed.name;
      } catch (e) {
        console.error("Error leyendo selectedCompany de localStorage", e);
      }
    }
  }

  useEffect(() => {
    if (!companyId) return; // no pedimos productos si no sabemos la empresa

    productService
      .getAll()
      .then((res) => {
        let data: Product[] = res.data;
        data = data.filter((p) => p.company_id === companyId);
        setProducts(data);
      })
      .catch((err) => console.error("Error al obtener productos", err));
  }, [companyId]);

  if (!companyId) {
    return (
      <p style={{ padding: 16 }}>
        No se ha seleccionado ninguna empresa. Vuelve y entra desde una empresa.
      </p>
    );
  }

  // dentro de Product_entrepreneur.tsx

  const goToDetail = (prod: Product) => {
    const phone = localStorage.getItem("user_phone") || undefined;

    history.push("/products_details", {
      productId: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
      is_promotion: prod.is_promotion,
      promotion_price: prod.promotion_price,
      url: prod.url,
      companyName,
      phone, // 👈 aquí va el número del emprendedor
    });
  };


  return (
    <div className="companies-container">
      {products.map((prod) => (
        <ProductCard
          key={prod.id}
          imageSrc={prod.url || "/assets/default.png"}
          name={prod.title}
          price={
            prod.is_promotion && prod.promotion_price != null
              ? `$ ${prod.promotion_price} (antes $${prod.price})`
              : `$ ${prod.price}`
          }
          onClick={() => goToDetail(prod)}
        />
      ))}
    </div>
  );
};

export default Product_entrepreneur;
