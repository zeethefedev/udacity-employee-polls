export const ERROR = {
  USERNAME: "Invalid username",
  DISPLAY_NAME: "Invalid display name",
  PASSWORD_SIGNUP: "Password must contain at least 1 digit",
  PASSWORD_LOGIN: "Invalid password",
  CONFIRM_PASSWORD: "Value must be the same as password",
  OPTION_ONE: "Please fill in the field",
  OPTION_TWO: "Please fill in the field",
};

export const MESSAGES = {
  LOGIN_SUCCESS: "Logged in successfully. Hang on while we redirect you ...",
  LOGIN_USERNAME_ERROR: "We cannot find the user",
  LOGIN_PASSWORD_ERROR: "Incorrect password",
  SIGNUP_SUCCESS: "Signed up successfully. Hang on while we redirect you ...",
  SIGNUP_ERROR: "Username already exists. Please try again.",
  LOGIN_ALREADY_HAVE_ACCOUNT: "Do not have an account? Sign up instead",
  SIGNUP_ALREADY_HAVE_ACCOUNT: "Already have an account? Log in instead",
};

export const toObject = (fieldArray) => {
  return fieldArray.map((field) => ({
    name: field,
    value: "",
    touched: false,
  }));
};

export const setButtonDisabled = (input) => {
  const buttonDisabled =
    input.every((inp) => inp.touched) && input.some((inp) => !inp.value);
  return buttonDisabled;
};

export const validatePassword = (input) => {
  if (/\d/.test(input.value)) {
    // must include 1 digit
    return true;
  } else return;
};

export const validateConfirmPassword = (inputs) => {
  const getFieldValue = (fieldName) => {
    return inputs.find((inp) => inp.name === fieldName)?.value;
  };

  const newPassword = getFieldValue("password");
  const confirmPassword = getFieldValue("confirm-password");
  return confirmPassword === newPassword;
};

export const validateSignupForm = (inputs) => {
  const validFields = inputs.map((inp) =>
    inp.name === "password"
      ? validatePassword(inp)
      : inp.name === "confirm-password"
      ? validateConfirmPassword(inputs)
      : inp.value
  );

  const validForm = validFields.every((field) => field);
  return validForm;
};
