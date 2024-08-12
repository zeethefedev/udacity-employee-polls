import React from "react";
import Loading from "./Loading";

function Button(props) {
  const {
    state,
    className,
    variant,
    children,
    onClick,
    disabled,
    testId,
    selected,
  } = props;
  return (
    <button
      className={`${variant}-button ${className} ${
        selected ? "button-selected" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
    >
      {state === "loading" ? <Loading /> : <>{children}</>}
    </button>
  );
}

export default Button;
