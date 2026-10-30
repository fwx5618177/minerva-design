import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  GraphChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Family = "systems" | "functional" | "objects" | "scripting";

const LANGUAGES: [string, Family, number][] = [
  ["Fortran", "systems", 1957],
  ["C", "systems", 1972],
  ["C++", "systems", 1985],
  ["Go", "systems", 2009],
  ["Rust", "systems", 2010],
  ["Lisp", "functional", 1958],
  ["ML", "functional", 1973],
  ["Scheme", "functional", 1975],
  ["Haskell", "functional", 1990],
  ["OCaml", "functional", 1996],
  ["Elixir", "functional", 2012],
  ["Simula", "objects", 1967],
  ["Smalltalk", "objects", 1972],
  ["Java", "objects", 1995],
  ["C#", "objects", 2000],
  ["Scala", "objects", 2004],
  ["Kotlin", "objects", 2011],
  ["Swift", "objects", 2014],
  ["Perl", "scripting", 1987],
  ["Python", "scripting", 1991],
  ["Ruby", "scripting", 1995],
  ["JavaScript", "scripting", 1995],
  ["TypeScript", "scripting", 2012],
];

// "a influenced b"
const INFLUENCES: [string, string][] = [
  ["Fortran", "C"],
  ["C", "C++"],
  ["C", "Go"],
  ["C++", "Rust"],
  ["C++", "Java"],
  ["C++", "C#"],
  ["Simula", "C++"],
  ["Simula", "Smalltalk"],
  ["Smalltalk", "Ruby"],
  ["Smalltalk", "Java"],
  ["Lisp", "Scheme"],
  ["Lisp", "Smalltalk"],
  ["Scheme", "JavaScript"],
  ["ML", "Haskell"],
  ["ML", "OCaml"],
  ["OCaml", "Rust"],
  ["Haskell", "Rust"],
  ["Haskell", "Scala"],
  ["Haskell", "Swift"],
  ["Java", "Scala"],
  ["Java", "Kotlin"],
  ["Java", "C#"],
  ["Scala", "Kotlin"],
  ["C#", "TypeScript"],
  ["JavaScript", "TypeScript"],
  ["Perl", "Ruby"],
  ["Perl", "Python"],
  ["Ruby", "Elixir"],
  ["Python", "Swift"],
  ["Ruby", "Swift"],
  ["Rust", "Swift"],
  ["C", "Python"],
  ["Lisp", "Python"],
];

const FAMILIES: Family[] = ["systems", "functional", "objects", "scripting"];

export default function ArcDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.graph-chart.data",
  });
  const nodes = useMemo(
    (): GraphNode[] =>
      LANGUAGES.map(([id, family, year]) => ({
        id,
        group: family,
        value: INFLUENCES.filter(([a]) => a === id).length + 1,
        subtitle: String(year),
      })),
    [],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      INFLUENCES.map(([source, target]) => ({
        source,
        target,
        label: t("influenced"),
      })),
    [t],
  );
  const groups = useMemo(
    () => FAMILIES.map((id) => ({ id, name: t(`families.${id}`) })),
    [t],
  );

  return (
    <GraphChart
      nodes={nodes}
      edges={edges}
      groups={groups}
      layout="arc"
      edgeColor="source"
      edgeLabels="hover"
      height={420}
      ariaLabel={t("arcAria")}
    />
  );
}
