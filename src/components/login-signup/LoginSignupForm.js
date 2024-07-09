import React from "react";
import { useSelector } from "react-redux";
import Form from "../generics/Form";
import Button from "../generics/Button";
import { MESSAGES } from "../../utils/utils.user";

function LoginSignupForm({
  mode = "login",
  initialInputs,
  handleNavigate,
  buttonDisabled,
  handleValidateForm,
}) {
  const errorForm = useSelector((state) => state.user.error);
  const message = useSelector((state) => state.user.message);
  const loading = useSelector((state) => state.user.loading);

  return (
    <Form
      initialInputs={initialInputs}
      buttonText={mode}
      buttonDisabled={buttonDisabled}
      handleValidateForm={handleValidateForm}
      loading={loading}
      message={message}
      errorForm={errorForm}
      mode={mode}
    >
      <Button
        variant="tetriary"
        className="max-w-none"
        onClick={handleNavigate}
      >
        {MESSAGES[`${mode.toUpperCase()}_ALREADY_HAVE_ACCOUNT`]}
      </Button>
    </Form>
  );
}

export default LoginSignupForm;
