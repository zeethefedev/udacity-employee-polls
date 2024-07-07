import React from "react";

function Card({ children, className, onClick }) {
  return (
    <div
      className={`flex flex-col gap-4 rounded items-center p-8 border-2 border-solid ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Card;
