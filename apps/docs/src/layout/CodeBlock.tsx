import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoCheckmarkOutline, IoCopyOutline } from "react-icons/io5";
import {
  Button,
  CodeBlock as LibraryCodeBlock,
  Tabs,
  TabList,
  Tab,
  TabPanel,
} from "minerva-design";
import styles from "@styles/layout/code-block.module.scss";
import { highlight } from "./prism";

export interface CodeTab {
  /** Tab label, e.g. "pnpm" or a file name */
  label: string;
  code: string;
  language?: string;
}

export interface CodeBlockProps {
  /** Source (ignored when `tabs` is set) */
  code?: string;
  /** Prism language id or alias: tsx, typescript, bash, json, scss, html… */
  language?: string;
  /** File name (or label) shown in the header instead of the language */
  title?: string;
  /** Borderless, for code embedded in another frame (demo blocks) */
  flush?: boolean;
  /** Variants shown as tabs in the header (package managers, files…) */
  tabs?: CodeTab[];
}

const formatCode = (code: string) => code.replace(/^\n+|\s+$/g, "");

/** Display names of the language badge */
const LANGUAGE_LABELS: Record<string, string> = {
  tsx: "TSX",
  ts: "TypeScript",
  typescript: "TypeScript",
  js: "JavaScript",
  jsx: "JSX",
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  json: "JSON",
  bash: "Terminal",
  sh: "Terminal",
  shell: "Terminal",
  yaml: "YAML",
};

/**
 * Syntax-highlighted code with a header (file name / language, or tabs) and
 * a copy button.
 */
const CodeBlock: React.FC<CodeBlockProps> = ({
  code = "",
  language: languageProp = "tsx",
  title,
  flush = false,
  tabs,
}) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const codeRef = useRef<HTMLPreElement>(null);
  const tab = tabs?.[Math.min(tabIndex, tabs.length - 1)];
  const language = tab?.language ?? languageProp;
  const source = formatCode(tab?.code ?? code);
  // Highlighted HTML, tagged with what it was computed for so a stale result
  // is never shown after `code` / `language` change.
  const [highlighted, setHighlighted] = useState<{
    key: string;
    html: string;
  }>();
  const key = `${language}\n${source}`;
  const html = highlighted?.key === key ? highlighted.html : undefined;

  useEffect(() => {
    let cancelled = false;
    highlight(source, language)
      .then((result) => {
        if (!cancelled && result !== undefined) {
          setHighlighted({ key: `${language}\n${source}`, html: result });
        }
      })
      .catch(() => {
        // fall back to plain text
      });
    return () => {
      cancelled = true;
    };
  }, [source, language]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
    } catch {
      // clipboard may be unavailable (insecure context); nothing to do
    }
  };

  const label = title ?? LANGUAGE_LABELS[language] ?? language;

  // Prism decorates the public CodeBlock ref; its text and region semantics
  // remain the library's implementation. Only trusted highlighter output is HTML.
  useLayoutEffect(() => {
    const code = codeRef.current?.querySelector("code");
    if (!code) return;
    code.className = `language-${language}`;
    if (html === undefined) code.textContent = source;
    else code.innerHTML = html;
  }, [source, language, html]);

  const region = (
    <LibraryCodeBlock
      ref={codeRef}
      wrap={false}
      maxHeight="none"
      className={`${styles.pre} language-${language}`}
      aria-label={t("doc.codeRegion", { language: label })}
    >
      {source}
    </LibraryCodeBlock>
  );
  const content = (
    <>
      <div className={styles.header}>
        {tabs ? (
          <TabList className={styles.tabs} aria-label={title ?? label}>
            {tabs.map((item, index) => (
              <Tab
                key={item.label}
                value={String(index)}
                className={styles.tab}
              >
                {item.label}
              </Tab>
            ))}
          </TabList>
        ) : (
          <span className={styles.title} data-filename={!!title || undefined}>
            {label}
          </span>
        )}
        <Button
          variant="ghost"
          color="neutral"
          size="small"
          type="button"
          className={styles.copyButton}
          onClick={handleCopy}
          aria-label={copied ? t("doc.copied") : t("doc.copy")}
          title={copied ? t("doc.copied") : t("doc.copy")}
          data-copied={copied || undefined}
        >
          {copied ? (
            <IoCheckmarkOutline className={styles.icon} aria-hidden />
          ) : (
            <IoCopyOutline className={styles.icon} aria-hidden />
          )}
        </Button>
        <span className="sr-only" aria-live="polite">
          {copied ? t("doc.copied") : ""}
        </span>
      </div>
      {tabs ? (
        <TabPanel value={String(tabIndex)} style={{ padding: 0 }}>
          {region}
        </TabPanel>
      ) : (
        region
      )}
    </>
  );
  return tabs ? (
    <Tabs
      className={styles.codeBlock}
      data-flush={flush || undefined}
      value={String(tabIndex)}
      onChange={(value) => setTabIndex(Number(value))}
    >
      {content}
    </Tabs>
  ) : (
    <div className={styles.codeBlock} data-flush={flush || undefined}>
      {content}
    </div>
  );
};

export default CodeBlock;
