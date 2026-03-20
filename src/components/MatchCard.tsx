import { QUEUE_TYPES } from "../types";
interface MatchCardProps {
    matches: any[];
}

function MatchCard({ matches }: MatchCardProps) {
    console.log("MATCHES IN MATCH CARD", matches); // keep this for testing
    return (
        <div className="match-card">
            <h3>Match Card</h3>
            {matches.length > 0 ? (
                matches.map((match, index) => {
                    const blueTeam = match.info.participants.filter((p: any) => p.teamId === 100)
                    const redTeam = match.info.participants.filter((p: any) => p.teamId === 200)

                    return (
                        <div key={index}>
                            <h3>Queue Type: {QUEUE_TYPES[match.info.queueId] ?? "Unknown"}</h3>
                            <div className="teams">
                                <div className="team" id="blue-team">
                                    <p>Team 1:</p>
                                    {blueTeam.map((participant: any, idx: number) => (
                                        <div key={idx}>
                                            <p >
                                                {participant.riotIdGameName}#{participant.riotIdTagline}: {participant.championName}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="team" id="red-team">

                                    <p>Team 2:</p>
                                    {redTeam.map((participant: any, idx: number) => (
                                        <div key={idx}>
                                            <p >
                                                {participant.riotIdGameName}#{participant.riotIdTagline}: {participant.championName}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                })
            ) : (
                <p>No matches found.</p>
            )}

            {/* Add match details here */}
        </div>
    );
}

export default MatchCard;