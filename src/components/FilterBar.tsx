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
}

function FilterBar({ setFilter }: FilterBarProps) {
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
      <button onClick={() => setFilter("all")}>ALL</button>
      <button onClick={() => setFilter("solo/duo")}>Solo/Duo</button>
      <button onClick={() => setFilter("flex")}>Flex</button>
      <button onClick={() => setFilter("aram")}>ARAM</button>

      <select
        value={selectedQueue}
        onChange={handleQueueSelect}
        className="queue-dropdown"
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
