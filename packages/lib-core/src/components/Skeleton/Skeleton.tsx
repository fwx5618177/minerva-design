import React from "react";
import classNames from "classnames";
import type { SkeletonProps } from "./types";
import styles from "./skeleton.module.scss";
import useI18n from "../../hooks/useI18n";

/**
 * @name Skeleton 骨架屏
 * @description 在需要等待加载内容的位置提供一个占位图形组合
 * @param SkeletonVariant variant - 组件类型 可选值：text、avatar、card、button、image、rectangular、rounded
 * @param SkeletonAnimation animation - 动画类型 可选值：pulse、wave、false
 * @param number | string width - 宽度
 * @param number | string height - 高度
 * @param string className - 自定义类名
 * @param React.ReactNode children - 子元素
 * @param boolean loading - 是否加载中
 * @param number | string borderRadius - 圆角大小
 * @param React.CSSProperties style - 自定义样式
 * @param number lines - 行数
 * @param boolean avatar - 是否显示头像
 * @param number | string avatarSize - 头像大小
 * @param string avatarShape - 头像形状 可选值：circle、square
 * @param boolean active - 是否激活交互态
 * @param boolean paragraph - 是否显示段落
 * @param boolean title - 是否显示标题
 * @param string ariaLabel - 加载中区域的无障碍名称
 * @param boolean decorative - 只渲染单个装饰性占位块（aria-hidden span）
 * @param number | string size - 装饰性圆形占位的边长
 * @param Ref ref - 根元素的 ref (仅在 loading 时渲染)
 */
const toCss = (value: number | string | undefined) =>
  typeof value === "number" ? `${value}px` : value;

const Skeleton = ({
  variant = "text",
  animation = "pulse",
  width,
  height,
  className,
  children,
  loading = true,
  borderRadius,
  style,
  lines = 1,
  avatar = false,
  avatarSize = 40,
  avatarShape = "circle",
  active = false,
  paragraph = false,
  title = false,
  ariaLabel,
  decorative = false,
  size,
  ref,
  ...rest
}: SkeletonProps) => {
  const { t } = useI18n();
  if (!loading) {
    return <>{children}</>;
  }

  if (decorative) {
    const dim = variant === "circular" ? toCss(size ?? width ?? 32) : undefined;
    return (
      <span
        ref={ref}
        aria-hidden="true"
        {...rest}
        className={classNames(
          styles.skeleton,
          styles.decorative,
          styles[variant],
          styles[`animation-${animation}`],
          className,
        )}
        style={{
          width: dim ?? toCss(width),
          height: dim ?? toCss(height),
          borderRadius,
          ...style,
        }}
      />
    );
  }

  const renderLines = () => {
    if (paragraph || title) return null;

    // Guard against negative / fractional / NaN counts (Array(-1) throws)
    const count = Number.isFinite(lines) ? Math.max(0, Math.floor(lines)) : 0;
    return Array(count)
      .fill(null)
      .map((_, index) => (
        <div
          key={index}
          className={classNames(
            styles.skeleton,
            styles[variant],
            styles[`animation-${animation}`],
          )}
          style={{
            width: typeof width === "number" ? `${width}px` : width,
            height: typeof height === "number" ? `${height}px` : height,
            borderRadius,
            ...style,
          }}
        />
      ));
  };

  const renderAvatar = () => {
    if (!avatar) return null;

    return (
      <div
        className={classNames(
          styles.skeleton,
          styles.avatar,
          styles[`animation-${animation}`],
          styles[`avatar-${avatarShape}`],
        )}
        style={{
          width:
            typeof avatarSize === "number" ? `${avatarSize}px` : avatarSize,
          height:
            typeof avatarSize === "number" ? `${avatarSize}px` : avatarSize,
        }}
      />
    );
  };

  const renderParagraph = () => {
    if (!paragraph) return null;

    const paragraphLines = [
      { width: "100%", height: "16px" },
      { width: "100%", height: "16px" },
      { width: "92%", height: "16px" },
      { width: "60%", height: "16px" },
    ];

    return (
      <div className={styles.paragraph}>
        {paragraphLines.map((line, index) => (
          <div
            key={`p-${index}`}
            className={classNames(
              styles.skeleton,
              styles[`animation-${animation}`],
            )}
            style={{
              width: line.width,
              height: line.height,
            }}
          />
        ))}
      </div>
    );
  };

  const renderTitle = () => {
    if (!title) return null;

    return (
      <div
        className={classNames(
          styles.skeleton,
          styles.title,
          styles[`animation-${animation}`],
        )}
      />
    );
  };

  const renderContent = () => {
    if (variant === "card") {
      return (
        <div className={classNames(styles.card, { [styles.active]: active })}>
          {renderAvatar()}
          <div className={styles.cardContent}>
            {renderTitle()}
            {renderParagraph()}
          </div>
        </div>
      );
    }

    return (
      <>
        {renderAvatar()}
        <div className={styles.content}>
          {renderTitle()}
          {renderLines()}
          {renderParagraph()}
        </div>
      </>
    );
  };

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      role="status"
      aria-busy="true"
      aria-label={ariaLabel ?? t("common.loading")}
      className={classNames(
        styles.skeletonRoot,
        {
          [styles.withAvatar]: avatar,
        },
        className,
      )}
      {...rest}
    >
      {renderContent()}
    </div>
  );
};

export default Skeleton;
