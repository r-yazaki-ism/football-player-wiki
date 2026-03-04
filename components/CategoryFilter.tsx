"use client";

import { useRouter, useSearchParams } from "next/navigation";

const positions = [
  { value: "", label: "全ポジション" },
  { value: "GK", label: "GK" },
  { value: "DF", label: "DF" },
  { value: "MF", label: "MF" },
  { value: "FW", label: "FW" },
];

const categories = [
  { value: "", label: "全カテゴリ" },
  { value: "COLLEGE", label: "大学" },
  { value: "HIGH_SCHOOL", label: "高校" },
  { value: "MIDDLE_SCHOOL", label: "中学" },
  { value: "AMATEUR", label: "アマチュア" },
];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPosition = searchParams.get("position") || "";
  const currentCategory = searchParams.get("category") || "";
  const currentNationality = searchParams.get("nationality") || "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`/players?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <select
        value={currentPosition}
        onChange={(e) => updateFilter("position", e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {positions.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>

      <select
        value={currentCategory}
        onChange={(e) => updateFilter("category", e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {categories.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={currentNationality}
        onChange={(e) => updateFilter("nationality", e.target.value)}
        placeholder="国籍で絞り込み"
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {(currentPosition || currentCategory || currentNationality) && (
        <button
          onClick={() => router.push("/players")}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          絞り込みを解除
        </button>
      )}
    </div>
  );
}
