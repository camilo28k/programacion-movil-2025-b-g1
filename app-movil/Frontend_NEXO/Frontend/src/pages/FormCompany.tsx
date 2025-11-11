// src/pages/FormCompany.tsx
import React from "react";
import HomeLayout from "../layout/HomeLayout";
import Create_company from "../components/Create_company";

const FormCompany: React.FC = () => {
  return (
    <HomeLayout
      backTo="/companies_entrepreneurs"
      heroImages={["/assets/hamburguesa.png","/assets/reloj.png","/assets/zapato.png"]}
      logoSrc="/assets/logo_blanco.png"
      title="Lo mejor de nuestros"
      titleHighlight="estudiantes"
      titleAfter="en un solo lugar"
    >
      <Create_company />
    </HomeLayout>
  );
};

export default FormCompany;
