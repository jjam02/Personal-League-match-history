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
  const [loadingMore, setLoadingMore] = useState(false);
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
    setProfile({
      ...summoner,
      puuid: summoner.puuid,
    });
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
      puuid: puuid,
      icon_id: summonerInGameData.profileIconId,
      level: summonerInGameData.summonerLevel,
      summoner_name: usernameTagData.gameName,
      summoner_tag: usernameTagData.tagLine,
    });
    setRankedInfo(rankedData);
  }

  async function loadMore(puuid: string) {
    if (!puuid) {
      console.error("loadMore called with empty puuid");
      setError("Cannot load more matches: missing summoner data");
      return;
    }
    if (loadingMore) {
      console.log("Already loading more, skipping duplicate request");
      return;
    }

    setLoadingMore(true);
    try {
      console.log("LOADING MORE MATCHES FOR", puuid); // keep this for testing
      console.log("CURRENT OFFSET:", offset); // keep this for testing
      const newOffset = offset + 10;
      let newMatches = await getMatchesDB(puuid, newOffset);

      if (newMatches.length === 0) {
        console.log("NO MORE MATCHES TO LOAD"); // keep this for testing
        setError("No more matches to load");
        setLoadingMore(false);
        return;
      }

      if (newMatches.length < 10) {
        console.log("Fewer than 10 matches from DB"); // keep this for testing
        newMatches = await getMatchHistoryByPuuid(puuid, newOffset);
        if (newMatches.length > 0) {
          const matchDetails = await Promise.all(
            newMatches.map((matchID: string) =>
              getMatchDetailsByMatchID(matchID),
            ),
          );
          console.log("FETCHED MATCH DETAILS FOR NEW MATCHES", matchDetails); // keep this for testing
          await addMatchHistory(puuid, matchDetails);
          newMatches = cleanMatchData(matchDetails, puuid);
        }
      }

      console.log("NEW MATCHES LOADED:", newMatches.length); // keep this for testing
      setMatches((prev) => [...prev, ...newMatches]);
      setOffset(newOffset);
    } catch (err) {
      console.error("Error in loadMore:", err);
      setError("Failed to load more matches");
    } finally {
      setLoadingMore(false);
    }
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
    loadingMore,
    error,
    matches,
    searchSummoner,
    profile,
    rankedInfo,
    loadMore,
  };
}
