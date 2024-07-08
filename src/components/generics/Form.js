import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Message from "./Message";
import {
  ERROR,
  toObject,
  validateConfirmPassword,
  validatePassword,
} from "../../utils/utils.login";

function Form(props) {
  const {
    mode,
    heading,
    initialInputs,
    buttonDisabled,
    buttonText,
    handleValidateForm,
    loading,
    message,
    errorForm,
    children,
  } = props;
  const [inputGroup, setInputGroup] = useState(toObject(initialInputs));

  const handleChange = (e) => {
    const newValue = e.target.value;
    const newInputs = inputGroup.map((input) =>
      input.name === e.target.name
        ? { ...input, value: newValue, touched: true }
        : input
    );
    setInputGroup(newInputs);
  };

  const validateForm = (e) => {
    e.preventDefault();
    const newInputs = inputGroup.map((input) => ({ ...input, touched: true }));
    setInputGroup(newInputs);
    handleValidateForm(newInputs);
  };

  const errorField = (input) => {
    const code = `${input.name.toUpperCase().replaceAll("-", "_")}`;
    if (input.name === "password") {
      return (
        !validatePassword(input) &&
        input.touched &&
        ERROR[`${code}_${mode.toUpperCase()}`]
      );
    } else if (input.name === "confirm-password") {
      return (
        !validateConfirmPassword(inputGroup) && input.touched && ERROR[code]
      );
    } else {
      return !input.value && input.touched && ERROR[code];
    }
  };

  const typeField = (input) => {
    const inputName = input.name;
    if (inputName.includes("password")) return "password";
    else return "text";
  };

  return (
    <form className="flex flex-col gap-4 max-w-md m-auto rounded items-center p-8 border-2 border-solid">
      <h2>{heading}</h2>
      {inputGroup.map((input) => (
        <Input
          type={typeField(input)}
          label={`${input.name.replaceAll("-", " ")}: `}
          name={input.name}
          value={input.value}
          onChange={handleChange}
          error={errorField(input)}
        />
      ))}
      {children}
      <Button
        variant="primary"
        className="w-full capitalize"
        state={loading && "loading"}
        onClick={validateForm}
        disabled={buttonDisabled(inputGroup) || loading}
      >
        {buttonText}
      </Button>
      {message && (
        <Message
          className={`text-color-${errorForm ? "red" : "blue"}`}
          mode={errorForm && "error"}
          text={message}
        />
      )}
    </form>
  );
}

export default Form;
