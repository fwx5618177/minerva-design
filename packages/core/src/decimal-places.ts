// Internal: decimal places of a number, shared by the number input and the
// slider precision helpers (not part of the public core API).

/**
 * Decimal places needed to write `n` exactly as a fixed-point number:
 * `1.25` -> 2, `1e-7` -> 7, `1.5e-7` -> 8 (coefficient decimals plus the
 * negative exponent), `1e21` -> 0. Capped at 100 (`toFixed` limit).
 */
export function decimalPlaces(n: number): number {
  if (!Number.isFinite(n)) return 0;
  const m = /^\d+(?:\.(\d+))?(?:e([+-]\d+))?$/i.exec(String(Math.abs(n)));
  if (!m) return 0;
  const fraction = m[1]?.length ?? 0;
  const exponent = m[2] ? Number(m[2]) : 0;
  return Math.min(100, Math.max(0, fraction - exponent));
}
