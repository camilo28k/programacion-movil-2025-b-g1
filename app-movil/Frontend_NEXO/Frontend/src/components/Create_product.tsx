import React from "react";
import FormProductCard, { ProductFormValues } from "./Cards/FormProductCards";

const Create_product: React.FC = () => {
  const handleSubmit = async (values: ProductFormValues) => {
    // Por ahora solo simulamos la creación
    console.log("✅ Producto creado (simulado):", values);
  };

  return <FormProductCard onSubmit={handleSubmit} />;
};

export default Create_product;
