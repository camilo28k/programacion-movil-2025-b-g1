import React from "react";
import FormCompanyCards, { CompanyFormValues } from "./Cards/FormCompanyCards";
import { companyService } from "../api/AuthService";


const Create_company: React.FC = () => {
  const handleSubmit = async (values: CompanyFormValues) => {
    try {
      await companyService.create(values);
      console.log("✅ Empresa creada:", values);
    } catch (error) {
      console.error("❌ Error al crear empresa:", error);
    }
  };

  return <FormCompanyCards onSubmit={handleSubmit} />;
};

export default Create_company;



