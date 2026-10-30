import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  createGraphChart,
  type GraphChartInstance,
  type GraphChartOptions,
  type GraphLayoutType,
} from "minerva-design/charts/core";
import { characterGraph } from "../data";

const LAYOUTS: GraphLayoutType[] = ["force", "circular", "arc"];

export default function VanillaDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.graph-chart.data",
  });
  const container = useRef<HTMLDivElement>(null);
  const chart = useRef<GraphChartInstance | null>(null);
  const status = useRef<HTMLSpanElement>(null);
  const [layout, setLayout] = useState<GraphLayoutType>("force");
  const layoutRef = useRef(layout);

  const optionsFor = (next: GraphLayoutType): GraphChartOptions => ({
    ...characterGraph(t),
    layout: next,
    nodeSize: [8, 28],
    edgeLabels: "hover",
    locale: i18n.language,
    ariaLabel: t("charactersAria"),
  });
  const optionsRef = useRef(optionsFor);

  useEffect(() => {
    layoutRef.current = layout;
    optionsRef.current = optionsFor;
  });

  useEffect(() => {
    if (!container.current) return;
    // the framework-free engine: a container, options, events, destroy
    const instance = createGraphChart(
      container.current,
      optionsRef.current(layoutRef.current),
    );
    chart.current = instance;
    const offs = [
      instance.on("click", (event) => {
        if (!status.current || event.type !== "node") return;
        status.current.textContent = t("vanillaClick", {
          name: event.node?.label ?? event.id,
          links: event.degree ?? 0,
        });
        instance.focusNode(event.id, { zoom: 1.4 });
      }),
      instance.on("layoutEnd", (event) => {
        if (status.current)
          status.current.textContent = t("vanillaLayout", {
            layout: t(`layouts.${event.layout}`),
          });
      }),
    ];
    return () => {
      offs.forEach((off) => off());
      instance.destroy();
      chart.current = null;
    };
  }, [t, i18n.language]);

  const change = (next: GraphLayoutType) => {
    setLayout(next);
    chart.current?.setOptions(optionsFor(next));
    chart.current?.fit();
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("layoutLabel")}
        direction="horizontal"
        value={layout}
        onChange={(value) => change(value as GraphLayoutType)}
      >
        {LAYOUTS.map((value) => (
          <Radio key={value} value={value} label={t(`layouts.${value}`)} />
        ))}
      </RadioGroup>
      <div ref={container} style={{ height: 440 }} />
      <span
        ref={status}
        role="status"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("vanillaHint")}
      </span>
    </div>
  );
}
