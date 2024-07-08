import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestionAnswer,
} from "./question.thunk";
import { getUserById } from "./user.thunk";

export const questionSlice = createSlice({
  name: "question",
  initialState: {
    questions: [],
    currentQuestion: undefined,
    error: false,
    loading: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllQuestions.fulfilled, (state, action) => {
        const { questions, error } = action.payload;
        if (error) {
          state.error = true;
        } else {
          state.questions = questions;
        }
        state.loading = false;
      })
      .addCase(getQuestionById.fulfilled, (state, action) => {
        const { question, error } = action.payload;
        if (error) {
          state.error = true;
        } else {
          state.currentQuestion = question;
        }
        state.loading = false;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        const { user, error } = action.payload;
        if (error) {
          state.error = true;
        } else {
          state.currentQuestion.avatarURL = user.avatarURL;
        }
        state.loading = false;
      })
      .addCase(updateQuestionAnswer.fulfilled, (state, action) => {
        const { question, error } = action.payload;
        if (error) {
          state.error = true;
        } else {
          state.currentQuestion = question;
          const newQuestions = state.questions.map((quest) =>
            quest.id === question.id ? question : quest
          );
          state.questions = newQuestions;
        }
        state.loading = false;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        const { question, error } = action.payload;
        if (error) {
          state.error = true;
        } else {
          state.currentQuestion = question;
          state.questions = [...state.questions, question];
        }
        state.loading = false;
      })
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
