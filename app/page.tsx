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
      <section className="relative rounded-2xl overflow-hidden shadow-lg">
        <img
          src="/hero-banner.png"
          alt="Amateur Football Stars - Discover Local Talent"
          className="w-full h-auto block"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col sm:flex-row gap-6 sm:gap-48 justify-center items-center bg-gradient-to-t from-black/30 to-transparent">
          <Link
            href="/players"
            className="bg-slate-800 text-white font-bold px-8 py-3 rounded-full hover:bg-slate-700 transition-colors"
          >
            選手を探す
          </Link>
          <Link
            href="/players/new"
            className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white/20 transition-colors"
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
            <p className="text-2xl font-bold text-sky-600">{stat.value}</p>
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
              className="bg-white border border-slate-200 rounded-xl p-4 text-center hover:border-sky-400 hover:shadow transition-all"
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
            <Link href="/players" className="text-sky-600 text-sm hover:underline">
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
