import Link from "next/link";
import PlayerCard from "@/components/PlayerCard";
import { getRecentPlayers, getPlayerStats } from "@/lib/queries/players";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [recentPlayers, { totalPlayers, totalTeams }] = await Promise.all([
    getRecentPlayers().catch(() => []),
    getPlayerStats().catch(() => ({ totalPlayers: 0, totalTeams: 0 })),
  ]);

  return (
    <div className="space-y-10">
      {/* ヒーロー */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white rounded-2xl p-8 md:p-12 text-center shadow-lg">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          アマチュアサッカー選手名鑑
        </h1>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          大学・高校・中学・アマチュアなど、草の根サッカー選手の情報を網羅。
          誰でも編集・追加できるwiki型名鑑サイト。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/players"
            className="bg-white text-blue-700 font-bold px-8 py-3 rounded-full hover:bg-blue-50 transition-colors"
          >
            選手を探す
          </Link>
          <Link
            href="/players/new"
            className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-blue-600 transition-colors"
          >
            選手を登録する
          </Link>
        </div>
      </section>

      {/* 統計 */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "登録選手数", value: totalPlayers, icon: "👤" },
          { label: "登録チーム数", value: totalTeams, icon: "🏟️" },
          { label: "対応カテゴリ", value: 4, icon: "📋" },
          { label: "対応国数", value: "100+", icon: "🌍" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 text-center"
          >
            <p className="text-3xl mb-1">{stat.icon}</p>
            <p className="text-2xl font-bold text-blue-700">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* カテゴリ別リンク */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">カテゴリから探す</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "大学", value: "COLLEGE", icon: "🎓" },
            { label: "高校", value: "HIGH_SCHOOL", icon: "🏫" },
            { label: "中学", value: "MIDDLE_SCHOOL", icon: "📚" },
            { label: "アマチュア", value: "AMATEUR", icon: "⚽" },
          ].map((cat) => (
            <Link
              key={cat.value}
              href={`/players?category=${cat.value}`}
              className="bg-white border border-slate-200 rounded-xl p-4 text-center hover:border-blue-400 hover:shadow transition-all"
            >
              <p className="text-2xl mb-1">{cat.icon}</p>
              <p className="font-semibold text-gray-700">{cat.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 最近更新された選手 */}
      {recentPlayers.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">最近更新された選手</h2>
            <Link href="/players" className="text-blue-700 text-sm hover:underline">
              すべて見る →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
