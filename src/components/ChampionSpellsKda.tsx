import { SUMMONER_SPELLS } from "../types";
import { calculateKDA } from "../util/util";

function ChampionSpellsKda({
  match,
  patch,
  runes,
}: {
  match: any;
  patch: string;
  runes: Record<number, any>;
}) {
  return (
    <div className="champion-spells-kda">
      <div id="champion">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${match.champion}.png`}
          alt={match.champion}
          width={48}
          height={48}
        />
      </div>

      {match.queue_id !== 1700 && match.queue_id !== 1710 && (
        <div className="summoner-spells">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${SUMMONER_SPELLS[match.summoner_spell1]}.png`}
            alt={SUMMONER_SPELLS[match.summoner_spell1]}
            width={22}
            height={22}
          />
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${SUMMONER_SPELLS[match.summoner_spell2]}.png`}
            alt={SUMMONER_SPELLS[match.summoner_spell2]}
            width={22}
            height={22}
          />
        </div>
      )}

      <div id="runes" className="summoner-spells">
        <img
          src={
            "https://ddragon.leagueoflegends.com/cdn/img/" +
            runes[match.primary_runes.selections[0].perk]?.icon
          }
          alt="keystone"
          width={22}
          height={22}
        />
        <img
          src={
            "https://ddragon.leagueoflegends.com/cdn/img/" +
            runes[match.secondary_runes.style]?.icon
          }
          alt="secondary tree"
          width={22}
          height={22}
        />
      </div>

      <div id="kda">
        <p>
          {match.kills}/{match.deaths}/{match.assists}
        </p>
        <p>{calculateKDA(match.kills, match.deaths, match.assists)} KDA</p>
      </div>
    </div>
  );
}

export default ChampionSpellsKda;
