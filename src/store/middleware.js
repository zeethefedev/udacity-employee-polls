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
    const isLogin = type.includes("login");

    if (isLogin && type.includes("fulfilled")) {
      actions = [...actions, redirectTo("/")];
    }

    if (!isLogin && error) return redirectTo("/error");

    if (type === "/get-question/fulfilled") {
      const author = payload.question.author;
      actions = [...actions, dispatch(getUserById(author))];
    }

    return [...actions, next(action)];
  };

export const handleUserToken = (store) => (next) => (action) => {
  let actions = [];
  const { type, payload, error } = action;
  const isLogin = type.includes("login");

  if (isLogin) {
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
