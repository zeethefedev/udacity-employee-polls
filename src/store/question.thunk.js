import { createAsyncThunk } from "@reduxjs/toolkit";
import { _getQuestions } from "../api/_DATA";

export const getAllQuestions = createAsyncThunk("/get-all", async () => {
  let response = {};
  await _getQuestions()
    .then((questions) => {
      const questionsList = Object.values(questions);
      response.questions = questionsList;
    })
    .catch((error) => {
      response.error = error;
    });
  return response;
});
