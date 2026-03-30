import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import SearchBar from "./components/SearchBar";
import MatchCard from "./components/MatchCard";
import StatsSummary from "./components/StatsSummary";
import SummonerData from "./components/SummonerData";
import { useSummoner } from "./hooks/useSummoner";

function App() {
  const { searchSummoner, loading, error, matches, profile } = useSummoner();
  const [patch, setPatch] = useState("16.6.1"); // fallback if fetch fails

  useEffect(() => {
    fetch("https://ddragon.leagueoflegends.com/api/versions.json")
      .then((res) => res.json())
      .then((versions) => setPatch(versions[0]))
      .catch(() => console.error("Failed to fetch patch version"));
  }, []); // empty dependency array = runs once on mount

  return (
    <>
      <section id="center">
        <div>
          <h1>League of Legends Match History</h1>
          <p>
            Enter your summoner name and tag to view your recent match history
            and performance metrics.
          </p>
        </div>
        <SearchBar searchSummoner={searchSummoner} loading={loading} />
        <div className="Profile-Container">
          <SummonerData profile={profile} />
          <div>
            <StatsSummary matches={matches} />
            <MatchCard matches={matches} patch={patch} />
          </div>
        </div>

        <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
      </section>

      <div className="ticks"></div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
