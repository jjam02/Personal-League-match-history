import { createClient } from "@supabase/supabase-js";
//import { Match } from "../types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
//console.log("SUPABASE URL", supabaseUrl); // keep this for testing
//console.log("SUPABASE KEY", supabaseKey); // keep this for testing

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function addSummoner(
  puuid: string,
  summonerName: string,
  summonerTag: string,
  icon_id: number,
  level: number,
) {
  const { data, error } = await supabase.from("summoners").upsert(
    {
      summoner_name: summonerName,
      summoner_tag: summonerTag,
      puuid: puuid,
      icon_id: icon_id,
      level: level,
      last_fetched: new Date().toISOString(),
    },
    { onConflict: "puuid" },
  );

  //console.log("data:", data);
  //console.log("error:", error);
}

export async function addRankedInfo(puuid: string, rankedInfo: any[]) {
  const rankedRows = rankedInfo.map((entry) => ({
    summoner_puuid: puuid,
    leagueid: entry.leagueId,
    queuetype: entry.queueType,
    tier: entry.tier,
    rank: entry.rank,
    leaguepoints: entry.leaguePoints,
    wins: entry.wins,
    losses: entry.losses,
  }));

  const { error } = await supabase
    .from("ranked")
    .upsert(rankedRows, { onConflict: "summoner_puuid,queuetype" });

  if (error) console.error("addRankedInfo error:", error);
}
export async function addMatchHistory(puuid: string, matches: any[]) {
  const matchRows = matches.map((match) => {
    const participant = match.info.participants.find(
      (p: any) => p.puuid === puuid,
    );
    return {
      match_id: match.metadata.matchId,
      summoner_puuid: puuid,
      champion: participant.championName,
      kills: participant.kills,
      deaths: participant.deaths,
      assists: participant.assists,
      win: participant.win,
      duration_seconds: match.info.gameDuration,
      played_at: new Date(match.info.gameStartTimestamp).toISOString(),
      queue_id: match.info.queueId,
      summoner_spell1: participant.summoner1Id,
      summoner_spell2: participant.summoner2Id,
      item0: participant.item0,
      item1: participant.item1,
      item2: participant.item2,
      item3: participant.item3,
      item4: participant.item4,
      item5: participant.item5,
      item6: participant.item6,
      primary_runes: participant.perks.styles[0],
      secondary_runes: participant.perks.styles[1],
    };
  });
  ////console.log("MATCH ROWS", matchRows); // keep this for testing
  const { error } = await supabase
    .from("matches")
    .upsert(matchRows, { onConflict: "match_id" });

  //if (error) //console.error("addMatchHistory error:", error);
}

export async function getSummonerDB(summonerName: string, summonerTag: string) {
  // console.log("GETTING PUUID FROM DB FOR", summonerName, summonerTag); // keep this for testing
  const { data, error } = await supabase
    .from("summoners")
    .select("*")
    .ilike("summoner_name", summonerName)
    .ilike("summoner_tag", summonerTag)
    .single();

  ////console.log(data, error); // keep this for testing
  return data || null;
}

export async function getMatchesDB(puuid: string) {
  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .eq("summoner_puuid", puuid)
    .order("played_at", { ascending: false });
  return data || [];
}
export async function getRankedInfoDB(puuid: string) {
  const { data, error } = await supabase
    .from("ranked")
    .select("*")
    .eq("summoner_puuid", puuid)
    .order("queuetype", { ascending: false });
  return data || [];
}

export function cleanMatchData(matchArray: any[], puuid: string) {
  //console.log("CLEANING MATCH DATA", matchArray); // keep this for testing
  const cleanMatchData = matchArray.map((match: any) => {
    const participant = match.info.participants.find(
      (p: any) => p.puuid === puuid,
    );
    return {
      match_id: match.metadata.matchId,
      summoner_puuid: puuid,
      champion: participant.championName,
      kills: participant.kills,
      deaths: participant.deaths,
      assists: participant.assists,
      win: participant.win,
      duration_seconds: match.info.gameDuration,
      played_at: new Date(match.info.gameStartTimestamp).toISOString(),
      queue_id: match.info.queueId,
      summoner_spell1: participant.summoner1Id,
      summoner_spell2: participant.summoner2Id,
      item0: participant.item0,
      item1: participant.item1,
      item2: participant.item2,
      item3: participant.item3,
      item4: participant.item4,
      item5: participant.item5,
      item6: participant.item6,
      primary_runes: participant.perks.styles[0],
      secondary_runes: participant.perks.styles[1],
    };
  });
  return cleanMatchData;
}
