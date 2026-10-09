import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Alert } from "minerva-design";
import CodeBlock from "@layout/CodeBlock";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";
import { setupCode, signalCode, formsCode } from "./examples";

export default function AngularDoc() {
  const { t } = useTranslation();
  const k = (key: string) => t(`docs.angular.${key}`);
  return (
    <DocPage
      id="angular"
      intro={
        <>
          <Alert color="info">
            {k("scope")} <Link to="/platform-support">{k("matrix")}</Link>
          </Alert>
          {(
            [
              ["setup", setupCode],
              ["signals", signalCode],
              ["forms", formsCode],
            ] as const
          ).map(([id, code]) => (
            <section key={id} className={styles.section} aria-labelledby={id}>
              <h2 id={id}>{k(`${id}.title`)}</h2>
              <p className={styles.prose}>{k(`${id}.text`)}</p>
              <CodeBlock code={code} language="ts" />
            </section>
          ))}
          <p className={styles.prose}>{k("upload")} </p>
          <p className={styles.prose}>
            {k("preview")} <Link to="/wc-angular">{k("wcGuide")}</Link>
          </p>
        </>
      }
    />
  );
}
