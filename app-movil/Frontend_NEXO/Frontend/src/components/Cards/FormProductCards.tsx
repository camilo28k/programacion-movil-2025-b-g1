import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../theme/companyCard.css"; // reutilizamos los estilos del form

export interface ProductFormValues {
  title: string;
  description: string;
  price: string;      // lo manejamos formateado en string (ej: "20000")
  promo?: string;     // texto opcional (ej: "2x1", "-10%", etc.)
  imageUrl: string;   // URL de imagen
}

interface FormProductCardProps {
  onSubmit?: (values: ProductFormValues) => void;
}

const FormProductCard: React.FC<FormProductCardProps> = ({ onSubmit }) => {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [promo, setPromo] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const values = { title, description, price, promo, imageUrl };
    onSubmit?.(values);
    console.log("✅ Crear Producto ->", values);

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      history.push("/products_entrepreneurs");
    }, 1300);
  };

  return (
    <>
      <form className="company-form" onSubmit={handleSubmit}>
        {/* Preview */}
        {imageUrl && (
          <div className="company-form__preview">
            <img src={imageUrl} alt="preview" />
          </div>
        )}

        <input
          className="pill-input"
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="pill-input pill-textarea"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <input
          className="pill-input"
          type="text"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />


        <input
          className="pill-input"
          type="text"
          placeholder="Promoción"
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
        />

        <input
          className="pill-input"
          type="text"
          placeholder="URL de la imagen"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button type="submit" className="btn-create">
          Crear Producto
        </button>
      </form>

      {/* Overlay de éxito */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="success-check">✓</div>
            <div className="success-text">
              <strong>Producto</strong> <span>Creado</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormProductCard;
