interface SearchBarProps {
  searchSummoner: (summonerName: string, summonerTag: string) => void;
  loading: boolean;
}
function SearchBar({ searchSummoner, loading }: SearchBarProps) {
  function handleSearch() {
    const usernameInput = document.getElementById(
      "username",
    ) as HTMLInputElement;
    const tagInput = document.getElementById("tag") as HTMLInputElement;

    const username = usernameInput.value;
    const tag = tagInput.value;

    searchSummoner(username, tag);
  }
  return (
    <div className="search-bar">
      <input id="username" type="text" placeholder="Username" />#
      <input id="tag" type="text" placeholder="Tag" />
      <button onClick={handleSearch}>Get Summoner Info</button>
      <div>{loading && <p>Loading...</p>}</div>
    </div>
  );
}

export default SearchBar;
