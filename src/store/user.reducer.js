import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getAllUsers, login, signup } from "./user.thunk";
import { MESSAGES } from "../utils/utils.login";

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
    setInfo: (state, action) => {
      state.currentUser = action.payload;
    },
    resetLoginForm: (state, action) => {
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
      .addCase(login.fulfilled, (state, action) => {
        const { user, error } = action.payload;
        if (error) {
          state.error = true;
          state.message = MESSAGES[`LOGIN_${error.code.toUpperCase()}_ERROR`];
        } else {
          state.currentUser = user;
          state.message = MESSAGES.LOGIN_SUCCESS;
        }
        state.loading = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        const { user, error } = action.payload;
        if (error) {
          state.error = true;
          state.message = MESSAGES.SIGNUP_ERROR;
        } else {
          state.currentUser = user;
          state.message = MESSAGES.SIGNUP_SUCCESS;
        }
        state.loading = false;
      })
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
