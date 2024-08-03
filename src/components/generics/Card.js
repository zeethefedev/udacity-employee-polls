import React from "react";

function Card({ id, children, className, onClick, testId }) {
  return (
    <div
      id={id}
      className={`flex flex-col gap-4 rounded items-center p-8 border-2 border-solid ${className}`}
      onClick={onClick}
      data-testid={testId}
    >
      {children}
    </div>
  );
}

export default Card;
