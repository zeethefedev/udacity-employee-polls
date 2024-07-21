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

export const DEFAULT_AVATAR = "/avatar/default-avatar.svg";

export const ERROR = {
  LOGIN_USERNAME: "We cannot find the user",
  LOGIN_PASSWORD: "Incorrect password",
  GET_USERS: "Cannot get users",
  GET_USER: "Cannot get user",
};

export const MESSAGES = {
  LOGIN_SUCCESS: "Logged in successfully. Hang on while we redirect you ...",
  LOGIN_ALREADY_HAVE_ACCOUNT: "Do not have an account? Sign up instead",
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
