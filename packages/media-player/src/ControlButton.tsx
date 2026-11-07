/**
 * 控制条按钮：提示文字默认用原生 title；使用方传入 renderTooltip 时改用自己的提示组件
 * （此时不再设置 title，避免两层提示同时出现）。
 *
 * 全屏时只有全屏元素内部会被绘制：挂到 document.body 的提示 / 弹层看不见。
 * 因此通过上下文把「提示应挂载的容器」（全屏时为播放器根元素）传给 renderTooltip。
 */
import React, { createContext, useContext } from "react";
import { usePlayerText } from "./i18n.js";
import styles from "./styles.module.scss";

export interface TooltipContext {
  /** 提示应挂载的容器：全屏时为播放器根元素，否则为 null（使用方自行决定，通常是 body） */
  container: HTMLElement | null;
  /** 播放器是否处于全屏 */
  fullscreen: boolean;
}

/**
 * 把控制按钮包进使用方的提示组件，例如
 * `(content, node, ctx) => <Tooltip content={content} portalContainer={ctx.container}>{node}</Tooltip>`
 */
export type RenderTooltip = (
  content: string,
  control: React.ReactElement,
  context: TooltipContext,
) => React.ReactNode;

const DEFAULT_CONTEXT: TooltipContext = { container: null, fullscreen: false };

export const PlayerTooltipContext =
  createContext<TooltipContext>(DEFAULT_CONTEXT);

export function usePlayerTooltipContext(): TooltipContext {
  return useContext(PlayerTooltipContext);
}

export interface ControlButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tooltip: string;
  renderTooltip?: RenderTooltip;
  active?: boolean;
}

const ControlButton = React.forwardRef<HTMLButtonElement, ControlButtonProps>(
  (
    { tooltip, renderTooltip, active = false, className, children, ...rest },
    ref,
  ) => {
    const text = usePlayerText();
    const context = usePlayerTooltipContext();
    const classes = [
      styles.control,
      active ? styles.controlOn : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");
    const button = (
      <button
        ref={ref}
        type="button"
        className={classes}
        title={renderTooltip ? undefined : text(tooltip)}
        {...rest}
        aria-label={rest["aria-label"] ? text(rest["aria-label"]) : undefined}
      >
        {children}
      </button>
    );
    return renderTooltip ? (
      <>{renderTooltip(text(tooltip), button, context)}</>
    ) : (
      button
    );
  },
);

ControlButton.displayName = "ControlButton";

export default ControlButton;
