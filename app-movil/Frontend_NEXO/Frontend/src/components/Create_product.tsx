// src/components/Create_product.tsx
import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import FormProductCard, { ProductFormValues } from "./Cards/FormProductCards";
import { productService } from "../api/AuthService";

interface LocationState {
  companyId?: string;
  companyName?: string;
}

const Create_product: React.FC = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();

  // 1️⃣ Intentar desde state
  let { companyId, companyName } = location.state || {};

  // 2️⃣ Fallback a localStorage
  if (!companyId) {
    const saved = localStorage.getItem("selectedCompany");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { id: string; name: string };
        companyId = parsed.id;
        companyName = parsed.name;
      } catch (e) {
        console.error("Error leyendo selectedCompany en Create_product", e);
      }
    }
  }

  const handleSubmit = async (values: ProductFormValues) => {
    if (!companyId) {
      alert(
        "No se ha seleccionado ninguna empresa. Vuelve atrás y entra desde una empresa."
      );
      throw new Error("Sin companyId"); // para que el form NO muestre éxito
    }

    const payload = {
      title: values.title,
      description: values.description || undefined,
      price: Number(values.price),
      is_promotion: values.promo ? true : false,
      promotion_price: values.promo ? Number(values.promo) : undefined,
      url: values.imageUrl || undefined,
      company_id: companyId,
    };

    await productService.create(payload);
    console.log("✅ Producto creado:", payload);

    // Volvemos a la lista manteniendo la empresa actual
    history.push("/products_entrepreneurs", {
      companyId,
      companyName,
    });
  };

  return <FormProductCard onSubmit={handleSubmit} />;
};

export default Create_product;
