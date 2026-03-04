import { notFound } from "next/navigation";
import Link from "next/link";
import { getPlayerHistory } from "@/lib/queries/players";

export const dynamic = "force-dynamic";

export default async function PlayerHistoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const player = await getPlayerHistory(id);

  if (!player) notFound();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Link
          href={`/players/${id}`}
          className="text-sky-600 text-sm hover:underline"
        >
          ← {player.nameJa} のページに戻る
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">
          {player.nameJa} の編集履歴
        </h1>
      </div>

      {player.revisions.length === 0 ? (
        <p className="text-gray-500">編集履歴がありません</p>
      ) : (
        <ol className="space-y-3">
          {player.revisions.map((revision, index) => (
            <li
              key={revision.id}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    {index === 0 && (
                      <span className="text-xs bg-sky-100 text-sky-600 px-2 py-0.5 rounded mr-2">
                        最新
                      </span>
                    )}
                    {revision.changeNote || "編集"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    編集者:{" "}
                    <span className="font-medium">{revision.editor.name}</span>
                  </p>
                </div>
                <time className="text-xs text-gray-400 whitespace-nowrap ml-4">
                  {new Date(revision.createdAt).toLocaleString("ja-JP")}
                </time>
              </div>

              <details className="mt-3">
                <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
                  スナップショットを表示
                </summary>
                <pre className="mt-2 text-xs bg-gray-50 p-3 rounded overflow-auto text-gray-700 max-h-60">
                  {JSON.stringify(revision.snapshot, null, 2)}
                </pre>
              </details>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
