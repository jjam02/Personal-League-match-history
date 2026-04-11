interface RankedInfoProps {
  rankedInfo: any;
}

function RankedInfo({ rankedInfo }: RankedInfoProps) {
  console.log("RANKED INFO", rankedInfo); // keep this for testing
  return (
    <div className="ranked-info">
      <h2>Ranked Information</h2>
      {rankedInfo &&
        rankedInfo.map((info: any, index: number) => (
          <div key={index}>
            <p>{info.queueType}</p>
            <p> {info.tier}</p>
            <p> {info.rank}</p>
            <p> {info.leaguepoints}</p>
            <p>W:{info.wins}</p>
            <p>L:{info.losses}</p>
          </div>
        ))}
    </div>
  );
}

export default RankedInfo;
