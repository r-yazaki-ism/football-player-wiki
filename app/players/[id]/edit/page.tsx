import { notFound } from "next/navigation";
import PlayerForm from "@/components/PlayerForm";
import Link from "next/link";
import { getPlayerForEdit } from "@/lib/queries/players";

export const dynamic = "force-dynamic";

export default async function EditPlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const player = await getPlayerForEdit(id);

  if (!player) notFound();

  const initialData = {
    id: player.id,
    nameJa: player.nameJa,
    nameEn: player.nameEn || "",
    nameKana: player.nameKana || "",
    nationality: player.nationality,
    birthday: player.birthday
      ? new Date(player.birthday).toISOString().split("T")[0]
      : "",
    position: player.position,
    currentTeamId: player.currentTeamId || "",
    bio: player.bio || "",
    careers: player.careers.map((c) => ({
      teamId: c.teamId,
      startYear: c.startYear,
      endYear: c.endYear || null,
      notes: c.notes || "",
    })),
  };

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
          {player.nameJa} を編集
        </h1>
      </div>
      <PlayerForm mode="edit" initialData={initialData} />
    </div>
  );
}
