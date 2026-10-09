// The "React Native" tab of a component page (and the whole content of a
// mobile-only page): import snippet, the native demos rendered live through
// react-native-web in a phone frame with their RN TSX source, and the props
// tables of minerva-design/native. Lazy-loaded: react-native-web never
// reaches the other pages.
import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Alert } from "minerva-design";
import CodeBlock from "@layout/CodeBlock";
import type { DocPageMeta } from "../registry";
import type { DemoEntry } from "../demos";
import { loadNativeDemos, nativeImportSnippet } from "../nativeDemos";
import { loadNativeApis, NATIVE_API_PREFIX } from "../api";
import DemoBlock from "../components/DemoBlock";
import PropsTable from "../components/PropsTable";
import PhoneFrame from "./PhoneFrame";
import styles from "../components/docs.module.scss";

export interface NativeSectionProps {
  meta: DocPageMeta;
}

const NativeSection: React.FC<NativeSectionProps> = ({ meta }) => {
  const { t } = useTranslation();
  const native = meta.native;
  const [demos, setDemos] = useState<Record<string, DemoEntry> | null>(null);
  useEffect(() => {
    if (!native) return;
    let cancelled = false;
    void Promise.all([loadNativeDemos(meta.id), loadNativeApis()]).then(
      ([loaded]) => {
        if (!cancelled) setDemos(loaded);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [meta.id, native]);

  if (!native) {
    return (
      <p className={styles.callout} data-testid="native-unavailable">
        <Trans
          i18nKey="doc.native.unavailable"
          components={{ support: <Link to="/platform-support" /> }}
        />
      </p>
    );
  }

  return (
    <>
      <section className={styles.section} aria-labelledby="native-import">
        <h2 id="native-import">{t("doc.import")}</h2>
        <CodeBlock code={nativeImportSnippet(native.exports)} language="tsx" />
        <p className={styles.prose}>
          <Trans
            i18nKey="doc.native.setup"
            components={{
              guide: <Link to="/react-native" />,
              code: <code />,
            }}
          />
        </p>
      </section>

      <section className={styles.section} aria-labelledby="native-examples">
        <h2 id="native-examples">{t("doc.examples")}</h2>
        <p className={styles.prose}>{t("doc.native.examples")}</p>
        {t(`docs.${meta.id}.native.limitations`, { defaultValue: "" }) && (
          <Alert color="info">{t(`docs.${meta.id}.native.limitations`)}</Alert>
        )}
        {!demos && <p className={styles.muted}>{t("doc.loading")}</p>}
        {demos &&
          native.demos.map((demoId) => {
            const demo = demos[demoId];
            if (!demo) return null;
            const { Component } = demo;
            const title = t(`docs.${meta.id}.native.demos.${demoId}.title`);
            return (
              <DemoBlock
                key={demoId}
                id={`native-demo-${demoId}`}
                title={title}
                description={t(
                  `docs.${meta.id}.native.demos.${demoId}.description`,
                )}
                source={demo.source}
              >
                <PhoneFrame label={title}>
                  <Component />
                </PhoneFrame>
              </DemoBlock>
            );
          })}
      </section>

      {native.api.length > 0 && (
        <section className={styles.section} aria-labelledby="native-api">
          <h2 id="native-api">{t("doc.api")}</h2>
          <p className={styles.prose}>{t("doc.native.api")}</p>
          {demos &&
            native.api.map((name) => (
              <PropsTable
                key={name}
                page={meta.id}
                name={`${NATIVE_API_PREFIX}${name}`}
              />
            ))}
        </section>
      )}
    </>
  );
};

export default NativeSection;
