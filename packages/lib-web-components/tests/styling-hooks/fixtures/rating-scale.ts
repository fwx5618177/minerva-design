import type { MinervaRatingScale } from "../../../src/components/rating/rating";
import type { WcHookScenario } from "../types";

const dimensions = [
  { key: "plot", label: "Plot", value: 8 },
  { key: "writing", label: "Writing", value: 6 },
];
const setDimensions = (root: HTMLElement) => {
  root.querySelector<MinervaRatingScale>("minerva-rating-scale")!.dimensions =
    dimensions;
};

export default [
  {
    name: "display-only, every key",
    html: `<minerva-rating-scale size="large"></minerva-rating-scale>`,
    setup: setDimensions,
  },
  {
    name: "interactive",
    html: `<minerva-rating-scale interactive></minerva-rating-scale>`,
    setup: setDimensions,
  },
] satisfies WcHookScenario[];
