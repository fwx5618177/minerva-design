import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { DonutChart, type ShapeHoverEvent } from "minerva-design/native";

// Monthly recurring revenue by plan, in US dollars
const revenue = [
  { key: "enterprise", value: 48200 },
  { key: "business", value: 31500 },
  { key: "pro", value: 22800 },
  { key: "starter", value: 9400 },
];
const total = revenue.reduce((sum, d) => sum + d.value, 0);

// The total in the hole always covers every plan
const legend = { toggle: false } as const;

export default function Donut() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  // The pressed plan replaces the total in the hole
  const [pressed, setPressed] = useState<ShapeHoverEvent | null>(null);
  const data = useMemo(
    () => revenue.map(({ key, value }) => ({ name: t(\`plans.\${key}\`), value })),
    [t],
  );
  const currency = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const percent = new Intl.NumberFormat(locale, { style: "percent" });
  const format = (value: number) => currency.format(value);
  return (
    <DonutChart
      data={data}
      height={300}
      format={format}
      // Softer segment ends than the 4px default
      cornerRadius={10}
      centerValue={format(pressed ? pressed.value : total)}
      centerLabel={
        pressed
          ? \`\${pressed.name} · \${percent.format(pressed.percent)}\`
          : t("monthlyRevenue")
      }
      onHover={setPressed}
      tooltip={false}
      legend={legend}
      labels="none"
      ariaLabel={t("mrrAria")}
    />
  );
}
`})))()}n();export{t as default};