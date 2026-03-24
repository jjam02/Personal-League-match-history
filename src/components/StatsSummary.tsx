import { calculateKDA, getMostPLayedChampion } from "../util/util";

interface StatsSummaryProps {
    matches: any[];
}

function StatsSummary({ matches }: StatsSummaryProps) {
    return (
        matches.length > 0 ? (
            <div className="stats-summary">
                <h2>Stats Summary</h2>
                <p>{matches.length}G {matches.filter(match => match.win).length}W {matches.filter(match => !match.win).length}L</p>
                <p>wr: {((matches.filter(match => match.win).length / matches.length) * 100).toFixed(0)}%</p>
                <p> KDA: {calculateKDA(
                    matches.reduce((sum, match) => sum + match.kills, 0),
                    matches.reduce((sum, match) => sum + match.deaths, 0),
                    matches.reduce((sum, match) => sum + match.assists, 0),
                )}</p>
                <p>{matches.reduce((sum, match) => sum + match.kills, 0) / matches.length || 0}/{matches.reduce((sum, match) => sum + match.deaths, 0) / matches.length || 0}/{matches.reduce((sum, match) => sum + match.assists, 0) / matches.length || 0}</p>
                <p>most played: {getMostPLayedChampion(matches)}</p>
            </div>
        ) : null
    )
}

export default StatsSummary;