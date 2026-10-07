/**
 * @novel-isr/ui compatibility layer: "general" group
 * (Button, IconButton, Avatar, AvatarGroup, Badge, Tag, Alert, Pagination,
 * Steps, Upload).
 *
 * Exposes novel-isr-ui's exact export names and prop shapes on top of the
 * Minerva components, which render the same `ui-*` styling hooks. The
 * adapters only map names / values:
 * - Button: variant (solid / outline / ghost / link) -> appearance,
 *   colorScheme / intent -> variant, size xs..lg -> xsmall..large,
 *   isLoading -> loading (+ disabled), leftIcon / rightIcon -> startIcon /
 *   endIcon; type defaults to "button".
 * - IconButton: label -> label (name + tooltip), ghost / neutral defaults.
 * - Avatar: size xs..2xl -> the exact novel pixel sizes, shape square -> rounded.
 * - Badge: variant -> appearance (dot -> dot), colorScheme -> variant, children -> content.
 * - Tag: colorScheme -> variant, onClose -> closable + onClose, onClick -> clickable.
 * - Alert: status -> variant, variant -> type, hideIcon -> showIcon, always role="alert".
 * - Pagination: page / onPageChange / onPageSizeChange -> current / onChange,
 *   compact page list (siblingCount / boundaryCount).
 * - Steps: onValueChange -> onChange, label -> ariaLabel.
 * - Upload: busy -> loading, selectLabel -> labels.select.
 *
 * Side-effect free: novel-isr-ui's original built-in texts (mostly Chinese)
 * are passed explicitly as props, whatever lib-core's language is; consumer
 * props override them.
 */
import { Children } from "react";
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  Ref,
} from "react";
import MinervaButton from "../components/Button/Button";
import type { ButtonColor } from "../components/Button/types";
import MinervaIconButton from "../components/IconButton/IconButton";
import type { IconButtonProps as MinervaIconButtonProps } from "../components/IconButton/types";
import MinervaAvatar from "../components/Avatar/Avatar";
import MinervaAvatarGroup from "../components/Avatar/AvatarGroup";
import MinervaBadge from "../components/Badge/Badge";
import type { BadgeProps as MinervaBadgeProps } from "../components/Badge/types";
import MinervaTag from "../components/Tag/Tag";
import type { TagVariant as MinervaTagVariant } from "../components/Tag/types";
import MinervaAlert from "../components/Alert/Alert";
import type { AlertType as MinervaAlertType } from "../components/Alert/types";
import MinervaPagination from "../components/Pagination/Pagination";
import MinervaSteps from "../components/Steps/Steps";
import MinervaUpload from "../components/Upload/Upload";
import type { UploadItem as MinervaUploadItem } from "../components/Upload/types";
import {
  toMinervaPaginationProps,
  type NovelPaginationProps,
} from "../internal/general-pagination";

const join = (...names: (string | false | null | undefined)[]) =>
  names.filter(Boolean).join(" ") || undefined;

// ─── Button ─────────────────────────────────────────────────────────────────

export type ButtonVariant = "solid" | "outline" | "ghost" | "link";
export type ButtonSize = "xs" | "sm" | "md" | "lg";
export type ButtonColorScheme =
  | "primary"
  | "secondary"
  | "neutral"
  | "brand"
  | "accent"
  | "danger"
  | "success"
  | "warning"
  | "gray";
export type ButtonIntent =
  "primary" | "secondary" | "confirm" | "danger" | "warning" | "neutral";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Business intent; colorScheme only overrides the visual token */
  intent?: ButtonIntent;
  colorScheme?: ButtonColorScheme;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

const BUTTON_SIZE = {
  xs: "xsmall",
  sm: "small",
  md: "medium",
  lg: "large",
} as const;

const COLOR_FROM_INTENT: Record<ButtonIntent, ButtonColorScheme> = {
  primary: "primary",
  secondary: "secondary",
  confirm: "success",
  danger: "danger",
  warning: "warning",
  neutral: "neutral",
};

const BUTTON_COLOR: Record<ButtonColorScheme, ButtonColor> = {
  primary: "primary",
  brand: "primary",
  secondary: "secondary",
  neutral: "neutral",
  gray: "neutral",
  accent: "accent",
  danger: "danger",
  success: "success",
  warning: "warning",
};

/** Alias color names Minerva renders under another `ui-button-color-*` hook */
const ALIAS_COLOR_HOOK: Partial<Record<ButtonColorScheme, string>> = {
  brand: "ui-button-color-brand",
  gray: "ui-button-color-gray",
};

export function Button({
  variant = "solid",
  size = "md",
  intent,
  colorScheme,
  isLoading = false,
  loadingText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className,
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  const color = colorScheme ?? COLOR_FROM_INTENT[intent ?? "primary"];
  return (
    <MinervaButton
      {...rest}
      type={type}
      appearance={variant}
      variant={BUTTON_COLOR[color]}
      size={BUTTON_SIZE[size]}
      loading={isLoading}
      loadingText={loadingText}
      disabled={disabled || isLoading}
      startIcon={leftIcon}
      endIcon={rightIcon}
      fullWidth={fullWidth}
      className={join(
        ALIAS_COLOR_HOOK[color],
        intent && `ui-button-intent-${intent}`,
        className,
      )}
    >
      {children}
    </MinervaButton>
  );
}

// ─── IconButton ─────────────────────────────────────────────────────────────

export interface IconButtonProps extends Omit<
  ButtonProps,
  "leftIcon" | "rightIcon" | "loadingText"
> {
  /** Accessible name, also shown as the tooltip */
  label: string;
}

const ICON_BUTTON_COLOR: Record<
  ButtonColorScheme,
  NonNullable<MinervaIconButtonProps["variant"]>
> = {
  primary: "primary",
  brand: "primary",
  accent: "primary",
  secondary: "secondary",
  neutral: "neutral",
  gray: "neutral",
  danger: "danger",
  success: "success",
  warning: "warning",
};

export function IconButton({
  label,
  variant = "ghost",
  intent = "neutral",
  colorScheme,
  size = "md",
  isLoading = false,
  fullWidth = false,
  className,
  children,
  ...rest
}: IconButtonProps) {
  const color = colorScheme ?? COLOR_FROM_INTENT[intent];
  return (
    <MinervaIconButton
      {...rest}
      label={label}
      appearance={variant === "link" ? "ghost" : variant}
      variant={ICON_BUTTON_COLOR[color]}
      size={BUTTON_SIZE[size]}
      shape="square"
      loading={isLoading}
      className={join(
        ALIAS_COLOR_HOOK[color],
        `ui-button-intent-${intent}`,
        // square icon buttons have no full-width layout; hook only
        fullWidth && "ui-button-fullwidth",
        className,
      )}
    >
      {children}
    </MinervaIconButton>
  );
}

// ─── Avatar ─────────────────────────────────────────────────────────────────

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarShape = "circle" | "square";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  /** Used for the fallback initials */
  name?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  /** Custom fallback (defaults to the initials of name) */
  fallback?: ReactNode;
  ref?: Ref<HTMLSpanElement>;
}

/** novel-isr-ui's avatar sizes, in pixels */
const AVATAR_PX: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
  "2xl": 96,
};

export function Avatar({
  size = "md",
  shape = "circle",
  alt,
  name,
  children,
  className,
  "aria-label": ariaLabel,
  ...rest
}: AvatarProps) {
  return (
    <MinervaAvatar
      {...rest}
      name={name}
      ariaLabel={ariaLabel ?? (name || "头像")}
      alt={alt ?? name ?? ""}
      size={AVATAR_PX[size]}
      shape={shape === "square" ? "rounded" : "circle"}
      className={join(`ui-avatar-size-${size}`, className)}
    >
      {children ?? "?"}
    </MinervaAvatar>
  );
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLSpanElement> {
  /** Maximum number of avatars shown; the others become "+N" */
  max?: number;
  ref?: Ref<HTMLSpanElement>;
}

export function AvatarGroup({
  ref,
  max,
  children,
  "aria-label": ariaLabel,
  ...rest
}: AvatarGroupProps) {
  const total = Children.toArray(children).length;
  const extra = max === undefined ? 0 : Math.max(0, total - max);
  return (
    <MinervaAvatarGroup
      {...(rest as HTMLAttributes<HTMLDivElement>)}
      ref={ref as unknown as Ref<HTMLDivElement>}
      max={max}
      ariaLabel={
        ariaLabel ?? (extra > 0 ? `头像组，另有 ${extra} 位` : "头像组")
      }
    >
      {children}
    </MinervaAvatarGroup>
  );
}

// ─── Badge ──────────────────────────────────────────────────────────────────

export type BadgeVariant = "subtle" | "solid" | "outline" | "dot";
export type BadgeColorScheme =
  "brand" | "gray" | "success" | "warning" | "danger";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  colorScheme?: BadgeColorScheme;
  ref?: Ref<HTMLSpanElement>;
}

const BADGE_COLOR: Record<
  BadgeColorScheme,
  NonNullable<MinervaBadgeProps["variant"]>
> = {
  brand: "primary",
  gray: "neutral",
  success: "success",
  warning: "warning",
  danger: "danger",
};

export function Badge({
  variant = "subtle",
  colorScheme = "brand",
  children,
  role,
  ref,
  ...rest
}: BadgeProps) {
  return (
    <MinervaBadge
      {...rest}
      ref={ref as Ref<HTMLElement>}
      // novel badges are plain spans, not live regions
      role={role ?? "none"}
      variant={BADGE_COLOR[colorScheme]}
      appearance={variant === "dot" ? "solid" : variant}
      dot={variant === "dot"}
      content={children}
    />
  );
}

// ─── Tag ────────────────────────────────────────────────────────────────────

export type TagSize = "sm" | "md" | "lg";
export type TagColorScheme =
  "brand" | "gray" | "success" | "warning" | "danger";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  size?: TagSize;
  colorScheme?: TagColorScheme;
  /** Shows a close button that calls it */
  onClose?: () => void;
  closeLabel?: string;
  disabled?: boolean;
  ref?: Ref<HTMLSpanElement>;
}

const TAG_SIZE = { sm: "small", md: "medium", lg: "large" } as const;
const TAG_COLOR: Record<TagColorScheme, MinervaTagVariant> = {
  brand: "primary",
  gray: "default",
  success: "success",
  warning: "warning",
  danger: "error",
};

export function Tag({
  size = "md",
  colorScheme = "gray",
  closeLabel = "remove",
  onClose,
  onClick,
  ref,
  ...rest
}: TagProps) {
  return (
    <MinervaTag
      {...(rest as HTMLAttributes<HTMLDivElement>)}
      ref={ref as unknown as Ref<HTMLDivElement>}
      closeLabel={closeLabel}
      size={TAG_SIZE[size]}
      variant={TAG_COLOR[colorScheme]}
      closable={onClose !== undefined}
      onClose={onClose && (() => onClose())}
      clickable={onClick !== undefined}
      onClick={onClick}
      ripple={false}
    />
  );
}

// ─── Alert ──────────────────────────────────────────────────────────────────

export type AlertStatus = "info" | "success" | "warning" | "danger";
export type AlertVariant = "subtle" | "solid" | "outline";

export interface AlertProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  status?: AlertStatus;
  variant?: AlertVariant;
  /** Bold title above the description */
  title?: ReactNode;
  /** Overrides the status icon */
  icon?: ReactNode;
  /** Hides the icon */
  hideIcon?: boolean;
  ref?: Ref<HTMLDivElement>;
}

const ALERT_ICON_LABEL: Record<AlertStatus, string> = {
  info: "信息图标",
  success: "成功图标",
  warning: "警告图标",
  danger: "错误图标",
};

const ALERT_TYPE: Record<AlertVariant, MinervaAlertType> = {
  subtle: "default",
  solid: "filled",
  outline: "outlined",
};

export function Alert({
  status = "info",
  variant = "subtle",
  hideIcon = false,
  role = "alert",
  style,
  ...rest
}: AlertProps) {
  return (
    <MinervaAlert
      {...rest}
      role={role}
      variant={status}
      type={ALERT_TYPE[variant]}
      showIcon={!hideIcon}
      iconLabel={ALERT_ICON_LABEL[status]}
      animation={false}
      style={{ marginBottom: 0, ...style }}
    />
  );
}

// ─── Pagination ─────────────────────────────────────────────────────────────

export interface PaginationProps extends NovelPaginationProps {
  ref?: Ref<HTMLElement>;
}

export function Pagination(props: PaginationProps) {
  return <MinervaPagination {...toMinervaPaginationProps(props)} />;
}

// ─── Steps ──────────────────────────────────────────────────────────────────

export interface StepItem {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface StepsProps {
  items: StepItem[];
  value: string;
  onValueChange?: (value: string) => void;
  label?: string;
  className?: string;
}

export function Steps({ onValueChange, label = "步骤", ...rest }: StepsProps) {
  return <MinervaSteps {...rest} onChange={onValueChange} ariaLabel={label} />;
}

// ─── Upload ─────────────────────────────────────────────────────────────────

export type UploadItem = MinervaUploadItem;

export interface UploadProps {
  label: string;
  value: UploadItem[];
  onFilesSelected: (files: File[]) => void;
  onRemove?: (item: UploadItem) => void;
  onRetry?: (item: UploadItem) => void;
  accept?: string;
  multiple?: boolean;
  replace?: boolean;
  maxCount?: number;
  maxSize?: number;
  busy?: boolean;
  disabled?: boolean;
  selectLabel?: ReactNode;
  className?: string;
}

export function Upload({
  busy,
  selectLabel = "选择文件",
  ...rest
}: UploadProps) {
  return (
    <MinervaUpload
      {...rest}
      loading={busy}
      labels={{
        select: selectLabel,
        uploading: "上传中",
        done: "已上传",
        failed: "上传失败",
        tooMany: (max) => `最多选择 ${max} 个文件`,
        invalidType: (name) => `${name}：不支持此文件类型`,
        tooLarge: (name) => `${name}：文件大小超过限制`,
        retry: (name) => `重试 ${name}`,
        remove: (name) => `移除 ${name}`,
      }}
    />
  );
}
