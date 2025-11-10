import React from "react";
import "../../theme/categoryCard.css";

interface CategoryCardProps {
  imageSrc: string;
  name: string;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ imageSrc, name, onClick }) => {
  return (
    <div className="category-card" onClick={onClick}>
      <div className="category-card-img">
        <img src={imageSrc} alt={name} />
      </div>
      <h3 className="category-card-title">{name}</h3>
    </div>
  );
};

export default CategoryCard;
