import React from "react";
import { Link } from "react-router";
import { IoHomeOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import styles from "@styles/pages/error.module.scss";

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.errorPage}>
      <div className={styles.content}>
        <h1>{t("notFound.title")}</h1>
        <p>{t("notFound.description")}</p>
        <Link to="overview" className={styles.homeLink}>
          <IoHomeOutline className={styles.icon} />
          {t("notFound.back_home")}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
