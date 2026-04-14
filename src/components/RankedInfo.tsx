import { ranked_queues } from "../types";

interface RankedInfoProps {
  rankedInfo: any;
}

function RankedInfo({ rankedInfo }: RankedInfoProps) {
  //console.log("RANKED INFO", rankedInfo); // keep this for testing
  return (
    <div className="ranked-info">
      {rankedInfo &&
        rankedInfo.map((info: any, index: number) => (
          <div key={index} className="ranked-card">
            <p>
              {ranked_queues[info.queueType as keyof typeof ranked_queues] ||
                info.queueType}
            </p>
            <img
              src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/${info.tier.toLowerCase()}.png`}
              alt={`${info.tier} emblem`}
              width={128}
              height={128}
            />
            <p> {info.rank}</p>
            <p> {info.leaguepoints}</p>

            <p>
              W:{info.wins} L:{info.losses}
            </p>
            <p>
              WR:
              {((info.wins / (info.wins + info.losses)) * 100).toFixed(0)}%
            </p>
          </div>
        ))}
    </div>
  );
}

export default RankedInfo;
