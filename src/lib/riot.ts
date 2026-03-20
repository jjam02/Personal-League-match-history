const apiKeyRiot = import.meta.env.VITE_RIOT_API_KEY;

export async function getSummonerByName(
  summonerName: string,
  summonerTag: string,
) {
  const response = await fetch(
    `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${summonerTag}`,
    { headers: { "X-Riot-Token": apiKeyRiot } },
  );
  const data = await response.json();
  console.log(data); // keep this for testing
  return data;
}

export async function getSummonerByPuuid(puuid: string) {
  const response = await fetch(
    `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    { headers: { "X-Riot-Token": apiKeyRiot } },
  );
  const data = await response.json();
  console.log(data); // keep this for testing
  return data;
}

export async function getMatchHistoryByPuuid(puuid: string) {
  const response = await fetch(
    `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5`,
    { headers: { "X-Riot-Token": apiKeyRiot } },
  );
  const data = await response.json();
  console.log(data); // keep this for testing
  return data;
}

export async function getMatchDetailsByMatchID(matchID: string) {
  const response = await fetch(
    `https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}`,
    { headers: { "X-Riot-Token": apiKeyRiot } },
  );
  const data = await response.json();
  console.log(data); // keep this for testing
  return data;
}
