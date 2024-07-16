import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../api/_DATA";
import { ERROR } from "../utils/utils.question";

export const getAllQuestions = createAsyncThunk("/get-questions", async () => {
  const questions = await _getQuestions().then((questions) => {
    if (!questions) {
      throw Error(ERROR.GET_QUESTIONS);
    }
    return Object.values(questions);
  });
  return { questions };
});

export const getQuestionById = createAsyncThunk(
  "/get-question",
  async (questionId) => {
    const question = await _getQuestions().then((questions) => {
      const questionsList = Object.values(questions);
      const questionData = questionsList.find(
        (questions) => questions.id === questionId
      );
      if (!questionData) {
        throw Error(ERROR.GET_QUESTION);
      }
      return questionData;
    });
    return { question };
  }
);

export const addQuestion = createAsyncThunk(
  "/add-question",
  async (question) => {
    const questionData = await _saveQuestion(question);
    return { question: questionData };
  }
);

export const updateQuestionAnswer = createAsyncThunk(
  "/update-answer",
  async (data) => {
    const questionData = await _saveQuestionAnswer(data).then((newQuestion) => {
      if (!newQuestion) {
        throw Error(ERROR.ADD_QUESTION);
      }
      return newQuestion;
    });
    return { question: questionData };
  }
);
