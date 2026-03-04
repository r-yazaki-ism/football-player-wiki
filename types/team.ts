export type TeamSummary = {
  id: string;
  name: string;
  country: string;
  category: string;
  league: string | null;
};

export type TeamWithCount = TeamSummary & {
  _count: { currentPlayers: number };
};
