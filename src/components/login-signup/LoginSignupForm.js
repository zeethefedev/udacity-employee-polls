import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/user.thunk";
import Form from "../generics/Form";

const INPUTS = [
  { name: "username", value: "", touched: false },
  { name: "password", value: "", touched: false },
];

function LoginSignupForm({ mode = "login" }) {
  const [inputGroup, setInputGroup] = useState(INPUTS);
  const errorForm = useSelector((state) => state.user.error);
  const message = useSelector((state) => state.user.message);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();

  const handleSetInputGroup = (newInputs) => {
    setInputGroup(newInputs);
  };

  const validateUser = () => {
    const validForm = inputGroup.every((input) => input.value && input.touched);
    if (validForm) {
      const username = inputGroup[0].value;
      const password = inputGroup[1].value;
      dispatch(login({ username, password }));
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
    ></Form>
  );
}

export default LoginSignupForm;
