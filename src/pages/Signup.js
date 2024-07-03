import React from "react";
import LoginSignupForm from "../components/login-signup/LoginSignupForm";

function Signup() {
  return (
    <>
      <h1>Signup</h1>
      <LoginSignupForm
        mode="signup"
        initialInputs={[
          "username",
          "display-name",
          "password",
          "confirm-password",
        ]}
      />
    </>
  );
}

export default Signup;
