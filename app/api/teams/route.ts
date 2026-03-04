import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Category } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get("q");
  const category = searchParams.get("category") as Category | null;

  const where: Record<string, unknown> = {};
  if (category) where.category = category;
  if (q) where.name = { contains: q };

  const teams = await prisma.team.findMany({
    where,
    orderBy: { name: "asc" },
    take: 50,
  });

  return NextResponse.json(teams);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
  }

  const { name, country, league, category } = await req.json();

  if (!name || !category) {
    return NextResponse.json(
      { error: "チーム名とカテゴリは必須です" },
      { status: 400 }
    );
  }

  const team = await prisma.team.create({
    data: { name, country: country || "日本", league, category },
  });

  return NextResponse.json(team, { status: 201 });
}
