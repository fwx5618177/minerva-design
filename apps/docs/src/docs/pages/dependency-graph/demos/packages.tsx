import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  DependencyGraph,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Kind = "app" | "framework" | "library" | "tooling";

const PACKAGES: [string, Kind, string][] = [
  ["docs", "app", "2.4.0"],
  ["playground", "app", "0.9.1"],
  ["admin-console", "app", "1.6.0"],
  ["react", "framework", "3.2.0"],
  ["vue", "framework", "3.2.0"],
  ["angular", "framework", "3.2.0"],
  ["web-components", "framework", "3.2.0"],
  ["charts", "library", "1.8.0"],
  ["core", "library", "3.2.0"],
  ["i18n", "library", "1.1.0"],
  ["icons", "library", "2.0.3"],
  ["tokens", "library", "1.4.2"],
  ["utils", "library", "1.0.7"],
  ["build-scripts", "tooling", "0.5.0"],
  ["eslint-config", "tooling", "4.1.0"],
  ["tsconfig", "tooling", "1.0.0"],
];

// "a depends on b"; dev dependencies are dashed
const DEPENDS: [string, string, boolean?][] = [
  ["docs", "react"],
  ["docs", "vue"],
  ["docs", "angular"],
  ["docs", "web-components"],
  ["docs", "charts"],
  ["docs", "i18n"],
  ["playground", "react"],
  ["playground", "charts"],
  ["admin-console", "react"],
  ["admin-console", "charts"],
  ["admin-console", "i18n"],
  ["react", "core"],
  ["vue", "core"],
  ["angular", "core"],
  ["web-components", "core"],
  ["react", "icons"],
  ["vue", "icons"],
  ["web-components", "icons"],
  ["charts", "core"],
  ["charts", "utils"],
  ["core", "tokens"],
  ["core", "utils"],
  ["icons", "tokens"],
  ["i18n", "utils"],
  ["core", "build-scripts", true],
  ["charts", "build-scripts", true],
  ["react", "eslint-config", true],
  ["build-scripts", "tsconfig", true],
  ["eslint-config", "tsconfig", true],
];

const KINDS: Kind[] = ["app", "framework", "library", "tooling"];

export default function PackagesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const nodes = useMemo(
    (): GraphNode[] =>
      PACKAGES.map(([id, kind, version]) => ({
        id,
        label: id,
        subtitle: `v${version}`,
        group: kind,
      })),
    [],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      DEPENDS.map(([source, target, dev]) => ({
        source,
        target,
        dashed: !!dev,
        label: dev ? t("devDependency") : undefined,
      })),
    [t],
  );
  const groups = useMemo(
    () => KINDS.map((id) => ({ id, name: t(`kinds.${id}`) })),
    [t],
  );

  return (
    <DependencyGraph
      nodes={nodes}
      edges={edges}
      groups={groups}
      height={520}
      edgeLabels="hover"
      ariaLabel={t("packagesAria")}
    />
  );
}
