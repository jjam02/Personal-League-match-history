export function calculateKDA(
  kills: number,
  deaths: number,
  assists: number,
): string {
  if (deaths === 0) {
    return `Perfect`; // Avoid division by zero, show K+A:0:0
  }
  return `${((kills + assists) / deaths).toFixed(2)}`;
}

export function getMostPLayedChampion(matches: any[]) {
  if (matches.length === 0) return "N/A";
  const championCount: Record<string, number> = {};
  matches.forEach((match) => {
    championCount[match.champion] = (championCount[match.champion] || 0) + 1;
  });
  return Object.keys(championCount).reduce((a, b) =>
    championCount[a] > championCount[b] ? a : b,
  );
}
