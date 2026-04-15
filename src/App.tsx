import { use, useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import MatchCard from "./components/MatchCard";
import StatsSummary from "./components/StatsSummary";
import SummonerData from "./components/SummonerData";
import RankedInfo from "./components/RankedInfo";
import FilterBar from "./components/FilterBar";
import { useSummoner } from "./hooks/useSummoner";
import { buildRuneMap } from "./util/util";

function App() {
  const {
    searchSummoner,
    loading,
    loadingMore,
    error,
    matches,
    profile,
    rankedInfo,
    loadMore,
  } = useSummoner();
  const [patch, setPatch] = useState("16.6.1"); // fallback if fetch fails
  const [runes, setRunes] = useState({});
  const [filter, setFilter] = useState<
    | "all"
    | "solo/duo"
    | "flex"
    | "aram"
    | "normal"
    | "coopvai"
    | "clash"
    | "arena"
  >("all");
  const [filteredMatches, setFilteredMatches] = useState(matches);

  useEffect(() => {
    console.log("FILTERING MATCHES", filter);
    console.log("ALL MATCHES", matches);
    setFilteredMatches(
      matches.filter((match) => {
        switch (filter) {
          case "all":
            return true;
          case "solo/duo":
            return match.queue_id === 420;
          case "flex":
            return match.queue_id === 440;
          case "aram":
            return match.queue_id === 450;
          case "normal":
            return match.queue_id === 400 || match.queue_id === 490;
          case "coopvai":
            return match.queue_id === 32 || match.queue_id === 33;
          case "clash":
            return match.queue_id === 700;
          case "arena":
            return match.queue_id === 1700 || match.queue_id === 1710;
          default:
            return false;
        }
      }),
    );
  }, [filter, matches]); // re-run when filter OR matches changes

  useEffect(() => {
    fetch("https://ddragon.leagueoflegends.com/api/versions.json")
      .then((res) => res.json())
      .then((versions) => setPatch(versions[0]))
      .catch(() => console.error("Failed to fetch patch version"));
  }, []); // empty dependency array = runs once on mount

  useEffect(() => {
    fetch(
      `https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/runesReforged.json`,
    )
      .then((res) => res.json())
      .then((runesData) => setRunes(buildRuneMap(runesData)))
      .catch(() => console.error("Failed to fetch runes data"));
  }, [patch]); // get new patch data when patch changes

  return (
    <>
      <div>
        <h1>League of Legends Match History</h1>
        <p>
          Enter your summoner name and tag to view your recent match history and
          performance metrics.
        </p>
      </div>
      <SearchBar searchSummoner={searchSummoner} loading={loading} />
      <FilterBar setFilter={setFilter} />

      <div className="Profile-Container">
        <div className="Profile-Info">
          <SummonerData profile={profile} />
          <RankedInfo rankedInfo={rankedInfo} />
        </div>
        <div className="Stats-Match-Container">
          <StatsSummary matches={filteredMatches} patch={patch} />
          <MatchCard
            matches={filteredMatches}
            patch={patch}
            runes={runes}
            LoadMore={loadMore}
            puuid={profile?.puuid || ""}
            loadingMore={loadingMore}
          />
        </div>
      </div>

      <div>{error && <p>{error}</p>}</div>

      <div className="ticks"></div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
