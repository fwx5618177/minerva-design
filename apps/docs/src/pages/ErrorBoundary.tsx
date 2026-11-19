import { ArrowLeftIcon, RefreshIcon } from "minerva-design/icons";
import React from "react";
import { Button, TextLink, CodeBlock } from "minerva-design";
import { useRouteError, Link } from "react-router";
import { useTranslation } from "react-i18next";
import styles from "@styles/pages/error.module.scss";

const ErrorBoundary: React.FC = () => {
  const error = useRouteError() as Error | undefined;
  const { t } = useTranslation();

  return (
    <main className={styles.errorPage} id="main-content">
      <div className={styles.content}>
        <p className={styles.code} aria-hidden>
          !
        </p>
        <h1 className={styles.title}>{t("error.title")}</h1>
        <p className={styles.text}>{t("error.description")}</p>
        {error?.message && (
          <CodeBlock className={styles.errorMessage}>{error.message}</CodeBlock>
        )}
        <div className={styles.actions}>
          <TextLink asChild className={styles.primary}>
            <Link to="/">
              <ArrowLeftIcon size="1em" aria-hidden />
              {t("error.back_home")}
            </Link>
          </TextLink>
          <Button
            variant="outline"
            color="neutral"
            type="button"
            onClick={() => window.location.reload()}
            className={styles.secondary}
          >
            <RefreshIcon size="1em" aria-hidden />
            {t("error.refresh")}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ErrorBoundary;
