import Link from "next/link";
import { getTeamsWithCount } from "@/lib/queries/teams";
import { categoryLabel, categoryOrder } from "@/types/labels";

export const dynamic = "force-dynamic";

export default async function TeamsPage() {
  const teams = await getTeamsWithCount();

  const grouped = categoryOrder.reduce(
    (acc, cat) => {
      acc[cat] = teams.filter((t) => t.category === cat);
      return acc;
    },
    {} as Record<string, typeof teams>
  );

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">チーム一覧</h1>

      {categoryOrder.map((cat) => {
        const catTeams = grouped[cat];
        if (catTeams.length === 0) return null;
        return (
          <section key={cat}>
            <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
              {categoryLabel[cat]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {catTeams.map((team) => (
                <Link
                  key={team.id}
                  href={`/players?category=${team.category}`}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:shadow-sm transition-all"
                >
                  <p className="font-semibold text-gray-900">{team.name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {team.country !== "日本" && `${team.country} / `}
                    {team.league || categoryLabel[team.category]}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    選手 {team._count.currentPlayers}名
                  </p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
