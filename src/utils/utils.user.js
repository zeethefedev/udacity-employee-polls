export function formatUser({ username, displayName, password }) {
  return {
    id: username,
    password,
    name: displayName,
    avatarURL: null,
    answers: {},
    questions: [],
  };
}

export const FORM_ERROR = {
  USERNAME: "Invalid username",
  DISPLAY_NAME: "Invalid display name",
  PASSWORD_SIGNUP: "Password must contain at least 1 digit",
  PASSWORD_LOGIN: "Invalid password",
  CONFIRM_PASSWORD: "Value must be the same as password",
  OPTION_ONE: "Please fill in the field",
  OPTION_TWO: "Please fill in the field",
};

export const ERROR = {
  LOGIN_USERNAME: "We cannot find the user",
  LOGIN_PASSWORD: "Incorrect password",
  SIGNUP: "Username already exists. Please try again.",
  GET_USERS: "Cannot get users",
  GET_USER: "Cannot get user",
};

export const MESSAGES = {
  LOGIN_SUCCESS: "Logged in successfully. Hang on while we redirect you ...",
  SIGNUP_SUCCESS: "Signed up successfully. Hang on while we redirect you ...",
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

export const getFromStorage = (key) => {
  const item = window.sessionStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  }
};

export const saveToStorage = (key, item) => {
  window.sessionStorage.setItem(key, JSON.stringify(item));
};

export const clearStorage = (key) => {
  if (key) {
    sessionStorage.removeItem(key);
  } else {
    sessionStorage.clear();
  }
};
