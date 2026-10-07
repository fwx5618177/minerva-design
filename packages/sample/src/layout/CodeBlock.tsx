import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoCheckmarkOutline, IoCopyOutline } from "react-icons/io5";
import "prismjs/themes/prism-tomorrow.css";
import styles from "@styles/layout/code-block.module.scss";
import { highlight } from "./prism";

interface CodeBlockProps {
  code: string;
  /** Prism language id or alias: tsx, typescript, bash, json, scss, html… */
  language?: string;
  /** Optional label shown in the header instead of the language */
  title?: string;
}

const formatCode = (code: string) => code.replace(/^\n+|\s+$/g, "");

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "tsx",
  title,
}) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const source = formatCode(code);
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

  return (
    <div className={styles.codeBlock}>
      <div className={styles.header}>
        <span className={styles.language}>{title ?? language}</span>
        <button
          type="button"
          className={styles.copyButton}
          onClick={handleCopy}
          aria-label={copied ? t("doc.copied") : t("doc.copy")}
          title={copied ? t("doc.copied") : t("doc.copy")}
        >
          {copied ? (
            <IoCheckmarkOutline className={styles.icon} aria-hidden />
          ) : (
            <IoCopyOutline className={styles.icon} aria-hidden />
          )}
        </button>
        <span className={styles.srOnly} aria-live="polite">
          {copied ? t("doc.copied") : ""}
        </span>
      </div>
      <div className={styles.codeWrapper}>
        <pre
          className={`${styles.pre} language-${language}`}
          tabIndex={0}
          role="region"
          aria-label={t("doc.codeRegion", { language })}
        >
          {html !== undefined ? (
            <code
              className={`language-${language}`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <code className={`language-${language}`}>{source}</code>
          )}
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
