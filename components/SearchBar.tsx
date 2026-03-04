"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-1">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="選手名・チーム名で検索"
        className="px-3 py-1 rounded text-gray-800 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-white"
      />
      <button
        type="submit"
        className="bg-slate-900 px-3 py-1 rounded text-sm hover:bg-slate-800"
      >
        検索
      </button>
    </form>
  );
}
