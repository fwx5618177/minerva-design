import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LoadingState, Table, Tag, type TableColumn } from "minerva-design";
import type { ChartRendererKind } from "minerva-design/charts";
import {
  autoPick,
  probeBackends,
  type BackendSupport,
  type BackendsSupport,
} from "../../../renderer/support";
import { probeDetails, type DetailsByBackend } from "../bench/detect";
import { useBenchFormat } from "../bench/format";
import { BACKENDS } from "../bench/score";
import styles from "../bench/bench.module.scss";

interface Row {
  kind: ChartRendererKind;
  support: BackendSupport;
}

const TAG_COLOR = {
  hardware: "success",
  software: "warning",
  missing: "neutral",
} as const;

export default function EnvironmentDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-renderers.data",
  });
  const text = useBenchFormat();
  const [support, setSupport] = useState<BackendsSupport | null>(null);
  const [details, setDetails] = useState<DetailsByBackend | null>(null);

  useEffect(() => {
    let cancelled = false;
    void Promise.all([probeBackends(), probeDetails()]).then(
      ([probed, found]) => {
        if (cancelled) return;
        setSupport(probed);
        setDetails(found);
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  if (!support || !details) {
    return (
      <LoadingState
        size="small"
        style={{ height: 240 }}
        label={t("env.probing")}
      />
    );
  }

  const auto = autoPick(support);
  const rows: Row[] = BACKENDS.map((kind) => ({
    kind,
    support: support[kind],
  }));
  const columns: TableColumn<Row>[] = [
    {
      key: "backend",
      header: t("env.backend"),
      render: (row) => (
        <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
          <strong>{text.renderer(row.kind)}</strong>
          {row.kind === auto && (
            <Tag size="small" color="primary" variant="solid">
              {t("env.autoTag")}
            </Tag>
          )}
        </span>
      ),
    },
    {
      key: "status",
      header: t("env.status"),
      render: (row) => (
        <Tag size="small" color={TAG_COLOR[row.support]}>
          {row.kind === "canvas2d"
            ? t("env.cpu")
            : t(`env.support.${row.support}`)}
        </Tag>
      ),
    },
    {
      key: "device",
      header: t("env.device"),
      render: (row) => (
        <span className={styles.wrap}>
          {row.kind === "canvas2d"
            ? t("env.cpuDevice")
            : (details[row.kind]?.device ?? "–")}
        </span>
      ),
    },
    {
      key: "version",
      header: t("env.version"),
      render: (row) => (
        <span className={styles.wrap}>{details[row.kind]?.version ?? "–"}</span>
      ),
    },
    {
      key: "limits",
      header: t("env.limits"),
      render: (row) => {
        const found = details[row.kind];
        if (!found) return "–";
        const parts: string[] = [];
        if (found.maxTexture)
          parts.push(
            t("env.maxTexture", { value: text.count(found.maxTexture) }),
          );
        if (found.maxBuffer)
          parts.push(
            t("env.maxBuffer", { value: text.gigabytes(found.maxBuffer) }),
          );
        if (found.instancing === false) parts.push(t("env.noInstancing"));
        return parts.length ? parts.join(" · ") : "–";
      },
    },
  ];

  const secure = typeof isSecureContext === "boolean" ? isSecureContext : false;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <dl className={styles.cards}>
        <div className={`${styles.card} ${styles.cardBest}`}>
          <dt>{t("env.autoPick")}</dt>
          <dd>{text.renderer(auto)}</dd>
          <small>{t(`env.autoWhy.${auto}`)}</small>
        </div>
        <div className={styles.card}>
          <dt>{t("env.secure")}</dt>
          <dd>{secure ? t("env.yes") : t("env.no")}</dd>
          <small>{t("env.secureNote")}</small>
        </div>
        <div className={styles.card}>
          <dt>{t("env.dpr")}</dt>
          <dd>{text.decimal(window.devicePixelRatio || 1)}</dd>
          <small>{t("env.dprNote")}</small>
        </div>
        <div className={styles.card}>
          <dt>{t("env.threads")}</dt>
          <dd>{navigator.hardwareConcurrency || "–"}</dd>
          <small>{t("env.threadsNote")}</small>
        </div>
      </dl>
      <Table
        aria-label={t("env.tableAria")}
        size="small"
        columns={columns}
        data={rows}
        rowKey={(row) => row.kind}
      />
      <p className={styles.hint} style={{ margin: 0, fontSize: 13 }}>
        {t("env.note")}
      </p>
    </div>
  );
}
