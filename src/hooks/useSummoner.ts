import { useState } from "react";
import {
  getSummonerByPuuid,
  getPuuidByName,
  getMatchHistoryByPuuid,
  getMatchDetailsByMatchID,
  getUsernameTagByPuuid,
  getRankedInfoByPuuid,
} from "../lib/riot";
import {
  addSummoner,
  addMatchHistory,
  addRankedInfo,
  getSummonerDB,
  getMatchesDB,
  getRankedInfoDB,
  cleanMatchData,
} from "../lib/supabase";

const STALE_THRESHOLD_MS = 5 * 60 * 1000;

export function useSummoner() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [rankedInfo, setRankedInfo] = useState<any>(null);
  const [offset, setOffset] = useState(0);

  function clearState() {
    setError(null);
    setMatches([]);
    setProfile(null);
    setRankedInfo(null);
    setOffset(0);
  }

  async function loadFromDB(summoner: any) {
    console.log("SUMMONER FOUND IN DB, FETCHING MATCHES");
    const matchHistory = await getMatchesDB(summoner.puuid);
    const rankedData = await getRankedInfoDB(summoner.puuid);
    setMatches(matchHistory);
    setProfile(summoner);
    setRankedInfo(rankedData);
  }

  async function fetchFromRiot(summonerName: string, summonerTag: string) {
    console.log("NO SUMMONER IN DB, FETCHING FROM RIOT API");
    const summonerInfo = await getPuuidByName(summonerName, summonerTag);
    const puuid = summonerInfo.puuid;

    const [usernameTagData, summonerInGameData, rankedData, matchHistory] =
      await Promise.all([
        getUsernameTagByPuuid(puuid),
        getSummonerByPuuid(puuid),
        getRankedInfoByPuuid(puuid),
        getMatchHistoryByPuuid(puuid),
      ]);

    await addSummoner(
      puuid,
      usernameTagData.gameName,
      usernameTagData.tagLine,
      summonerInGameData.profileIconId,
      summonerInGameData.summonerLevel,
    );

    const matchDetails = await Promise.all(
      matchHistory.map((matchID: string) => getMatchDetailsByMatchID(matchID)),
    );

    await addMatchHistory(puuid, matchDetails);
    await addRankedInfo(puuid, rankedData);

    setMatches(cleanMatchData(matchDetails, puuid));
    setProfile({
      icon_id: summonerInGameData.profileIconId,
      level: summonerInGameData.summonerLevel,
      summoner_name: usernameTagData.gameName,
      summoner_tag: usernameTagData.tagLine,
    });
    setRankedInfo(rankedData);
  }

  async function loadMore(puuid: string) {
    const newOffset = offset + 10;
    const newMatches = await getMatchesDB(puuid, newOffset);
    setMatches((prev) => [...prev, ...newMatches]);
    setOffset(newOffset);
  }

  async function searchSummoner(summonerName: string, summonerTag: string) {
    setLoading(true);
    try {
      console.log("SEARCHING FOR SUMMONER:", summonerName, summonerTag); // keep this for testing
      clearState();
      const existingSummoner = await getSummonerDB(summonerName, summonerTag);
      const isStale =
        existingSummoner &&
        Date.now() - new Date(existingSummoner.last_fetched).getTime() >
          STALE_THRESHOLD_MS;
      console.log("EXISTING SUMMONER:", existingSummoner); // keep this for testing
      console.log("IS STALE?", isStale); // keep this for testing
      if (existingSummoner && !isStale) {
        await loadFromDB(existingSummoner);
      } else {
        await fetchFromRiot(summonerName, summonerTag);
      }
    } catch (err) {
      setError("Failed to fetch summoner data");
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    matches,
    searchSummoner,
    profile,
    rankedInfo,
    loadMore,
  };
}
