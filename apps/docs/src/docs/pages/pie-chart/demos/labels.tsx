import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox, HStack, Radio, RadioGroup } from "minerva-design";
import { PieChart, type ShapeDatum } from "minerva-design/charts";

type Placement = "outside" | "inside" | "none";
type Part = "name" | "value" | "percent";

// Support tickets opened this quarter, by channel
const tickets = [
  { key: "email", value: 1240 },
  { key: "chat", value: 980 },
  { key: "form", value: 610 },
  { key: "phone", value: 430 },
  { key: "social", value: 150 },
  { key: "community", value: 90 },
];

const PARTS: Part[] = ["name", "value", "percent"];
const PLACEMENTS: Placement[] = ["outside", "inside", "none"];

export default function LabelsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  const [labels, setLabels] = useState<Placement>("outside");
  const [parts, setParts] = useState<Part[]>(["name", "percent"]);

  const data = useMemo(
    (): ShapeDatum[] =>
      tickets.map(({ key, value }) => ({ name: t(`channels.${key}`), value })),
    [t],
  );
  // Keep the array stable between renders: a new one would redraw the labels
  const labelContent = useMemo(
    () => PARTS.filter((part) => parts.includes(part)),
    [parts],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  const togglePart = (part: Part, checked: boolean) =>
    setParts((current) =>
      checked ? [...current, part] : current.filter((p) => p !== part),
    );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("labelPlacement")}
        direction="horizontal"
        value={labels}
        onChange={(value) => setLabels(value as Placement)}
      >
        {PLACEMENTS.map((placement) => (
          <Radio
            key={placement}
            value={placement}
            label={t(`placements.${placement}`)}
          />
        ))}
      </RadioGroup>
      <HStack gap={16} role="group" aria-label={t("labelContent")}>
        {PARTS.map((part) => (
          <Checkbox
            key={part}
            label={t(`parts.${part}`)}
            checked={parts.includes(part)}
            // at least one part stays selected
            disabled={
              labels === "none" || (parts.length === 1 && parts[0] === part)
            }
            onChange={(checked) => togglePart(part, checked)}
          />
        ))}
      </HStack>
      <PieChart
        data={data}
        labels={labels}
        labelContent={labelContent}
        format={(value) => number.format(value)}
        percentFormat={(share) => percent.format(share)}
        renderTooltip={(slice) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{slice.name}</strong>
            <span>
              {t("ticketsShare", {
                tickets: number.format(slice.value),
                share: percent.format(slice.percent),
              })}
            </span>
          </div>
        )}
        height={340}
        ariaLabel={t("ticketsAria")}
      />
    </div>
  );
}
