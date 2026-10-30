// Live switching: charts whose own `renderer` is unset or "auto" recreate
// their backend when the global default (`setDefaultChartRenderer`) changes.

import { subscribeDefaultChartRenderer } from "../defaults";
import type { ChartRendererPreference } from "../types";

/**
 * Calls `recreate` on every change of the default renderer while
 * `preference()` (read at change time, so `setOptions` is honoured) is unset
 * or "auto". Charts with an explicit backend are left alone. Returns the
 * unsubscribe function to call on destroy.
 */
export const followDefaultRenderer = (
  preference: () => ChartRendererPreference | undefined,
  recreate: () => void,
): (() => void) =>
  subscribeDefaultChartRenderer(() => {
    const own = preference();
    if (!own || own === "auto") recreate();
  });
