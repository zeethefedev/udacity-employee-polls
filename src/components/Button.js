import React from "react";
import Loading from "./Loading";

function Button(props) {
  const { state, className, variant, children, onClick, disabled, testId } =
    props;
  return (
    <button
      className={`${variant}-button ${className}`}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
    >
      {state === "loading" ? <Loading /> : <>{children}</>}
    </button>
  );
}

export default Button;
