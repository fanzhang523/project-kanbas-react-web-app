import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [] as any[],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuizzes: (state, { payload: quiz }) => {
      state.quizzes.push(quiz);
    },
    deleteQuizzes: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (q) => q._id !== quizId  // 修正为使用 "_id" 字段
      );
    },
    updateQuizzes: (state, { payload: updatedQuiz }) => {
      const index = state.quizzes.findIndex((q) => q._id === updatedQuiz._id); // 使用 "_id" 字段
      if (index !== -1) {
        state.quizzes[index] = updatedQuiz;
      }
    },
  },
});

export const { addQuizzes, deleteQuizzes, updateQuizzes, setQuizzes } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;
