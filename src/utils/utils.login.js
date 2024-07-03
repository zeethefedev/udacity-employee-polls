export const ERROR = {
  USERNAME: "Invalid username",
  PASSWORD: "Invalid email",
  LOGIN: "Invalid email",
  SIGNUP: "Invalid email",
};

export const MESSAGES = {
  LOGIN_SUCCESS: "Logged in successfully. Hang on while we redirect you ...",
  LOGIN_USERNAME_ERROR: "We cannot find the user",
  LOGIN_PASSWORD_ERROR: "We cannot find the user",
  SIGNUP_SUCCESS: "Signed up successfully. Hang on while we redirect you ...",
  LOGIN_ALREADY_HAVE_ACCOUNT: "Do not have an account? Sign up instead",
  SIGNUP_ALREADY_HAVE_ACCOUNT: "Already have an account? Log in instead",
};

export const updateInputInfo = (event, input) => {
  const newInputProps = {
    name: event.target.name,
    value: event.target.value,
  };
  const newInfo = input.map((inp) =>
    inp.name === newInputProps.name ? { ...inp, ...newInputProps } : inp
  );
  return newInfo;
};

export const setTouchedInfo = (input) => {
  const touchedInfo = input.map((inp) => ({ ...inp, touched: true }));

  return touchedInfo;
};

export const setButtonDisabled = (input) => {
  const buttonDisabled =
    input.every((inp) => inp.touched) && input.some((inp) => !inp.value);
  return buttonDisabled;
};

export const validateEmail = (email) => {
  if (email?.includes("@")) {
    return true;
  } else return;
};

export const validatePassword = (pass) => {
  if (pass.length > 5 && /\d/.test(pass)) {
    return true;
  } else return;
};

export const validateConfirmPassword = (input) => {
  const getFieldValue = (fieldName) => {
    return input.find((inp) => inp.name === fieldName)?.value;
  };

  const newPassword = getFieldValue("password");
  const confirmPassword = getFieldValue("confirm-password");
  return confirmPassword === newPassword;
};

export const validateForm = (inputs) => {
  const validFields = inputs.map((inp) =>
    inp.name === "email"
      ? validateEmail(inp.value)
      : validatePassword(inp.value)
  );

  const validForm = validFields.every((field) => field);
  return validForm;
};

export const validateChangePasswordForm = (input) => {
  const validFields = input.map((inp) =>
    inp.name === "password"
      ? validatePassword(inp.value)
      : validateConfirmPassword(input)
  );

  const validForm = validFields.every((field) => field);
  return validForm;
};
