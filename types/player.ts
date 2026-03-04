import type { Category } from "@prisma/client";

export type PlayerSummary = {
  id: string;
  nameJa: string;
  nameEn: string | null;
  nameKana: string | null;
  nationality: string;
  birthday: Date | null;
  position: string;
  currentTeam: {
    id: string;
    name: string;
    category: Category;
  } | null;
};

export type PlayerDetail = PlayerSummary & {
  bio: string | null;
  careers: Career[];
  revisions: {
    id: string;
    changeNote: string | null;
    createdAt: Date;
    editor: { name: string };
  }[];
};

export type PlayerForEdit = {
  id: string;
  nameJa: string;
  nameEn: string | null;
  nameKana: string | null;
  nationality: string;
  birthday: Date | null;
  position: string;
  currentTeamId: string | null;
  bio: string | null;
  careers: {
    teamId: string;
    startYear: number;
    endYear: number | null;
    notes: string | null;
  }[];
};

export type PlayerWithRevisions = {
  id: string;
  nameJa: string;
  revisions: {
    id: string;
    changeNote: string | null;
    createdAt: Date;
    snapshot: unknown;
    editor: { id: string; name: string };
  }[];
};

export type Career = {
  id: string;
  startYear: number;
  endYear: number | null;
  notes: string | null;
  team: {
    id: string;
    name: string;
    country: string;
    category: string;
  };
};

export type CareerInput = {
  teamId: string;
  startYear: number;
  endYear: number | null;
  notes: string;
};

export type PlayerFormData = {
  nameJa: string;
  nameEn: string;
  nameKana: string;
  nationality: string;
  birthday: string;
  position: string;
  currentTeamId: string;
  bio: string;
  careers: CareerInput[];
  changeNote: string;
};

export type PlayerSearchParams = {
  position?: string;
  category?: string;
  nationality?: string;
  q?: string;
  page?: string;
};
