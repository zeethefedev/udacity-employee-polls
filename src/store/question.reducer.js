import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestionAnswer,
} from "./question.thunk";
import { getUserById } from "./user.thunk";
import { MESSAGES } from "../utils/utils.question";

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
  reducers: {},
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
        isAnyOf(
          getAllQuestions.rejected,
          getQuestionById.rejected,
          updateQuestionAnswer.rejected,
          addQuestion.rejected
        ),
        (state, action) => {
          const { message } = action.error;
          state.error = true;
          state.message = message;
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

export const {} = questionSlice.actions;

export default questionSlice.reducer;
