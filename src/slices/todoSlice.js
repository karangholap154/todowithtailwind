import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    tasks: [],
  },
  reducers: {
    addTodo(state, action) {
      state.tasks.push(action.payload);
    },
    deleteTodo(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    markAsDone(state, action) {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload ? { ...task, done: !task.done } : task
      );
    },
  },
});

export const { addTodo, deleteTodo, markAsDone } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;