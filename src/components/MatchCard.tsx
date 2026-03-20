import { useSummoner } from "../hooks/useSummoner";
interface MatchCardProps {
    matches: any[];
}

function MatchCard({ matches }: MatchCardProps) {
    console.log("MATCHES IN MATCH CARD", matches); // keep this for testing
    return (
        <div className="match-card">
            {matches.length > 0 ? (
                matches.map((match, index) => (
                    <div key={index}>
                        <h4>Match ID: {match.metadata.matchId}</h4>
                        {/* Add more match details here */}
                    </div>
                ))
            ) : (
                <p>No matches found.</p>
            )}
            <h3>Match Card</h3>
            {/* Add match details here */}
        </div>
    );
}

export default MatchCard;