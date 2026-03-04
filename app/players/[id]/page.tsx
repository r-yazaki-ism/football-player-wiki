import CareerTimeline from "@/components/CareerTimeline";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getPlayerDetail } from "@/lib/queries/players";
import { positionLabelFull, categoryLabel, formatBirthday } from "@/types/labels";

export const dynamic = "force-dynamic";

export default async function PlayerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const player = await getPlayerDetail(id);

  if (!player) notFound();

  const lastRevision = player.revisions[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* ヘッダー */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{player.nameJa}</h1>
            {player.nameKana && (
              <p className="text-gray-500 text-sm mt-1">{player.nameKana}</p>
            )}
            {player.nameEn && (
              <p className="text-gray-400 text-sm">{player.nameEn}</p>
            )}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-sky-100 text-slate-800 text-sm font-semibold px-3 py-1 rounded-full">
                {positionLabelFull[player.position] || player.position}
              </span>
              {player.currentTeam && (
                <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                  {player.currentTeam.name}（{categoryLabel[player.currentTeam.category]}）
                </span>
              )}
            </div>
          </div>

          {session && (
            <Link
              href={`/players/${player.id}/edit`}
              className="bg-slate-800 text-white px-4 py-2 rounded font-semibold hover:bg-slate-700 text-sm whitespace-nowrap"
            >
              編集する
            </Link>
          )}
        </div>
      </div>

      {/* 基本情報テーブル */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">基本情報</h2>
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-100">
            {[
              { label: "国籍", value: player.nationality },
              { label: "生年月日", value: formatBirthday(player.birthday) },
              { label: "ポジション", value: positionLabelFull[player.position] || player.position },
              {
                label: "現所属チーム",
                value: player.currentTeam
                  ? `${player.currentTeam.name}（${categoryLabel[player.currentTeam.category]}）`
                  : "不明",
              },
            ].map(({ label, value }) => (
              <tr key={label}>
                <td className="py-2 pr-4 text-gray-500 font-medium w-32">{label}</td>
                <td className="py-2 text-gray-900">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 特徴・プロフィール */}
      {player.bio && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">特徴・プロフィール</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{player.bio}</p>
        </div>
      )}

      {/* 経歴 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">経歴</h2>
        <CareerTimeline careers={player.careers} />
      </div>

      {/* フッター情報 */}
      <div className="text-xs text-gray-400 flex justify-between items-center">
        <span>
          最終更新: {lastRevision?.editor.name || "不明"} ({" "}
          {lastRevision
            ? new Date(lastRevision.createdAt).toLocaleString("ja-JP")
            : "-"}
          )
        </span>
        <Link href={`/players/${player.id}/history`} className="hover:underline">
          編集履歴を見る
        </Link>
      </div>
    </div>
  );
}
