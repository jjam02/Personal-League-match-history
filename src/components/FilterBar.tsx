interface FilterBarProps {
  setFilter: (filter: "all" | "solo/duo" | "flex" | "aram") => void;
}

function FilterBar({ setFilter }: FilterBarProps) {
  return (
    <div className="Filter-Bar">
      <button onClick={() => setFilter("all")}>ALL</button>
      <button onClick={() => setFilter("solo/duo")}>Solo/Duo</button>
      <button onClick={() => setFilter("flex")}>Flex</button>
      <button onClick={() => setFilter("aram")}>ARAM</button>
    </div>
  );
}

export default FilterBar;
