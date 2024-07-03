import React from "react";
import LoginSignupForm from "../components/login-signup/LoginSignupForm";

function Login() {
  return (
    <>
      <h1>Login</h1>
      <LoginSignupForm initialInputs={["username", "password"]} />
    </>
  );
}

export default Login;
