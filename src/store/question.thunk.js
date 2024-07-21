import { createAsyncThunk } from "@reduxjs/toolkit";
import { ERROR, formatQuestion } from "../utils/utils.question";
import {
  _getQuestionById,
  _getQuestions,
  _saveQuestion,
  _updateQuestionAnswer,
  _updateUserAnswer,
  _updateUserQuestion,
} from "../api/api";

export const getAllQuestions = createAsyncThunk("/get-questions", async () => {
  const questions = await _getQuestions().then((questions) => {
    if (!questions) {
      throw Error(ERROR.GET_QUESTIONS);
    }
    return questions;
  });
  return { questions };
});

export const getQuestionById = createAsyncThunk(
  "/get-question",
  async (questionId) => {
    const question = await _getQuestionById(questionId).then((question) => {
      if (!question) {
        throw Error(ERROR.GET_QUESTION);
      }
      return question;
    });
    return { question };
  }
);

export const addQuestion = createAsyncThunk(
  "/add-question",
  async (question) => {
    const formattedQuestion = formatQuestion(question);
    const questionData = await _saveQuestion(formattedQuestion);
    // add question id to the author
    const authorData = await _updateUserQuestion(formattedQuestion);
    return { question: questionData };
  }
);

export const updateQuestionAnswer = createAsyncThunk(
  "/update-answer",
  async (data) => {
    const userData = await _updateUserAnswer(data);
    const questionData = await _updateQuestionAnswer(data).then(
      (newQuestion) => {
        if (!newQuestion) {
          throw Error(ERROR.ADD_QUESTION);
        }
        return newQuestion;
      }
    );
    return { question: questionData };
  }
);
