import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateSignupForm } from "../../utils/utils.user";
import { signup } from "../../store/user.thunk";
import { resetForm } from "../../store/user.reducer";
import LoginSignupForm from "./LoginSignupForm";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleValidateForm = (inputGroup) => {
    const validForm = validateSignupForm(inputGroup);
    if (validForm) {
      const [username, displayName, password] = inputGroup.map(
        (input) => input.value
      );
      dispatch(signup({ username, displayName, password }));
    }
  };

  const handleNavigate = () => {
    navigate("/login");
    dispatch(resetForm());
  };

  const buttonDisabled = (inputGroup) =>
    inputGroup.every((inp) => inp.touched) && !validateSignupForm(inputGroup);

  return (
    <LoginSignupForm
      mode="signup"
      initialInputs={[
        "username",
        "display-name",
        "password",
        "confirm-password",
      ]}
      handleValidateForm={handleValidateForm}
      handleNavigate={handleNavigate}
      buttonDisabled={buttonDisabled}
    />
  );
}

export default Signup;
