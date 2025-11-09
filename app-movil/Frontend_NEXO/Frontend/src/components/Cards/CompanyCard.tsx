import React from "react";
import "../../theme/companyCard.css";

interface CompanyCardProps {
  imageSrc: string;
  name: string;           // p.ej. "Salchipapas"
  owner: string;          // p.ej. "Daniela"
  tagline: string;        // p.ej. "La Mejor Empresa De Salchipapa"
  cta: string;            // p.ej. "Mi Empresa" o "Entrar"
  onClick?: () => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  imageSrc, name, owner, tagline, cta, onClick
}) => {
  return (
    <div className="company-card">
      <div className="company-card-image">
        <img src={imageSrc} alt={name} />
      </div>

      <div className="company-card-body">
        <h3 className="company-card-title">{name}</h3>
        <p className="company-card-owner">{owner}</p>
        <p className="company-card-tagline">“{tagline}”</p>

        <button className="company-card-btn" onClick={onClick}>
          {cta}
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
