import type { Summoner } from "../types";

interface SummonerDataProps {
  profile: any;
}

function SummonerData({ profile }: SummonerDataProps) {
  //  console.log("SUMMONER PROFILE DATA", profile);
  return (
    <>
      summoner data
      {profile && (
        <div>
          <h1>
            {profile.username}#{profile.tag}
          </h1>
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/16.6.1/img/profileicon/${profile.profileIconId}.png`}
            alt="Profile Icon"
          />
          <p>Summoner Level: {profile.summonerLevel}</p>
        </div>
      )}
    </>
  );
}

export default SummonerData;
