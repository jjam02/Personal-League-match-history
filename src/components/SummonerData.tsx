import type { Summoner } from "../types";

interface SummonerDataProps {
  profile: any;
}

function SummonerData({ profile }: SummonerDataProps) {
  //console.log("Rendering SummonerData with profile:", profile); // keep this for testing
  return (
    <div className="profile">
      {profile && (
        <>
          <h2>
            {profile.summoner_name}#{profile.summoner_tag}
          </h2>
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/16.6.1/img/profileicon/${profile.icon_id}.png`}
            alt="Profile Icon"
          />
          <p>Summoner Level: {profile.level}</p>
        </>
      )}
    </div>
  );
}

export default SummonerData;
