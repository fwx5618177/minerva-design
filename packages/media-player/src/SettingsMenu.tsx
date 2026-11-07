import { usePlayerText } from "./i18n.js";
/**
 * 设置菜单（齿轮）：清晰度 / 播放速度 / 字幕。菜单渲染在播放器内部，全屏时同样可见。
 * 一级列表显示各项当前值，点进去是单选列表；选中后关闭。Esc 关闭并把焦点还给齿轮，↑ / ↓ 移动。
 * 默认向上弹出；上方空间不够（例如音频播放条在可视区顶部）而下方更宽裕时向下弹出。
 */
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  VscCheck,
  VscChevronLeft,
  VscChevronRight,
  VscSettingsGear,
} from "react-icons/vsc";
import ControlButton, { type RenderTooltip } from "./ControlButton.js";
import { PLAYBACK_RATES, formatRate } from "./keyboard.js";
import type { QualityOption } from "./useMediaEngine.js";
import styles from "./styles.module.scss";

export interface CaptionOption {
  index: number;
  label: string;
}

export interface SettingsMenuProps {
  playbackRates?: readonly number[];
  qualityOptions: QualityOption[];
  quality: string;
  onQuality: (id: string) => void;
  showSpeed: boolean;
  rate: number;
  onRate: (rate: number) => void;
  captions: CaptionOption[];
  /** 当前字幕下标，-1 为关闭 */
  captionIndex: number;
  onCaption: (index: number) => void;
  renderTooltip?: RenderTooltip;
  onOpenChange?: (open: boolean) => void;
}

type View = "root" | "quality" | "speed" | "captions";

/** 菜单的最大高度（与样式一致）+ 间距 */
const MENU_SPACE = 256;

/** 触发按钮上下的可用空间 → 弹出方向（纯函数） */
export function menuPlacement(
  top: number,
  bottom: number,
  viewportHeight: number,
): "up" | "down" {
  const above = top;
  const below = viewportHeight - bottom;
  return above < MENU_SPACE && below > above ? "down" : "up";
}

interface Choice {
  key: string;
  label: string;
  checked: boolean;
  select: () => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({
  playbackRates = PLAYBACK_RATES,
  qualityOptions,
  quality,
  onQuality,
  showSpeed,
  rate,
  onRate,
  captions,
  captionIndex,
  onCaption,
  renderTooltip,
  onOpenChange,
}) => {
  const text = usePlayerText();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("root");
  const [placement, setPlacement] = useState<"up" | "down">("up");
  const [menuHeight, setMenuHeight] = useState<number | undefined>();
  const [menuRight, setMenuRight] = useState(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const openChangeRef = useRef(onOpenChange);
  openChangeRef.current = onOpenChange;

  const positionMenu = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const player = wrapRef.current?.closest<HTMLElement>("[data-media]");
    const bounds =
      player && getComputedStyle(player).overflowY !== "visible"
        ? player.getBoundingClientRect()
        : null;
    const top = Math.max(0, bounds?.top ?? 0);
    const bottom = Math.min(
      window.innerHeight,
      bounds?.bottom ?? window.innerHeight,
    );
    const left = Math.max(0, bounds?.left ?? 0);
    const right = Math.min(
      window.innerWidth,
      bounds?.right ?? window.innerWidth,
    );
    const width = menuRef.current?.getBoundingClientRect().width || 168;
    const menuLeft = Math.max(
      left,
      Math.min(rect.right - width, right - width),
    );
    setMenuRight(rect.right - menuLeft - width);
    const next = menuPlacement(rect.top - top, rect.bottom - top, bottom - top);
    setPlacement(next);
    setMenuHeight(
      Math.max(0, (next === "up" ? rect.top - top : bottom - rect.bottom) - 8),
    );
  }, []);
  useEffect(() => {
    if (!open) return;
    positionMenu();
    window.addEventListener("resize", positionMenu);
    window.addEventListener("scroll", positionMenu, true);
    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(positionMenu);
    const player = wrapRef.current?.closest<HTMLElement>("[data-media]");
    if (player) observer?.observe(player);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", positionMenu);
      window.removeEventListener("scroll", positionMenu, true);
    };
  }, [open, positionMenu]);

  useEffect(() => {
    openChangeRef.current?.(open);
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node))
        setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, true);
  }, [open]);

  // 打开 / 切换层级后聚焦第一项
  useEffect(() => {
    if (!open) return;
    const first =
      menuRef.current?.querySelector<HTMLElement>('[role^="menuitem"]');
    first?.focus();
  }, [open, view]);

  const close = (refocus: boolean) => {
    setOpen(false);
    setView("root");
    if (refocus) triggerRef.current?.focus();
  };

  const qualityLabel =
    qualityOptions.find((option) => option.id === quality)?.label ?? "";
  const captionLabel =
    captions.find((option) => option.index === captionIndex)?.label ??
    text("关闭");
  const rootItems: Array<{ view: View; label: string; value: string }> = [];
  if (qualityOptions.length > 1) {
    rootItems.push({ view: "quality", label: "清晰度", value: qualityLabel });
  }
  if (showSpeed)
    rootItems.push({
      view: "speed",
      label: "播放速度",
      value: text(formatRate(rate)),
    });
  if (captions.length > 0)
    rootItems.push({ view: "captions", label: "字幕", value: captionLabel });
  if (rootItems.length === 0) return null;

  const choicesFor = (current: View): Choice[] => {
    if (current === "quality") {
      return qualityOptions.map((option) => ({
        key: option.id,
        label: option.label,
        checked: option.id === quality,
        select: () => onQuality(option.id),
      }));
    }
    if (current === "speed") {
      return playbackRates
        .filter((value) => Number.isFinite(value) && value > 0)
        .map((value) => ({
          key: String(value),
          label: text(formatRate(value)),
          checked: Math.abs(value - rate) < 0.001,
          select: () => onRate(value),
        }));
    }
    return [{ index: -1, label: text("关闭") }, ...captions].map((option) => ({
      key: String(option.index),
      label: option.label,
      checked: option.index === captionIndex,
      select: () => onCaption(option.index),
    }));
  };

  const onMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>('[role^="menuitem"]') ??
        [],
    );
    const index = items.indexOf(document.activeElement as HTMLElement);
    if (event.key === "Escape") {
      if (view === "root") close(true);
      else setView("root");
    } else if (event.key === "ArrowDown") {
      items[(index + 1) % items.length]?.focus();
    } else if (event.key === "ArrowUp") {
      items[(index - 1 + items.length) % items.length]?.focus();
    } else if (event.key === "ArrowLeft" && view !== "root") {
      setView("root");
    } else if (event.key === "Tab") {
      close(false);
      return;
    } else {
      // 其他按键（Enter / 空格 / 字母）不交给播放器，避免在菜单里触发快捷键
      event.stopPropagation();
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  };

  const viewTitle = rootItems.find((item) => item.view === view)?.label ?? "";

  return (
    <div className={styles.settings} ref={wrapRef}>
      <ControlButton
        ref={triggerRef}
        tooltip="设置"
        renderTooltip={renderTooltip}
        aria-label="设置"
        aria-haspopup="menu"
        aria-expanded={open}
        active={open}
        onClick={() => {
          if (open) close(false);
          else {
            positionMenu();
            setView("root");
            setOpen(true);
          }
        }}
      >
        <VscSettingsGear />
      </ControlButton>
      {open && (
        <div
          ref={menuRef}
          className={
            placement === "down"
              ? `${styles.menu} ${styles.menuDown}`
              : styles.menu
          }
          data-placement={placement}
          style={{ maxHeight: menuHeight, right: menuRight }}
          role="menu"
          aria-label={text("播放设置")}
          onKeyDown={onMenuKeyDown}
          onClick={(event) => event.stopPropagation()}
        >
          {view === "root" ? (
            rootItems.map((item) => (
              <button
                key={item.view}
                type="button"
                role="menuitem"
                className={styles.menuItem}
                onClick={() => setView(item.view)}
              >
                <span className={styles.menuLabel}>{text(item.label)}</span>
                <span className={styles.menuValue}>{item.value}</span>
                <VscChevronRight className={styles.menuChevron} />
              </button>
            ))
          ) : (
            <>
              <button
                type="button"
                role="menuitem"
                className={`${styles.menuItem} ${styles.menuBack}`}
                aria-label={text(`返回（${viewTitle}）`)}
                onClick={() => setView("root")}
              >
                <VscChevronLeft className={styles.menuChevron} />
                <span className={styles.menuLabel}>{text(viewTitle)}</span>
              </button>
              {choicesFor(view).map((choice) => (
                <button
                  key={choice.key}
                  type="button"
                  role="menuitemradio"
                  aria-checked={choice.checked}
                  className={styles.menuItem}
                  onClick={() => {
                    choice.select();
                    close(true);
                  }}
                >
                  <span className={styles.menuCheck}>
                    {choice.checked && <VscCheck />}
                  </span>
                  <span className={styles.menuLabel}>
                    {choice.key === "caption--1"
                      ? text(choice.label)
                      : choice.label}
                  </span>
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;
