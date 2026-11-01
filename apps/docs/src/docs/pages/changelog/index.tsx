import React from "react";
import { Tag } from "minerva-design";
import { useTranslation } from "react-i18next";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";
import { GITHUB_URL } from "@/site/constants";
import {
  parseBlocks,
  parseChangelog,
  parseInline,
  type ChangelogRelease,
  type Inline,
} from "../../changelog";
import { UPCOMING_RELEASE } from "../../releases";
import changelogSource from "../../../../../../packages/minerva-design/CHANGELOG.md?raw";
import css from "./changelog.module.scss";

/** Released versions, newest first (read at build time) */
const RELEASES = parseChangelog(changelogSource);

const NPM_URL = "https://www.npmjs.com/package/minerva-design/v/";

/** Heading id of a version (`1.11.0` → `v1-11-0`) */
const versionId = (version: string, prefix = "v") =>
  `${prefix}${version.replace(/\W+/g, "-")}`;

const renderInline = (nodes: Inline[]): React.ReactNode[] =>
  nodes.map((node, i) => {
    switch (node.type) {
      case "text":
        return <React.Fragment key={i}>{node.text}</React.Fragment>;
      case "code":
        return <code key={i}>{node.text}</code>;
      case "strong":
        return <strong key={i}>{renderInline(node.children)}</strong>;
      case "em":
        return <em key={i}>{renderInline(node.children)}</em>;
      case "link":
        return (
          <a key={i} href={node.href} target="_blank" rel="noreferrer">
            {renderInline(node.children)}
          </a>
        );
    }
  });

/** Lines of a paragraph (generated entries list one commit per line) */
const Lines: React.FC<{ lines: string[] }> = ({ lines }) =>
  lines.map((line, i) => (
    <React.Fragment key={i}>
      {i > 0 && <br />}
      {renderInline(parseInline(line))}
    </React.Fragment>
  ));

/** The Markdown of one entry */
const Notes: React.FC<{ text: string }> = ({ text }) => {
  const blocks = parseBlocks(text);
  if (blocks.length === 1 && blocks[0].type === "paragraph") {
    return <Lines lines={blocks[0].lines} />;
  }
  return blocks.map((block, i) => {
    if (block.type === "paragraph") {
      return (
        <p key={i}>
          <Lines lines={block.lines} />
        </p>
      );
    }
    if (block.type === "list") {
      return (
        <ul key={i}>
          {block.items.map((item, j) => (
            <li key={j}>{renderInline(parseInline(item))}</li>
          ))}
        </ul>
      );
    }
    return (
      <pre key={i} className={css.code}>
        <code>{block.text}</code>
      </pre>
    );
  });
};

interface ReleaseProps {
  release: ChangelogRelease;
  /** Heading id (table of contents, anchors) */
  id: string;
  /** Tag next to the version */
  badge?: React.ReactNode;
  /** Link to the version on npm (released versions) */
  published?: boolean;
}

/** One version: its heading, then its entries grouped by change type */
const Release: React.FC<ReleaseProps> = ({ release, id, badge, published }) => {
  const { t, i18n } = useTranslation();
  const k = (key: string, options?: Record<string, string>) =>
    t(`docs.changelog.${key}`, options);
  return (
    <section className={css.release} aria-labelledby={id}>
      <div className={css.releaseHeader}>
        <h3 id={id}>{release.version}</h3>
        {badge}
        {published && (
          <a
            className={css.npm}
            href={`${NPM_URL}${release.version}`}
            target="_blank"
            rel="noreferrer"
            aria-label={k("npmLabel", { version: release.version })}
          >
            {k("released.npm")}
          </a>
        )}
      </div>
      {release.groups.map((group) => (
        <React.Fragment key={group.title}>
          <h4 lang={group.type ? undefined : "en"}>
            {group.type ? k(`groups.${group.type}`) : group.title}
          </h4>
          {/* the notes stay in English, the source language */}
          <ul className={css.items} lang="en">
            {group.items.map((item, i) => (
              <li key={i}>
                <Notes text={item.text} />
                {item.hash && (
                  <a
                    className={css.hash}
                    href={`${GITHUB_URL}/commit/${item.hash}`}
                    target="_blank"
                    rel="noreferrer"
                    lang={i18n.language}
                    aria-label={k("commit", { hash: item.hash })}
                  >
                    {item.hash}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </React.Fragment>
      ))}
    </section>
  );
};

const ChangelogDoc: React.FC = () => {
  const { t } = useTranslation();
  const k = (key: string, options?: Record<string, string>) =>
    t(`docs.changelog.${key}`, options);

  return (
    <DocPage
      id="changelog"
      intro={<p className={styles.callout}>{k("intro")}</p>}
    >
      {UPCOMING_RELEASE && (
        <section
          className={styles.section}
          aria-labelledby="upcoming"
          data-testid="upcoming"
        >
          <h2 id="upcoming">{k("upcoming.title")}</h2>
          <p className={styles.prose}>
            {k("upcoming.text", { version: UPCOMING_RELEASE.version })}
          </p>
          <Release
            release={UPCOMING_RELEASE}
            id={versionId(UPCOMING_RELEASE.version, "next-")}
            badge={
              <Tag size="small" color="primary" variant="solid">
                {k("upcoming.badge")}
              </Tag>
            }
          />
        </section>
      )}

      <section className={styles.section} aria-labelledby="released">
        <h2 id="released">{k("released.title")}</h2>
        {RELEASES.map((release, i) => (
          <Release
            key={release.version}
            release={release}
            id={versionId(release.version)}
            published
            badge={
              // once changesets are pending, the newest release is the next one
              i === 0 && !UPCOMING_RELEASE ? (
                <Tag size="small" color="success">
                  {k("released.latest")}
                </Tag>
              ) : undefined
            }
          />
        ))}
      </section>
    </DocPage>
  );
};

export default ChangelogDoc;
