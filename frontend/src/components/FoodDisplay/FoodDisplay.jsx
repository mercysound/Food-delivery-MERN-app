import React, { useContext } from 'react';
import "./FoodDisplay.css";
import { StoreContext } from '../../context/FoodContext';
import FoodItem from '../FoodItem/FoodItem';
import FoodItemSkeleton from '../FoodItem/FoodItemSkeleton';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  const skeletonArray = Array.from({ length: 8 });

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>

      <div className="food-display-list">
        {/* 🔹 SHOW SKELETONS WHILE LOADING */}
        {food_list.length === 0 &&
          skeletonArray.map((_, index) => (
            <FoodItemSkeleton key={index} />
          ))
        }

        {/* 🔹 SHOW REAL DATA WHEN READY */}
        {food_list.map((item) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
