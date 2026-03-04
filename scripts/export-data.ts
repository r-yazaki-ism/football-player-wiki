import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  const teams = await prisma.team.findMany();
  const players = await prisma.player.findMany();
  const careers = await prisma.career.findMany();
  const revisions = await prisma.revision.findMany();

  const data = { users, teams, players, careers, revisions };
  fs.writeFileSync("scripts/export.json", JSON.stringify(data, null, 2));
  console.log(
    `Exported: ${users.length} users, ${teams.length} teams, ${players.length} players, ${careers.length} careers, ${revisions.length} revisions`
  );
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
