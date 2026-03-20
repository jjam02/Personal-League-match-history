export interface Summoner {
  id: string;
  name: string;
  puuid: string;
  profileIconId: number;
  summonerLevel: number;
}

export interface Match {
  matchID: string;
  champion: string;
  kills: number;
  deaths: number;
  assists: number;
  win: boolean;
  durationSeconds: number;
  playedAt: string;
}

export interface MatchFilters {
  champion: string | null;
  win: boolean;
}

export const QUEUE_TYPES: Record<number, string> = {
  420: "Ranked Solo/Duo",
  440: "Ranked Flex",
  450: "ARAM",
  400: "Normal Draft",
  490: "Normal Quickplay",
  700: "Clash",
  1700: "Arena",
  1900: "URF",
  900: "ARURF",
  480: "Swiftplay",
};
