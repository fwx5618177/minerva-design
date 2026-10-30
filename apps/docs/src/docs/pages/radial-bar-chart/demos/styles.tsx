import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Radio, RadioGroup, Switch } from "minerva-design";
import { RadialBarChart, type RadialBarDatum } from "minerva-design/charts";

type Shape = "threeQuarter" | "full" | "half";

// Use of a server's resources, in percent of their capacity
const RESOURCES: [key: string, used: number][] = [
  ["cpu", 72],
  ["memory", 58],
  ["disk", 86],
  ["network", 31],
];

const SHAPES: Record<Shape, { sweep: number; startAngle: number }> = {
  threeQuarter: { sweep: 270, startAngle: 0 },
  full: { sweep: 360, startAngle: 0 },
  half: { sweep: 180, startAngle: -90 },
};

const percent = (value: number) => `${value}%`;

export default function StylesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });
  const [shape, setShape] = useState<Shape>("threeQuarter");
  const [rounded, setRounded] = useState(true);
  const [track, setTrack] = useState(true);

  const data = useMemo(
    (): RadialBarDatum[] =>
      RESOURCES.map(([key, used]) => ({
        name: t(`resources.${key}`),
        value: used,
      })),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={16} wrap align="center">
        <RadioGroup
          aria-label={t("shapeLabel")}
          direction="horizontal"
          value={shape}
          onChange={(value) => setShape(value as Shape)}
        >
          {(Object.keys(SHAPES) as Shape[]).map((key) => (
            <Radio key={key} value={key} label={t(`shapes.${key}`)} />
          ))}
        </RadioGroup>
        <Switch checked={rounded} onChange={setRounded} label={t("rounded")} />
        <Switch checked={track} onChange={setTrack} label={t("track")} />
      </HStack>
      <RadialBarChart
        data={data}
        max={100}
        {...SHAPES[shape]}
        rounded={rounded}
        track={track}
        labelContent={["name", "value"]}
        format={percent}
        height={320}
        ariaLabel={t("resourcesAria")}
      />
    </div>
  );
}
