import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    tasks: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.tasks.push(action.payload); // {id: nanoid() , todo: "Learn something new today", done: false}
    },
   deleteTodo: (state, action) => {
  state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;