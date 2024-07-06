import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getAllQuestions, getQuestionById } from "./question.thunk";

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
      .addMatcher(
        isAnyOf(getAllQuestions.pending, getQuestionById.pending),
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
