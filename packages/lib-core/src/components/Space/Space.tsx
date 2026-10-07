import React from "react";
import classNames from "classnames";
import type { SpaceProps } from "./types";
import styles from "./space.module.scss";

/**
 * Space 组件 - 设置组件之间的间距
 * @description 设置组件之间的间距，支持水平/垂直排列、自动换行、对齐方式等功能
 * @param align 对齐方式，可选值为 top、middle、bottom
 * @param justify 对齐方式，可选值为 start、end、center、space-around、space-between、space-evenly
 * @param direction 排列方向，可选值为 horizontal、vertical
 * @param size 间距大小，可选值为 small、medium、large
 * @param wrap 是否自动换行
 * @param split 是否在元素之间添加分割线
 * @param compact 是否启用紧凑模式
 * @param block 是否启用块级模式
 * @param className 自定义类名
 * @param style 自定义样式
 * @param children 子组件
 * @param ref 根元素的 ref
 * @returns 返回一个 div 元素，包含子组件和间距
 */
const Space = ({
  align,
  justify,
  direction = "horizontal",
  size = "medium",
  wrap = false,
  split,
  compact = false,
  block = false,
  className,
  style,
  children,
  ref,
}: SpaceProps) => {
  // 过滤掉空节点
  const items = React.Children.toArray(children).filter(
    (child) => child !== null && child !== undefined,
  );

  // 计算间距大小
  const getMargin = () => {
    if (typeof size === "number") return size;
    const sizeMap = {
      small: 8,
      medium: 16,
      large: 24,
    };
    return compact ? sizeMap[size] / 2 : sizeMap[size];
  };

  // 构建样式
  const spaceClass = classNames(
    styles.space,
    {
      [styles.vertical]: direction === "vertical",
      [styles.horizontal]: direction === "horizontal",
      [styles.wrap]: wrap,
      [styles.block]: block,
      [styles[`align-${align}`]]: align,
      [styles[`justify-${justify}`]]: justify,
      [styles.compact]: compact,
    },
    className,
  );

  const itemStyle = {
    marginRight: direction === "horizontal" ? getMargin() : 0,
    marginBottom: direction === "vertical" || wrap ? getMargin() : 0,
  };

  return (
    <div ref={ref} className={spaceClass} style={style} role="group">
      {items.map((child, i) => (
        // toArray assigns stable keys (explicit key or original slot), so
        // children keep their state when a sibling is conditionally removed
        <React.Fragment key={React.isValidElement(child) ? child.key : i}>
          <div className={styles.item} style={itemStyle}>
            {child}
          </div>
          {split && i < items.length - 1 && (
            <div className={styles.split} style={itemStyle}>
              {split}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Space;
