import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import {
  IoAccessibilityOutline,
  IoArrowForward,
  IoCheckmarkOutline,
  IoColorPaletteOutline,
  IoCopyOutline,
  IoCubeOutline,
  IoGlobeOutline,
  IoLayersOutline,
  IoLogoNpm,
} from "react-icons/io5";
import {
  SiAngular,
  SiHtml5,
  SiReact,
  SiSolid,
  SiSvelte,
  SiVuedotjs,
} from "react-icons/si";
import {
  Badge,
  Button,
  Input,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "@minerva/lib-core";
import { docPages } from "@/docs/registry";
import Logo from "@/site/Logo";
import styles from "./home.module.scss";

const INSTALL = {
  pnpm: "pnpm add @minerva/lib-core",
  npm: "npm install @minerva/lib-core",
  yarn: "yarn add @minerva/lib-core",
} as const;
type Manager = keyof typeof INSTALL;

const FRAMEWORKS = [
  { name: "React", Icon: SiReact },
  { name: "Vue", Icon: SiVuedotjs },
  { name: "Angular", Icon: SiAngular },
  { name: "Svelte", Icon: SiSvelte },
  { name: "Solid", Icon: SiSolid },
  { name: "HTML", Icon: SiHtml5 },
];

const QUICK_LINKS = ["installation", "theming", "button", "web-components"];

/** Copyable one-line install command */
const InstallCommand: React.FC<{ command: string }> = ({ command }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);
  return (
    <div className={styles.command}>
      <code>
        <span className={styles.prompt} aria-hidden>
          $
        </span>
        {command}
      </code>
      <button
        type="button"
        className={styles.copy}
        aria-label={copied ? t("doc.copied") : t("doc.copy")}
        onClick={() => {
          navigator.clipboard?.writeText(command).then(
            () => setCopied(true),
            () => {},
          );
        }}
      >
        {copied ? (
          <IoCheckmarkOutline aria-hidden />
        ) : (
          <IoCopyOutline aria-hidden />
        )}
      </button>
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

  const features = [
    {
      Icon: IoColorPaletteOutline,
      title: t("docs.overview.highlights.theming.title"),
      text: t("docs.overview.highlights.theming.text"),
    },
    {
      Icon: IoAccessibilityOutline,
      title: t("docs.overview.highlights.a11y.title"),
      text: t("docs.overview.highlights.a11y.text"),
    },
    {
      Icon: IoGlobeOutline,
      title: t("docs.overview.highlights.i18n.title"),
      text: t("docs.overview.highlights.i18n.text"),
    },
    {
      Icon: IoCubeOutline,
      title: t("docs.web-components.title"),
      text: t("home.wcFeature"),
    },
    {
      Icon: IoLayersOutline,
      title: t("docs.overview.highlights.typescript.title"),
      text: t("docs.overview.highlights.typescript.text"),
    },
    {
      Icon: IoLogoNpm,
      title: t("docs.overview.highlights.modules.title"),
      text: t("docs.overview.highlights.modules.text"),
    },
  ];

  return (
    <div className={styles.home}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroGrid} aria-hidden />
        <p className={styles.badge}>
          <span className={styles.badgeDot} aria-hidden />
          {t("home.badge")}
        </p>
        <h1 id="home-title" className={styles.title}>
          {t("home.title")}
        </h1>
        <p className={styles.subtitle}>{t("home.subtitle")}</p>
        <div className={styles.ctas}>
          <Link to="/installation" className={styles.ctaPrimary}>
            {t("home.getStarted")}
            <IoArrowForward aria-hidden />
          </Link>
          <Link to="/button" className={styles.ctaSecondary}>
            {t("home.browse")}
          </Link>
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
              <InstallCommand command={INSTALL[m]} />
            </TabPanel>
          ))}
        </Tabs>
      </section>

      {/* Live components, rendered with the library's own theme */}
      <section className={styles.showcase} aria-label="Minerva UI">
        <div className={styles.window}>
          <div className={styles.windowBar} aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <div className={styles.windowBody} data-demo-preview>
            <div className={styles.showcaseRow}>
              <Button color="primary">Deploy</Button>
              <Button variant="outline">Preview</Button>
              <Button variant="ghost">Cancel</Button>
              <Badge color="success" variant="subtle">
                Ready
              </Badge>
            </div>
            <div className={styles.showcaseRow}>
              <Input
                aria-label="Project name"
                placeholder="my-minerva-app"
                className={styles.showcaseInput}
              />
              <Switch label="Dark mode ready" defaultChecked />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="home-features">
        <h2 id="home-features" className={styles.sectionTitle}>
          {t("home.featuresTitle")}
        </h2>
        <ul className={styles.features}>
          {features.map(({ Icon, title, text }) => (
            <li key={title} className={styles.feature}>
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
          {FRAMEWORKS.map(({ name, Icon }) => (
            <li key={name}>
              <Icon aria-hidden />
              <span>{name}</span>
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
