import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../theme/companyCard.css";

export interface CompanyFormValues {
  name: string;
  description: string;
  url: string; // 👈 ahora se llama url (no photo)
}

interface FormCompanyCardsProps {
  onSubmit?: (values: CompanyFormValues) => Promise<void> | void;
}

const FormCompanyCards: React.FC<FormCompanyCardsProps> = ({ onSubmit }) => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🚫 Validación básica en frontend
    if (!name.trim() || !description.trim() || !url.trim()) {
      alert("Por favor completa todos los campos antes de crear la empresa.");
      return;
    }

    const values: CompanyFormValues = { name, description, url };

    try {
      setSubmitting(true);

      // Llamada a backend
      if (onSubmit) {
        await onSubmit(values);
      }

      console.log("✅ Crear Empresa ->", values);

      // Mostrar overlay de éxito solo si NO hubo error
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        history.push("/companies_entrepreneurs");
      }, 1300);
    } catch (err) {
      console.error("❌ Error al crear empresa:", err);
      alert("No se pudo crear la empresa. Revisa los datos o intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
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
        />

        <input
          className="pill-input"
          type="text"
          placeholder="URL de la imagen"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          type="submit"
          className="btn-create"
          disabled={submitting}
        >
          {submitting ? "Creando..." : "Crear Empresa"}
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
