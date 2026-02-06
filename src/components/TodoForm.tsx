"use client";

import { useState, FormEvent } from "react";

type Props = {
  onAdd: (text: string) => void;
};

export function TodoForm({ onAdd }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="rounded-xl bg-blue-600 px-7 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Add
      </button>
    </form>
  );
}
