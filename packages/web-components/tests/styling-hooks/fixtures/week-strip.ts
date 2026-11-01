import type { WcHookScenario } from "../types";
import type { MinervaWeekStrip } from "../../../src/components/week-strip/week-strip";

export default [
  {
    name: "selected day, today, markers, navigation",
    html: `<minerva-week-strip value="2026-01-06" today="2026-01-07" show-navigation></minerva-week-strip>`,
    setup: (root) => {
      root.querySelector<MinervaWeekStrip>("minerva-week-strip")!.markers = {
        "2026-01-05": 3,
        "2026-01-07": true,
      };
    },
  },
  {
    name: "disabled",
    html: `<minerva-week-strip value="2026-01-06" today="2026-01-06" show-navigation disabled></minerva-week-strip>`,
  },
  {
    name: "sizes",
    html: `<minerva-week-strip today="2026-01-06" size="small"></minerva-week-strip><minerva-week-strip today="2026-01-06" size="large"></minerva-week-strip>`,
  },
] satisfies WcHookScenario[];
