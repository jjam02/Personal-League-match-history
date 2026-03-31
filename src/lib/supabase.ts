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
      summoner_name: summonerName.toLowerCase(),
      summoner_tag: summonerTag.toLowerCase(),
      puuid: puuid,
      icon_id: icon_id,
      level: level,
    },
    { onConflict: "puuid" },
  );

  //console.log("data:", data);
  //console.log("error:", error);
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
    };
  });
  ////console.log("MATCH ROWS", matchRows); // keep this for testing
  const { error } = await supabase
    .from("matches")
    .upsert(matchRows, { onConflict: "match_id" });

  //if (error) //console.error("addMatchHistory error:", error);
}

export async function getPuuidDB(summonerName: string, summonerTag: string) {
  //console.log("GETTING PUUID FROM DB FOR", summonerName, summonerTag); // keep this for testing
  const { data, error } = await supabase
    .from("summoners")
    .select("puuid")
    .eq("summoner_name", summonerName.toLowerCase())
    .eq("summoner_tag", summonerTag.toLowerCase())
    .single();

  ////console.log(data, error); // keep this for testing
  return data ? data.puuid : null;
}

export async function getMatchesDB(puuid: string) {
  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .eq("summoner_puuid", puuid)
    .order("played_at", { ascending: false });
  return data || [];
}

export function cleanMatchData(matchArray: any[], puuid: string) {
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
    };
  });
  return cleanMatchData;
}
