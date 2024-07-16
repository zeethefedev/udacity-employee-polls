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
    resetForm: (state) => {
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
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        const { users } = action.payload;
        state.users = users;
        state.loading = false;
      })
      .addMatcher(isAnyOf(login.pending, signup.pending), (state) => {
        state.error = false;
        state.message = "";
        state.loading = true;
      })
      .addMatcher(
        isAnyOf(login.fulfilled, signup.fulfilled),
        (state, action) => {
          const { mode, user } = action.payload;
          state.currentUser = user;
          state.message = MESSAGES[`${mode.toUpperCase()}_SUCCESS`];
          saveToStorage("USER", user);
          state.loading = false;
        }
      )
      .addMatcher(
        isAnyOf(login.rejected, signup.rejected, getAllUsers.rejected),
        (state, action) => {
          const { message } = action.error;
          state.error = true;
          state.message = message;
          state.loading = false;
          clearStorage("USER");
        }
      );
  },
});

export const { resetForm, setUser, logout } = userSlice.actions;

export default userSlice.reducer;
