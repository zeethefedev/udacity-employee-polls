import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../api/_DATA";

//get all
export const getAllQuestions = createAsyncThunk("/get-questions", async () => {
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

//post new question
export const addQuestion = createAsyncThunk(
  "/add-question",
  async (question) => {
    let response = {};
    await _saveQuestion(question).then((newQuestion) => {
      if (newQuestion) {
        response.question = newQuestion;
      } else {
        response.error = { code: "add" };
      }
    });
    return response;
  }
);

//edit
export const updateQuestionAnswer = createAsyncThunk(
  "/update-answer",
  async (data) => {
    let response = {};
    await _saveQuestionAnswer(data).then((result) => {
      if (result) {
        response.result = result;
      } else {
        response.error = { code: "update" };
      }
    });
    return response;
  }
);

//delete
