import React from "react";
import { useHistory } from "react-router-dom";
import CategoryCard from "./Cards/CategoryCards";


const Home_entrepreneur: React.FC = () => {
  const history = useHistory();

  // 🔹 Manejar clic de categoría
  const handleCategoryClick = (category: string) => {
    console.log(`Entrando a ${category}`);
    history.push("/companies_entrepreneurs"); // 👈 redirige a la pantalla de compañías
  };

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
      <CategoryCard
        imageSrc="/assets/hamburguesa.png"
        title="Comidas"
        onClick={() => handleCategoryClick("Comidas")}
      />
      <CategoryCard
        imageSrc="/assets/zapato.png"
        title="Calzado"
        onClick={() => handleCategoryClick("Calzado")}
      />
      <CategoryCard
        imageSrc="/assets/reloj.png"
        title="Joyeria"
        onClick={() => handleCategoryClick("Joyeria")}
      />
    </div>
  );
};

export default Home_entrepreneur;
