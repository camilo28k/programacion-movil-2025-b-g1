// src/components/Cards/FormProductCards.tsx
import React, { useState } from "react";
import "../../theme/companyCard.css";

export interface ProductFormValues {
  title: string;
  description: string;
  price: string;
  promo?: string;
  imageUrl: string;
}

interface FormProductCardProps {
  onSubmit?: (values: ProductFormValues) => Promise<void> | void;
}

const FormProductCard: React.FC<FormProductCardProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [promo, setPromo] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !price.trim()) {
      alert("El título y el precio son obligatorios.");
      return;
    }

    if (Number.isNaN(Number(price))) {
      alert("El precio debe ser un número válido.");
      return;
    }

    if (promo && Number.isNaN(Number(promo))) {
      alert("La promoción debe ser un número válido.");
      return;
    }

    const values: ProductFormValues = {
      title,
      description,
      price,
      promo,
      imageUrl,
    };

    try {
      setSubmitting(true);

      if (onSubmit) {
        await onSubmit(values);   // 👈 solo esto
      }

      console.log("✅ Crear Producto ->", values);
      setShowSuccess(true);
    } catch (err) {
      console.error("❌ Error al crear producto:", err);
      alert("No se pudo crear el producto. Revisa los datos o intenta nuevamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form className="company-form" onSubmit={handleSubmit}>
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
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          placeholder="Precio en promoción (opcional)"
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

        <button
          type="submit"
          className="btn-create"
          disabled={submitting}
        >
          {submitting ? "Creando..." : "Crear Producto"}
        </button>
      </form>

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
