import { createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers, _saveUser } from "../api/_DATA";

//login
export const login = createAsyncThunk("/login", async (user) => {
  const { username, password } = user;
  let response = { mode: "login" };
  await _getUsers().then((users) => {
    const currentUser = users[username];
    if (currentUser) {
      if (currentUser.password === password) {
        //correct password
        response.user = currentUser;
      } else {
        // wrong password
        response.error = { code: "password" };
      }
    } else {
      // cannot find user
      response.error = { code: "username" };
    }
  });
  return response;
});

//signup
export const signup = createAsyncThunk("/signup", async (user) => {
  let response = { mode: "signup" };
  await _saveUser(user)
    .then((newUser) => {
      response.user = newUser;
    })
    .catch((error) => {
      response.error = { code: "signup", message: error };
    });
  return response;
});

export const getAllUsers = createAsyncThunk("/get-users", async () => {
  let response = {};
  await _getUsers()
    .then((users) => {
      const userList = Object.values(users);
      response.users = userList;
    })
    .catch((error) => {
      response.error = { code: "get-users", message: error };
    });
  return response;
});

export const getUserById = createAsyncThunk("/get-user", async (userId) => {
  let response = {};
  await _getUsers().then((users) => {
    const userList = Object.values(users);
    response.user = userList.find((user) => user.id === userId);
    if (!response.user) {
      response.error = { code: "get-user" };
    }
  });
  return response;
});
