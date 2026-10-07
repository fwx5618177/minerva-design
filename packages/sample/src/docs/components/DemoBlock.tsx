import React, { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoCodeSlashOutline } from "react-icons/io5";
import CodeBlock from "@layout/CodeBlock";
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

/** A live example followed by its exact, copyable source code */
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

  return (
    <section className={styles.demo} id={id} aria-labelledby={`${id}-title`}>
      <header className={styles.demoHeader}>
        <h3 id={`${id}-title`}>
          <a
            href={`#${id}`}
            className={styles.anchor}
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById(id)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {title}
          </a>
        </h3>
        {description && <p className={styles.demoDescription}>{description}</p>}
      </header>
      <div className={styles.demoPreview}>{children}</div>
      <div className={styles.demoToolbar}>
        <button
          type="button"
          className={styles.toggleCode}
          aria-expanded={showCode}
          aria-controls={codeId}
          onClick={() => setShowCode((v) => !v)}
        >
          <IoCodeSlashOutline aria-hidden />
          {showCode ? t("doc.hideCode") : t("doc.showCode")}
        </button>
      </div>
      <div id={codeId} hidden={!showCode} className={styles.demoCode}>
        <CodeBlock code={source} language={language} />
      </div>
    </section>
  );
};

export default DemoBlock;
