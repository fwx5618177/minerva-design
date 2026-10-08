import React, { useEffect } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { IoArrowBack } from "react-icons/io5";
import Kbd from "@/site/Kbd";
import { modKeyLabel } from "@/site/searchItems";
import styles from "@styles/pages/error.module.scss";

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `404 · Minerva UI`;
  }, []);

  return (
    <div className={styles.errorPage}>
      <div className={styles.content}>
        <p className={styles.code} aria-hidden>
          404
        </p>
        <h1 className={styles.title}>{t("notFound404.heading")}</h1>
        <p className={styles.text}>{t("notFound.description")}</p>
        <div className={styles.actions}>
          <Link to="/" className={styles.primary}>
            <IoArrowBack aria-hidden />
            {t("notFound.back_home")}
          </Link>
          <span className={styles.hint}>
            {t("notFound404.search")} <Kbd>{modKeyLabel()}</Kbd>
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
