import React from "react";
import "./FoodItemSkeleton.css";

const FoodItemSkeleton = () => {
  return (
    <div className="food-item skeleton">
      <div className="food-item-img-container">
        <div className="skeleton-img" />
      </div>

      <div className="food-item-info">
        <div className="skeleton-title" />
        <div className="skeleton-desc" />
        <div className="skeleton-price" />
      </div>
    </div>
  );
};

export default FoodItemSkeleton;
