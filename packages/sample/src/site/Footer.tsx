import React from "react";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import { GITHUB_URL } from "./constants";
import styles from "./site.module.scss";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>
          <Logo size={16} />
          Minerva UI
        </span>
        <span className={styles.footerText}>
          {t("footer.license")} {t("footer.built")}
        </span>
        <a
          className={styles.footerLink}
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
