import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const player = await prisma.player.findUnique({
    where: { id },
    include: {
      currentTeam: true,
      careers: {
        include: { team: true },
        orderBy: { startYear: "asc" },
      },
    },
  });

  if (!player) {
    return NextResponse.json({ error: "選手が見つかりません" }, { status: 404 });
  }

  return NextResponse.json(player);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { nameJa, nameEn, nameKana, nationality, birthday, position, currentTeamId, bio, careers, changeNote } = body;

  const existing = await prisma.player.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "選手が見つかりません" }, { status: 404 });
  }

  // 経歴を一旦削除して再作成
  await prisma.career.deleteMany({ where: { playerId: id } });

  const player = await prisma.player.update({
    where: { id },
    data: {
      nameJa,
      nameEn,
      nameKana,
      nationality,
      birthday: birthday ? new Date(birthday) : null,
      position,
      currentTeamId: currentTeamId || null,
      bio,
      careers: {
        create: (careers || []).map((c: { teamId: string; startYear: number; endYear?: number; notes?: string }) => ({
          teamId: c.teamId,
          startYear: c.startYear,
          endYear: c.endYear,
          notes: c.notes,
        })),
      },
    },
    include: { currentTeam: true, careers: { include: { team: true } } },
  });

  await prisma.revision.create({
    data: {
      playerId: id,
      editorId: session.user.id!,
      snapshot: body,
      changeNote: changeNote || "選手情報を更新",
    },
  });

  return NextResponse.json(player);
}
