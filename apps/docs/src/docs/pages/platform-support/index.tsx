import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Radio, RadioGroup, Tag, type TagProps } from "minerva-design";
import {
  PLATFORMS,
  SUPPORT_STATUSES,
  contractsForTrack,
  supportSummary,
  type Platform,
  type SupportStatus,
  type Track,
} from "@contracts";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";

/** Badge color of each support status */
const STATUS_COLOR: Record<SupportStatus, TagProps["color"]> = {
  stable: "success",
  beta: "info",
  planned: "neutral",
  "n/a": "neutral",
};

/** Locale key of each status (`n/a` is not a valid key segment) */
const STATUS_KEY: Record<SupportStatus, string> = {
  stable: "stable",
  beta: "beta",
  planned: "planned",
  "n/a": "na",
};

type TrackFilter = "all" | Track;
const FILTERS: TrackFilter[] = ["all", "toB", "toC"];

const StatusTag: React.FC<{ status: SupportStatus; label: string }> = ({
  status,
  label,
}) => (
  <Tag
    size="small"
    color={STATUS_COLOR[status]}
    variant={status === "n/a" ? "outline" : "subtle"}
  >
    {label}
  </Tag>
);

const PlatformSupportDoc: React.FC = () => {
  const { t } = useTranslation();
  const k = (key: string, options?: Record<string, unknown>) =>
    t(`docs.platform-support.${key}`, options);
  const [filter, setFilter] = useState<TrackFilter>("all");
  const contracts = useMemo(
    () => contractsForTrack(filter === "all" ? undefined : filter),
    [filter],
  );
  const platformName = (platform: Platform) => k(`platforms.${platform}.name`);
  const statusLabel = (status: SupportStatus) =>
    k(`status.${STATUS_KEY[status]}`);

  const intro = (
    <section className={styles.section} aria-labelledby="platforms">
      <h2 id="platforms">{k("platformsTitle")}</h2>
      <p className={styles.prose}>{k("platformsText")}</p>
      <div
        className={styles.tableWrapper}
        tabIndex={0}
        role="region"
        aria-label={k("platformsTitle")}
      >
        <table className={styles.propsTable}>
          <thead>
            <tr>
              <th scope="col">{k("platform")}</th>
              <th scope="col">{t("doc.description")}</th>
              <th scope="col">{k("components")}</th>
            </tr>
          </thead>
          <tbody>
            {PLATFORMS.map((platform) => {
              const summary = supportSummary(platform);
              return (
                <tr key={platform}>
                  <th scope="row">{platformName(platform)}</th>
                  <td>{k(`platforms.${platform}.text`)}</td>
                  <td>
                    {SUPPORT_STATUSES.filter((s) => summary[s] > 0).map(
                      (status) => (
                        <span key={status} className={styles.prose}>
                          <StatusTag
                            status={status}
                            label={`${statusLabel(status)} · ${summary[status]}`}
                          />{" "}
                        </span>
                      ),
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ul className={styles.prose}>
        {SUPPORT_STATUSES.map((status) => (
          <li key={status}>
            <StatusTag status={status} label={statusLabel(status)} />{" "}
            {k(`legend.${STATUS_KEY[status]}`)}
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <DocPage id="platform-support" intro={intro}>
      <section className={styles.section} aria-labelledby="matrix">
        <h2 id="matrix">{k("matrixTitle")}</h2>
        <p className={styles.prose}>{k("matrixText")}</p>
        <RadioGroup
          aria-label={k("track.label")}
          direction="horizontal"
          value={filter}
          onChange={(value) => setFilter(value as TrackFilter)}
        >
          {FILTERS.map((value) => (
            <Radio key={value} value={value} label={k(`track.${value}`)} />
          ))}
        </RadioGroup>
        <p className={styles.prose} aria-live="polite">
          {k("count", { count: contracts.length })}
        </p>
        <div
          className={styles.tableWrapper}
          tabIndex={0}
          role="region"
          aria-label={k("matrixTitle")}
        >
          <table className={styles.propsTable}>
            <thead>
              <tr>
                <th scope="col">{k("component")}</th>
                <th scope="col">{k("tracks")}</th>
                {PLATFORMS.map((platform) => (
                  <th scope="col" key={platform}>
                    {platformName(platform)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => (
                <tr key={contract.name}>
                  <th scope="row">
                    {contract.docs ? (
                      <Link to={`/${contract.docs}`}>
                        <code className={styles.propName}>{contract.name}</code>
                      </Link>
                    ) : (
                      <code className={styles.propName}>{contract.name}</code>
                    )}
                    {contract.tag && (
                      <>
                        <br />
                        <code>{`<${contract.tag}>`}</code>
                      </>
                    )}
                  </th>
                  <td>
                    {contract.tracks
                      .map((track) => k(`track.${track}`))
                      .join(", ")}
                  </td>
                  {PLATFORMS.map((platform) => {
                    const { status } = contract.platforms[platform];
                    return (
                      <td
                        key={platform}
                        title={
                          status === "n/a"
                            ? k(
                                `notApplicable.${platform === "react" ? "react" : "wc"}`,
                              )
                            : undefined
                        }
                      >
                        <StatusTag
                          status={status}
                          label={statusLabel(status)}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="contracts">
        <h2 id="contracts">{k("contractsTitle")}</h2>
        <p className={styles.prose}>{k("contractsText")}</p>
        <p className={styles.prose}>{k("testsText")}</p>
      </section>
    </DocPage>
  );
};

export default PlatformSupportDoc;
