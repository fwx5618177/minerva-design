import React from "react";
import classNames from "classnames";
import type { DividerProps } from "./types";
import styles from "./divider.module.scss";

/**
 * Divider 分割线组件
 * @param variant - 分割线的样式变体
 * @param orientation - 分割线方向
 * @param color - 分割线颜色
 * @param thickness - 分割线粗细
 * @param length - 分割线长度
 * @param spacing - 分割线两端间距
 * @param children - 分割线中的文字内容
 * @param textAlign - 文字对齐方式
 * @param elevation - 是否带投影
 * @param className - 自定义类名
 * @param style - 自定义样式
 */
const Divider: React.FC<DividerProps> = ({
  variant = "solid",
  orientation = "horizontal",
  color,
  thickness = 1,
  length,
  spacing = 16,
  children,
  textAlign = "center",
  elevation = false,
  className,
  style,
}) => {
  const dividerStyle: React.CSSProperties = {
    ...style,
    ...(color && { borderColor: color }),
    ...(thickness && { borderWidth: thickness }),
    ...(orientation === "vertical" && length && { height: length }),
    ...(orientation === "horizontal" && length && { width: length }),
    ...(spacing && {
      marginTop: orientation === "horizontal" ? spacing : 0,
      marginBottom: orientation === "horizontal" ? spacing : 0,
      marginLeft: orientation === "vertical" ? spacing : 0,
      marginRight: orientation === "vertical" ? spacing : 0,
    }),
  };

  const dividerClasses = classNames(
    styles.divider,
    styles[variant],
    styles[orientation],
    children && styles.withText,
    children &&
      styles[`text${textAlign.charAt(0).toUpperCase() + textAlign.slice(1)}`],
    elevation && styles.elevation,
    className,
  );

  return (
    <div
      className={dividerClasses}
      style={dividerStyle}
      role="separator"
      aria-orientation={orientation}
    >
      {children && <span className={styles.text}>{children}</span>}
    </div>
  );
};

export default React.memo(Divider);
