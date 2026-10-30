import { useTranslation } from "react-i18next";
import CodeBlock from "@layout/CodeBlock";
import type { DocPageMeta } from "../registry";
import { isChartPage, type FrameworkDef } from "../frameworks";
import DemoBlock from "../components/DemoBlock";
import ChartFrameworkFallback from "../components/ChartFrameworkFallback";
import AngularDemo from "./AngularDemo";
import AngularApi from "./AngularApi";
import { angularExamples, angularSource } from "./examples";
import styles from "../components/docs.module.scss";

export default function AngularSection({
  meta,
  framework,
}: {
  meta: DocPageMeta;
  framework?: FrameworkDef;
}) {
  const { t } = useTranslation();
  const examples = angularExamples[meta.id] ?? [];
  // chart pages without Angular examples: how to wrap the engine
  if (!examples.length && framework && isChartPage(meta))
    return <ChartFrameworkFallback meta={meta} framework={framework} />;
  const names = [...new Set(examples.flatMap((example) => example.imports))];
  const path =
    meta.id === "monaco-code-editor"
      ? "minerva-design/angular/monaco"
      : "minerva-design/angular";
  // chart examples share the ids (and translated titles) of the Web
  // Component demos of their page
  const charts = isChartPage(meta);
  return (
    <div data-native-angular-section="">
      <section className={styles.section} aria-labelledby="angular-import">
        <h2 id="angular-import">{t("doc.import")}</h2>
        <CodeBlock
          code={`import { ${names.join(", ")} } from '${path}';`}
          language="ts"
        />
      </section>
      <section className={styles.section} aria-labelledby="angular-examples">
        <h2 id="angular-examples">{t("doc.examples")}</h2>
        {examples.map((example) => (
          <DemoBlock
            key={example.id}
            id={`angular-demo-${example.id}`}
            title={
              charts
                ? t(`docs.${meta.id}.wc.demos.${example.id}.title`, {
                    defaultValue: example.title,
                  })
                : example.title
            }
            description={
              charts
                ? t(`docs.${meta.id}.wc.demos.${example.id}.description`, {
                    defaultValue: example.description ?? "",
                  })
                : example.description
            }
            source={angularSource(example)}
            language="ts"
          >
            <AngularDemo example={example} />
          </DemoBlock>
        ))}
      </section>
      <section className={styles.section} aria-labelledby="angular-api">
        <h2 id="angular-api">Angular API</h2>
        <AngularApi names={names} />
      </section>
    </div>
  );
}
