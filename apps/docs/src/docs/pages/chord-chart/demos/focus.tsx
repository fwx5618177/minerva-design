import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  ChordChart,
  type ChordLink,
  type ShapeHoverEvent,
} from "minerva-design/charts";

const FACULTIES = [
  "physics",
  "chemistry",
  "biology",
  "medicine",
  "computing",
  "mathematics",
  "economics",
  "engineering",
] as const;
type Faculty = (typeof FACULTIES)[number];

// Papers co-authored by two faculties over five years
const PAIRS: [Faculty, Faculty, number][] = [
  ["physics", "chemistry", 142],
  ["physics", "mathematics", 118],
  ["physics", "engineering", 164],
  ["physics", "computing", 71],
  ["chemistry", "biology", 96],
  ["chemistry", "medicine", 58],
  ["chemistry", "engineering", 83],
  ["biology", "medicine", 186],
  ["biology", "computing", 64],
  ["medicine", "computing", 77],
  ["medicine", "economics", 29],
  ["computing", "mathematics", 132],
  ["computing", "engineering", 121],
  ["computing", "economics", 46],
  ["mathematics", "economics", 54],
  ["engineering", "economics", 18],
];

export default function FocusDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const [focus, setFocus] = useState<Faculty | null>(null);
  const [pair, setPair] = useState<[string, string, number] | null>(null);
  const number = useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );
  const format = useMemo(
    () => (value: number) => number.format(value),
    [number],
  );
  const name = (faculty: Faculty) => t(`research.faculties.${faculty}`);

  const groups = useMemo(
    () => FACULTIES.map((f) => t(`research.faculties.${f}`)),
    [t],
  );
  // ribbons of the focused faculty keep their gradient, the others fade out
  const links = useMemo(
    (): ChordLink[] =>
      PAIRS.map(([a, b, value]) => ({
        source: FACULTIES.indexOf(a),
        target: FACULTIES.indexOf(b),
        value,
        ...(focus && a !== focus && b !== focus
          ? { color: "var(--border-color)" }
          : {}),
      })),
    [focus],
  );

  const onClick = (event: ShapeHoverEvent) => {
    if (event.index < FACULTIES.length) {
      const faculty = FACULTIES[event.index]!;
      setFocus((current) => (current === faculty ? null : faculty));
      setPair(null);
    } else if (event.source && event.target) {
      setPair([event.source, event.target, event.value]);
    }
  };

  let readout = t("research.hint");
  if (pair) {
    readout = t("research.pair", {
      a: pair[0],
      b: pair[1],
      value: number.format(pair[2]),
    });
  } else if (focus) {
    const partners = PAIRS.filter(([a, b]) => a === focus || b === focus)
      .map(([a, b, value]) => ({ partner: a === focus ? b : a, value }))
      .sort((x, y) => y.value - x.value);
    readout = t("research.focus", {
      name: name(focus),
      total: number.format(partners.reduce((sum, p) => sum + p.value, 0)),
      partners: new Intl.ListFormat(i18n.language, {
        type: "conjunction",
      }).format(
        partners.slice(0, 3).map((p) =>
          t("research.partner", {
            name: name(p.partner),
            value: number.format(p.value),
          }),
        ),
      ),
    });
  }

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <ChordChart
        groups={groups}
        links={links}
        format={format}
        legend={false}
        onClick={onClick}
        height={440}
        ariaLabel={t("research.aria")}
      />
      <HStack gap={12} wrap align="center" justify="between">
        <output aria-live="polite">{readout}</output>
        <Button
          variant="outline"
          size="small"
          disabled={!focus && !pair}
          onClick={() => {
            setFocus(null);
            setPair(null);
          }}
        >
          {t("research.clear")}
        </Button>
      </HStack>
    </div>
  );
}
