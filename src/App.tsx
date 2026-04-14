import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import MatchCard from "./components/MatchCard";
import StatsSummary from "./components/StatsSummary";
import SummonerData from "./components/SummonerData";
import RankedInfo from "./components/RankedInfo";
import { useSummoner } from "./hooks/useSummoner";
import { buildRuneMap } from "./util/util";

function App() {
  const {
    searchSummoner,
    loading,
    error,
    matches,
    profile,
    rankedInfo,
    loadMore,
  } = useSummoner();
  const [patch, setPatch] = useState("16.6.1"); // fallback if fetch fails
  const [runes, setRunes] = useState({});

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
      <div className="Profile-Container">
        <div className="Profile-Info">
          <SummonerData profile={profile} />
          <RankedInfo rankedInfo={rankedInfo} />
        </div>
        <div className="Stats-Match-Container">
          <StatsSummary matches={matches} patch={patch} />
          <MatchCard
            matches={matches}
            patch={patch}
            runes={runes}
            LoadMore={loadMore}
            puuid={profile?.puuid || ""}
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
