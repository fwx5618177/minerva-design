import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Radio, RadioGroup, Switch } from "minerva-design";
import {
  WaterfallChart,
  type WaterfallChartProps,
  type WaterfallStep,
} from "minerva-design/charts";

type Orientation = NonNullable<WaterfallChartProps["orientation"]>;

// Story points of a sprint: from the commitment to what was delivered
const CHANGES = [
  ["added", 9],
  ["removed", -6],
  ["reestimated", 3],
  ["carriedOver", -11],
] as const;
const COMMITTED = 48;
const ORIENTATIONS: Orientation[] = ["vertical", "horizontal"];

export default function OptionsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;
  const [labels, setLabels] = useState(true);
  const [connector, setConnector] = useState(true);
  const [orientation, setOrientation] = useState<Orientation>("vertical");

  const points = useMemo(() => {
    const format = new Intl.NumberFormat(locale);
    return (value: number) => format.format(value);
  }, [locale]);

  const steps = useMemo(
    (): WaterfallStep[] => [
      { label: t("scope.committed"), kind: "subtotal" },
      ...CHANGES.map(([key, value]) => ({ label: t(`scope.${key}`), value })),
      { label: t("scope.completed"), kind: "total" },
    ],
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={16} wrap align="center">
        <RadioGroup
          aria-label={t("scope.orientation")}
          direction="horizontal"
          value={orientation}
          onChange={(value) => setOrientation(value as Orientation)}
        >
          {ORIENTATIONS.map((value) => (
            <Radio key={value} value={value} label={t(`scope.${value}`)} />
          ))}
        </RadioGroup>
        <Switch
          checked={labels}
          onChange={setLabels}
          label={t("scope.labels")}
        />
        <Switch
          checked={connector}
          onChange={setConnector}
          label={t("scope.connector")}
        />
      </HStack>
      <WaterfallChart
        steps={steps}
        start={COMMITTED}
        name={t("scope.name")}
        format={points}
        labels={labels}
        connector={connector}
        orientation={orientation}
        height={320}
        ariaLabel={t("scope.aria")}
      />
    </div>
  );
}
