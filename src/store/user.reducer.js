import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getAllUsers, login } from "./user.thunk";
import { MESSAGES, getFromStorage } from "../utils/utils.user";

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
      .addCase(login.pending, (state) => {
        state.error = false;
        state.message = "";
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.currentUser = user;
        state.message = MESSAGES.LOGIN_SUCCESS;
        state.loading = false;
      })
      .addMatcher(
        isAnyOf(login.rejected, getAllUsers.rejected),
        (state, action) => {
          const { message } = action.error;
          state.error = true;
          state.message = message;
          state.loading = false;
        }
      );
  },
});

export const { resetForm, setUser, logout } = userSlice.actions;

export default userSlice.reducer;
