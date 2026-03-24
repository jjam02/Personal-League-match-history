import { useState } from "react";
import {
  getSummonerByPuuid,
  getPuuidByName,
  getMatchHistoryByPuuid,
  getMatchDetailsByMatchID,
} from "../lib/riot";

import {
  addSummoner,
  addMatchHistory,
  getPuuidDB,
  getMatchesDB,
  cleanMatchData,
} from "../lib/supabase";

export function useSummoner() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<any[]>([]);

  async function searchSummoner(summonerName: string, summonerTag: string) {
    setLoading(true);

    try {
      setError(null); // Clear error on new search
      setMatches([]); // Clear previous matches on new search
      const existingSummoner = await getPuuidDB(summonerName, summonerTag);
      if (existingSummoner) {
        console.log("SUMMONER FOUND IN DB, FETCHING MATCHES"); // keep this for testing
        const puuid = existingSummoner;
        const matchHistory = await getMatchesDB(puuid);
        setMatches(matchHistory);
        return;
      }
      console.log("NO SUMMONER IN DB, FETCHING FROM RIOT API"); // keep this for testing
      const summonerInfo = await getPuuidByName(summonerName, summonerTag);
      const puuid = summonerInfo.puuid;
      await addSummoner(puuid, summonerName, summonerTag);
      const summonerInGameData = await getSummonerByPuuid(puuid);
      const matchHistory = await getMatchHistoryByPuuid(puuid);
      const matchDetailsPromises = matchHistory.map((matchID: string) =>
        getMatchDetailsByMatchID(matchID),
      );
      const matchDetails = await Promise.all(matchDetailsPromises);
      addMatchHistory(puuid, matchDetails);
      setMatches(cleanMatchData(matchDetails, puuid));
      // console.log("MATCHES STATE:", matches); // keep this for testing
    } catch (err) {
      //console.error(err);
      setError("Failed to fetch summoner data");
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, matches, searchSummoner };
}
