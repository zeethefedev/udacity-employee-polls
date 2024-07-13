import React from "react";
import Loading from "./Loading";

function Button(props) {
  const { state, className, variant, children, onClick, disabled } = props;
  return (
    <button
      className={`${variant}-button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {state === "loading" ? <Loading /> : <>{children}</>}
    </button>
  );
}

export default Button;
