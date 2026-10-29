import type { ChartThemeInput } from "@minerva/charts/canvas";
import type { ResolvedTokens } from "@minerva/core";

/**
 * Theme of the chart engine from the resolved design tokens of the closest
 * `MinervaProvider`: every token becomes the CSS variable the web charts
 * read (`--surface-color`, `--text-color`, `--primary-color`,
 * `--chart-series-1`...), so light / dark modes, palettes and overrides
 * apply, and `var(--x)` colors of the options resolve.
 */
export function chartThemeInput(tokens: ResolvedTokens): ChartThemeInput {
  const variables: Record<string, string> = {};
  for (const [name, value] of Object.entries(tokens.css))
    variables[`--${name}`] = value;
  return { variables };
}
