import React from "react";
import { FaTimes } from "react-icons/fa";

const DeleteCard: React.FC = () => {
  return (
    <FaTimes
      className="text-red-400 hover:cursor-pointer hover:text-red-200"
      size={22}
    />
  );
};

export default DeleteCard;
