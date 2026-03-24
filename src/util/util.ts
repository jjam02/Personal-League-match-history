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
