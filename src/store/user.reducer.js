import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getAllUsers, login } from "./user.thunk";
import { MESSAGES } from "../utils/utils.login";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    info: undefined,
    error: false,
    loading: false,
    message: "",
  },
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    resetLoginForm: (state, action) => {
      state.error = false;
      state.loading = false;
      state.message = "";
    },
    logout: (state) => {
      state.info = undefined;
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
          state.info = user;
          state.message = MESSAGES.LOGIN_SUCCESS;
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
      .addMatcher(isAnyOf(login.pending), (state) => {
        state.error = false;
        state.message = "";
        state.loading = true;
      });
  },
});

export const { resetLoginForm, logout } = userSlice.actions;

export default userSlice.reducer;
