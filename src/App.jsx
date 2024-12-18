
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { addTodo, deleteTodo, markAsDone } from "./slices/todoSlice";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

function App() {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos.tasks);

  const handleAddTodo = () => {
    const todoObj = {
      id: nanoid(),
      todo: task,
      done: false,
    };

    dispatch(addTodo(todoObj));
    setTask("");
  };

  return (
    <div className="min-h-screen bg-slate-600 flex flex-col items-center py-10">
      <h1 className="text-center text-3xl font-bold text-slate-200 mb-6">
        Todo Application
      </h1>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter Todo"
          className="px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
          onChange={(e) => setTask(e.target.value)}
          value={task}
        />
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-md font-bold hover:bg-blue-600 transition duration-200"
          onClick={handleAddTodo}
        >
          Add Task
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-between w-full max-w-4xl px-4 md:px-0">
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <h2 className="text-xl font-semibold text-slate-200 md:text-center">Pending Tasks</h2>
          {todos.filter((todo) => !todo.done).map((todo) => (
            <TodoComponent
              key={todo.id}
              title={todo.todo}
              id={todo.id}
              done={todo.done}
            />
          ))}
        </div>
        <div className="w-[1px] bg-slate-400 mx-4 hidden md:block"></div>
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <h2 className="text-xl font-semibold text-slate-200 md:text-center">Completed Tasks</h2>
          {todos.filter((todo) => todo.done).map((todo) => (
            <TodoComponent
              key={todo.id}
              title={todo.todo}
              id={todo.id}
              done={todo.done}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TodoComponent({ title, id, done }) {
  const dispatch = useDispatch();

  const handleDeleteTodo = () => {
    dispatch(deleteTodo(id));
  };

  const handleDone = () => {
    dispatch(markAsDone(id));
  };

  return (
    <div className="flex justify-between items-center bg-slate-700 p-4 rounded-md shadow-md hover:shadow-lg transition duration-200">
      <p className={`w-1/2 ${done ? "line-through text-gray-400" : "text-slate-50"}`}>
        {title}
      </p>
      <div className="flex gap-4">
        <button
          className={`border ${done ? "border-red-500 text-red-500" : "border-green-400 text-green-400"} px-4 py-2 rounded-md font-bold hover:bg-slate-500 transition duration-200`}
          onClick={handleDone}
        >
          {done ? "Incomplete" : "Complete"}
        </button>
        <button
          className="border border-red-400 px-4 py-2 rounded-md font-bold text-red-400 hover:bg-slate-500 transition duration-200"
          onClick={handleDeleteTodo}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default App;