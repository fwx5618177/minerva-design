import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import {
  RadialBarChart,
  Tabs,
  type RadialBarDatum,
} from "minerva-design/native";

type Ring = "move" | "exercise" | "stand";

// Daily goals and a week of activity: Move in kcal, Exercise in minutes,
// Stand in hours with at least one minute of standing
const GOALS: Record<Ring, number> = { move: 600, exercise: 30, stand: 12 };
const COLORS: Record<Ring, string> = {
  move: "#fa114f",
  exercise: "#92e82a",
  stand: "#1eeaef",
};
const WEEK: Record<Ring, number>[] = [
  { move: 520, exercise: 34, stand: 11 },
  { move: 610, exercise: 41, stand: 12 },
  { move: 380, exercise: 12, stand: 8 },
  { move: 705, exercise: 55, stand: 13 },
  { move: 450, exercise: 28, stand: 10 },
  { move: 820, exercise: 72, stand: 9 },
  { move: 290, exercise: 6, stand: 6 },
];
const RINGS: Ring[] = ["move", "exercise", "stand"];
const percent = (share: number) => \`\${Math.round(share * 100)}%\`;

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });
  const [day, setDay] = useState("0");
  const locale = i18n.language;
  // Monday to Sunday, in the reader's language (2026-03-02 is a Monday)
  const days = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, {
      weekday: "narrow",
      timeZone: "UTC",
    });
    return WEEK.map((_, i) => ({
      value: String(i),
      label: format.format(Date.UTC(2026, 2, 2 + i)),
    }));
  }, [locale]);
  const values = WEEK[Number(day)] ?? GOALS;
  const data = useMemo(
    (): RadialBarDatum[] =>
      RINGS.map((ring) => ({
        name: t(\`rings.\${ring}\`),
        value: values[ring],
        max: GOALS[ring],
        color: COLORS[ring],
      })),
    [t, values],
  );
  const closed = RINGS.filter((ring) => values[ring] >= GOALS[ring]).length;
  return (
    <View style={{ width: "100%", gap: 12 }}>
      <Tabs
        variant="pills"
        listLabel={t("dayLabel")}
        items={days}
        value={day}
        onChange={setDay}
      />
      <RadialBarChart
        data={data}
        labelContent={["name", "percent"]}
        percentFormat={percent}
        centerValue={\`\${closed}/3\`}
        centerLabel={t("closed")}
        height={300}
        ariaLabel={t("activityAria")}
      />
    </View>
  );
}
`})))()}n();export{t as default};