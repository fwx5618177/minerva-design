import React from "react";
import { useTranslation } from "react-i18next";
import CodeBlock from "@layout/CodeBlock";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";
import { collectDemos } from "@/docs/demos";

const demos = collectDemos(
  import.meta.glob<React.ComponentType>("./demos/*.tsx", {
    eager: true,
    import: "default",
  }),
  import.meta.glob<string>("./demos/*.tsx", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);

const importCode = `import { Icon, createIcon, DynamicIcon } from "minerva-design/icons";
// one component per icon (only the ones you import are bundled)
import { SearchIcon, ArrowUpIcon, SettingsIcon } from "minerva-design/icons";`;

const nativeCode = `// npx expo install react-native-svg (optional peer dependency of this entry)
import { DynamicIcon, Icon, SearchIcon, searchIcon } from "minerva-design/native/icons";

<SearchIcon />                                          // 24dp, theme text color
<SearchIcon size={20} color="#2563eb" title="Search" /> // accessible image
<Icon icon={searchIcon} strokeWidth={1.5} absoluteStrokeWidth />
<DynamicIcon name={item.icon} />                        // bundles the whole set`;

const taroCode = `import { Icon, SearchIcon, settingsIcon } from "minerva-design/taro/icons";

<SearchIcon />                                          // 24px base64 SVG image
<SearchIcon size="48rpx" color="#2563eb" title="Search" />
<Icon icon={settingsIcon} strokeWidth={1.5} />          // theme text color, per mode`;

const tabBarCode = `// build-time Node script: the tabBar only takes PNG / JPG files
import { writeFileSync } from "node:fs";
import { homeIcon, toSvg } from "minerva-design/icons/core";

for (const [state, color] of [["normal", "#6b7280"], ["active", "#2563eb"]]) {
  const svg = toSvg(homeIcon, { size: 81, color });
  // rasterize: the SVG -> PNG converter of your choice
  writeFileSync(\`src/assets/tab-home-\${state}.png\`, await rasterize(svg));
}`;

const IconDoc: React.FC = () => {
  const { t } = useTranslation();
  const intro = (
    <>
      <section className={styles.section} aria-labelledby="icon-rendering">
        <h2 id="icon-rendering">{t("docs.icon.intro.title")}</h2>
        <p className={styles.prose}>{t("docs.icon.intro.svg")}</p>
        <p className={styles.prose}>{t("docs.icon.intro.canvas")}</p>
        <p className={styles.prose}>{t("docs.icon.intro.bundle")}</p>
      </section>
      <section className={styles.section} aria-labelledby="icon-platforms">
        <h2 id="icon-platforms">{t("docs.icon.platforms.title")}</h2>
        <p className={styles.prose}>{t("docs.icon.platforms.native")}</p>
        <CodeBlock language="tsx" code={nativeCode} />
        <p className={styles.prose}>{t("docs.icon.platforms.taro")}</p>
        <CodeBlock language="tsx" code={taroCode} />
        <p className={styles.prose}>{t("docs.icon.platforms.tabBar")}</p>
        <CodeBlock language="ts" code={tabBarCode} />
      </section>
    </>
  );
  return (
    <DocPage id="icon" demos={demos} intro={intro} importCode={importCode} />
  );
};

export default IconDoc;
