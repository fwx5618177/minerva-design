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
  FormField,
  Input,
  Select,
  SelectItem,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "minerva-design";
import { docPages } from "@/docs/registry";
import Logo from "@/site/Logo";
import styles from "./home.module.scss";

const INSTALL = {
  pnpm: "pnpm add minerva-design",
  npm: "npm install minerva-design",
  yarn: "yarn add minerva-design",
} as const;
type Manager = keyof typeof INSTALL;

/** Frameworks served by the Web Components package (names are not translated) */
const WC_FRAMEWORKS = [
  { name: "Vue", Icon: SiVuedotjs },
  { name: "Angular", Icon: SiAngular },
  { name: "Svelte", Icon: SiSvelte },
  { name: "Solid", Icon: SiSolid },
  { name: "HTML", Icon: SiHtml5 },
];

const FRAMEWORKS = [{ name: "React", Icon: SiReact }, ...WC_FRAMEWORKS];

const BRANCHES = ["main", "develop", "feat/docs"] as const;
/** Simulated build time of the showcase's deploy panel */
const BUILD_MS = 1500;

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

/** Hero pills: React natively, every other stack through the Web Components */
const FrameworkSupport: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div
      className={styles.support}
      role="group"
      aria-label={t("home.support.label")}
    >
      <span className={styles.pill}>
        <SiReact aria-hidden />
        React
      </span>
      <span className={styles.supportDivider} aria-hidden />
      <span className={styles.supportLabel}>
        {t("home.support.webComponents")}
      </span>
      <ul className={styles.pills}>
        {WC_FRAMEWORKS.map(({ name, Icon }) => (
          <li key={name} className={styles.pill}>
            <Icon aria-hidden />
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

type DeployStatus = "ready" | "building" | "canceled";

const STATUS_COLOR = {
  ready: "success",
  building: "warning",
  canceled: "neutral",
} as const;

/** Live showcase: a small deploy panel built from real Minerva components */
const DeployPanel: React.FC = () => {
  const { t } = useTranslation();
  const [project, setProject] = useState("minerva-app");
  const [branch, setBranch] = useState<string>(BRANCHES[0]);
  const [production, setProduction] = useState(true);
  const [status, setStatus] = useState<DeployStatus>("ready");

  useEffect(() => {
    if (status !== "building") return;
    const timer = setTimeout(() => setStatus("ready"), BUILD_MS);
    return () => clearTimeout(timer);
  }, [status]);

  const building = status === "building";
  const target = production
    ? t("home.showcase.production")
    : t("home.showcase.preview");

  return (
    <div className={styles.window}>
      <div className={styles.windowBar}>
        <span className={styles.windowDots} aria-hidden>
          <span />
          <span />
          <span />
        </span>
        <span className={styles.windowTitle}>{t("home.showcase.title")}</span>
      </div>
      <div className={styles.windowBody} data-demo-preview>
        <div className={styles.panelHeader}>
          <div className={styles.panelHeading}>
            <span className={styles.panelProject}>{project || "—"}</span>
            <span className={styles.panelMeta}>
              {branch} · {target}
            </span>
          </div>
          <Badge
            color={STATUS_COLOR[status]}
            variant="subtle"
            role="status"
            aria-live="polite"
          >
            {t(`home.showcase.status.${status}`)}
          </Badge>
        </div>
        <div className={styles.panelFields}>
          <FormField label={t("home.showcase.project")}>
            <Input
              value={project}
              onChange={(event) => setProject(event.target.value)}
              disabled={building}
            />
          </FormField>
          <FormField label={t("home.showcase.branch")}>
            <Select value={branch} onChange={setBranch} disabled={building}>
              {BRANCHES.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </Select>
          </FormField>
        </div>
        <div className={styles.panelFooter}>
          <Switch
            label={t("home.showcase.production")}
            checked={production}
            onChange={(checked) => setProduction(checked)}
            disabled={building}
          />
          <div className={styles.panelActions}>
            <Button
              variant="outline"
              disabled={!building}
              onClick={() => setStatus("canceled")}
            >
              {t("home.showcase.cancel")}
            </Button>
            <Button
              color="primary"
              loading={building}
              disabled={!project.trim()}
              onClick={() => setStatus("building")}
            >
              {t("home.showcase.deploy")}
            </Button>
          </div>
        </div>
      </div>
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
      <section
        className={styles.showcase}
        aria-label={t("home.showcase.label")}
      >
        <DeployPanel />
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
