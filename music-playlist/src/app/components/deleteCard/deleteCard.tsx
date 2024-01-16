import React from "react";
import { FaTimes } from "react-icons/fa";

interface DeleteCardProps {
  id: number;  
}

const DeleteCard: React.FC<DeleteCardProps> = ({ id }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/Music/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Card deleted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 0); 
      } else {
        console.error("Failed to delete card");
      }
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  return (
    <FaTimes
      className="text-red-400 hover:cursor-pointer hover:text-red-200"
      size={22}
      onClick={handleDelete}
    />
  );
};

export default DeleteCard;