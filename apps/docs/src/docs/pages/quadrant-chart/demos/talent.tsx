import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  QuadrantChart,
  type QuadrantCorner,
  type QuadrantPoint,
} from "minerva-design/charts";

type Person = { role: string; x: number; y: number };

// x: performance this year, y: potential (1-9, calibration scale)
const INITIAL: Person[] = [
  { role: "backendLead", x: 7.8, y: 7.4 },
  { role: "productDesigner", x: 6.1, y: 3.2 },
  { role: "dataAnalyst", x: 3.6, y: 7.1 },
  { role: "qaEngineer", x: 3.2, y: 3.4 },
  { role: "mobileDeveloper", x: 8.3, y: 4.2 },
  { role: "productManager", x: 5.6, y: 8.1 },
  { role: "supportLead", x: 7.1, y: 2.4 },
  { role: "juniorDeveloper", x: 2.6, y: 6.2 },
];

const TITLES: Record<QuadrantCorner, string> = {
  topLeft: "talent.roughDiamonds",
  topRight: "talent.futureLeaders",
  bottomLeft: "talent.needsSupport",
  bottomRight: "talent.solidPerformers",
};

const clamp = (value: number) => Math.min(8.8, Math.max(1.2, value));
const moved = (person: Person, i: number) =>
  person.x !== INITIAL[i]!.x || person.y !== INITIAL[i]!.y;

export default function TalentDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [people, setPeople] = useState(INITIAL);
  const [status, setStatus] = useState<string | null>(null);
  const decimal = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );
  const title = (corner: QuadrantCorner) => t(TITLES[corner]);

  // recalibrated people get a bigger dot
  const points = useMemo(
    (): QuadrantPoint[] =>
      people.map((person, i) => ({
        label: t(`talent.roles.${person.role}`),
        x: person.x,
        y: person.y,
        size: moved(person, i) ? 16 : 11,
      })),
    [people, t],
  );
  const changed = people.filter(moved).length;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        xDomain={[1, 9]}
        yDomain={[1, 9]}
        quadrants={{
          topLeft: {
            label: title("topLeft"),
            color: "var(--warning-color)",
          },
          topRight: {
            label: title("topRight"),
            color: "var(--success-color)",
          },
          bottomLeft: {
            label: title("bottomLeft"),
            color: "var(--danger-color)",
          },
          bottomRight: {
            label: title("bottomRight"),
            color: "var(--primary-color)",
          },
        }}
        xLabel={t("talent.performance")}
        yLabel={t("talent.potential")}
        onPointDrag={(point, _index, target) =>
          setStatus(
            t("talent.moving", {
              person: point.label,
              performance: decimal.format(clamp(target.x)),
              potential: decimal.format(clamp(target.y)),
              quadrant: title(target.quadrant),
            }),
          )
        }
        onPointDrop={(point, index, target) => {
          setPeople((current) =>
            current.map((person, i) =>
              i === index
                ? { ...person, x: clamp(target.x), y: clamp(target.y) }
                : person,
            ),
          );
          setStatus(
            t("talent.moved", {
              person: point.label,
              quadrant: title(target.quadrant),
            }),
          );
        }}
        onPointDoubleClick={(point, index) => {
          setPeople((current) =>
            current.map((person, i) => (i === index ? INITIAL[i]! : person)),
          );
          setStatus(t("talent.reset", { person: point.label }));
        }}
        height={380}
        ariaLabel={t("talent.aria")}
      />
      <HStack gap={12} wrap align="center" justify="between">
        <output aria-live="polite">{status ?? t("talent.hint")}</output>
        <HStack gap={12} wrap align="center">
          <span style={{ color: "var(--text-secondary-color)" }}>
            {t("talent.changed", { n: changed, total: people.length })}
          </span>
          <Button
            variant="outline"
            size="small"
            disabled={changed === 0}
            onClick={() => {
              setPeople(INITIAL);
              setStatus(t("talent.resetAll"));
            }}
          >
            {t("talent.resetButton")}
          </Button>
        </HStack>
      </HStack>
    </div>
  );
}
