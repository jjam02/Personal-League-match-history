import { QUEUE_TYPES, SUMMONER_SPELLS } from "../types";
import { calculateKDA } from "../util/util";
import ItemsBar from "./ItemsBar";

interface MatchCardProps {
  matches: any[];
  patch: string;
  runes: Record<number, any>;
}

function MatchCard({ matches, patch, runes }: MatchCardProps) {
  console.log(runes); // keep this for testing

  return (
    <div className="match-card">
      <h3>Match Card</h3>
      {matches.map((match, index) => (
        <div
          key={match.match_id ?? index}
          className={`match-card-item ${match.win ? "win" : "loss"}`}
        >
          <div>
            <p>{QUEUE_TYPES[match.queue_id] || "Unknown Queue"}</p>
            <p>
              {new Date(match.played_at).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p style={{ color: match.win ? "green" : "red" }}>
              {match.win ? "Victory" : "Defeat"}
            </p>
            <p>
              {Math.floor(match.duration_seconds / 60)}m{" "}
              {match.duration_seconds % 60}s
            </p>
          </div>
          <div>
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
                <p>
                  {calculateKDA(match.kills, match.deaths, match.assists)} KDA
                </p>
              </div>
            </div>
            <ItemsBar match={match} patch={patch} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MatchCard;
