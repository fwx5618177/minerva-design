import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GraphChart, type GraphNode } from "minerva-design/charts";

type Circle = "university" | "work" | "climbing" | "books";

const CIRCLES: Record<Circle, string[]> = {
  university: ["ana", "ben", "chen", "dara", "eli", "farah"],
  work: ["gus", "hana", "ivan", "jules", "kai", "lena"],
  climbing: ["mo", "nina", "omar", "priya", "quinn", "rosa"],
  books: ["sam", "tariq", "uma", "vik", "wen", "yuki"],
};

const FRIENDSHIPS: [string, string][] = [
  ["ana", "ben"],
  ["ana", "chen"],
  ["ana", "dara"],
  ["ben", "chen"],
  ["ben", "eli"],
  ["chen", "farah"],
  ["dara", "eli"],
  ["eli", "farah"],
  ["dara", "farah"],
  ["gus", "hana"],
  ["gus", "ivan"],
  ["hana", "jules"],
  ["ivan", "jules"],
  ["ivan", "kai"],
  ["jules", "lena"],
  ["kai", "lena"],
  ["hana", "kai"],
  ["mo", "nina"],
  ["mo", "omar"],
  ["nina", "priya"],
  ["omar", "priya"],
  ["omar", "quinn"],
  ["priya", "rosa"],
  ["quinn", "rosa"],
  ["nina", "quinn"],
  ["sam", "tariq"],
  ["sam", "uma"],
  ["tariq", "vik"],
  ["uma", "wen"],
  ["vik", "yuki"],
  ["wen", "yuki"],
  ["uma", "vik"],
  ["sam", "wen"],
  // friendships across circles
  ["ana", "gus"],
  ["ben", "hana"],
  ["eli", "mo"],
  ["farah", "nina"],
  ["lena", "sam"],
  ["kai", "omar"],
  ["rosa", "yuki"],
  ["chen", "uma"],
  ["jules", "priya"],
  ["dara", "tariq"],
];

const friendsOf = (id: string) =>
  new Set(
    FRIENDSHIPS.flatMap(([a, b]) => (a === id ? [b] : b === id ? [a] : [])),
  );

/** People you may know: friends of friends, ranked by the number of mutual friends */
const suggest = (id: string) => {
  const friends = friendsOf(id);
  const mutual = new Map<string, number>();
  for (const friend of friends)
    for (const candidate of friendsOf(friend))
      if (candidate !== id && !friends.has(candidate))
        mutual.set(candidate, (mutual.get(candidate) ?? 0) + 1);
  return [...mutual]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 3);
};

export default function FriendSuggestionsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.graph-chart.data",
  });
  const [person, setPerson] = useState("ana");

  const nodes = useMemo(
    (): GraphNode[] =>
      (Object.keys(CIRCLES) as Circle[]).flatMap((circle) =>
        CIRCLES[circle].map((id) => ({
          id,
          label: `@${id}`,
          group: circle,
          value: friendsOf(id).size,
        })),
      ),
    [],
  );
  const edges = useMemo(
    () => FRIENDSHIPS.map(([source, target]) => ({ source, target })),
    [],
  );
  const groups = useMemo(
    () =>
      (Object.keys(CIRCLES) as Circle[]).map((id) => ({
        id,
        name: t(`circles.${id}`),
      })),
    [t],
  );

  const suggestions = useMemo(() => suggest(person), [person]);
  // the person and the suggestions stay selected (highlighted)
  const selected = useMemo(
    () => [person, ...suggestions.map(([id]) => id)],
    [person, suggestions],
  );
  const list = new Intl.ListFormat(i18n.language, { type: "conjunction" });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <GraphChart
        nodes={nodes}
        edges={edges}
        groups={groups}
        selected={selected}
        interaction={{ select: false }}
        nodeSize={[10, 24]}
        edgeColor="source"
        force={{ linkDistance: 50, charge: -260, seed: 4 }}
        height={460}
        ariaLabel={t("friendsAria")}
        onItemClick={(event) => {
          if (event.type === "node") setPerson(event.id);
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {suggestions.length
          ? t("suggestions", {
              name: `@${person}`,
              list: list.format(
                suggestions.map(([id, count]) =>
                  t("suggestion", { name: `@${id}`, mutual: count }),
                ),
              ),
            })
          : t("noSuggestions", { name: `@${person}` })}{" "}
        {t("friendsHint")}
      </output>
    </div>
  );
}
