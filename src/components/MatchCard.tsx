import { QUEUE_TYPES, SUMMONER_SPELLS } from "../types";
import ChampionSpellsKda from "./ChampionSpellsKda";
import { calculateKDA } from "../util/util";
import ItemsBar from "./ItemsBar";

interface MatchCardProps {
  matches: any[];
  patch: string;
  runes: Record<number, any>;
  LoadMore: (puuid: string) => Promise<void>;
  puuid?: string;
  loadingMore?: boolean;
}

function MatchCard({
  matches,
  patch,
  runes,
  LoadMore,
  puuid,
  loadingMore,
}: MatchCardProps) {
  //console.log(runes); // keep this for testing
  //console.log("Rendering MatchCard with matches:", matches); // keep this for testing
  return (
    <div className="match-card">
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
            <ChampionSpellsKda match={match} patch={patch} runes={runes} />
            <ItemsBar match={match} patch={patch} />
          </div>
        </div>
      ))}
      {puuid && (
        <button
          onClick={() => {
            LoadMore(puuid || "");
          }}
          className="load-more match-card-item"
          disabled={loadingMore}
        >
          {loadingMore ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}

export default MatchCard;
