import { createAsyncThunk } from "@reduxjs/toolkit";
import { ERROR } from "../utils/utils.user";
import { _getUserById, _getUsers, _saveUser } from "../api/api";

//login
export const login = createAsyncThunk("/login", async (user) => {
  const { username, password } = user;
  const userData = await _getUserById(username).catch(() => {
    throw Error(ERROR.LOGIN);
  });

  if (userData.password !== password) {
    throw Error(ERROR.LOGIN_PASSWORD);
  }

  return { mode: "login", user: userData };
});

//signup
export const signup = createAsyncThunk("/signup", async (user) => {
  // get all users and check that user id do not exist
  const userExists = await _getUserById(user.username).catch(() => {});

  if (userExists) {
    throw Error(ERROR.SIGNUP);
  }

  const userData = await _saveUser(user);
  return { mode: "signup", user: userData };
});

export const getAllUsers = createAsyncThunk("/get-users", async () => {
  const users = await _getUsers();
  return { users };
});

export const getUserById = createAsyncThunk("/get-user", async (userId) => {
  const user = await _getUserById(userId);
  return { user };
});
