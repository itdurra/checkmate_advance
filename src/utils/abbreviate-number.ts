export function abbreviateNumber(value: number): string {
    if (value >= 1e21) return '???'; // Over sextillion
    if (value >= 1e18) return (value / 1e18).toFixed(1).replace(/\.0$/, '') + 'Qi'; // Quintillion
    if (value >= 1e15) return (value / 1e15).toFixed(1).replace(/\.0$/, '') + 'Q';  // Quadrillion
    if (value >= 1e12) return (value / 1e12).toFixed(1).replace(/\.0$/, '') + 'T';  // Trillion
    if (value >= 1e9)  return (value / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';   // Billion
    if (value >= 1e6)  return (value / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';   // Million
    if (value >= 1e4)  return (value / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';   // Thousand
    return value.toLocaleString(); // Comma formatting for small values
  }
  

