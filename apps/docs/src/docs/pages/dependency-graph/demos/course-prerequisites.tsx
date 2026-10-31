import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  DependencyGraph,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Direction = "TB" | "LR" | "BT" | "RL";

// course, catalogue code, year of the curriculum
const COURSES: [string, string, number][] = [
  ["intro", "CS 101", 1],
  ["discrete", "MA 110", 1],
  ["calculus", "MA 120", 1],
  ["dataStructures", "CS 201", 2],
  ["architecture", "CS 210", 2],
  ["linearAlgebra", "MA 220", 2],
  ["probability", "MA 230", 2],
  ["algorithms", "CS 301", 3],
  ["os", "CS 310", 3],
  ["databases", "CS 320", 3],
  ["networks", "CS 330", 3],
  ["ml", "CS 340", 3],
  ["compilers", "CS 401", 4],
  ["distributed", "CS 410", 4],
  ["security", "CS 420", 4],
  ["deepLearning", "CS 440", 4],
  ["capstone", "CS 490", 4],
];

// prerequisite → course
const PREREQUISITES: [string, string][] = [
  ["intro", "dataStructures"],
  ["discrete", "dataStructures"],
  ["intro", "architecture"],
  ["calculus", "linearAlgebra"],
  ["calculus", "probability"],
  ["dataStructures", "algorithms"],
  ["discrete", "algorithms"],
  ["architecture", "os"],
  ["dataStructures", "os"],
  ["dataStructures", "databases"],
  ["os", "networks"],
  ["algorithms", "ml"],
  ["linearAlgebra", "ml"],
  ["probability", "ml"],
  ["algorithms", "compilers"],
  ["architecture", "compilers"],
  ["os", "distributed"],
  ["networks", "distributed"],
  ["networks", "security"],
  ["os", "security"],
  ["ml", "deepLearning"],
  ["algorithms", "capstone"],
  ["databases", "capstone"],
];

const DIRECTIONS: Direction[] = ["TB", "LR", "BT", "RL"];

/** Every prerequisite of `id`, direct or not, in catalogue (topological) order */
const ancestors = (id: string) => {
  const seen = new Set<string>();
  const queue = [id];
  while (queue.length) {
    const current = queue.shift()!;
    for (const [a, b] of PREREQUISITES) {
      if (b === current && !seen.has(a)) {
        seen.add(a);
        queue.push(a);
      }
    }
  }
  return COURSES.map(([course]) => course).filter((course) => seen.has(course));
};

export default function CoursePrerequisitesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const [direction, setDirection] = useState<Direction>("TB");
  const [course, setCourse] = useState("ml");

  const nodes = useMemo(
    (): GraphNode[] =>
      COURSES.map(([id, code, year]) => ({
        id,
        label: t(`courses.${id}`),
        subtitle: code,
        group: `year${year}`,
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      PREREQUISITES.map(([source, target]) => ({ source, target })),
    [],
  );
  const groups = useMemo(
    () =>
      [1, 2, 3, 4].map((n) => ({
        id: `year${n}`,
        name: t("yearLabel", { n }),
      })),
    [t],
  );
  const before = ancestors(course);
  const name = (id: string) => t(`courses.${id}`);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("flowDirection")}
        direction="horizontal"
        value={direction}
        onChange={(value) => setDirection(value as Direction)}
      >
        {DIRECTIONS.map((id) => (
          <Radio key={id} value={id} label={t(`directions.${id}`)} />
        ))}
      </RadioGroup>
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        groups={groups}
        direction={direction}
        edgeStyle="spline"
        highlight="lineage"
        selected={[course]}
        interaction={{ select: false }}
        height={direction === "TB" || direction === "BT" ? 460 : 400}
        ariaLabel={t("coursesAria")}
        onItemClick={(event) => {
          if (event.type === "node" && event.id) setCourse(event.id);
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {before.length
          ? t("coursePath", {
              course: name(course),
              total: before.length,
              list: new Intl.ListFormat(i18n.language).format(before.map(name)),
            })
          : t("courseNoPrerequisite", { course: name(course) })}
      </output>
    </div>
  );
}
