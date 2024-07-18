import React from "react";
import LoginSignupForm from "../components/login-signup/LoginSignupForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/user.thunk";
import { resetForm } from "../store/user.reducer";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleValidateForm = (inputGroup) => {
    const validForm = inputGroup.every((input) => input.value && input.touched);
    if (validForm) {
      const [username, password] = inputGroup.map((input) => input.value);
      dispatch(login({ username, password }));
    }
  };

  const handleNavigate = () => {
    navigate("/signup");
    dispatch(resetForm());
  };

  const buttonDisabled = (inputGroup) => {
    return (
      inputGroup.every((inp) => inp.touched) &&
      inputGroup.some((inp) => !inp.value)
    );
  };

  return (
    <LoginSignupForm
      initialInputs={["username", "password"]}
      handleValidateForm={handleValidateForm}
      handleNavigate={handleNavigate}
      buttonDisabled={buttonDisabled}
    />
  );
}

export default Login;
