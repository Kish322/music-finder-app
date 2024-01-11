import React from "react";

interface StatusDisplayProps {
  status: string;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ status }) => {
  return (
    <div>{status}</div>
      
    
  );
};

export default StatusDisplay;
