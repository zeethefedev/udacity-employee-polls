import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getAllQuestions } from "./question.thunk";

export const questionSlice = createSlice({
  name: "question",
  initialState: {
    questions: [],
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
          // state.message = MESSAGES[`LOGIN_${error.code.toUpperCase()}_ERROR`];
        } else {
          state.questions = questions;
          // state.message = MESSAGES.LOGIN_SUCCESS;
        }
        state.loading = false;
      })
      .addMatcher(isAnyOf(getAllQuestions.pending), (state) => {
        state.error = false;
        state.message = "";
        state.loading = true;
      });
  },
});

export const {} = questionSlice.actions;

export default questionSlice.reducer;
