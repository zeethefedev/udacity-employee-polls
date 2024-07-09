import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../api/_DATA";

export const getAllQuestions = createAsyncThunk("/get-questions", async () => {
  let response = {};
  await _getQuestions().then((questions) => {
    const questionsList = Object.values(questions);
    response.questions = questionsList;
    if (!questions) {
      response.error = { code: "get-questions" };
    }
  });
  return response;
});

export const getQuestionById = createAsyncThunk(
  "/get-question",
  async (questionId) => {
    let response = {};
    await _getQuestions().then((questions) => {
      const questionsList = Object.values(questions);
      response.question = questionsList.find(
        (questions) => questions.id === questionId
      );
      if (!response.question) {
        response.error = { code: "get-question" };
      }
    });
    return response;
  }
);

export const addQuestion = createAsyncThunk(
  "/add-question",
  async (question) => {
    let response = {};
    await _saveQuestion(question).then((newQuestion) => {
      response.question = newQuestion;
    });
    return response;
  }
);

export const updateQuestionAnswer = createAsyncThunk(
  "/update-answer",
  async (data) => {
    let response = {};
    await _saveQuestionAnswer(data).then((newQuestion) => {
      if (newQuestion) {
        response.question = newQuestion;
      } else {
        response.error = { code: "update" };
      }
    });
    return response;
  }
);
