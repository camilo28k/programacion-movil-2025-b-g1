import React from "react";
import CompanyCard from "../components/Cards/CompanyCard";
import "../theme/companyCard.css";

const Company_entrepreneur: React.FC = () => {
  return (
    <div className="companies-container">
      <CompanyCard
        imageSrc="/assets/salchipapa.png"
        name="Salchipapas"
        owner="Daniela"
        tagline="La Mejor Empresa De Salchipapa"
        cta="Mi Empresa"
        onClick={() => console.log("Mi Empresa - Daniela")}
      />

      <CompanyCard
        imageSrc="/assets/hamburguesa.png"
        name="Hamburguesas"
        owner="Leandro"
        tagline="La Mejor Empresa De Hamburguesas"
        cta="Entrar"
        onClick={() => console.log("Entrar - Leandro")}
      />

      <CompanyCard
        imageSrc="/assets/Fresas_con_crema.png"
        name="Fresas con crema"
        owner="Anita"
        tagline="La Mejor Empresa De Fresas con crema"
        cta="Entrar"
        onClick={() => console.log("Entrar - Anita")}
      />

      {/* Agrega más compañías aquí */}
    </div>
  );
};

export default Company_entrepreneur;
