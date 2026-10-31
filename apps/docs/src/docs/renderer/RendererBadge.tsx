import { useContext, useEffect, useState, type RefObject } from "react";
import { useTranslation } from "react-i18next";
import type {
  ChartRendererKind,
  ChartRendererPreference,
} from "minerva-design/charts/core";
import {
  RENDERER_KINDS,
  sameScan,
  scanRenderers,
  type RendererScan,
} from "./scan";
import { RendererTopicContext } from "./context";
import styles from "./renderer.module.scss";

type Counts = Pick<RendererScan, "kinds" | "shapes">;

const EMPTY: Counts = { kinds: {}, shapes: 0 };

/** Rescans at most this often while charts start or switch backends */
const THROTTLE = 150;

export interface RendererBadgeProps {
  /** The demo preview to watch */
  targetRef: RefObject<HTMLElement | null>;
  /** The page-wide renderer */
  requested: ChartRendererPreference;
}

/**
 * The backends the charts of a demo actually use ("WebGL2", "WebGL2 ×3",
 * "WebGL2 · Canvas2D"), read from the charts' `data-renderer` attribute.
 * Hidden when the demo has no chart.
 */
export default function RendererBadge({
  targetRef,
  requested,
}: RendererBadgeProps) {
  const { t } = useTranslation("common", { keyPrefix: "chartRenderer" });
  const topic = useContext(RendererTopicContext);
  const [counts, setCounts] = useState<Counts>(EMPTY);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || typeof MutationObserver === "undefined") return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let disposed = false;
    const observed = new WeakSet<Node>();
    const waiting = new Set<string>();
    const observer = new MutationObserver(() => schedule());
    const observe = (node: Node) => {
      if (observed.has(node)) return;
      observed.add(node);
      observer.observe(node, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["data-renderer", "class"],
      });
    };
    const scan = () => {
      timer = undefined;
      if (disposed) return;
      const result = scanRenderers(target);
      result.roots.forEach(observe);
      for (const tag of result.pending) {
        if (waiting.has(tag)) continue;
        waiting.add(tag);
        void customElements.whenDefined(tag).then(() => {
          waiting.delete(tag);
          schedule();
        });
      }
      setCounts((prev) => (sameScan(prev, result) ? prev : result));
    };
    function schedule() {
      timer ??= setTimeout(scan, THROTTLE);
    }
    observe(target);
    scan();
    return () => {
      disposed = true;
      observer.disconnect();
      if (timer !== undefined) clearTimeout(timer);
    };
  }, [targetRef]);

  const used = RENDERER_KINDS.filter((kind) => counts.kinds[kind]);
  const shapes = counts.shapes > 0;
  if (used.length === 0 && !shapes) return null;

  const name = (kind: ChartRendererKind) => t(`options.${kind}`);
  const parts: { kind: ChartRendererKind; count: number }[] = used.map(
    (kind) => ({ kind, count: counts.kinds[kind] ?? 0 }),
  );
  // shape charts draw with Canvas2D whatever the selection
  if (shapes) {
    const canvas = parts.find((part) => part.kind === "canvas2d");
    if (canvas) canvas.count += counts.shapes;
    else parts.push({ kind: "canvas2d", count: counts.shapes });
  }
  // the requested backend is not available here: every GPU chart fell back
  const fellBack =
    requested !== "auto" && used.length > 0 && !used.includes(requested);
  const titles = [t(topic === "icons" ? "icons.badgeTitle" : "badgeTitle")];
  if (fellBack) {
    titles.push(
      t("badgeFallback", {
        requested: name(requested),
        backend: used.map(name).join(", "),
      }),
    );
  }
  if (shapes) titles.push(t("badgeShape"));

  return (
    <span
      className={styles.badge}
      data-renderer-badge={parts.map((part) => part.kind).join(" ")}
      data-fallback={fellBack || undefined}
      title={titles.join("\n")}
    >
      <span className={styles.badgePrefix}>{t("badge")}</span>
      {parts.map(({ kind, count }) => (
        <span key={kind} className={styles.badgePart} data-kind={kind}>
          <span className={styles.dot} aria-hidden />
          {count > 1
            ? t("badgeCount", { backend: name(kind), n: count })
            : name(kind)}
        </span>
      ))}
    </span>
  );
}
