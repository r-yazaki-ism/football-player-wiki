import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get("q");

  if (!q || q.trim().length < 1) {
    return NextResponse.json({ players: [], teams: [] });
  }

  const [players, teams] = await Promise.all([
    prisma.player.findMany({
      where: {
        status: "active",
        OR: [
          { nameJa: { contains: q } },
          { nameEn: { contains: q } },
          { nameKana: { contains: q } },
        ],
      },
      include: { currentTeam: true },
      take: 20,
    }),
    prisma.team.findMany({
      where: { name: { contains: q } },
      take: 10,
    }),
  ]);

  return NextResponse.json({ players, teams });
}
