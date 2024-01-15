import { FaFire } from "react-icons/fa";
import React from "react";

interface FavouritesDisplayProps {
  favourites: number;
}

const FavouritesDisplay: React.FC<FavouritesDisplayProps> = ({ favourites }) => {
  return (
    <div className="flex justify-start align-baseline">
      <FaFire className={`pr-1 ${favourites > 0 ? "text-red-400" : "text-slate-400"}`} size={22} />
      <FaFire className={`pr-1 ${favourites > 1 ? "text-red-400" : "text-slate-400"}`} size={22}/>
      <FaFire className={`pr-1 ${favourites > 2 ? "text-red-400" : "text-slate-400"}`} size={22} />
      <FaFire className={`pr-1 ${favourites > 3 ? "text-red-400" : "text-slate-400"}`} size={22} />
      <FaFire className={`pr-1 ${favourites > 4 ? "text-red-400" : "text-slate-400"}`} size={22} />
    </div>
  );
};

export default FavouritesDisplay;
