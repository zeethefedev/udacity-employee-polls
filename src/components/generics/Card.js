import React from "react";

function Card({ children }) {
  return (
    <div className="flex flex-col gap-4 max-w-md m-auto rounded items-center p-8 border-2 border-solid">
      {children}
    </div>
  );
}

export default Card;
