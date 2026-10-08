import React from "react";
import { useRouteError, Link } from "react-router";
import { IoArrowBack, IoRefreshOutline } from "react-icons/io5";
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
          <pre className={styles.errorMessage}>{error.message}</pre>
        )}
        <div className={styles.actions}>
          <Link to="/" className={styles.primary}>
            <IoArrowBack aria-hidden />
            {t("error.back_home")}
          </Link>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className={styles.secondary}
          >
            <IoRefreshOutline aria-hidden />
            {t("error.refresh")}
          </button>
        </div>
      </div>
    </main>
  );
};

export default ErrorBoundary;
