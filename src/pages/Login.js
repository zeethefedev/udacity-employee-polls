import React from "react";
import LoginForm from "../components/login/LoginForm";
import { useDispatch } from "react-redux";
import { login } from "../store/user.thunk";

function Login() {
  const dispatch = useDispatch();

  const handleValidateForm = (inputGroup) => {
    const validForm = inputGroup.every((input) => input.value && input.touched);
    if (validForm) {
      const [username, password] = inputGroup.map((input) => input.value);
      dispatch(login({ username, password }));
    }
  };

  const buttonDisabled = (inputGroup) => {
    return (
      inputGroup.every((inp) => inp.touched) &&
      inputGroup.some((inp) => !inp.value)
    );
  };

  return (
    <LoginForm
      initialInputs={["username", "password"]}
      handleValidateForm={handleValidateForm}
      buttonDisabled={buttonDisabled}
    />
  );
}

export default Login;
