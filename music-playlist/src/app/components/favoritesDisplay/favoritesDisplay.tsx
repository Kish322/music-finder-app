import { FaFire } from "react-icons/fa";
import React from "react";

interface FavouritesDisplayProps {
  favourites: number;
}

const FavouritesDisplay: React.FC<FavouritesDisplayProps> = ({ favourites }) => {
  const maxFavourites = 5; 

  return (
    <div className="flex justify-start align-baseline">
      {Array.from({ length: maxFavourites }, (_, index) => (
        <FaFire
          key={index}
          className={`pr-1 ${index < favourites ? "text-red-400" : "text-slate-400"}`}
          size={22}
        />
      ))}
    </div>
  );
};

export default FavouritesDisplay;