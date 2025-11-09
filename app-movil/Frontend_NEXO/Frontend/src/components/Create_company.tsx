// src/pages/Create_company.tsx
import React from "react";
import FormCompanyCards, { CompanyFormValues } from "./Cards/FormCompanyCards";

const Create_company: React.FC = () => {
  const handleSubmit = (values: CompanyFormValues) => {
    // Aquí conectas al backend (POST /companies)
    // y/o subes values.photo a tu storage.
    console.log("➡️ submit form company:", values);
  };

  return <FormCompanyCards onSubmit={handleSubmit} />;
};

export default Create_company;
