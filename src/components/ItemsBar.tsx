function ItemsBar({ match, patch }: { match: any; patch: string }) {
  return (
    <div id="items" className="itemRow">
      {[0, 1, 2, 3, 4, 5, 6].map((i) =>
        match[`item${i}`] ? (
          <img
            className="item"
            key={i}
            src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${match[`item${i}`]}.png`}
            alt="item"
            height={21}
          />
        ) : (
          <div className="empty-item item" key={i} />
        ),
      )}
    </div>
  );
}

export default ItemsBar;
