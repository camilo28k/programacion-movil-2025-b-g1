// src/components/Create_company.tsx
import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import FormCompanyCards, { CompanyFormValues } from "./Cards/FormCompanyCards";
import { companyService } from "../api/AuthService";

interface LocationState {
  categoryId?: string;
  categoryName?: string;
}

const Create_company: React.FC = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();
  const stateCategoryId = location.state?.categoryId;
  const stateCategoryName = location.state?.categoryName;

  const storedCategory = localStorage.getItem("selectedCategory");
  const fallbackCategory = storedCategory ? JSON.parse(storedCategory) : null;

  const categoryId = stateCategoryId || fallbackCategory?.id;
  const categoryName = stateCategoryName || fallbackCategory?.name;

  const handleSubmit = async (values: CompanyFormValues) => {
    if (!categoryId) {
      alert(
        "No se ha seleccionado ninguna categoría. Vuelve atrás y entra desde una categoría."
      );
      throw new Error("Sin categoryId");
    }

    const payload = {
      name: values.name,
      description: values.description,
      url: values.url,
      category_id: categoryId, // 👈 aquí se asocia la empresa a la categoría
    };

    await companyService.create(payload);
    console.log("✅ Empresa creada:", payload);

    // Volver a la lista de empresas de esa categoría
    history.push("/companies_entrepreneurs", {
      categoryId,
      categoryName,
    });
  };

  return <FormCompanyCards onSubmit={handleSubmit} />;
};

export default Create_company;
