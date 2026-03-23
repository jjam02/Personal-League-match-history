import { QUEUE_TYPES } from "../types";
interface MatchCardProps {
    matches: any[];
}

function MatchCard({ matches }: MatchCardProps) {
    console.log("MATCHES IN MATCH CARD", matches); // keep this for testing
    return (
        <div className={`match-card } `}>
            <h3>Match Card</h3>

            {matches.map((match) => (
                <div key={match.matchId} className={`match-card-item ${match.win ? "win" : "loss"}`}>
                    <p>Champion: {match.champion}</p>
                    <p>K/D/A: {match.kills}/{match.deaths}/{match.assists}</p>
                    <p style={{ color: match.win ? "green" : "red" }}>{match.win ? "Victory" : "Defeat"}</p>
                    <p>Duration: {Math.floor(match.duration_seconds / 60)}m {match.duration_seconds % 60}s</p>
                    <p>Played At: {new Date(match.played_at).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
}

export default MatchCard;