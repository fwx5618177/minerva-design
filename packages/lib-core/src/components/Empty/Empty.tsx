import React from "react";
import { RiInboxLine } from "react-icons/ri";
import styles from "./empty.module.scss";
import { EmptyProps } from "./types";

/**
 * 空状态组件
 * @param icon 自定义图标
 * @param description 描述文字
 * @param className 自定义类名
 * @param style 自定义样式
 * @param children 底部内容
 * @param useSvg 是否用 svg 图标
 * @param width 宽度
 * @param height 高度
 * @param backgroundColor 背景颜色
 * @param showShadow 是否显示阴影
 * @param color 字体颜色
 * @returns {React.ReactNode} 空状态组件
 */
const Empty: React.FC<EmptyProps> = ({
  icon,
  description = "No Data",
  className,
  style,
  children,
  useSvg = false,
  width,
  height,
  backgroundColor,
  showShadow,
  color,
}) => {
  const DefaultIcon = () => (
    <RiInboxLine size={40} className={styles.defaultIcon} />
  );

  const DefaultSvg = () => (
    <svg
      className={styles.defaultIcon}
      width="64"
      height="41"
      viewBox="0 0 64 41"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(0 1)" fill="none" fillRule="evenodd">
        <ellipse
          style={{ fill: "var(--surface-muted-color)" }}
          cx="32"
          cy="33"
          rx="32"
          ry="7"
        />
        <g fillRule="nonzero" style={{ stroke: "var(--border-strong-color)" }}>
          <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
          <path
            d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
            style={{ fill: "var(--surface-color)" }}
          />
        </g>
      </g>
    </svg>
  );

  return (
    <div
      className={`${styles.empty} ${showShadow ? styles.showShadow : ""} ${className || ""}`}
      style={{
        width,
        height,
        backgroundColor,
        color,
        ...style,
      }}
      role="status"
      aria-label={description?.toString()}
    >
      <div className={styles.iconWrapper}>
        {icon || (useSvg ? <DefaultSvg /> : <DefaultIcon />)}
      </div>
      {description && <div className={styles.description}>{description}</div>}
      {children && <div className={styles.footer}>{children}</div>}
    </div>
  );
};

export default React.memo(Empty);
