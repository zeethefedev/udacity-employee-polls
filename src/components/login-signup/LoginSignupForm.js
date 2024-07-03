import React, { useState } from "react";
import Input from "../generics/Input";
import Button from "../generics/Button";
import { ERROR, setButtonDisabled } from "../../utils/utils.login";
import { useDispatch, useSelector } from "react-redux";
import Message from "../generics/Message";
import { login } from "../../store/user.thunk";

const INPUTS = [
  { name: "username", value: "", touched: false },
  { name: "password", value: "", touched: false },
];

function LoginSignupForm({ mode = "login" }) {
  const [inputGroup, setInputGroup] = useState(INPUTS);

  const handleChange = (e) => {
    const newValue = e.target.value;
    const newInputs = inputGroup.map((input) =>
      input.name === e.target.name
        ? { ...input, value: newValue, touched: true }
        : input
    );

    setInputGroup(newInputs);
  };

  const error = (input) => {
    const code = `${input.name.toUpperCase().replaceAll("-", "_")}`;
    return !input.value && input.touched && ERROR[code];
  };

  const errorForm = useSelector((state) => state.user.error);
  const message = useSelector((state) => state.user.message);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();

  const validateUser = (e) => {
    e.preventDefault();
    const newInputs = inputGroup.map((input) => ({ ...input, touched: true }));
    setInputGroup(newInputs);

    const validForm = inputGroup.every((input) => input.value && input.touched);
    if (validForm) {
      const username = inputGroup[0].value;
      const password = inputGroup[1].value;
      dispatch(login({ username, password }));
    }
  };

  const buttonDisabled = setButtonDisabled(inputGroup);

  return (
    <form className="flex flex-col gap-4 max-w-md m-auto rounded items-center p-8 border-2 border-solid">
      {inputGroup.map((input) => (
        <Input
          type={input.name.includes("name") ? "text" : input.name}
          label={`${input.name.replaceAll("-", " ")}: `}
          name={input.name}
          value={input.value}
          onChange={handleChange}
          error={error(input)}
        />
      ))}
      <Button
        variant="primary"
        className="w-full capitalize"
        state={loading && "loading"}
        onClick={validateUser}
        disabled={buttonDisabled || loading}
      >
        {mode}
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

export default LoginSignupForm;
