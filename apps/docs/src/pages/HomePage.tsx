import { FrameworkIcon } from "@/site/FrameworkIcon";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Trans, useTranslation } from "react-i18next";
import { IoArrowForward } from "react-icons/io5";
import { Tab, TabList, TabPanel, Tabs, Tag, TextLink } from "minerva-design";
import { docPages } from "@/docs/registry";
import { LATEST_VERSION } from "@/docs/releases";
import CodeBlock from "@layout/CodeBlock";
import styles from "./home.module.scss";
import PromoFilm from "./PromoFilm";
import ComponentPlayground from "./examples/ComponentPlayground";
import {
  frameworkBrands,
  frameworkStyle,
  nativeFrameworks,
  wcFrameworks,
} from "@/site/frameworkBranding";

const INSTALL = {
  pnpm: "pnpm add minerva-design",
  npm: "npm install minerva-design",
  yarn: "yarn add minerva-design",
} as const;
type Manager = keyof typeof INSTALL;

/** Feature list: strings under `home.features.<key>` (common.json) */
const FEATURES = [
  "themes",
  "a11y",
  "i18n",
  "webComponents",
  "typescript",
  "modules",
] as const;

const QUICK_LINKS = ["installation", "theming", "button", "web-components"];

/** Framework guides, grouped by native renderers and Web Component adapters */
const FrameworkGuides: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div
      className={styles.support}
      role="group"
      aria-label={t("home.support.label")}
    >
      {[
        { label: t("home.support.native"), ids: nativeFrameworks },
        { label: t("home.support.webComponents"), ids: wcFrameworks },
      ].map(({ label, ids }) => (
        <div className={styles.supportGroup} key={label}>
          <span className={styles.supportLabel}>{label}</span>
          <ul className={styles.frameworks}>
            {ids.map((id) => (
              <li key={id} style={frameworkStyle(id)}>
                <TextLink
                  asChild
                  variant="action"
                  className={styles.frameworkLink}
                >
                  <Link to={`/${frameworkBrands[id].guide}`}>
                    <FrameworkIcon id={id} size={24} />
                    <span>{frameworkBrands[id].name}</span>
                  </Link>
                </TextLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

/** Landing page: hero with install command, live playground, film, details */
const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [manager, setManager] = useState<Manager>("pnpm");

  useEffect(() => {
    document.title = "Minerva UI";
  }, []);

  return (
    <div className={styles.home}>
      <section className={styles.hero} aria-labelledby="home-title">
        {/* newest version (the upcoming one while changesets are pending) */}
        <Link to="/changelog" className={styles.release}>
          <Tag size="small" shape="circle" variant="solid">
            v{LATEST_VERSION}
          </Tag>
          <span>{t("docs.changelog.title")}</span>
          <IoArrowForward aria-hidden />
        </Link>
        <h1 id="home-title" className={styles.title}>
          {t("home.title")}
        </h1>
        <p className={styles.subtitle}>{t("home.subtitle")}</p>
        <div className={styles.ctas}>
          <TextLink asChild variant="action">
            <Link to="/installation" className={styles.ctaPrimary}>
              {t("home.getStarted")}
              <IoArrowForward aria-hidden />
            </Link>
          </TextLink>
          <TextLink asChild variant="action">
            <Link to="/button" className={styles.ctaSecondary}>
              {t("home.browse")}
            </Link>
          </TextLink>
        </div>

        <Tabs
          value={manager}
          onChange={(value) => setManager(value as Manager)}
          variant="soft"
          className={styles.install}
        >
          <TabList aria-label={t("home.installLabel")}>
            {(Object.keys(INSTALL) as Manager[]).map((m) => (
              <Tab key={m} value={m}>
                {m}
              </Tab>
            ))}
          </TabList>
          {(Object.keys(INSTALL) as Manager[]).map((m) => (
            <TabPanel key={m} value={m}>
              <CodeBlock code={INSTALL[m]} language="bash" />
            </TabPanel>
          ))}
        </Tabs>
      </section>

      {/* Live components, rendered with the library's own theme */}
      <section
        className={styles.showcase}
        aria-label={t("home.showcase.label")}
      >
        <ComponentPlayground />
      </section>

      <PromoFilm />

      <section className={styles.section} aria-labelledby="home-frameworks">
        <h2 id="home-frameworks" className={styles.sectionTitle}>
          {t("home.frameworksTitle")}
        </h2>
        <p className={styles.sectionText}>
          <Trans
            i18nKey="home.frameworksText"
            components={{ matrix: <Link to="/platform-support" /> }}
          />
        </p>
        <FrameworkGuides />
      </section>

      <section className={styles.section} aria-labelledby="home-features">
        <h2 id="home-features" className={styles.sectionTitle}>
          {t("home.featuresTitle")}
        </h2>
        <ul className={styles.features}>
          {FEATURES.map((key) => (
            <li key={key} className={styles.feature}>
              <h3>{t(`home.features.${key}.title`)}</h3>
              <p>{t(`home.features.${key}.text`)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="home-start">
        <h2 id="home-start" className={styles.sectionTitle}>
          {t("home.quickLinksTitle")}
        </h2>
        <p className={styles.sectionText}>
          {t("home.componentsCount", { count: docPages.length })}
        </p>
        <ul className={styles.quickLinks}>
          {QUICK_LINKS.map((id) => (
            <li key={id}>
              <Link to={`/${id}`} className={styles.quickLink}>
                <span className={styles.quickTitle}>
                  {t(`docs.${id}.title`)}
                  <IoArrowForward aria-hidden />
                </span>
                <span className={styles.quickText}>
                  {t(`docs.${id}.description`)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
