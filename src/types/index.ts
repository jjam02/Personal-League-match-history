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
