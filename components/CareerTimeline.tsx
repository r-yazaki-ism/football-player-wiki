import type { Career } from "@/types/player";
import { categoryLabel } from "@/types/labels";

export default function CareerTimeline({ careers }: { careers: Career[] }) {
  if (careers.length === 0) {
    return <p className="text-gray-500 text-sm">経歴情報がありません</p>;
  }

  return (
    <ol className="relative border-l border-sky-200 ml-3">
      {careers.map((career) => (
        <li key={career.id} className="mb-6 ml-6">
          <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 ring-4 ring-white text-white text-xs font-bold">
            ⚽
          </span>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <p className="font-semibold text-gray-900">
              {career.team.name}
              <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-1 rounded">
                {categoryLabel[career.team.category] || career.team.category}
              </span>
              {career.team.country !== "日本" && (
                <span className="ml-1 text-xs text-gray-500">
                  ({career.team.country})
                </span>
              )}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {career.startYear}年 〜 {career.endYear ? `${career.endYear}年` : "現在"}
            </p>
            {career.notes && (
              <p className="text-sm text-gray-500 mt-1">{career.notes}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
