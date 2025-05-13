export function calculateBossScore(
  score: number,
  newGamePlus: number,
  level: number
): number {
  if (newGamePlus === 0) {
    return score;
  }

  const growthRate = 4.7; // Increase this for wilder scaling
  const base = 3500;
  const globalLevel = (newGamePlus - 1) * 9 + level;
  const BossScore = base * growthRate ** globalLevel;

  return roundNicely(BossScore);
}

function roundNicely(value: number): number {
  if (value < 10_000) return Math.round(value);

  if (value < 1_000_000) return Math.round(value / 1_000) * 1_000; // Round to nearest 1K
  if (value < 1_000_000_000) return Math.round(value / 100_000) * 100_000; // Nearest 100K
  if (value < 1_000_000_000_000)
    return Math.round(value / 10_000_000) * 10_000_000; // Nearest 10M
  if (value < 1_000_000_000_000_000)
    return Math.round(value / 1_000_000_000) * 1_000_000_000; // Nearest B
  if (value < 1e21)
    return Math.round(value / 100_000_000_000_000) * 100_000_000_000_000; // Nearest 100T

  // If larger than supported range
  return value;
}
