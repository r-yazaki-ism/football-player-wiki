import PlayerCard from "@/components/PlayerCard";
import Link from "next/link";
import { searchPlayers } from "@/lib/queries/players";
import { searchTeams } from "@/lib/queries/teams";
import { categoryLabel } from "@/types/labels";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  if (!q || q.trim() === "") {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="text-4xl mb-3">🔍</p>
        <p>検索キーワードを入力してください</p>
      </div>
    );
  }

  const [players, teams] = await Promise.all([
    searchPlayers(q),
    searchTeams(q),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          「{q}」の検索結果
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          選手 {players.length}件、チーム {teams.length}件
        </p>
      </div>

      {players.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-3">選手</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </section>
      )}

      {teams.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-3">チーム</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {teams.map((team) => (
              <div
                key={team.id}
                className="bg-white border border-gray-200 rounded-lg p-4"
              >
                <p className="font-semibold text-gray-900">{team.name}</p>
                <p className="text-sm text-gray-500">
                  {categoryLabel[team.category] || team.category}
                  {team.country !== "日本" && ` / ${team.country}`}
                  {team.league && ` / ${team.league}`}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {players.length === 0 && teams.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-3">⚽</p>
          <p>「{q}」に一致する選手・チームが見つかりませんでした</p>
          <div className="mt-4 space-x-4">
            <Link href="/players/new" className="text-sky-600 hover:underline">
              選手を登録する
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
