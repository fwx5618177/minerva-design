// Finds the backends the charts of a demo actually use. Charts report theirs
// on their root (`data-renderer`, set once the backend started and updated
// after a fallback); shape charts (pie, radar, sankey…) always draw with
// Canvas2D and carry no attribute. Web Components draw inside open shadow
// roots, which are searched too.
import type { ChartRendererKind } from "minerva-design/charts/core";

export const RENDERER_KINDS: readonly ChartRendererKind[] = [
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

export interface RendererScan {
  /** Charts per backend, shape charts excluded */
  kinds: Partial<Record<ChartRendererKind, number>>;
  /** Shape charts (Canvas2D only) */
  shapes: number;
  /** Shadow roots met on the way (to observe them as well) */
  roots: ShadowRoot[];
  /** Custom elements not defined yet (their shadow root comes later) */
  pending: string[];
}

const isKind = (value: string | undefined): value is ChartRendererKind =>
  RENDERER_KINDS.includes(value as ChartRendererKind);

const SHAPE_CHART = ".minerva-shape-chart:not([data-renderer])";

/** Charts per backend under `root`, shadow roots included */
export function scanRenderers(root: ParentNode): RendererScan {
  const scan: RendererScan = { kinds: {}, shapes: 0, roots: [], pending: [] };
  const visit = (node: ParentNode) => {
    for (const el of node.querySelectorAll<HTMLElement>("[data-renderer]")) {
      const kind = el.dataset.renderer;
      if (isKind(kind)) scan.kinds[kind] = (scan.kinds[kind] ?? 0) + 1;
    }
    scan.shapes += node.querySelectorAll(SHAPE_CHART).length;
    for (const el of node.querySelectorAll("*")) {
      if (el.shadowRoot) {
        scan.roots.push(el.shadowRoot);
        visit(el.shadowRoot);
      } else if (
        el.localName.includes("-") &&
        typeof customElements !== "undefined" &&
        !customElements.get(el.localName) &&
        !scan.pending.includes(el.localName)
      ) {
        scan.pending.push(el.localName);
      }
    }
  };
  visit(root);
  return scan;
}

/** Same counts (to skip needless re-renders) */
export const sameScan = (
  a: Pick<RendererScan, "kinds" | "shapes">,
  b: Pick<RendererScan, "kinds" | "shapes">,
) =>
  a.shapes === b.shapes &&
  RENDERER_KINDS.every((kind) => a.kinds[kind] === b.kinds[kind]);
