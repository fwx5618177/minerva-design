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
 * @param flexItem - 在 flex 容器中拉伸的竖向分割线
 * @param className - 自定义类名
 * @param style - 自定义样式
 * @param ref - 根元素的 ref
 */
const Divider = ({
  variant = "solid",
  orientation = "horizontal",
  color,
  thickness = 1,
  length,
  spacing = 16,
  children,
  textAlign = "center",
  elevation = false,
  flexItem = false,
  className,
  style,
  ref,
  ...rest
}: DividerProps) => {
  // `0` is a valid thickness / spacing / text, so only skip null-ish values.
  // Text is only rendered by horizontal dividers.
  const hasText =
    orientation === "horizontal" &&
    children != null &&
    children !== false &&
    children !== "";
  const dividerStyle: React.CSSProperties = {
    ...style,
    ...(color && { borderColor: color }),
    ...(thickness != null && { borderWidth: thickness }),
    ...(orientation === "vertical" && length != null && { height: length }),
    ...(orientation === "horizontal" && length != null && { width: length }),
    ...(spacing != null && {
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
    hasText && styles.withText,
    hasText &&
      styles[`text${textAlign.charAt(0).toUpperCase() + textAlign.slice(1)}`],
    elevation && styles.elevation,
    flexItem && styles.flexItem,
    // Stable hooks shared with @novel-isr/ui
    hasText
      ? "ui-divider-with-label"
      : ["ui-divider", `ui-divider-${orientation}`],
    className,
  );

  if (hasText) {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        role="separator"
        aria-orientation={orientation}
        {...rest}
        className={dividerClasses}
        style={dividerStyle}
      >
        <span className={styles.text}>{children}</span>
      </div>
    );
  }

  // A native <hr> is an implicit separator
  return (
    <hr
      ref={ref as React.Ref<HTMLHRElement>}
      aria-orientation={orientation}
      {...rest}
      className={dividerClasses}
      style={dividerStyle}
    />
  );
};

export default React.memo(Divider);
