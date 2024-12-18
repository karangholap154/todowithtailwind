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
    <div className="bg-slate-600">
      <h1 className="text-center text-2xl font-bold text-slate-200">
        Todo Application
      </h1>
      <div className="flex justify-center items-center py-10 gap-8">
        <input
          type="text"
          placeholder="Enter Todo"
          className="px-8 py-4 rounded-md"
          onChange={(e) => setTask(e.target.value)}
          value={task}
        />
        <button
          className="border border-white px-8 py-4 rounded-md font-bold text-slate-200
        hover:bg-slate-500"
          onClick={handleAddTodo}
        >
          Add Task
        </button>
      </div>
      <div className="flex justify-between w-full px-32 min-h-[70vh]">
        <div className="flex flex-col gap-4 w-1/2">
          {todos.filter((todo) => !todo.done).map((todo) => (
            <TodoComponent
              key={todo.id}
              title={todo.todo}
              id={todo.id}
              done={todo.done}
            />
          ))}
        </div>
        <div className="w-[1px] bg-slate-400 mx-4"></div>
        <div className="flex flex-col gap-4 w-1/2">
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
    <div className="flex gap-8 text-slate-50 items-center">
      <p className="w-1/2">{title} </p>
      <button
        className={`border ${done ? "border-red-500 text-red-500" : "border-green-400 text-green-400"} px-4 py-2 rounded-md font-bold hover:bg-slate-500`}
        onClick={handleDone}
      >
        {done ? "Incomplete" : "Complete"}
      </button>
      <button
        className="border border-red-400 px-4 py-2 rounded-md font-bold text-red-400
        hover:bg-slate-500"
        onClick={handleDeleteTodo}
      >
        Remove
      </button>
    </div>
  );
}

export default App;