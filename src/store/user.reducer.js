import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getAllUsers, login, signup } from "./user.thunk";
import { MESSAGES } from "../utils/utils.user";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    currentUser: {
      id: "sarahedo",
      password: "password123",
      name: "Sarah Edo",
      avatarURL: "/avatar/sarahedo.svg",
      answers: {
        "8xf0y6ziyjabvozdd253nd": "optionOne",
        "6ni6ok3ym7mf1p33lnez": "optionOne",
        am8ehyc8byjqgar0jgpub9: "optionTwo",
        loxhs1bqm25b708cmbf3g: "optionTwo",
      },
      questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
    },
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
    logout: (state) => {
      state.currentUser = undefined;
      state.error = false;
      state.message = "";
      state.loading = false;
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
          if (error) {
            state.error = true;
            const key =
              mode === "login"
                ? `${mode.toUpperCase()}_${error.code.toUpperCase()}`
                : `${mode.toUpperCase()}`;
            state.message = MESSAGES[`${key}_ERROR`];
          } else {
            state.currentUser = user;
            state.message = MESSAGES[`${mode.toUpperCase()}_SUCCESS`];
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

export const { resetLoginForm, logout } = userSlice.actions;

export default userSlice.reducer;
