const apiKeyRiot = import.meta.env.VITE_RIOT_API_KEY;

function getSummonerByName(summonerName: string, summonerTag: string) {
  return fetch(
    `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${summonerTag}`,
    {
      headers: {
        "X-Riot-Token": apiKeyRiot,
      },
    },
  ).then((response) => console.log(response.json()));
}

export { getSummonerByName };
