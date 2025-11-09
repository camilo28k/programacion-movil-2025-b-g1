import React from "react";
import "../../theme/categoryCard.css";

interface CategoryCardProps {
  imageSrc: string;
  title: string;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ imageSrc, title, onClick }) => {
  return (
    <div className="category-card" onClick={onClick}>
      <div className="category-card-img">
        <img src={imageSrc} alt={title} />
      </div>
      <h3 className="category-card-title">{title}</h3>
    </div>
  );
};

export default CategoryCard;
