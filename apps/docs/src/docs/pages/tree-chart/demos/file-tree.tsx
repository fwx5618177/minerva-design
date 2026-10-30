import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  TreeChart,
  type GraphChartHandle,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Kind = "folder" | "code" | "style" | "data" | "doc";

// path → kind; folders end with "/"
const FILES: string[] = [
  "minerva-design/",
  "minerva-design/packages/",
  "minerva-design/packages/charts/",
  "minerva-design/packages/charts/src/",
  "minerva-design/packages/charts/src/core.ts",
  "minerva-design/packages/charts/src/index.ts",
  "minerva-design/packages/charts/src/engine/",
  "minerva-design/packages/charts/src/engine/chart.ts",
  "minerva-design/packages/charts/src/engine/theme.ts",
  "minerva-design/packages/charts/src/engine/graph/",
  "minerva-design/packages/charts/src/engine/graph/force.ts",
  "minerva-design/packages/charts/src/engine/graph/dag.ts",
  "minerva-design/packages/charts/src/engine/graph/tree.ts",
  "minerva-design/packages/charts/package.json",
  "minerva-design/packages/react/",
  "minerva-design/packages/react/src/",
  "minerva-design/packages/react/src/Button.tsx",
  "minerva-design/packages/react/src/Button.module.scss",
  "minerva-design/packages/react/src/Tree.tsx",
  "minerva-design/packages/react/package.json",
  "minerva-design/apps/",
  "minerva-design/apps/docs/",
  "minerva-design/apps/docs/src/",
  "minerva-design/apps/docs/src/main.tsx",
  "minerva-design/apps/docs/src/styles.css",
  "minerva-design/apps/docs/README.md",
  "minerva-design/package.json",
  "minerva-design/README.md",
];

const kindOf = (path: string): Kind =>
  path.endsWith("/")
    ? "folder"
    : /\.(tsx?|js)$/.test(path)
      ? "code"
      : /\.(s?css)$/.test(path)
        ? "style"
        : path.endsWith(".json")
          ? "data"
          : "doc";

const parentOf = (path: string) => {
  const trimmed = path.replace(/\/$/, "");
  const cut = trimmed.lastIndexOf("/");
  return cut < 0 ? null : `${trimmed.slice(0, cut)}/`;
};

const KINDS: Kind[] = ["folder", "code", "style", "data", "doc"];

export default function FileTreeDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const ref = useRef<GraphChartHandle>(null);
  const nodes = useMemo(
    (): GraphNode[] =>
      FILES.map((path) => ({
        id: path,
        label: path.replace(/\/$/, "").split("/").pop(),
        group: kindOf(path),
        // deep folders start collapsed
        collapsed: path.endsWith("/") && path.split("/").length > 4,
      })),
    [],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      FILES.filter((path) => parentOf(path)).map((path) => ({
        source: parentOf(path)!,
        target: path,
      })),
    [],
  );
  const groups = useMemo(
    () => KINDS.map((id) => ({ id, name: t(`fileKinds.${id}`) })),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} wrap>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => ref.current?.expand()}
        >
          {t("expandAll")}
        </Button>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => ref.current?.collapse()}
        >
          {t("collapseAll")}
        </Button>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => ref.current?.fit()}
        >
          {t("fit")}
        </Button>
      </HStack>
      <TreeChart
        ref={ref}
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="tree"
        direction="LR"
        nodeSize={9}
        height={480}
        ariaLabel={t("filesAria")}
      />
    </div>
  );
}
