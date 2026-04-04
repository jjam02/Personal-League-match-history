import { calculateKDA, getMostPLayedChampion } from "../util/util";

interface StatsSummaryProps {
  matches: any[];
  patch: string;
}

function StatsSummary({ matches, patch }: StatsSummaryProps) {
  const mostPlayed = getMostPLayedChampion(matches);
  return matches.length > 0 ? (
    <div className="stats-summary">
      {/* <h2>Stats Summary</h2> */}
      <p>
        {matches.length}G {matches.filter((match) => match.win).length}W{" "}
        {matches.filter((match) => !match.win).length}L
      </p>
      <p>
        WR:{" "}
        {(
          (matches.filter((match) => match.win).length / matches.length) *
          100
        ).toFixed(0)}
        %
      </p>
      <p>
        {" "}
        KDA:{" "}
        {calculateKDA(
          matches.reduce((sum, match) => sum + match.kills, 0),
          matches.reduce((sum, match) => sum + match.deaths, 0),
          matches.reduce((sum, match) => sum + match.assists, 0),
        )}
      </p>
      <p>
        {matches.reduce((sum, match) => sum + match.kills, 0) /
          matches.length || 0}
        /
        {matches.reduce((sum, match) => sum + match.deaths, 0) /
          matches.length || 0}
        /
        {matches.reduce((sum, match) => sum + match.assists, 0) /
          matches.length || 0}
      </p>
      <div id="most-played">
        <p>Most Played:</p>
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${mostPlayed}.png`}
          alt={mostPlayed}
          width={32}
          height={32}
        />
      </div>
    </div>
  ) : null;
}

export default StatsSummary;
