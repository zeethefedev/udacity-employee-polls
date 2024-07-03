import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/user.thunk";
import Form from "../generics/Form";
import { useNavigate } from "react-router-dom";
import Button from "../generics/Button";
import { MESSAGES, toObject } from "../../utils/utils.login";

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
    //mode login
    if (mode === "login") {
      const validForm = inputGroup.every(
        (input) => input.value && input.touched
      );
      if (validForm) {
        const username = inputGroup[0].value;
        const password = inputGroup[1].value;
        dispatch(login({ username, password }));
      }
    } else {
      //mode signup
    }
  };

  const handleNavigate = () => {
    if (mode === "login") {
      navigate("/signup");
    } else {
      navigate("/login");
    }
  };

  return (
    <Form
      inputGroup={inputGroup}
      buttonText={mode}
      handleSetInputGroup={handleSetInputGroup}
      handleValidateForm={validateUser}
      loading={loading}
      message={message}
      errorForm={errorForm}
    >
      <Button variant="tetriary" onClick={handleNavigate}>
        {MESSAGES[`${mode.toUpperCase()}_ALREADY_HAVE_ACCOUNT`]}
      </Button>
    </Form>
  );
}

export default LoginSignupForm;
