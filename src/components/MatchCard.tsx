import { useSummoner } from "../hooks/useSummoner";
interface MatchCardProps {
    matches: any[];
}

function MatchCard({ matches }: MatchCardProps) {
    console.log("MATCHES IN MATCH CARD", matches); // keep this for testing
    return (
        <div className="match-card">
            <h3>Match Card</h3>
            {matches.length > 0 ? (
                matches.map((match, index) => (
                    <div key={index}>
                        <h4>Match ID: {match.metadata.matchId}</h4>
                        {match.info.participants.map((participant: any, idx: number) => (
                            <div key={idx}>
                                <p>{participant.riotIdGameName}#{participant.riotIdTagline}: {participant.championName}</p>

                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p>No matches found.</p>
            )}

            {/* Add match details here */}
        </div>
    );
}

export default MatchCard;