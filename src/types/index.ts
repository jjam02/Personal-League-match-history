export interface Summoner {
  profileIconId: number;
  puuid: string;
  revision_date: string;
  summonerLevel: number;
  username: string;
  tag: string;
}

export interface Match {
  matchID: string;
  summoner_puuid: string;
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
  32: "Co-op vs AI",
  700: "Clash",
  1700: "Arena",
  1900: "URF",
  900: "ARURF",
  480: "Swiftplay",
};

export const SUMMONER_SPELLS: Record<number, string> = {
  21: "SummonerBarrier",
  1: "SummonerBoost",
  14: "SummonerDot",
  3: "SummonerExhaust",
  4: "SummonerFlash",
  6: "SummonerHaste",
  7: "SummonerHeal",
  13: "SummonerMana",
  11: "SummonerSmite",
  32: "SummonerSnowball",
  12: "SummonerTeleport",
};

export const ranked_queues = {
  RANKED_SOLO_5x5: "Ranked Solo/Duo",
  RANKED_FLEX_SR: "Ranked Flex",
};
