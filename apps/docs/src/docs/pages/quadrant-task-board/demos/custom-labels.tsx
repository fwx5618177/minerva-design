import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { QuadrantTaskBoard } from "minerva-design";
import type { QuadrantPoint } from "minerva-design/charts";

// A product roadmap: effort on x, impact on y. `labels` renames the
// buttons and panels; every change is counted. Sample features keep a
// translation key until they are renamed.
type Feature = QuadrantPoint & { key?: string };
const initial: Feature[] = [
  { key: "darkMode", x: 2.5, y: 7.5 },
  { key: "sso", x: 7.5, y: 8.5 },
  { key: "csvExport", x: 3, y: 3 },
  { key: "rewriteBilling", x: 8.5, y: 3.5 },
];

export default function CustomLabelsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-task-board.data.roadmap",
  });
  const [items, setItems] = useState(initial);
  const [changes, setChanges] = useState(0);
  const points = useMemo(
    () =>
      items.map((item) =>
        item.key ? { ...item, label: t(`features.${item.key}`) } : item,
      ),
    [items, t],
  );
  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantTaskBoard
        points={points}
        // a renamed sample feature drops its translation key
        onPointsChange={(next) => {
          setItems(
            next.map((point) => {
              const item = point as Feature;
              return item.key && item.label !== t(`features.${item.key}`)
                ? { ...item, key: undefined }
                : item;
            }),
          );
          setChanges((n) => n + 1);
        }}
        labels={{
          add: t("add"),
          edit: t("edit"),
          delete: t("delete"),
          name: t("name"),
          // {name} is replaced by the board, not by i18next
          deleteConfirm: t("deleteConfirm"),
        }}
        quadrants={{
          topLeft: { label: t("quickWins"), badge: "1" },
          topRight: { label: t("bigBets"), badge: "2" },
          bottomLeft: { label: t("fillIns"), badge: "3" },
          bottomRight: { label: t("moneyPits"), badge: "4" },
        }}
        xLabel={t("effort")}
        yLabel={t("impact")}
        height={360}
        ariaLabel={t("aria")}
      />
      <small style={{ color: "var(--text-secondary-color)" }}>
        {t("summary", { features: items.length, changes })}
      </small>
    </div>
  );
}
