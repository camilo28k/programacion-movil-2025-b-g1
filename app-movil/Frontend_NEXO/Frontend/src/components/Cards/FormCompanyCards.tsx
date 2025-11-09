import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../theme/companyCard.css"; // asegúrate del css de abajo

export interface CompanyFormValues {
  name: string;
  description: string;
  photo?: File | null;
}

interface FormCompanyCardsProps {
  onSubmit?: (values: CompanyFormValues) => void;
}

const FormCompanyCards: React.FC<FormCompanyCardsProps> = ({ onSubmit }) => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // ✅ estado para el overlay de éxito
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePickPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPhoto(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const values: CompanyFormValues = { name, description, photo };

    onSubmit?.(values);
    console.log("✅ Crear Empresa ->", values);

    // 🔔 muestra overlay
    setShowSuccess(true);

    // ⏳ espera y redirige
    setTimeout(() => {
      setShowSuccess(false);
      history.push("/companies_entrepreneurs");
    }, 1300); // 1.3s para que se vea el check
  };

  return (
    <>
      <form className="company-form" onSubmit={handleSubmit}>
        {preview && (
          <div className="company-form__preview">
            <img src={preview} alt="preview" />
          </div>
        )}

        <input
          className="pill-input "
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

        <label className="pill-input pill-file" htmlFor="photo">
          {photo ? photo.name : "Foto"}
        </label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          onChange={handlePickPhoto}
          style={{ display: "none" }}
        />

        <button type="submit" className="btn-create">
          Crear Empresa
        </button>
      </form>

      {/* 🔹 Overlay de éxito */}
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
