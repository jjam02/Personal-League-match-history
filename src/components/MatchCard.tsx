import { QUEUE_TYPES, SUMMONER_SPELLS } from "../types";
import { calculateKDA } from "../util/util";

interface MatchCardProps {
  matches: any[];
  patch: string;
}

function MatchCard({ matches, patch }: MatchCardProps) {
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
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${match.champion}.png`}
              alt={match.champion}
              width={64}
              height={64}
            />
          </div>

          {match.queue_id !== 1700 && match.queue_id !== 1710 && (
            <div className="summoner-spells">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${SUMMONER_SPELLS[match.summoner_spell1]}.png`}
                alt={SUMMONER_SPELLS[match.summoner_spell1]}
                width={32}
                height={32}
              />
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${SUMMONER_SPELLS[match.summoner_spell2]}.png`}
                alt={SUMMONER_SPELLS[match.summoner_spell2]}
                width={32}
                height={32}
              />
            </div>
          )}

          <div className="summoner-spells">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/Electrocute/Electrocute.png`}
              alt="keystone"
              width={32}
              height={32}
            />
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png`}
              alt="secondary tree"
              width={32}
              height={32}
            />
          </div>

          <div>
            <p>
              {match.kills}/{match.deaths}/{match.assists}
            </p>
            <p>{calculateKDA(match.kills, match.deaths, match.assists)} KDA</p>
          </div>

          <div className="items">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <img
                key={i}
                src={
                  match[`item${i}`]
                    ? `https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${match[`item${i}`]}.png`
                    : "https://via.placeholder.com/32?text=Empty"
                }
                alt={match[`item${i}`] ? `Item ${match[`item${i}`]}` : "Empty"}
                width={32}
                height={32}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MatchCard;
