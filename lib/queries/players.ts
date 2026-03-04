import { prisma } from "@/lib/prisma";
import type { Category, Position } from "@prisma/client";
import type { PlayerSummary, PlayerDetail, PlayerForEdit, PlayerWithRevisions } from "@/types/player";

export async function getRecentPlayers(take = 6): Promise<PlayerSummary[]> {
  return prisma.player.findMany({
    where: { status: "active" },
    include: { currentTeam: true },
    orderBy: { updatedAt: "desc" },
    take,
  });
}

export async function getPlayerStats() {
  const [totalPlayers, totalTeams] = await Promise.all([
    prisma.player.count({ where: { status: "active" } }),
    prisma.team.count(),
  ]);
  return { totalPlayers, totalTeams };
}

export type PlayerListParams = {
  position?: string;
  category?: string;
  nationality?: string;
  q?: string;
  page?: number;
  limit?: number;
};

export async function getPlayersList(params: PlayerListParams) {
  const { position, nationality, q, category, page = 1, limit = 20 } = params;

  const where: Record<string, unknown> = { status: "active" };
  if (position) where.position = position as Position;
  if (nationality) where.nationality = nationality;
  if (category) where.currentTeam = { category: category as Category };
  if (q) {
    where.OR = [
      { nameJa: { contains: q } },
      { nameEn: { contains: q } },
      { nameKana: { contains: q } },
    ];
  }

  const [players, total] = await Promise.all([
    prisma.player.findMany({
      where,
      include: { currentTeam: true },
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.player.count({ where }),
  ]);

  return { players: players as PlayerSummary[], total, page, limit };
}

export async function getPlayerDetail(id: string): Promise<PlayerDetail | null> {
  const player = await prisma.player.findUnique({
    where: { id },
    include: {
      currentTeam: true,
      careers: {
        include: { team: true },
        orderBy: { startYear: "asc" },
      },
      revisions: {
        include: { editor: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  return player as PlayerDetail | null;
}

export async function getPlayerForEdit(id: string): Promise<PlayerForEdit | null> {
  const player = await prisma.player.findUnique({
    where: { id },
    include: {
      careers: {
        include: { team: true },
        orderBy: { startYear: "asc" },
      },
    },
  });

  return player as PlayerForEdit | null;
}

export async function getPlayerHistory(id: string): Promise<PlayerWithRevisions | null> {
  const player = await prisma.player.findUnique({
    where: { id },
    include: {
      revisions: {
        include: { editor: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return player as PlayerWithRevisions | null;
}

export async function searchPlayers(q: string) {
  return prisma.player.findMany({
    where: {
      status: "active",
      OR: [
        { nameJa: { contains: q } },
        { nameEn: { contains: q } },
        { nameKana: { contains: q } },
      ],
    },
    include: { currentTeam: true },
    take: 30,
  }) as Promise<PlayerSummary[]>;
}
