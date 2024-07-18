import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.reducer";
import questionReducer from "./question.reducer";
import { redirect, handleUserToken } from "./middleware";

export default configureStore({
  reducer: { user: userReducer, question: questionReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(redirect, handleUserToken),
});
