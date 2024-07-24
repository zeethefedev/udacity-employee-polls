import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestionAnswer,
} from "./question.thunk";
import { getUserById } from "./user.thunk";
import { ERROR, MESSAGES } from "../utils/utils.question";

export const questionSlice = createSlice({
  name: "question",
  initialState: {
    questions: [],
    currentQuestion: undefined,
    author: "",
    error: false,
    loading: false,
    message: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllQuestions.fulfilled, (state, action) => {
        const { questions } = action.payload;
        state.questions = questions;
        state.loading = false;
      })
      .addCase(getQuestionById.fulfilled, (state, action) => {
        const { question } = action.payload;
        state.currentQuestion = question;
        state.loading = false;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.author = user;
        state.loading = false;
      })
      .addCase(updateQuestionAnswer.fulfilled, (state, action) => {
        const { question } = action.payload;
        state.currentQuestion = question;
        const newQuestions = state.questions.map((quest) =>
          quest.id === question.id ? question : quest
        );
        state.questions = newQuestions;
        state.loading = false;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        const { question } = action.payload;
        state.currentQuestion = question;
        state.questions = [...state.questions, question];
        state.message = MESSAGES.ADD_QUESTION_SUCCESS;
        state.loading = false;
      })
      .addMatcher(
        isAnyOf(updateQuestionAnswer.rejected, addQuestion.rejected),
        (state, action) => {
          const { type, error } = action;
          const { message } = error;
          const key = type.split("/")[1]?.replace("-", "_").toUpperCase();

          state.error = true;
          state.message = ERROR[key] || message;
          state.loading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getAllQuestions.pending,
          getQuestionById.pending,
          updateQuestionAnswer.pending,
          addQuestion.pending
        ),
        (state) => {
          state.error = false;
          state.message = "";
          state.loading = true;
        }
      );
  },
});

export default questionSlice.reducer;
