import { Button } from "minerva-design";
import React, { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoChevronDown } from "react-icons/io5";
import CodeBlock from "@layout/CodeBlock";
import { scrollToHeading } from "@/site/toc";
import styles from "./docs.module.scss";

export interface DemoBlockProps {
  /** Anchor id */
  id: string;
  title: string;
  description?: React.ReactNode;
  /** The live demo */
  children: React.ReactNode;
  /** Exact source of the demo file (imported with `?raw`) */
  source: string;
  language?: string;
}

/**
 * A live example followed by its exact, copyable source code. The preview is
 * an isolated surface (`data-demo-preview`): it uses the library theme's own
 * background and no docs typography rule reaches inside it, so components
 * render exactly as in an app.
 */
const DemoBlock: React.FC<DemoBlockProps> = ({
  id,
  title,
  description,
  children,
  source,
  language = "tsx",
}) => {
  const { t } = useTranslation();
  const [showCode, setShowCode] = useState(true);
  const codeId = useId();
  const titleId = `${id}-title`;

  return (
    <section className={styles.demo} id={id} aria-labelledby={titleId}>
      <h3 id={titleId} className={styles.demoTitle}>
        <a
          href={`#${titleId}`}
          className={styles.anchor}
          onClick={(e) => {
            e.preventDefault();
            scrollToHeading(titleId);
          }}
        >
          {title}
        </a>
      </h3>
      {description && <p className={styles.demoDescription}>{description}</p>}
      <div className={styles.demoFrame}>
        <div className={styles.demoPreview} data-demo-preview data-toc-ignore>
          {children}
        </div>
        <div className={styles.demoToolbar}>
          <Button
            variant="ghost"
            color="neutral"
            size="small"
            type="button"
            className={styles.toggleCode}
            aria-expanded={showCode}
            aria-controls={codeId}
            onClick={() => setShowCode((v) => !v)}
          >
            {showCode ? t("doc.hideCode") : t("doc.showCode")}
            <IoChevronDown
              aria-hidden
              className={styles.toggleIcon}
              data-open={showCode || undefined}
            />
          </Button>
        </div>
        <div id={codeId} hidden={!showCode} className={styles.demoCode}>
          <CodeBlock code={source} language={language} flush />
        </div>
      </div>
    </section>
  );
};

export default DemoBlock;
