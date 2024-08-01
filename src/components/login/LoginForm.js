import React from "react";
import { useSelector } from "react-redux";
import Form from "../generics/Form";

function LoginForm({ initialInputs, buttonDisabled, handleValidateForm }) {
  const errorForm = useSelector((state) => state.user.error);
  const message = useSelector((state) => state.user.message);
  const loading = useSelector((state) => state.user.loading);

  return (
    <Form
      heading="login"
      initialInputs={initialInputs}
      buttonText="login"
      buttonDisabled={buttonDisabled}
      handleValidateForm={handleValidateForm}
      loading={loading}
      message={message}
      errorForm={errorForm}
    ></Form>
  );
}

export default LoginForm;
