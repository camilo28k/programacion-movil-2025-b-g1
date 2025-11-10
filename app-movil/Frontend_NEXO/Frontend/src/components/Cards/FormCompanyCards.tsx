import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../theme/companyCard.css";

export interface CompanyFormValues {
  name: string;
  description: string;
  url: string; // 👈 ahora se llama url (no photo)
}

interface FormCompanyCardsProps {
  onSubmit?: (values: CompanyFormValues) => void;
}

const FormCompanyCards: React.FC<FormCompanyCardsProps> = ({ onSubmit }) => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const values: CompanyFormValues = { name, description, url };

    onSubmit?.(values);
    console.log("✅ Crear Empresa ->", values);

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      history.push("/companies_entrepreneurs");
    }, 1300);
  };

  return (
    <>
      <form className="company-form" onSubmit={handleSubmit}>
        {url && (
          <div className="company-form__preview">
            <img src={url} alt="preview" />
          </div>
        )}

        <input
          className="pill-input"
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="pill-input pill-textarea"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        {/* 🔹 Campo para pegar la URL de la imagen */}
        <input
          className="pill-input"
          type="text"
          placeholder="URL de la imagen"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button type="submit" className="btn-create">
          Crear Empresa
        </button>
      </form>

      {showSuccess && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="success-check">✓</div>
            <div className="success-text">
              <strong>Empresa</strong> <span>Creada</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormCompanyCards;

