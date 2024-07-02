import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.reducer";
import questionReducer from "./question.reducer";

export default configureStore({
  reducer: { user: userReducer, question: questionReducer },
});
