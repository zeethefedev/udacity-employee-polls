import React from "react";
import Input from "./Input";
import Button from "./Button";
import Message from "./Message";
import { ERROR, setButtonDisabled } from "../../utils/utils.login";

function Form(props) {
  const {
    inputGroup,
    buttonText,
    handleSetInputGroup,
    handleValidateForm,
    loading,
    message,
    errorForm,
    children,
  } = props;

  const handleChange = (e) => {
    const newValue = e.target.value;
    const newInputs = inputGroup.map((input) =>
      input.name === e.target.name
        ? { ...input, value: newValue, touched: true }
        : input
    );
    handleSetInputGroup(newInputs);
  };

  const validateForm = (e) => {
    e.preventDefault();
    const newInputs = inputGroup.map((input) => ({ ...input, touched: true }));
    handleSetInputGroup(newInputs);
    handleValidateForm();
  };

  const buttonDisabled = setButtonDisabled(inputGroup);

  const errorField = (input) => {
    const code = `${input.name.toUpperCase().replaceAll("-", "_")}`;
    return !input.value && input.touched && ERROR[code];
  };

  return (
    <form className="flex flex-col gap-4 max-w-md m-auto rounded items-center p-8 border-2 border-solid">
      {inputGroup.map((input) => (
        <Input
          type={input.name.includes("name") ? "text" : input.name}
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
        disabled={buttonDisabled || loading}
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
