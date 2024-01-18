import React from "react";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";

interface EditCardProps {
  id: number;
}

const EditCard: React.FC<EditCardProps> = ({ id }) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/musicPage/${id}`);
  };

  return (
    <div className="cursor-pointer" onClick={handleEditClick}>
      <MdEdit
        className="text-red-400 hover:cursor-pointer hover:text-red-200"
        size={22} 
      />
    </div>
  );
};

export default EditCard; 