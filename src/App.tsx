import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import SearchBar from './components/SearchBar'
import MatchCard from './components/MatchCard'
import { useSummoner } from './hooks/useSummoner'

function App() {
  const { searchSummoner, loading, error, matches } = useSummoner();


  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <SearchBar searchSummoner={searchSummoner} loading={loading} />
        <MatchCard matches={matches} />
        <div>{error && <p style={{ color: 'red' }}>{error}</p>}</div>


      </section>

      <div className="ticks"></div>



      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
