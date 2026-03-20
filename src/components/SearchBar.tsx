import { getSummonerByName } from "../lib/riot";

function SearchBar() {

    function handleSearch() {
        const usernameInput = document.getElementById("username") as HTMLInputElement;
        const tagInput = document.getElementById("tag") as HTMLInputElement;

        const username = usernameInput.value;
        const tag = tagInput.value;

        getSummonerByName(username, tag);
    }
    return (
        <div className="search-bar">
            <input id="username" type="text" placeholder="Username" />#
            <input id="tag" type="text" placeholder="Tag" />
            <button className="counter" onClick={handleSearch} >
                Get Summoner Info
            </button>
        </div>
    );
}

export default SearchBar;