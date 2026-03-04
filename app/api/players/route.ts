import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Category, Position } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const position = searchParams.get("position") as Position | null;
  const category = searchParams.get("category") as Category | null;
  const nationality = searchParams.get("nationality");
  const q = searchParams.get("q");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const where: Record<string, unknown> = { status: "active" };
  if (position) where.position = position;
  if (nationality) where.nationality = nationality;
  if (q) {
    where.OR = [
      { nameJa: { contains: q } },
      { nameEn: { contains: q } },
      { nameKana: { contains: q } },
    ];
  }

  const includeTeamFilter = category
    ? { currentTeam: { where: { category } } }
    : { currentTeam: true };

  const [players, total] = await Promise.all([
    prisma.player.findMany({
      where,
      include: {
        currentTeam: true,
      },
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.player.count({ where }),
  ]);

  // カテゴリフィルタが指定された場合は現所属チームのカテゴリでフィルタ
  const filtered = category
    ? players.filter((p) => p.currentTeam?.category === category)
    : players;

  return NextResponse.json({ players: filtered, total, page, limit });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
  }

  const body = await req.json();
  const { nameJa, nameEn, nameKana, nationality, birthday, position, currentTeamId, bio, careers, changeNote } = body;

  if (!nameJa || !position) {
    return NextResponse.json(
      { error: "選手名（日本語）とポジションは必須です" },
      { status: 400 }
    );
  }

  const player = await prisma.player.create({
    data: {
      nameJa,
      nameEn,
      nameKana,
      nationality: nationality || "日本",
      birthday: birthday ? new Date(birthday) : undefined,
      position,
      currentTeamId: currentTeamId || undefined,
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
      playerId: player.id,
      editorId: session.user.id!,
      snapshot: body,
      changeNote: changeNote || "選手を新規登録",
    },
  });

  return NextResponse.json(player, { status: 201 });
}
