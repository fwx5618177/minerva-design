import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import type { SwitchProps } from "./types";
import styles from "./switch.module.scss";

/**
 * Switch 开关组件
 * 用于在两个互斥状态之间切换
 * @param checked - 开关是否选中
 * @param defaultChecked - 默认是否选中
 * @param disabled - 是否禁用
 * @param size - 开关大小
 * @param color - 开关颜色
 * @param shape - 开关形状
 * @param label - 开关标签
 * @param labelPlacement - 标签位置
 * @param loading - 是否加载中
 * @param ripple - 是否显示涟漪效果
 * @param className - 自定义类名
 * @param labelStyle - 自定义样式
 * @param onChange - 值改变时的回调函数
 * @param onFocus - 聚焦时的回调函数
 * @param onBlur - 失焦时的回调函数
 * @param icon - 自定义图标
 * @param iconPlacement - 图标位置
 * @param trackStyle - 自定义轨道样式
 * @param thumbStyle - 自定义滑块样式
 */
const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  disabled = false,
  size = "medium",
  color = "primary",
  shape = "round",
  label,
  labelPlacement = "end",
  loading = false,
  ripple = true,
  className,
  labelStyle,
  trackStyle,
  thumbStyle: customThumbStyle,
  onChange,
  onFocus,
  onBlur,
  icon,
  iconPlacement = "start",
}) => {
  const [isChecked, setIsChecked] = useState(checked ?? defaultChecked);
  const [rippleActive, setRippleActive] = useState(false);
  const switchRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || loading) return;

    if (checked === undefined) {
      setIsChecked(event.target.checked);
    }

    onChange?.(event.target.checked, event);
  };

  // Native checkboxes toggle on Space only; the switch pattern also allows Enter.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    if (disabled || loading) return;
    event.currentTarget.click();
  };

  const handleRipple = () => {
    if (!ripple || disabled || loading) return;

    setRippleActive(true);
    setTimeout(() => setRippleActive(false), 400);
  };

  const switchClasses = classNames(
    styles.switch,
    styles[size],
    {
      [styles.checked]: isChecked,
      [styles.checkedLarge]: isChecked && size === "large",
      [styles.disabled]: disabled,
      [styles.loading]: loading,
      [styles.square]: shape === "square",
      [styles.ripple]: ripple && rippleActive,
      [styles[color]]: Object.prototype.hasOwnProperty.call(styles, color),
    },
    className,
  );

  const computedThumbStyle = {
    ...(isChecked &&
    !disabled &&
    !Object.prototype.hasOwnProperty.call(styles, color)
      ? {
          backgroundColor: color,
          color: color,
        }
      : {}),
    ...customThumbStyle,
  };

  const renderLabel = () => {
    if (!label) return null;
    return <span className={styles.label}>{label}</span>;
  };

  const renderIcon = () => {
    if (!icon) return null;
    return <span className={styles.icon}>{icon}</span>;
  };

  return (
    <label
      className={switchClasses}
      style={labelStyle}
      ref={switchRef}
      onClick={handleRipple}
    >
      {labelPlacement === "start" && renderLabel()}
      <div className={styles.switchBase}>
        <input
          type="checkbox"
          role="switch"
          aria-checked={isChecked}
          aria-disabled={disabled || loading || undefined}
          aria-busy={loading || undefined}
          checked={isChecked}
          disabled={disabled || loading}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <div className={styles.track} style={trackStyle} />
        <div className={styles.thumb} style={computedThumbStyle}>
          {iconPlacement === "start" && renderIcon()}
        </div>
        {ripple && <div className={styles.rippleEffect} />}
      </div>
      {iconPlacement === "end" && renderIcon()}
      {labelPlacement === "end" && renderLabel()}
    </label>
  );
};

export default Switch;
