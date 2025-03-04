import React, { useState } from "react";
import SVGIcon from "./SVGIcon";
import Button from "./Button";

function Input(props) {
  const {
    type = "text",
    value,
    checked,
    required = true,
    name,
    label,
    disabled,
    error,
    onChange,
    inputClass = "w-full",
    wrapperClass = "flex flex-col w-full",
    testId,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={wrapperClass}>
      <label className="flex items-center justify-between capitalize text-left">
        {label}{" "}
        <div
          className={`input-wrapper max-w-64 flex justify-end rounded border-2 border-solid ${inputClass}`}
        >
          <input
            type={inputType}
            required={required}
            name={name}
            value={value}
            checked={type === "checkbox" && checked}
            disabled={disabled}
            onChange={onChange}
            autoComplete="on"
            data-testid={testId}
          />
          {type === "password" && (
            <Button
              variant="icon"
              className="bg-white"
              onClick={toggleShowPassword}
            >
              <SVGIcon icon={showPassword ? "eye-hide" : "eye"} />
            </Button>
          )}
        </div>
      </label>
      {error && <div className="text-right text-color-blue">{error}</div>}
    </div>
  );
}

export default Input;
