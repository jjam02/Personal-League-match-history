import { useState } from "react";

interface FilterBarProps {
  setFilter: (
    filter:
      | "all"
      | "solo/duo"
      | "flex"
      | "aram"
      | "normal"
      | "coopvai"
      | "clash"
      | "arena",
  ) => void;
  currentFilter: string;
}

function FilterBar({ setFilter, currentFilter }: FilterBarProps) {
  const [selectedQueue, setSelectedQueue] = useState("");

  const handleQueueSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as
      | "normal"
      | "coopvai"
      | "clash"
      | "arena"
      | "";
    setSelectedQueue(value);
    if (value) {
      setFilter(value);
    }
  };

  return (
    <div className="Filter-Bar">
      <button
        onClick={() => setFilter("all")}
        className={currentFilter === "all" ? "active" : ""}
      >
        ALL
      </button>
      <button
        onClick={() => setFilter("solo/duo")}
        className={currentFilter === "solo/duo" ? "active" : ""}
      >
        Solo/Duo
      </button>
      <button
        onClick={() => setFilter("flex")}
        className={currentFilter === "flex" ? "active" : ""}
      >
        Flex
      </button>
      <button
        onClick={() => setFilter("aram")}
        className={currentFilter === "aram" ? "active" : ""}
      >
        ARAM
      </button>

      <select
        value={selectedQueue}
        onChange={handleQueueSelect}
        className={`queue-dropdown ${
          ["normal", "coopvai", "clash", "arena"].includes(currentFilter)
            ? "active"
            : ""
        }`}
      >
        <option value="" disabled>
          Other Queues
        </option>
        <option value="normal">Normal</option>
        <option value="coopvai">Co-op vs AI</option>
        <option value="clash">Clash</option>
        <option value="arena">Arena</option>
      </select>
    </div>
  );
}

export default FilterBar;
