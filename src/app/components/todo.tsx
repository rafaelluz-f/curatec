"use client";

import { useEffect, useState } from "react";

enum status {
  completed = "completed",
  incomplete = "incomplete",
}

interface Todos {
  id: number;
  title: string;
  status: status;
}

export function Todo() {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [title, setTitle] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    setTitle(value);
  };

  const handleRemoveTodo = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    id: number
  ) => {
    e.preventDefault();

    const todosWithoutRemoved = todos.filter((item) => item.id !== id);
    console.log({ todosWithoutRemoved });
    setTodos(todosWithoutRemoved);
  };

  const handleStatus = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    id: number
  ) => {
    e.preventDefault();
    const differentTodos = todos.filter((item) => item.id !== id);
    const todo = todos.filter((item) => item.id === id).shift();
    if (!todo) return;

    todo.status =
      todo.status === status.completed ? status.incomplete : status.completed;

    setTodos([...differentTodos, todo]);
  };

  const handleForm = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const id = todos.length + 1;

    const newTodo = {
      id,
      title,
      status: status.incomplete,
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  useEffect(() => {
    console.log({ todos });
  }, [todos]);

  return (
    <div>
      <h1>Tasks ({todos.length})</h1>
      <form>
        <input
          className="text-slate-800 p-2"
          onChange={(e) => handleOnChange(e)}
        />
        <button className="bg-sky-800 p-2" onClick={(e) => handleForm(e)}>
          Add
        </button>
      </form>

      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              {todo.title} - {todo.status}
              <span className="px-2" onClick={(e) => handleStatus(e, todo.id)}>
                mark as{" "}
                {todo.status === status.incomplete
                  ? status.completed
                  : status.incomplete}
              </span>
              <span onClick={(e) => handleRemoveTodo(e, todo.id)}>remove</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
