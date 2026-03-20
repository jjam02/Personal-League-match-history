import { useState } from "react";
import {
  getSummonerByPuuid,
  getPuuidByName,
  getMatchHistoryByPuuid,
  getMatchDetailsByMatchID,
} from "../lib/riot";

export function useSummoner() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<any[]>([]);

  async function searchSummoner(summonerName: string, summonerTag: string) {
    setLoading(true);

    try {
      setError(null); // Clear error on new search
      setMatches([]); // Clear previous matches on new search
      const summonerInfo = await getPuuidByName(summonerName, summonerTag);
      const puuid = summonerInfo.puuid;
      const summonerInGameData = await getSummonerByPuuid(puuid);
      const matchHistory = await getMatchHistoryByPuuid(puuid);
      const matchDetailsPromises = matchHistory.map((matchID: string) =>
        getMatchDetailsByMatchID(matchID),
      );
      const matchDetails = await Promise.all(matchDetailsPromises);
      setMatches(matchDetails);
    } catch (err) {
      //console.error(err);
      setError("Failed to fetch summoner data");
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, matches, searchSummoner };
}
