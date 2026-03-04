import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const data = JSON.parse(fs.readFileSync("scripts/export.json", "utf-8"));

  // Clear existing data in correct order (respect foreign keys)
  await prisma.revision.deleteMany();
  await prisma.career.deleteMany();
  await prisma.player.deleteMany();
  await prisma.team.deleteMany();
  await prisma.user.deleteMany();

  // Import in correct order
  for (const user of data.users) {
    await prisma.user.create({ data: user });
  }
  console.log(`Imported ${data.users.length} users`);

  for (const team of data.teams) {
    await prisma.team.create({ data: team });
  }
  console.log(`Imported ${data.teams.length} teams`);

  for (const player of data.players) {
    await prisma.player.create({ data: player });
  }
  console.log(`Imported ${data.players.length} players`);

  for (const career of data.careers) {
    await prisma.career.create({ data: career });
  }
  console.log(`Imported ${data.careers.length} careers`);

  for (const revision of data.revisions) {
    await prisma.revision.create({ data: revision });
  }
  console.log(`Imported ${data.revisions.length} revisions`);

  console.log("Import complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
