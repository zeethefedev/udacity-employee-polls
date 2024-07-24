import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatQuestion } from "../utils/utils.question";
import {
  _getQuestionById,
  _getQuestions,
  _saveQuestion,
  _updateQuestionAnswer,
  _updateUserAnswer,
  _updateUserQuestion,
} from "../api/api";

export const getAllQuestions = createAsyncThunk("/get-questions", async () => {
  const questions = await _getQuestions();
  return { questions };
});

export const getQuestionById = createAsyncThunk(
  "/get-question",
  async (questionId) => {
    const question = await _getQuestionById(questionId);
    return { question };
  }
);

export const addQuestion = createAsyncThunk(
  "/add-question",
  async (question) => {
    const formattedQuestion = formatQuestion(question);
    const questionData = await _saveQuestion(formattedQuestion);
    // add question id to the author
    await _updateUserQuestion(formattedQuestion);
    return { question: questionData };
  }
);

export const updateQuestionAnswer = createAsyncThunk(
  "/update-answer",
  async (data) => {
    await _updateUserAnswer(data);
    const questionData = await _updateQuestionAnswer(data);
    return { question: questionData };
  }
);
