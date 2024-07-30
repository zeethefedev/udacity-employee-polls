import React from "react";

function Card({ children, className, onClick, testId }) {
  return (
    <div
      className={`flex flex-col gap-4 rounded items-center p-8 border-2 border-solid ${className}`}
      onClick={onClick}
      data-testid={testId}
    >
      {children}
    </div>
  );
}

export default Card;
