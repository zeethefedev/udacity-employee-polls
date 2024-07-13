import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getAllUsers, login, signup } from "./user.thunk";
import {
  MESSAGES,
  clearStorage,
  getFromStorage,
  saveToStorage,
} from "../utils/utils.user";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    currentUser: undefined,
    error: false,
    loading: false,
    message: "",
  },
  reducers: {
    resetLoginForm: (state) => {
      state.error = false;
      state.loading = false;
      state.message = "";
    },
    setUser: (state) => {
      state.currentUser = getFromStorage("USER");
    },
    logout: (state) => {
      state.currentUser = undefined;
      state.error = false;
      state.message = "";
      state.loading = false;
      clearStorage("USER");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {
        const { users, error } = action.payload;
        if (error) {
          state.error = true;
        } else {
          state.users = users;
        }
        state.loading = false;
      })
      .addMatcher(
        isAnyOf(login.fulfilled, signup.fulfilled),
        (state, action) => {
          const { mode, user, error } = action.payload;
          debugger;
          if (error) {
            state.error = true;
            const key =
              mode === "login"
                ? `${mode.toUpperCase()}_${error.code.toUpperCase()}`
                : `${mode.toUpperCase()}`;
            state.message = MESSAGES[`${key}_ERROR`];
            clearStorage("USER");
          } else {
            state.currentUser = user;
            state.message = MESSAGES[`${mode.toUpperCase()}_SUCCESS`];
            saveToStorage("USER", user);
          }
          state.loading = false;
        }
      )
      .addMatcher(
        isAnyOf(login.pending, signup.pending, getAllUsers.pending),
        (state) => {
          state.error = false;
          state.message = "";
          state.loading = true;
        }
      );
  },
});

export const { resetLoginForm, setUser, logout } = userSlice.actions;

export default userSlice.reducer;
