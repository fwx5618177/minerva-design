import React from "react";
import { useTranslation } from "react-i18next";
import CodeBlock from "@layout/CodeBlock";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";

const REPO_URL = "https://github.com/fwx5618177/minerva";

const controlledCode = `import { useState } from "react";
import { Switch } from "@minerva/lib-core";

// Uncontrolled: the component keeps its own state
<Switch label="Wi-Fi" defaultChecked />;

// Controlled: you own the state and update it in onChange
function Controlled() {
  const [on, setOn] = useState(false);
  return <Switch label="Bluetooth" checked={on} onChange={setOn} />;
}`;

const passthroughCode = `import { Button, IconButton } from "@minerva/lib-core";
import { IoTrashOutline } from "react-icons/io5";

<Button className="my-button" style={{ minWidth: 120 }} type="submit">
  Save
</Button>;

// icon-only controls need an accessible name
<IconButton icon={<IoTrashOutline />} aria-label="Delete item" />;`;

const IntroductionDoc: React.FC = () => {
  const { t } = useTranslation();

  const principles = [
    {
      title: t("docs.introduction.principles.tokens.title"),
      text: t("docs.introduction.principles.tokens.text"),
    },
    {
      title: t("docs.introduction.principles.accessible.title"),
      text: t("docs.introduction.principles.accessible.text"),
    },
    {
      title: t("docs.introduction.principles.predictable.title"),
      text: t("docs.introduction.principles.predictable.text"),
    },
    {
      title: t("docs.introduction.principles.small.title"),
      text: t("docs.introduction.principles.small.text"),
    },
  ];

  const intro = (
    <>
      <section className={styles.section} aria-labelledby="principles">
        <h2 id="principles">{t("docs.introduction.principles.title")}</h2>
        <ul>
          {principles.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>: {item.text}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="reading">
        <h2 id="reading">{t("docs.introduction.reading.title")}</h2>
        <p className={styles.prose}>{t("docs.introduction.reading.text")}</p>
        <ul>
          <li>
            <strong>{t("doc.import")}</strong>:{" "}
            {t("docs.introduction.reading.import")}
          </li>
          <li>
            <strong>{t("doc.examples")}</strong>:{" "}
            {t("docs.introduction.reading.examples")}
          </li>
          <li>
            <strong>{t("doc.api")}</strong>:{" "}
            {t("docs.introduction.reading.api")}
          </li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="conventions">
        <h2 id="conventions">{t("docs.introduction.conventions.title")}</h2>
        <h3>{t("docs.introduction.conventions.controlled.title")}</h3>
        <p className={styles.prose}>
          {t("docs.introduction.conventions.controlled.text")}
        </p>
        <CodeBlock code={controlledCode} language="tsx" />
        <h3>{t("docs.introduction.conventions.passthrough.title")}</h3>
        <p className={styles.prose}>
          {t("docs.introduction.conventions.passthrough.text")}
        </p>
        <h3>{t("docs.introduction.conventions.aria.title")}</h3>
        <p className={styles.prose}>
          {t("docs.introduction.conventions.aria.text")}
        </p>
        <CodeBlock code={passthroughCode} language="tsx" />
      </section>

      <section className={styles.section} aria-labelledby="browser-support">
        <h2 id="browser-support">{t("docs.introduction.browsers.title")}</h2>
        <p className={styles.prose}>{t("docs.introduction.browsers.text")}</p>
      </section>

      <section className={styles.section} aria-labelledby="contributing">
        <h2 id="contributing">{t("docs.introduction.contributing.title")}</h2>
        <p className={styles.prose}>
          {t("docs.introduction.contributing.text")}{" "}
          <a href={REPO_URL} target="_blank" rel="noreferrer">
            github.com/fwx5618177/minerva
          </a>
        </p>
      </section>
    </>
  );

  return <DocPage id="introduction" intro={intro} />;
};

export default IntroductionDoc;
