import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../../store/user.thunk";
import Form from "../generics/Form";
import { useNavigate } from "react-router-dom";
import Button from "../generics/Button";
import {
  MESSAGES,
  toObject,
  validateSignupForm,
} from "../../utils/utils.login";
import { resetLoginForm } from "../../store/user.reducer";

function LoginSignupForm({ mode = "login", initialInputs }) {
  const [inputGroup, setInputGroup] = useState(toObject(initialInputs));
  const errorForm = useSelector((state) => state.user.error);
  const message = useSelector((state) => state.user.message);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSetInputGroup = (newInputs) => {
    setInputGroup(newInputs);
  };

  const validateUser = () => {
    if (mode === "login") {
      //mode login
      const validForm = inputGroup.every(
        (input) => input.value && input.touched
      );
      if (validForm) {
        const [username, password] = inputGroup.map((input) => input.value);
        dispatch(login({ username, password }));
      }
    } else {
      //mode signup
      const validForm = validateSignupForm(inputGroup);
      if (validForm) {
        console.log("valid signup");
        const [username, displayName, password] = inputGroup.map(
          (input) => input.value
        );
        dispatch(signup({ username, displayName, password }));
      }
    }
  };

  const handleNavigate = () => {
    if (mode === "login") {
      navigate("/signup");
    } else {
      navigate("/login");
    }
    dispatch(resetLoginForm());
  };

  const buttonDisabled =
    inputGroup.every((inp) => inp.touched) &&
    (mode === "login"
      ? inputGroup.some((inp) => !inp.value)
      : !validateSignupForm(inputGroup));

  return (
    <Form
      inputGroup={inputGroup}
      buttonText={mode}
      buttonDisabled={buttonDisabled}
      handleSetInputGroup={handleSetInputGroup}
      handleValidateForm={validateUser}
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
