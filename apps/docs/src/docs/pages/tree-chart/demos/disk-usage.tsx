import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  TreeChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Kind = "system" | "apps" | "media" | "documents" | "cache";
type Layout = "tree" | "radial";

const GB = 1e9;
const MB = 1e6;

// path, kind, size in bytes for files (folders add up their content)
const ENTRIES: [string, Kind, number?][] = [
  ["/", "system"],
  ["/System", "system", 14.2 * GB],
  ["/Applications", "apps"],
  ["/Applications/Xcode.app", "apps", 11.8 * GB],
  ["/Applications/Photoshop.app", "apps", 4.6 * GB],
  ["/Applications/Chrome.app", "apps", 1.3 * GB],
  ["/Applications/Slack.app", "apps", 540 * MB],
  ["/Applications/Spotify.app", "apps", 320 * MB],
  ["/Users", "documents"],
  ["/Users/alex", "documents"],
  ["/Users/alex/Movies", "media"],
  ["/Users/alex/Movies/trip-2025.mov", "media", 18.4 * GB],
  ["/Users/alex/Movies/screencasts", "media", 6.2 * GB],
  ["/Users/alex/Pictures", "media"],
  ["/Users/alex/Pictures/Photos Library", "media", 42.7 * GB],
  ["/Users/alex/Pictures/exports", "media", 3.1 * GB],
  ["/Users/alex/Music", "media", 9.4 * GB],
  ["/Users/alex/Documents", "documents"],
  ["/Users/alex/Documents/invoices", "documents", 210 * MB],
  ["/Users/alex/Documents/thesis", "documents", 1.7 * GB],
  ["/Users/alex/Documents/scans", "documents", 2.4 * GB],
  ["/Users/alex/Developer", "documents"],
  ["/Users/alex/Developer/node_modules", "cache", 7.9 * GB],
  ["/Users/alex/Developer/docker", "cache", 22.5 * GB],
  ["/Users/alex/Developer/repos", "documents", 5.3 * GB],
  ["/Users/alex/Library", "cache"],
  ["/Users/alex/Library/Caches", "cache", 8.8 * GB],
  ["/Users/alex/Library/Mail", "documents", 4.2 * GB],
  ["/Users/alex/Library/iOS Backups", "cache", 16.1 * GB],
];

const KINDS: Kind[] = ["system", "apps", "media", "documents", "cache"];
const parentOf = (path: string) =>
  path === "/" ? null : path.slice(0, path.lastIndexOf("/")) || "/";

/** Size of every entry, folders included */
const SIZES = (() => {
  const sizes = new Map<string, number>(ENTRIES.map(([path]) => [path, 0]));
  for (const [path, , bytes] of ENTRIES) {
    if (!bytes) continue;
    for (let at: string | null = path; at; at = parentOf(at)) {
      sizes.set(at, sizes.get(at)! + bytes);
    }
  }
  return sizes;
})();
const TOTAL = SIZES.get("/")!;

export default function DiskUsageDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const [layout, setLayout] = useState<Layout>("tree");
  const [current, setCurrent] = useState("/Users/alex/Pictures");

  const formatBytes = useMemo(() => {
    const units = ["byte", "kilobyte", "megabyte", "gigabyte"] as const;
    const formats = units.map(
      (unit) =>
        new Intl.NumberFormat(i18n.language, {
          style: "unit",
          unit,
          unitDisplay: "short",
          maximumFractionDigits: 1,
        }),
    );
    return (bytes: number) => {
      const step = Math.min(
        3,
        Math.max(0, Math.floor(Math.log10(Math.max(bytes, 1)) / 3)),
      );
      return formats[step].format(bytes / 1000 ** step);
    };
  }, [i18n.language]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );

  const nodes = useMemo(
    (): GraphNode[] =>
      ENTRIES.map(([path, kind]) => ({
        id: path,
        label: path === "/" ? t("diskRoot") : path.split("/").pop(),
        subtitle: formatBytes(SIZES.get(path)!),
        value: SIZES.get(path),
        group: kind,
        // big folders of the home directory start collapsed
        collapsed:
          path === "/Users/alex/Developer" || path === "/Users/alex/Library",
      })),
    [t, formatBytes],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      ENTRIES.filter(([path]) => parentOf(path)).map(([path]) => ({
        source: parentOf(path)!,
        target: path,
      })),
    [],
  );
  const groups = useMemo(
    () => KINDS.map((id) => ({ id, name: t(`diskKinds.${id}`) })),
    [t],
  );
  const size = SIZES.get(current)!;
  const parent = parentOf(current);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("diskLayout")}
        direction="horizontal"
        value={layout}
        onChange={(value) => setLayout(value as Layout)}
      >
        <Radio value="tree" label={t("diskLayouts.tree")} />
        <Radio value="radial" label={t("diskLayouts.radial")} />
      </RadioGroup>
      <TreeChart
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout={layout}
        direction="LR"
        nodeSize={[5, 22]}
        highlight="lineage"
        selected={[current]}
        interaction={{ select: false }}
        height={500}
        ariaLabel={t("diskAria")}
        onItemClick={(event) => {
          if (event.type === "node" && event.id) setCurrent(event.id);
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t(parent ? "diskShare" : "diskTotal", {
          name: current,
          size: formatBytes(size),
          share: percent.format(size / TOTAL),
          parentShare: parent
            ? percent.format(size / SIZES.get(parent)!)
            : undefined,
          parent,
        })}
      </output>
    </div>
  );
}
