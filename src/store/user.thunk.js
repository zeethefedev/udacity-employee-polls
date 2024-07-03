import { createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers } from "../api/_DATA";

export const login = createAsyncThunk("/login", async (user) => {
  const { username, password } = user;
  let response = {};
  await _getUsers().then((users) => {
    const currentUser = users[username];
    if (currentUser) {
      //have user
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
