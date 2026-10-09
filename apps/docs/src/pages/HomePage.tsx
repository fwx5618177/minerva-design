import { FrameworkIcon } from "@/site/FrameworkIcon";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import {
  IoAccessibilityOutline,
  IoArrowForward,
  IoColorPaletteOutline,
  IoCubeOutline,
  IoGlobeOutline,
  IoLayersOutline,
  IoLogoNpm,
} from "react-icons/io5";
import { Tab, TabList, TabPanel, Tabs, Tag, TextLink } from "minerva-design";
import { docPages } from "@/docs/registry";
import Logo from "@/site/Logo";
import CodeBlock from "@layout/CodeBlock";
import styles from "./home.module.scss";
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

const FRAMEWORKS = [...nativeFrameworks, ...wcFrameworks];

/** Feature cards: strings under `home.features.<key>` (common.json) */
const FEATURES = [
  { key: "themes", Icon: IoColorPaletteOutline },
  { key: "a11y", Icon: IoAccessibilityOutline },
  { key: "i18n", Icon: IoGlobeOutline },
  { key: "webComponents", Icon: IoCubeOutline },
  { key: "typescript", Icon: IoLayersOutline },
  { key: "modules", Icon: IoLogoNpm },
] as const;

const QUICK_LINKS = ["installation", "theming", "button", "web-components"];

/** Hero pills distinguish native renderers from Web Component adapters */
const FrameworkSupport: React.FC = () => {
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
          <ul className={styles.pills}>
            {ids.map((id) => (
              <li key={id} style={frameworkStyle(id)}>
                <Tag
                  variant="outline"
                  shape="circle"
                  className={styles.frameworkTag}
                  icon={<FrameworkIcon id={id} />}
                >
                  {frameworkBrands[id].name}
                </Tag>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

/** Landing page: hero, install command, live preview, features, frameworks */
const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [manager, setManager] = useState<Manager>("pnpm");

  useEffect(() => {
    document.title = "Minerva UI";
  }, []);

  const features = FEATURES.map(({ key, Icon }) => ({
    key,
    Icon,
    title: t(`home.features.${key}.title`),
    text: t(`home.features.${key}.text`),
  }));

  return (
    <div className={styles.home}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroGrid} aria-hidden />
        <FrameworkSupport />
        <h1 id="home-title" className={styles.title}>
          {t("home.title")}
        </h1>
        <p className={styles.subtitle}>{t("home.subtitle")}</p>
        <div className={styles.ctas}>
          <TextLink asChild variant="action">
            <Link to="/installation">
              {t("home.getStarted")}
              <IoArrowForward aria-hidden />
            </Link>
          </TextLink>
          <TextLink asChild variant="action">
            <Link to="/button">{t("home.browse")}</Link>
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

      <section className={styles.section} aria-labelledby="home-features">
        <h2 id="home-features" className={styles.sectionTitle}>
          {t("home.featuresTitle")}
        </h2>
        <ul className={styles.features}>
          {features.map(({ key, Icon, title, text }) => (
            <li key={key} className={styles.feature}>
              <Icon aria-hidden className={styles.featureIcon} />
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="home-frameworks">
        <h2 id="home-frameworks" className={styles.sectionTitle}>
          {t("home.frameworksTitle")}
        </h2>
        <p className={styles.sectionText}>{t("home.frameworksText")}</p>
        <ul className={styles.frameworks}>
          {FRAMEWORKS.map((id) => (
            <li key={id} style={frameworkStyle(id)}>
              <TextLink
                asChild
                variant="action"
                className={styles.frameworkLink}
              >
                <Link to={`/${frameworkBrands[id].guide}`}>
                  <FrameworkIcon id={id} size={30} />
                  <span>{frameworkBrands[id].name}</span>
                </Link>
              </TextLink>
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

      <div className={styles.closing} aria-hidden>
        <Logo size={28} />
      </div>
    </div>
  );
};

export default HomePage;
