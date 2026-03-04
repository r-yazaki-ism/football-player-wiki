import { prisma } from "@/lib/prisma";
import type { TeamWithCount, TeamSummary } from "@/types/team";

export async function getTeamsWithCount(): Promise<TeamWithCount[]> {
  const teams = await prisma.team.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { currentPlayers: true } } },
  });

  return teams as TeamWithCount[];
}

export async function searchTeams(q: string): Promise<TeamSummary[]> {
  return prisma.team.findMany({
    where: { name: { contains: q } },
    take: 10,
  }) as Promise<TeamSummary[]>;
}
