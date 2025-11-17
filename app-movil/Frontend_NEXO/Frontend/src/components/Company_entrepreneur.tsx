// src/pages/Company_entrepreneur.tsx
import React, { useEffect, useState } from "react";
import CompanyCard from "../components/Cards/CompanyCard";
import { companyService } from "../api/AuthService";
import "../theme/companyCard.css";
import { useHistory, useLocation } from "react-router-dom";

interface Company {
  id: string;
  name: string;
  description: string;
  url?: string;
  owner?: string;
  category_id?: string | null;   // 👈 importante para filtrar
}

interface LocationState {
  categoryId?: string;
  categoryName?: string;
}

const Company_entrepreneur: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const history = useHistory();
  const location = useLocation<LocationState>();
  const stateCategoryId = location.state?.categoryId;
  const stateCategoryName = location.state?.categoryName;

  // 🔹 recuperar de localStorage si no vino en el state
  const storedCategory = localStorage.getItem("selectedCategory");
  const fallbackCategory = storedCategory ? JSON.parse(storedCategory) : null;

  const categoryId = stateCategoryId || fallbackCategory?.id;
  const categoryName = stateCategoryName || fallbackCategory?.name;

  useEffect(() => {
    const fetchCompanies = () => {
      companyService
        .getAll()
        .then((res) => {
          let data: Company[] = res.data;
          if (categoryId) {
            data = data.filter((c) => c.category_id === categoryId);
          }
          setCompanies(data);
        })
        .catch((err) => console.error("Error al obtener empresas", err));
    };

    fetchCompanies();
    const interval = setInterval(fetchCompanies, 5000);

    return () => clearInterval(interval);
  }, [categoryId]);

  if (!categoryId) {
    return (
      <p style={{ padding: 16 }}>
        No se ha seleccionado ninguna categoría. Vuelve y entra desde una categoría.
      </p>
    );
  }

  const goToProducts = (company: Company) => {
    // ✅ Guardar la empresa seleccionada
    localStorage.setItem(
      "selectedCompany",
      JSON.stringify({ id: company.id, name: company.name })
    );

    history.push("/products_entrepreneurs", {
      companyId: company.id,
      companyName: company.name,
    });
  };

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
          onClick={() => goToProducts(company)}
        />
      ))}
    </div>
  );
};

export default Company_entrepreneur;
