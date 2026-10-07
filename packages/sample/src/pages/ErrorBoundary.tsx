import React from "react";
import { useRouteError, Link } from "react-router";
import { IoHomeOutline, IoRefreshOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import styles from "@styles/pages/error.module.scss";

const ErrorBoundary: React.FC = () => {
  const error = useRouteError() as Error;
  const { t } = useTranslation();

  return (
    <div className={styles.errorPage}>
      <div className={styles.content}>
        <h1>{t("error.title")}</h1>
        <p>{t("error.description")}</p>
        <p className={styles.errorMessage}>{error.message}</p>
        <div className={styles.actions}>
          <Link to="overview" className={styles.homeLink}>
            <IoHomeOutline className={styles.icon} />
            {t("error.back_home")}
          </Link>
          <button
            onClick={() => window.location.reload()}
            className={styles.refreshButton}
          >
            <IoRefreshOutline className={styles.icon} />
            {t("error.refresh")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
