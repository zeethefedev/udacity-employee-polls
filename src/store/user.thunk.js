import { createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers, _saveUser } from "../api/_DATA";

//login
export const login = createAsyncThunk("/login", async (user) => {
  const { username, password } = user;
  let response = {};
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
  let response = {};
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
      response.error = error;
    });
  return response;
});
