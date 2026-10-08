import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./site.module.scss";

export type PageSkeletonVariant = "home" | "doc";

const Bone: React.FC<{ className?: string }> = ({ className }) => (
  <span className={`${styles.bone} ${className ?? ""}`} />
);

/**
 * Placeholder shown while a route's chunk (and its strings) load: the shape
 * of the landing page or of a documentation page, so the first paint is
 * never an empty canvas. Mirrors the static shell of index.html.
 */
const PageSkeleton: React.FC<{ variant: PageSkeletonVariant }> = ({
  variant,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={variant === "home" ? styles.skeletonHome : styles.skeletonDoc}
      role="status"
      aria-busy="true"
      aria-live="polite"
      data-page-skeleton={variant}
    >
      <span className="sr-only">{t("doc.loading")}</span>
      <div aria-hidden className={styles.skeletonBody}>
        {variant === "home" ? (
          <>
            <Bone className={styles.bonePill} />
            <Bone className={styles.boneDisplay} />
            <Bone className={styles.boneDisplayShort} />
            <Bone className={styles.boneLine} />
            <Bone className={styles.boneLineShort} />
            <span className={styles.boneRow}>
              <Bone className={styles.boneButton} />
              <Bone className={styles.boneButton} />
            </span>
            <Bone className={styles.boneCard} />
          </>
        ) : (
          <>
            <Bone className={styles.boneEyebrow} />
            <Bone className={styles.boneHeading} />
            <Bone className={styles.boneLine} />
            <Bone className={styles.boneLineShort} />
            <Bone className={styles.boneCard} />
            <Bone className={styles.boneSubheading} />
            <Bone className={styles.boneLine} />
            <Bone className={styles.boneLine} />
            <Bone className={styles.boneLineShort} />
          </>
        )}
      </div>
    </div>
  );
};

export default PageSkeleton;
