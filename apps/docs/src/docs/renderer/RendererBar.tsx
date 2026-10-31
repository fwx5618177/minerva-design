import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  IoHardwareChipOutline,
  IoInformationCircleOutline,
  IoWarning,
} from "react-icons/io5";
import { Tooltip } from "minerva-design";
import type { ChartRendererPreference } from "minerva-design/charts/core";
import type { RendererTopic } from "./context";
import { RENDERER_OPTIONS, setChartRenderer } from "./store";
import { autoPick, probeBackends, type BackendsSupport } from "./support";
import styles from "./renderer.module.scss";

export interface RendererBarProps {
  /** The page-wide renderer */
  value: ChartRendererPreference;
  /** What it switches: the wording of the label, status and help @default "charts" */
  topic?: RendererTopic;
}

/** Strings worded for the canvas icons on icon pages (chartRenderer.icons.*) */
const ICON_KEYS = new Set([
  "label",
  "forced",
  "forcedSoftware",
  "software",
  "info",
  "infoLabel",
]);

/** Where the bar sticks: under the site header, with the CSS gap (8px) */
const stickyTop = () =>
  (parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--ds-header-height",
    ),
  ) || 64) + 8;

/**
 * The sticky renderer switch of the chart pages: Auto / WebGPU / WebGL2 /
 * WebGL / Canvas2D for every chart of the page, whatever the framework tab.
 * Backends this browser lacks are disabled; software GPUs are flagged.
 */
export default function RendererBar({
  value,
  topic = "charts",
}: RendererBarProps) {
  const { t: translate } = useTranslation("common", {
    keyPrefix: "chartRenderer",
  });
  const t = ((key: string, options?: Record<string, unknown>) =>
    translate(
      topic === "icons" && ICON_KEYS.has(key) ? `icons.${key}` : key,
      options,
    )) as typeof translate;
  const name = useId();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);
  const [support, setSupport] = useState<BackendsSupport | null>(null);

  useEffect(() => {
    let cancelled = false;
    void probeBackends().then((result) => {
      if (!cancelled) setSupport(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // a stored backend this browser lacks (another device, a GPU blocklist)
  useEffect(() => {
    if (support && value !== "auto" && support[value] === "missing") {
      setChartRenderer("auto");
    }
  }, [support, value]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || typeof IntersectionObserver === "undefined") return;
    const top = stickyTop();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setStuck(
            !entry.isIntersecting && entry.boundingClientRect.top < top + 1,
          );
        }
      },
      { rootMargin: `-${top + 1}px 0px 0px 0px` },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const backend = (kind: ChartRendererPreference) => t(`options.${kind}`);
  /** Why an option is disabled (missing) or flagged (software GPU) */
  const reasonOf = (option: ChartRendererPreference): string | null => {
    const state = option === "auto" ? undefined : support?.[option];
    if (state === "missing") {
      return t("unsupported", { backend: backend(option) });
    }
    if (state === "software") {
      return t("software", { backend: backend(option) });
    }
    return null;
  };

  let status: ReactNode;
  if (!support) {
    status = t("checking");
  } else if (value === "auto") {
    status = (
      <Trans
        t={t}
        i18nKey="auto"
        values={{ backend: backend(autoPick(support)) }}
        components={{ b: <strong /> }}
      />
    );
  } else {
    status = (
      <Trans
        t={t}
        i18nKey={support[value] === "software" ? "forcedSoftware" : "forced"}
        values={{ backend: backend(value) }}
        components={{ b: <strong /> }}
      />
    );
  }

  return (
    <>
      <div ref={sentinelRef} className={styles.sentinel} aria-hidden />
      <div
        className={styles.bar}
        data-renderer-bar
        data-stuck={stuck || undefined}
        data-toc-ignore
      >
        <span className={styles.head}>
          <span className={styles.label} aria-hidden>
            <IoHardwareChipOutline className={styles.labelIcon} />
            {t("label")}
          </span>
          <Tooltip
            content={<span className={styles.info}>{t("info")}</span>}
            placement="bottom-start"
            asChild
          >
            <button
              type="button"
              className={styles.infoButton}
              aria-label={t("infoLabel")}
            >
              <IoInformationCircleOutline aria-hidden />
            </button>
          </Tooltip>
        </span>
        <div
          role="radiogroup"
          aria-label={t("label")}
          className={styles.segmented}
        >
          {RENDERER_OPTIONS.map((option) => {
            const state = option === "auto" ? undefined : support?.[option];
            const missing = state === "missing";
            const software = state === "software";
            const reason = reasonOf(option);
            const reasonId = `${name}-${option}-reason`;
            return (
              <Tooltip
                key={option}
                content={reason}
                disabled={!reason}
                placement="bottom"
                asChild
              >
                <label
                  className={styles.option}
                  data-kind={option}
                  data-checked={value === option || undefined}
                  data-disabled={missing || undefined}
                >
                  <input
                    type="radio"
                    className={styles.radio}
                    name={name}
                    value={option}
                    checked={value === option}
                    disabled={missing}
                    aria-describedby={reason ? reasonId : undefined}
                    onChange={() => setChartRenderer(option)}
                  />
                  {option !== "auto" && (
                    <span className={styles.dot} aria-hidden />
                  )}
                  {backend(option)}
                  {software && (
                    <IoWarning className={styles.warning} aria-hidden />
                  )}
                </label>
              </Tooltip>
            );
          })}
        </div>
        {/* why an option is disabled or flagged, for screen readers */}
        <span className={styles.srOnly}>
          {RENDERER_OPTIONS.map((option) => {
            const reason = reasonOf(option);
            return (
              reason && (
                <span key={option} id={`${name}-${option}-reason`}>
                  {reason}
                </span>
              )
            );
          })}
        </span>
        <div className={styles.status} role="status">
          {status}
        </div>
      </div>
    </>
  );
}
