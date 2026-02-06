"use client";

import { useState, useMemo } from "react";
import { useTodos } from "@/hooks/useTodos";
import { TodoForm } from "@/components/TodoForm";
import { TodoFilter, FilterType } from "@/components/TodoFilter";
import { TodoList } from "@/components/TodoList";

export default function Home() {
  const { todos, isLoaded, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.completed);
      case "completed":
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-black tracking-tight text-gray-900">
        TODO
      </h1>
      <div className="flex flex-col gap-5">
        <TodoForm onAdd={addTodo} />
        <TodoFilter current={filter} onChange={setFilter} />
        {isLoaded ? (
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ) : (
          <p className="py-8 text-center text-gray-400">Loading...</p>
        )}
      </div>
    </div>
  );
}
