// src/components/Home_entrepreneur.tsx
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CategoryCard from "./Cards/CategoryCards";
import { categoryService } from "../api/AuthService";

interface Category {
  id: string;      // 👈 aquí usamos "id", no "_id"
  name: string;
  url: string;
}

const Home_entrepreneur: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const history = useHistory();

  const handleCategoryClick = (cat: Category) => {
    console.log(`Entrando a categoría: ${cat.name}`);

    // 🟡 Guardar la categoría seleccionada (por si luego se pierde el state)
    localStorage.setItem(
      "selectedCategory",
      JSON.stringify({
        id: cat.id,
        name: cat.name,
      })
    );

    // 🔵 Ir a la pantalla de empresas filtrando por categoría
    history.push("/companies_entrepreneurs", {
      categoryId: cat.id,
      categoryName: cat.name,
    });
  };

  useEffect(() => {
    const fetchCategories = () => {
      categoryService
        .getAll()
        .then((res) => {
          console.log("📦 Categorías recibidas:", res.data);
          setCategories(res.data);
        })
        .catch((err) => console.error("Error al cargar categorías", err));
    };

    fetchCategories();
    const interval = setInterval(fetchCategories, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "20px",
        marginTop: "45px",
      }}
    >
      {categories.map((cat) => (
        <CategoryCard
          key={cat.id}
          imageSrc={cat.url}
          name={cat.name}
          onClick={() => handleCategoryClick(cat)}
        />
      ))}
    </div>
  );
};

export default Home_entrepreneur;
