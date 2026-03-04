import Link from "next/link";
import type { PlayerSummary } from "@/types/player";
import { positionLabel, positionColor, categoryLabel, getAge } from "@/types/labels";

export default function PlayerCard({ player }: { player: PlayerSummary }) {
  return (
    <Link href={`/players/${player.id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 border border-gray-100">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="font-bold text-gray-900 text-lg">{player.nameJa}</p>
            {player.nameEn && (
              <p className="text-gray-500 text-xs">{player.nameEn}</p>
            )}
            {player.nameKana && (
              <p className="text-gray-400 text-xs">{player.nameKana}</p>
            )}
          </div>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded ${positionColor[player.position] || "bg-gray-100 text-gray-700"}`}
          >
            {positionLabel[player.position] || player.position}
          </span>
        </div>

        <div className="text-sm text-gray-600 space-y-1">
          {player.currentTeam && (
            <p>
              <span className="text-gray-400">所属: </span>
              {player.currentTeam.name}
              <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1 rounded">
                {categoryLabel[player.currentTeam.category]}
              </span>
            </p>
          )}
          <p>
            <span className="text-gray-400">国籍: </span>
            {player.nationality}
          </p>
          <p>
            <span className="text-gray-400">年齢: </span>
            {getAge(player.birthday)}
          </p>
        </div>
      </div>
    </Link>
  );
}
