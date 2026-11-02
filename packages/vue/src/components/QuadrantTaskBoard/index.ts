import type { ExtractPublicPropTypes } from "vue";
import QuadrantTaskBoard from "./QuadrantTaskBoard.vue";
import type { QuadrantTaskLabels } from "minerva-design/charts/core";
import type { quadrantChartProps } from "../Chart/props";

export { QuadrantTaskBoard };
export type { QuadrantTaskLabels };

/**
 * Props of `QuadrantTaskBoard`: the QuadrantChart props (`points` is
 * `v-model:points`) with `labels`, the texts of the buttons and dialogs
 */
export type QuadrantTaskBoardProps = Omit<
  ExtractPublicPropTypes<typeof quadrantChartProps>,
  "labels"
> & {
  labels?: Partial<QuadrantTaskLabels>;
};
