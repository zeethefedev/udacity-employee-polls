import { createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers, _saveUser } from "../api/_DATA";
import { ERROR } from "../utils/utils.user";

//login
export const login = createAsyncThunk("/login", async (user) => {
  const { username, password } = user;
  const userData = await _getUsers().then((users) => {
    const currentUser = users[username];
    if (currentUser) {
      if (currentUser.password === password) {
        return currentUser;
      } else {
        throw Error(ERROR.LOGIN_PASSWORD);
      }
    } else {
      throw Error(ERROR.LOGIN_USERNAME);
    }
  });
  return { mode: "login", user: userData };
});

//signup
export const signup = createAsyncThunk("/signup", async (user) => {
  const userData = await _saveUser(user)
    .then((newUser) => {
      return newUser;
    })
    .catch((error) => {
      throw Error(error);
    });
  return { mode: "signup", user: userData };
});

export const getAllUsers = createAsyncThunk("/get-users", async () => {
  const users = await _getUsers().then((users) => {
    const userList = Object.values(users);
    if (!users) {
      throw Error(ERROR.GET_USERS);
    }
    return userList;
  });
  return { users };
});

export const getUserById = createAsyncThunk("/get-user", async (userId) => {
  const user = await _getUsers().then((users) => {
    const userList = Object.values(users);
    const userData = userList.find((user) => user.id === userId);
    if (!userData) {
      throw Error(ERROR.GET_USER);
    }
    return userData;
  });
  return { user };
});
