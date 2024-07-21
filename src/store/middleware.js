import { clearStorage, saveToStorage } from "../utils/utils.user";
import { getUserById } from "./user.thunk";

const redirectTo = (path) => {
  window.location.href = path;
};

export const redirect =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    let actions = [];
    const { type, payload, error } = action;
    const isLoginSignup = ["login", "signup"].some((actionType) =>
      type.includes(actionType)
    );
    const isAddUpdateQuestion = ["add-question", "update-answer"].some(
      (actionType) => type.includes(actionType)
    );

    if (isLoginSignup && type.includes("fulfilled")) {
      actions = [...actions, redirectTo("/")];
    }

    if (!isLoginSignup && !isAddUpdateQuestion && error)
      return redirectTo("/error");

    if (type === "/get-question/fulfilled") {
      const author = payload.question.author;
      actions = [...actions, dispatch(getUserById(author))];
    }

    return [...actions, next(action)];
  };

export const handleUserToken = (store) => (next) => (action) => {
  let actions = [];
  const { type, payload, error } = action;
  const isLoginSignup = ["login", "signup"].some((actionType) =>
    type.includes(actionType)
  );

  if (isLoginSignup) {
    if (type.includes("fulfilled")) {
      actions = [...actions, saveToStorage("USER", payload.user)];
    } else if (error) {
      actions = [...actions, clearStorage("USER")];
    }
  } else if (type.includes("logout")) {
    actions = [...actions, clearStorage("USER")];
  }

  return [...actions, next(action)];
};
