import { useTranslation } from "react-i18next";
import CodeBlock from "@layout/CodeBlock";
import type { DocPageMeta } from "../registry";
import DemoBlock from "../components/DemoBlock";
import AngularDemo from "./AngularDemo";
import AngularApi from "./AngularApi";
import { angularExamples, angularSource } from "./examples";
import styles from "../components/docs.module.scss";

export default function AngularSection({ meta }: { meta: DocPageMeta }) {
  const { t } = useTranslation();
  const examples = angularExamples[meta.id] ?? [];
  const names = [...new Set(examples.flatMap((example) => example.imports))];
  const path =
    meta.id === "monaco-code-editor"
      ? "minerva-design/angular/monaco"
      : "minerva-design/angular";
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
            title={example.title}
            description={example.description}
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
