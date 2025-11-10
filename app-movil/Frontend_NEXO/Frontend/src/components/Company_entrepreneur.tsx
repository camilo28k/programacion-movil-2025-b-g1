import React, { useEffect, useState } from "react";
import CompanyCard from "../components/Cards/CompanyCard";
import { companyService } from "../api/AuthService";
import "../theme/companyCard.css";

interface Company {
  id: string;
  name: string;
  description: string;
  url?: string;
  owner?: string;
}

const Company_entrepreneur: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchCompanies = () => {
      companyService
        .getAll()
        .then((res) => setCompanies(res.data))
        .catch((err) => console.error("Error al obtener empresas", err));
    };

    fetchCompanies(); // primera carga
    const interval = setInterval(fetchCompanies, 5000); // recarga cada 5s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="companies-container">
      {companies.map((company) => (
        <CompanyCard
          key={company.id}
          imageSrc={company.url || "/assets/default.png"} 
          name={company.name}
          owner={""} 
          tagline={company.description}
          cta="Entrar"
          onClick={() => console.log(`Entrar - ${company.name}`)}
        />

      ))}
    </div>
  );
};

export default Company_entrepreneur;

