import PlayerCard from "@/components/PlayerCard";
import CategoryFilter from "@/components/CategoryFilter";
import Link from "next/link";
import { Suspense } from "react";
import { getPlayersList } from "@/lib/queries/players";
import type { PlayerSearchParams } from "@/types/player";

export const dynamic = "force-dynamic";

function buildPageUrl(searchParams: PlayerSearchParams, newPage: number): string {
  const params = new URLSearchParams();
  if (searchParams.position) params.set("position", searchParams.position);
  if (searchParams.category) params.set("category", searchParams.category);
  if (searchParams.nationality) params.set("nationality", searchParams.nationality);
  if (searchParams.q) params.set("q", searchParams.q);
  params.set("page", String(newPage));
  return `/players?${params.toString()}`;
}

async function PlayerList({ searchParams }: { searchParams: PlayerSearchParams }) {
  const page = parseInt(searchParams.page || "1");
  const { players: filtered, total, limit } = await getPlayersList({
    position: searchParams.position,
    category: searchParams.category,
    nationality: searchParams.nationality,
    q: searchParams.q,
    page,
  });

  if (filtered.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="text-4xl mb-3">⚽</p>
        <p>条件に一致する選手が見つかりませんでした</p>
        <Link href="/players/new" className="mt-4 inline-block text-blue-700 hover:underline">
          選手を登録する →
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="text-sm text-gray-500 mb-4">
        {total}件中 {filtered.length}件を表示
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>

      {total > limit && (
        <div className="mt-8 flex justify-center gap-2">
          {page > 1 && (
            <Link
              href={buildPageUrl(searchParams, page - 1)}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              前へ
            </Link>
          )}
          <span className="px-4 py-2 text-gray-700">
            {page} / {Math.ceil(total / limit)}
          </span>
          {page < Math.ceil(total / limit) && (
            <Link
              href={buildPageUrl(searchParams, page + 1)}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              次へ
            </Link>
          )}
        </div>
      )}
    </>
  );
}

export default async function PlayersPage({
  searchParams,
}: {
  searchParams: Promise<PlayerSearchParams>;
}) {
  const params = await searchParams;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">選手一覧</h1>
        <Link
          href="/players/new"
          className="bg-blue-700 text-white px-4 py-2 rounded font-semibold hover:bg-blue-800 text-sm"
        >
          + 選手を追加
        </Link>
      </div>

      <Suspense>
        <CategoryFilter />
      </Suspense>

      <Suspense
        fallback={
          <div className="text-center py-16 text-gray-400">読み込み中...</div>
        }
      >
        <PlayerList searchParams={params} />
      </Suspense>
    </div>
  );
}
