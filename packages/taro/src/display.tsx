import { previewDocument } from "./preview-document";
import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  useState,
  useEffect,
  useRef,
  useId,
  type ReactNode,
  type CSSProperties,
} from "react";
import { View, Text, Image, Navigator } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { cn, isSafeUrl, resolveSize } from "@minerva/core";
import { useI18n, useThemeTokens } from "./theme";
import { Drawer, Tooltip, type TooltipProps } from "./overlays";
import { Button, type ButtonProps } from "./components";
import {
  Part,
  useValue,
  useNativeContainerWidth,
  type NativeProps,
} from "./shared";
export interface AvatarProps extends NativeProps {
  src?: string;
  name?: string;
  alt?: string;
  fallback?: ReactNode;
  shape?: "circle" | "square" | "rounded";
  size?:
    number | "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge";
  stacked?: boolean;
}
export function Avatar({
  src,
  name = "",
  alt,
  fallback,
  children,
  shape = "circle",
  size = "medium",
  stacked,
  ...props
}: AvatarProps) {
  const { t } = useI18n();
  const [failedSrc, setFailedSrc] = useState<string>();
  const label = props["aria-label"] ?? (name || t("avatar.default"));
  const pixels =
    typeof size === "number"
      ? size
      : {
          xsmall: 24,
          small: 32,
          medium: 48,
          large: 64,
          xlarge: 80,
          xxlarge: 96,
        }[size];
  const trimmed = name.trim();
  const initials = /[\u3400-\u9fff\uf900-\ufaff]/.test(trimmed[0] ?? "")
    ? trimmed[0]
    : trimmed
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();
  const showImage = !!src && failedSrc !== src;
  return (
    <Part
      name="avatar"
      {...props}
      role={showImage ? undefined : "img"}
      aria-label={showImage ? props["aria-label"] : label}
      className={cn(stacked && "mn-avatar-stacked", props.className)}
      style={{
        width: pixels,
        height: pixels,
        borderRadius:
          shape === "circle"
            ? "50%"
            : shape === "square"
              ? 0
              : "var(--radius-md,8px)",
        ...props.style,
      }}
    >
      {showImage ? (
        <Image
          src={src!}
          mode="aspectFill"
          aria-label={alt ?? label}
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <Text aria-hidden>{fallback ?? (initials || children)}</Text>
      )}
    </Part>
  );
}
export function AvatarGroup({
  max,
  count = 0,
  children,
  ...props
}: NativeProps & { max?: number; count?: number }) {
  const { t } = useI18n();
  const items = Children.toArray(children),
    visible = max === undefined ? items : items.slice(0, Math.max(0, max)),
    overflow = Math.max(0, count + items.length - visible.length);
  return (
    <Part
      name="avatar-group"
      role="group"
      {...props}
      aria-label={
        props["aria-label"] ??
        (overflow
          ? t("avatar.groupWithMore", { count: overflow })
          : t("avatar.group"))
      }
    >
      {visible.map((child, index) => (
        <View
          key={isValidElement(child) ? (child.key ?? index) : index}
          className="mn-avatar-group-item"
        >
          {child}
        </View>
      ))}
      {overflow > 0 && (
        <View aria-hidden className="mn-avatar mn-avatar-overflow">
          +{overflow}
        </View>
      )}
    </Part>
  );
}
export interface BadgeProps extends NativeProps {
  content?: ReactNode;
  dot?: boolean;
  color?: string;
  variant?: "solid" | "subtle" | "outline";
  size?: "small" | "medium" | "large";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  icon?: ReactNode;
  borderRadius?: string;
  borderWidth?: string;
  role?: string;
}
export function Badge({
  children,
  content,
  dot,
  color = "primary",
  variant = "solid",
  size = "medium",
  position = "top-right",
  icon,
  borderRadius,
  borderWidth,
  role = "status",
  ...props
}: BadgeProps) {
  const { t } = useI18n();
  const hasChildren =
      children !== undefined && children !== null && children !== false,
    text = typeof children === "string" || typeof children === "number",
    standalone = !hasChildren || (text && content === undefined);
  const corner: CSSProperties = standalone
    ? {}
    : {
        position: "absolute",
        [position.startsWith("top") ? "top" : "bottom"]: 0,
        [position.endsWith("left") ? "left" : "right"]: 0,
        transform: `translate(${position.endsWith("left") ? "-50%" : "50%"},${position.startsWith("top") ? "-50%" : "50%"})`,
      };
  const badge = (
    <Part
      name="badge"
      part={standalone ? "root" : "badge"}
      role={role}
      {...props}
      className={cn(
        "mn-badge-content",
        standalone && "mn-badge-standalone",
        dot && "mn-badge-dot",
        `mn-color-${color}`,
        `mn-variant-${variant}`,
        `mn-size-${size}`,
        props.className,
      )}
      style={{ ...corner, borderRadius, borderWidth, ...props.style }}
    >
      {icon}
      {!dot &&
        (content !== undefined
          ? content
          : text
            ? children
            : hasChildren
              ? t("badge.default")
              : null)}
    </Part>
  );
  return standalone ? (
    badge
  ) : (
    <View className="mn-badge-wrapper">
      {children}
      {badge}
    </View>
  );
}
function cardPadding(value: number | string | undefined) {
  return typeof value === "string" &&
    value in { none: 0, small: 8, medium: 16, large: 24 }
    ? ({ none: 0, small: 8, medium: 16, large: 24 } as Record<string, number>)[
        value
      ]
    : value;
}
export interface CardProps extends NativeProps {
  type?: "button" | "submit" | "reset";
  variant?: string;
  padding?: number | string;
  interactive?: boolean;
  disabled?: boolean;
  onClick?: ButtonProps["onClick"];
  href?: string;
}
export function Card({
  children,
  interactive,
  disabled,
  onClick,
  href,
  variant = "default",
  padding,
  type = "button",
  ...props
}: CardProps) {
  const style = { padding: cardPadding(padding), ...props.style };
  if (href && isSafeUrl(href) && !disabled)
    return (
      <Navigator
        url={href}
        className={cn("mn-card", props.className)}
        style={style}
      >
        {children}
      </Navigator>
    );
  if (interactive)
    return (
      <Button
        type={type}
        variant="ghost"
        className={cn("mn-card", `mn-card-${variant}`, props.className)}
        disabled={disabled}
        onClick={onClick}
        style={style}
      >
        {children}
      </Button>
    );
  return (
    <Part
      name="card"
      {...props}
      style={style}
      className={cn(`mn-card-${variant}`, props.className)}
    >
      {children}
    </Part>
  );
}
export function CardHeader({
  padding,
  ...props
}: NativeProps & { padding?: number | string }) {
  return (
    <Part
      name="card"
      part="header"
      {...props}
      style={{ padding: cardPadding(padding), ...props.style }}
    />
  );
}
export function CardTitle(props: NativeProps) {
  return <Part name="card" part="title" role="heading" {...props} />;
}
export function CardDescription(props: NativeProps) {
  return <Part name="card" part="description" {...props} />;
}
export function CardContent({
  padding,
  animation,
  ...props
}: NativeProps & {
  padding?: number | string;
  animation?: boolean | "fadeIn" | "slideIn" | "zoomIn";
}) {
  const effect = animation === true ? "fadeIn" : animation;
  return (
    <Part
      name="card"
      part="content"
      {...props}
      className={cn(effect && `mn-card-animation-${effect}`, props.className)}
      style={{ padding: cardPadding(padding), ...props.style }}
    />
  );
}
export function CardFooter({
  padding,
  ...props
}: NativeProps & { padding?: number | string }) {
  return (
    <Part
      name="card"
      part="footer"
      {...props}
      style={{ padding: cardPadding(padding), ...props.style }}
    />
  );
}
export function StatCard({
  label,
  value,
  icon,
  description,
  ...props
}: NativeProps & {
  label: ReactNode;
  value: ReactNode;
  icon?: ReactNode;
  description?: ReactNode;
}) {
  return (
    <Card {...props}>
      <CardHeader>
        {icon}
        <Text>{label}</Text>
      </CardHeader>
      <CardContent>
        <Text className="mn-stat-value">{value}</Text>
      </CardContent>
      {description && <CardDescription>{description}</CardDescription>}
    </Card>
  );
}
export interface IconButtonProps extends Omit<ButtonProps, "children"> {
  icon?: ReactNode;
  children?: ReactNode;
  label?: string;
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (value: boolean) => void;
  tooltip?: Omit<TooltipProps, "children" | "content"> & {
    content?: ReactNode;
  };
  showTooltip?: boolean;
}
export function IconButton({
  icon,
  children,
  label,
  pressed,
  defaultPressed,
  onPressedChange,
  onClick,
  tooltip,
  showTooltip = !!label,
  color = "neutral",
  variant = "ghost",
  shape = "circle",
  ...props
}: IconButtonProps) {
  const { t } = useI18n();
  const [active, set] = useValue(
    pressed,
    defaultPressed ?? false,
    onPressedChange,
  );
  const toggle =
    pressed !== undefined || defaultPressed !== undefined || !!onPressedChange;
  const button = (
    <Button
      {...props}
      color={color}
      variant={variant}
      shape={shape}
      aria-label={label ?? props["aria-label"] ?? t("iconButton.default")}
      aria-pressed={toggle ? active : undefined}
      className={cn("mn-icon-button", props.className)}
      onClick={(event) => {
        if (toggle) set(!active);
        onClick?.(event);
      }}
    >
      {icon ?? children}
    </Button>
  );
  return showTooltip ? (
    <Tooltip
      {...tooltip}
      content={tooltip?.content ?? label}
      disabled={props.disabled || props.loading}
    >
      {button}
    </Tooltip>
  ) : (
    button
  );
}
export interface AlertProps extends NativeProps {
  title?: ReactNode;
  color?: string;
  variant?: "subtle" | "soft" | "outline" | "solid";
  size?: "small" | "medium" | "large";
  icon?: ReactNode;
  showIcon?: boolean;
  closable?: boolean;
  closeIcon?: ReactNode;
  onClose?: ButtonProps["onClick"];
  action?: ReactNode;
  collapsible?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpand?: (expanded: boolean) => void;
  onExpandedChange?: (expanded: boolean) => void;
  closeLabel?: string;
  expandLabel?: string;
  collapseLabel?: string;
  iconLabel?: string;
  role?: string;
  animation?: boolean;
  animationName?: "slideIn" | "fadeIn" | "bounce" | "zoom";
  banner?: boolean;
  elevation?: boolean;
  rounded?: boolean;
  borderRadius?: number | string;
}
export function Alert({
  title,
  children,
  color = "info",
  variant = "subtle",
  size = "medium",
  icon,
  showIcon = true,
  closable,
  closeIcon,
  onClose,
  action,
  collapsible,
  expanded,
  defaultExpanded = true,
  onExpand,
  onExpandedChange,
  closeLabel,
  expandLabel,
  collapseLabel,
  iconLabel,
  role,
  animation = true,
  animationName = "slideIn",
  banner,
  elevation,
  rounded = true,
  borderRadius,
  ...props
}: AlertProps) {
  const { t } = useI18n();
  const [visible, setVisible] = useState(true),
    [open, set] = useValue(expanded, defaultExpanded, (next) => {
      onExpand?.(next);
      onExpandedChange?.(next);
    });
  if (!visible) return null;
  const canCollapse = collapsible && Boolean(title);
  return (
    <Part
      name="alert"
      role={
        role ?? (color === "danger" || color === "warning" ? "alert" : "status")
      }
      {...props}
      className={cn(
        `mn-color-${color}`,
        `mn-variant-${variant}`,
        `mn-size-${size}`,
        animation && `mn-alert-${animationName}`,
        elevation && "mn-elevated",
        banner && "mn-alert-banner",
        props.className,
      )}
      style={{
        borderRadius:
          borderRadius ??
          (banner ? 0 : rounded ? "var(--radius-lg)" : "var(--radius-sm)"),
        ...props.style,
      }}
    >
      {showIcon && (
        <Text
          className="mn-alert-icon"
          {...{ role: "img" }}
          aria-label={iconLabel ?? t(`alert.icon.${color}`)}
        >
          {icon ??
            { info: "ⓘ", success: "✓", warning: "⚠", danger: "!" }[color] ??
            "ⓘ"}
        </Text>
      )}
      <View className="mn-alert-content">
        {title && <Text className="mn-alert-title">{title}</Text>}
        {(!canCollapse || open) && <View>{children}</View>}
        {action}
      </View>
      {canCollapse && (
        <Button
          variant="ghost"
          aria-label={
            open
              ? (collapseLabel ?? t("alert.collapse"))
              : (expandLabel ?? t("alert.expand"))
          }
          aria-expanded={open}
          onClick={() => set(!open)}
        >
          {open ? "−" : "+"}
        </Button>
      )}
      {closable && (
        <Button
          variant="ghost"
          aria-label={closeLabel ?? t("alert.close")}
          onClick={(event) => {
            setVisible(false);
            onClose?.(event);
          }}
        >
          {closeIcon ?? "×"}
        </Button>
      )}
    </Part>
  );
}
export interface TagProps extends NativeProps {
  color?: string;
  variant?: "subtle" | "soft" | "outline" | "solid";
  size?: "small" | "medium" | "large";
  shape?: "square" | "rounded" | "circle";
  closable?: boolean;
  closeLabel?: string | ((label: string) => string);
  closeIcon?: ReactNode;
  onClose?: ButtonProps["onClick"];
  clickable?: boolean;
  onClick?: ButtonProps["onClick"];
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
  icon?: ReactNode;
  avatar?: ReactNode;
  loading?: boolean;
  elevation?: boolean;
  ripple?: boolean;
}
function nativeText(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) =>
      typeof child === "string" || typeof child === "number"
        ? String(child)
        : isValidElement<{ children?: ReactNode }>(child)
          ? nativeText(child.props.children)
          : "",
    )
    .join("");
}
export function Tag({
  children,
  color = "neutral",
  variant = "subtle",
  size = "medium",
  shape = "rounded",
  closable,
  closeLabel,
  closeIcon,
  onClose,
  clickable,
  onClick,
  pressed,
  onPressedChange,
  disabled,
  icon,
  avatar,
  loading,
  elevation,
  ripple = true,
  ...props
}: TagProps) {
  const { t } = useI18n();
  const generated = useId().replace(/[^a-zA-Z0-9_-]/g, ""),
    rootId = props.id ?? `mn-tag-${generated}`,
    mounted = useRef(true);
  const [ripples, setRipples] = useState<
      { id: number; style?: CSSProperties }[]
    >([]),
    counter = useRef(0),
    timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  useEffect(() => {
    mounted.current = true;
    const active = timers.current;
    return () => {
      mounted.current = false;
      active.forEach(clearTimeout);
      active.clear();
    };
  }, []);
  const text = nativeText(children);
  const close =
    typeof closeLabel === "function"
      ? closeLabel(text)
      : (closeLabel ??
        (text ? t("tag.closeWithLabel", { label: text }) : t("tag.close")));
  const addRipple = (
    event: Parameters<NonNullable<ButtonProps["onClick"]>>[0],
  ) => {
    if (!ripple) return;
    const id = ++counter.current;
    const emit = (style?: CSSProperties) => {
      if (!mounted.current) return;
      setRipples((values) => [...values, { id, style }]);
      const timer = setTimeout(() => {
        setRipples((values) => values.filter((value) => value.id !== id));
        timers.current.delete(timer);
      }, 600);
      timers.current.add(timer);
    };
    const native = event as unknown as {
      detail?: number | { x?: number; y?: number };
      clientX?: number;
      clientY?: number;
      changedTouches?: { clientX: number; clientY: number }[];
    };
    const touch = native.changedTouches?.[0],
      detail = typeof native.detail === "object" ? native.detail : undefined;
    const x = touch?.clientX ?? detail?.x ?? native.clientX,
      y = touch?.clientY ?? detail?.y ?? native.clientY;
    const query = Taro.createSelectorQuery?.();
    if (!query) {
      emit();
      return;
    }
    query
      .select(`#${rootId}`)
      .boundingClientRect((rect) => {
        if (!rect || !("width" in rect)) {
          emit();
          return;
        }
        const diameter = Math.max(rect.width, rect.height),
          radius = diameter / 2,
          center = native.detail === 0 || x === undefined || y === undefined;
        emit({
          width: diameter,
          height: diameter,
          left: center ? rect.width / 2 - radius : x - rect.left - radius,
          top: center ? rect.height / 2 - radius : y - rect.top - radius,
          bottom: "auto",
          right: "auto",
          borderRadius: "50%",
        });
      })
      .exec();
  };
  return (
    <Part
      name="tag"
      {...props}
      id={rootId}
      aria-busy={loading || undefined}
      className={cn(
        `mn-color-${color}`,
        `mn-variant-${variant}`,
        `mn-size-${size}`,
        elevation && "mn-elevated",
        pressed && "mn-selected",
        disabled && "mn-disabled",
        props.className,
      )}
      style={{
        borderRadius:
          shape === "square"
            ? 0
            : shape === "circle"
              ? "9999px"
              : "var(--radius-md,8px)",
        ...props.style,
      }}
    >
      {loading ? (
        <View className="mn-spinner" aria-hidden />
      ) : (
        <>
          {avatar}
          {icon}
        </>
      )}
      {clickable ? (
        <Button
          variant="ghost"
          disabled={disabled || loading}
          aria-pressed={pressed}
          onClick={(event) => {
            addRipple(event);
            onClick?.(event);
            if (pressed !== undefined) onPressedChange?.(!pressed);
          }}
        >
          {children}
        </Button>
      ) : (
        <Text>{children}</Text>
      )}
      {closable && !loading && (
        <Button
          variant="ghost"
          disabled={disabled}
          aria-label={close}
          onClick={(event) => {
            event.stopPropagation();
            onClose?.(event);
          }}
        >
          {closeIcon ?? "×"}
        </Button>
      )}
      {ripples.map(({ id, style }) => (
        <View key={id} style={style} aria-hidden className="mn-tag-ripple" />
      ))}
    </Part>
  );
}
export function Divider({
  orientation = "horizontal",
  variant = "solid",
  children,
  thickness = 1,
  spacing: gap = 16,
  length,
  textAlign = "center",
  elevation,
  flexItem,
  ...props
}: NativeProps & {
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dashed" | "dotted";
  thickness?: number;
  spacing?: number;
  length?: number | string;
  textAlign?: "left" | "center" | "right";
  elevation?: boolean;
  flexItem?: boolean;
}) {
  const vertical = orientation === "vertical",
    hasText = !vertical && Children.count(children) > 0;
  const border: CSSProperties = {
    borderStyle: variant,
    borderWidth: 0,
    [vertical ? "borderLeftWidth" : "borderTopWidth"]: thickness,
    borderColor: "var(--divider-color,var(--border-color,#d1d5db))",
  };
  return (
    <Part
      name="divider"
      role="separator"
      {...props}
      aria-orientation={orientation}
      className={cn(
        `mn-divider-${orientation}`,
        elevation && "mn-elevated",
        props.className,
      )}
      style={{
        ...(!hasText ? border : {}),
        width: vertical ? undefined : (length ?? "100%"),
        height: vertical ? (length ?? (flexItem ? "auto" : "1em")) : undefined,
        marginTop: vertical ? 0 : gap,
        marginBottom: vertical ? 0 : gap,
        marginLeft: vertical ? gap : 0,
        marginRight: vertical ? gap : 0,
        alignSelf: flexItem ? "stretch" : undefined,
        display: hasText ? "flex" : undefined,
        alignItems: hasText ? "center" : undefined,
        ...props.style,
      }}
    >
      {hasText && (
        <>
          <View
            className="mn-divider-line"
            style={{
              ...border,
              flexGrow: textAlign === "left" ? 0 : 1,
              width: textAlign === "left" ? 24 : undefined,
            }}
          />
          <Text className="mn-divider-text">{children}</Text>
          <View
            className="mn-divider-line"
            style={{
              ...border,
              flexGrow: textAlign === "right" ? 0 : 1,
              width: textAlign === "right" ? 24 : undefined,
            }}
          />
        </>
      )}
    </Part>
  );
}
export function Empty({
  title,
  description,
  icon,
  action,
  secondaryAction,
  size,
  useSvg = false,
  width,
  height,
  showShadow,
  children,
  ...props
}: NativeProps & {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  secondaryAction?: ReactNode;
  size?: string;
  useSvg?: boolean;
  width?: number | string;
  height?: number | string;
  showShadow?: boolean;
}) {
  const { t } = useI18n();
  const { colors } = useThemeTokens();
  const titleId = useId(),
    descriptionId = useId();
  if (description === undefined) description = t("empty.description");
  const hasTitle = title != null && title !== false && title !== "";
  const hasDescription =
    description != null && description !== false && description !== "";
  return (
    <Part
      name="empty"
      role="status"
      {...props}
      aria-labelledby={
        props["aria-label"]
          ? undefined
          : (props["aria-labelledby"] ??
            (hasTitle ? titleId : hasDescription ? descriptionId : undefined))
      }
      aria-describedby={hasTitle && hasDescription ? descriptionId : undefined}
      style={{
        width,
        height,
        boxShadow: showShadow ? "var(--shadow-md)" : undefined,
        ...props.style,
      }}
      className={cn(
        size && `mn-size-${size}`,
        size && "mn-empty-sized",
        props.className,
      )}
    >
      {icon !== null &&
        icon !== false &&
        (icon ? (
          <View className="mn-empty-icon">{icon}</View>
        ) : useSvg ? (
          <Image
            className="mn-empty-illustration"
            mode="aspectFit"
            src={`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="41" viewBox="0 0 64 41"><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse cx="32" cy="33" rx="32" ry="7" fill="${colors["surface-muted-color"]}"/><g fill-rule="nonzero" stroke="${colors["border-strong-color"]}"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"/><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="${colors["surface-color"]}"/></g></g></svg>`)}`}
          />
        ) : (
          <Text className="mn-empty-icon">◇</Text>
        ))}
      {hasTitle && (
        <Text id={titleId} className="mn-empty-title">
          {title}
        </Text>
      )}
      {hasDescription && <Text id={descriptionId}>{description}</Text>}
      {(action || secondaryAction) && (
        <View className="mn-empty-actions">
          {action}
          {secondaryAction}
        </View>
      )}
      {children && <View className="mn-empty-footer">{children}</View>}
    </Part>
  );
}
export interface SkeletonProps extends NativeProps {
  loading?: boolean;
  width?: number | string;
  height?: number | string;
  variant?:
    | "text"
    | "circular"
    | "rectangular"
    | "rounded"
    | "button"
    | "image"
    | "card"
    | "rect"
    | "circle";
  animation?: "pulse" | "wave" | "false" | boolean;
  borderRadius?: number | string;
  lines?: number;
  avatar?: boolean;
  avatarSize?: number | string;
  avatarShape?: "circle" | "square";
  size?: number | string;
  decorative?: boolean;
  paragraph?: boolean;
  title?: boolean;
  active?: boolean;
}
export function Skeleton({
  loading = true,
  children,
  width,
  height,
  variant = "text",
  animation = "pulse",
  borderRadius,
  lines = 1,
  avatar,
  avatarSize = 40,
  avatarShape = "circle",
  size,
  decorative,
  paragraph,
  title,
  active,
  ...props
}: SkeletonProps) {
  const { t } = useI18n();
  if (!loading) return <>{children}</>;
  const effect = animation === true ? "pulse" : animation;
  const cls = cn(
    "mn-skeleton-placeholder",
    `mn-skeleton-${variant}`,
    effect && effect !== "false" && `mn-skeleton-${effect}`,
  );
  const count = Number.isFinite(lines) ? Math.max(0, Math.floor(lines)) : 0;
  const circle = variant === "circular" || variant === "circle";
  const geometry: CSSProperties = {
    width: circle ? (size ?? width ?? 32) : width,
    height: circle ? (size ?? width ?? 32) : height,
    borderRadius: borderRadius ?? (circle ? "50%" : undefined),
  };
  if (decorative)
    return (
      <Part
        name="skeleton"
        {...props}
        aria-hidden
        className={cn(cls, props.className)}
        style={{ ...geometry, ...props.style }}
      />
    );
  return (
    <Part
      name="skeleton"
      {...props}
      role="status"
      aria-busy
      aria-label={props["aria-label"] ?? t("common.loading")}
      className={cn(
        "mn-skeleton-container",
        avatar && "mn-skeleton-with-avatar",
        variant === "card" && "mn-skeleton-card",
        active && "mn-skeleton-active",
        props.className,
      )}
    >
      {avatar && (
        <View
          data-part="avatar"
          className={cn(cls, "mn-skeleton-avatar")}
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarShape === "circle" ? "50%" : 0,
          }}
        />
      )}
      <View className="mn-skeleton-content">
        {title && (
          <View data-part="title" className={cn(cls, "mn-skeleton-title")} />
        )}{" "}
        {paragraph
          ? ["100%", "100%", "92%", "60%"].map((w, i) => (
              <View
                key={i}
                data-part="line"
                className={cls}
                style={{ width: w, height: 16 }}
              />
            ))
          : !title &&
            variant !== "card" &&
            Array.from({ length: count }, (_, i) => (
              <View
                key={i}
                data-part="line"
                className={cls}
                style={{ ...geometry, ...props.style }}
              />
            ))}
      </View>
    </Part>
  );
}
export function SkeletonText({
  lines = 3,
  lineHeight = "1em",
  gap = 2,
  shrinkLast = true,
  animation = "pulse",
  ...props
}: NativeProps & {
  lines?: number;
  lineHeight?: number | string;
  gap?: number;
  shrinkLast?: boolean;
  animation?: SkeletonProps["animation"];
}) {
  const count = Number.isFinite(lines) ? Math.max(0, Math.floor(lines)) : 0;
  return (
    <Part
      name="skeleton-text"
      {...props}
      aria-hidden
      style={{
        display: "flex",
        flexDirection: "column",
        gap: spacing(gap),
        ...props.style,
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <Skeleton
          key={i}
          decorative
          animation={animation}
          height={lineHeight}
          width={shrinkLast && i === count - 1 ? "70%" : "100%"}
        />
      ))}
    </Part>
  );
}
export function ProgressIndicator({
  label,
  variant = "spinner",
  size = "medium",
  color = "primary",
  decorative,
  icon,
  full,
  width,
  ...props
}: NativeProps & {
  label?: ReactNode;
  variant?: "spinner" | "bar" | "wave" | "circle" | "dottedBar";
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  color?: string;
  decorative?: boolean;
  icon?: ReactNode;
  full?: boolean;
  width?: number | string;
}) {
  const { t } = useI18n();
  const diameter = { xsmall: 12, small: 16, medium: 24, large: 32, xlarge: 48 }[
    size
  ];
  return (
    <Part
      name="progress-indicator"
      role={decorative ? undefined : "progressbar"}
      {...props}
      aria-hidden={decorative || undefined}
      aria-label={
        props["aria-label"] ??
        (typeof label === "string" ? label : t("common.loading"))
      }
      className={cn(
        `mn-progress-${variant}`,
        `mn-color-${color}`,
        `mn-size-${size}`,
        props.className,
      )}
      style={{
        width: full
          ? "100%"
          : (width ??
            (variant === "bar" || variant === "dottedBar" ? 200 : undefined)),
        ...props.style,
      }}
    >
      {icon}
      {variant === "bar" ? (
        <View className="mn-progress-bar-track">
          <View className="mn-progress-bar-fill" />
        </View>
      ) : variant === "wave" || variant === "dottedBar" ? (
        <View className="mn-progress-sequence">
          {Array.from({ length: 5 }, (_, index) => (
            <View
              key={index}
              className={
                variant === "wave" ? "mn-progress-wave-bar" : "mn-progress-dot"
              }
              style={{
                animationDelay: `${index * 0.1}s`,
                height:
                  variant === "wave" ? diameter : Math.max(4, diameter / 4),
              }}
            />
          ))}
        </View>
      ) : (
        <View
          className={cn(
            "mn-spinner",
            variant === "circle" && "mn-progress-circle",
          )}
          style={{ width: diameter, height: diameter }}
        />
      )}
      {label && <Text>{label}</Text>}
    </Part>
  );
}
export function LoadingState({
  label,
  size,
  ...props
}: NativeProps & {
  label?: string;
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
}) {
  const { t } = useI18n();
  label ??= t("loadingState.label");
  return (
    <Part name="loading-state" {...props}>
      <ProgressIndicator label={label} size={size} />
    </Part>
  );
}
export function TextLink({
  href,
  children,
  variant = "primary",
  ...props
}: NativeProps & { href?: string; variant?: string; onClick?: () => void }) {
  if (!href || !isSafeUrl(href))
    return (
      <Text className="mn-text-link" onClick={props.onClick}>
        {children}
      </Text>
    );
  return (
    <Navigator
      url={href}
      {...{ "aria-label": props["aria-label"] }}
      className={cn("mn-text-link", `mn-color-${variant}`, props.className)}
    >
      {children}
    </Navigator>
  );
}
export function DescriptionList({
  items,
  bordered,
  striped,
  children,
  ...props
}: NativeProps & {
  items?: { label: ReactNode; value: ReactNode }[];
  bordered?: boolean;
  striped?: boolean;
}) {
  return (
    <Part
      name="description-list"
      {...props}
      className={cn(
        bordered && "mn-bordered",
        striped && "mn-striped",
        props.className,
      )}
    >
      {items?.map((item, i) => (
        <DescriptionItem key={i} label={item.label}>
          {item.value}
        </DescriptionItem>
      ))}
      {children}
    </Part>
  );
}
export function DescriptionItem({
  label,
  children,
  ...props
}: NativeProps & { label: ReactNode }) {
  return (
    <Part name="description-list" part="item" {...props}>
      <Text className="mn-description-label">{label}</Text>
      <View className="mn-description-value">{children}</View>
    </Part>
  );
}
export function List({
  density = "medium",
  bordered,
  dividers = true,
  ...props
}: NativeProps & {
  density?: string;
  bordered?: boolean;
  dividers?: boolean;
  role?: string;
}) {
  return (
    <Part
      name="list"
      role="list"
      {...props}
      className={cn(
        `mn-density-${density}`,
        bordered && "mn-bordered",
        dividers && "mn-dividers",
        props.className,
      )}
    />
  );
}
export function ListItem({
  primary,
  secondary,
  icon,
  actions,
  children,
  ...props
}: NativeProps & {
  primary?: ReactNode;
  secondary?: ReactNode;
  icon?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <Part name="list" part="item" role="listitem" {...props}>
      {icon}
      <View className="mn-list-content">
        <Text>{primary}</Text>
        {secondary && <Text className="mn-muted">{secondary}</Text>}
        {children}
      </View>
      {actions}
    </Part>
  );
}
export function CodeBlock({
  code = "",
  language,
  copyable = true,
  wrap = true,
  maxHeight,
  ...props
}: NativeProps & {
  code?: string;
  language?: string;
  copyable?: boolean;
  wrap?: boolean;
  maxHeight?: number | string;
}) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  return (
    <Part name="code-block" {...props}>
      <View className="mn-code-toolbar">
        <Text>{language}</Text>
        {copyable && (
          <Button
            variant="ghost"
            onClick={async () => {
              await Taro.setClipboardData({ data: code });
              setCopied(true);
            }}
          >
            {copied ? t("codeBlock.copied") : t("codeBlock.copy")}
          </Button>
        )}
      </View>
      <Text
        selectable
        className="mn-code"
        style={{ whiteSpace: wrap ? "pre-wrap" : "pre", maxHeight }}
      >
        {code}
      </Text>
    </Part>
  );
}
export function Prose(props: NativeProps) {
  return <Part name="prose" {...props} />;
}
export function HtmlPreview({
  html,
  title,
  viewport = "desktop",
  height = 600,
  mobileWidth = 375,
  ...props
}: NativeProps & {
  html: string;
  title?: string;
  viewport?: string;
  height?: number | string;
  mobileWidth?: number;
}) {
  if (typeof document !== "undefined" && Taro.getEnv() === Taro.ENV_TYPE.WEB)
    return (
      <Part name="html-preview" {...props}>
        <iframe
          title={title ?? "HTML preview"}
          sandbox=""
          referrerPolicy="no-referrer"
          srcDoc={previewDocument(html)}
          style={{
            width: viewport === "mobile" ? mobileWidth : "100%",
            height,
            border: 0,
          }}
        />
      </Part>
    );
  return (
    <Part name="html-preview" {...props}>
      <Text className="mn-muted">
        {title ? `${title} — ` : ""}HTML source preview (native platforms do not
        execute HTML)
      </Text>
      <CodeBlock code={html} language="html" copyable={false} />
    </Part>
  );
}
function spacing(value: number | string | undefined) {
  if (value === undefined) return undefined;
  const text = String(value).trim();
  return /^\d+(\.\d+)?$/.test(text)
    ? `var(--space-${text.replace(".", "-")}, ${Number(text) * 4}px)`
    : text;
}
export interface BoxProps extends NativeProps {
  p?: number | string;
  px?: number | string;
  py?: number | string;
  pt?: number | string;
  pr?: number | string;
  pb?: number | string;
  pl?: number | string;
  m?: number | string;
  mx?: number | string;
  my?: number | string;
  mt?: number | string;
  mr?: number | string;
  mb?: number | string;
  ml?: number | string;
  w?: number | string;
  h?: number | string;
  minW?: number | string;
  minH?: number | string;
  maxW?: number | string;
  maxH?: number | string;
  bg?: string;
  rounded?: number | string;
  border?: string;
  boxShadow?: string;
}
export function Box({
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  m,
  mx,
  my,
  mt,
  mr,
  mb,
  ml,
  w,
  h,
  minW,
  minH,
  maxW,
  maxH,
  bg,
  rounded,
  border,
  boxShadow,
  ...props
}: BoxProps) {
  return (
    <Part
      name="box"
      {...props}
      style={{
        padding: spacing(p),
        paddingLeft: spacing(pl ?? px ?? p),
        paddingRight: spacing(pr ?? px ?? p),
        paddingTop: spacing(pt ?? py ?? p),
        paddingBottom: spacing(pb ?? py ?? p),
        margin: spacing(m),
        marginLeft: spacing(ml ?? mx ?? m),
        marginRight: spacing(mr ?? mx ?? m),
        marginTop: spacing(mt ?? my ?? m),
        marginBottom: spacing(mb ?? my ?? m),
        width: w === undefined ? undefined : resolveSize(w),
        height: h === undefined ? undefined : resolveSize(h),
        minWidth: minW === undefined ? undefined : resolveSize(minW),
        minHeight: minH === undefined ? undefined : resolveSize(minH),
        maxWidth: maxW === undefined ? undefined : resolveSize(maxW),
        maxHeight: maxH === undefined ? undefined : resolveSize(maxH),
        background: bg
          ? ({
              bg: "var(--surface-color)",
              "bg.subtle": "var(--surface-subtle-color)",
              "bg.muted": "var(--surface-muted-color)",
              "bg.emphasis": "var(--surface-muted-color)",
              "bg.canvas": "var(--canvas-color)",
              "bg.elevated": "var(--surface-elevated-color)",
            }[bg] ?? bg)
          : undefined,
        borderRadius:
          typeof rounded === "string" &&
          ["none", "sm", "md", "lg", "xl", "2xl", "full"].includes(rounded)
            ? `var(--radius-${rounded})`
            : rounded,
        border,
        boxShadow:
          boxShadow && ["sm", "md", "lg", "xl"].includes(boxShadow)
            ? `var(--shadow-${boxShadow})`
            : boxShadow,
        ...props.style,
      }}
    />
  );
}
export interface StackProps extends NativeProps {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  gap?: number | string;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"] | "between" | "around" | "evenly";
  wrap?: boolean;
  separator?: ReactNode;
  attached?: boolean;
  role?: string;
}
export function Stack({
  direction = "column",
  gap,
  align,
  justify,
  wrap,
  separator,
  attached,
  children,
  role,
  ...props
}: StackProps) {
  const items = Children.toArray(children);
  return (
    <Part
      name="stack"
      role={role ?? (attached ? "group" : undefined)}
      {...props}
      className={cn(
        attached && "mn-stack-attached",
        `mn-stack-${direction}`,
        props.className,
      )}
      style={{
        display: "flex",
        flexDirection: direction,
        gap: attached ? 0 : spacing(gap),
        alignItems:
          align === "start"
            ? "flex-start"
            : align === "end"
              ? "flex-end"
              : align,
        justifyContent:
          justify === "between"
            ? "space-between"
            : justify === "around"
              ? "space-around"
              : justify === "evenly"
                ? "space-evenly"
                : justify === "start"
                  ? "flex-start"
                  : justify === "end"
                    ? "flex-end"
                    : justify,
        flexWrap: wrap ? "wrap" : "nowrap",
        ...props.style,
      }}
    >
      {items.map((child, index) => (
        <Fragment key={isValidElement(child) ? (child.key ?? index) : index}>
          {index > 0 && !attached && separator}
          {attached && isValidElement<NativeProps>(child)
            ? cloneElement(child, {
                className: cn(
                  child.props.className,
                  "mn-stack-attached-item",
                  index > 0 && "mn-stack-has-before",
                  index < items.length - 1 && "mn-stack-has-after",
                ),
              })
            : child}
        </Fragment>
      ))}
    </Part>
  );
}
export function HStack(props: StackProps) {
  return <Stack {...props} direction="row" />;
}
export function VStack(props: StackProps) {
  return <Stack {...props} direction="column" />;
}
export interface ResponsiveGridProps extends NativeProps {
  columns?:
    | number
    | { base?: number; sm?: number; md?: number; lg?: number; xl?: number };
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
}
export function ResponsiveGrid({
  columns = 1,
  gap = 4,
  rowGap,
  columnGap,
  ...props
}: ResponsiveGridProps) {
  const [id, width] = useNativeContainerWidth(props.id);
  const values =
    typeof columns === "number" ? [columns] : Object.values(columns);
  if (
    values.some(
      (n) => n !== undefined && (!Number.isInteger(n) || n < 1 || n > 12),
    )
  )
    throw new RangeError("Grid columns must be integers from 1 to 12");
  let count = typeof columns === "number" ? columns : (columns.base ?? 1);
  if (typeof columns !== "number") {
    if (width >= 480) count = columns.sm ?? count;
    if (width >= 768) count = columns.md ?? count;
    if (width >= 1200) count = columns.lg ?? count;
    if (width >= 1536) count = columns.xl ?? count;
  }
  return (
    <Part
      name="responsive-grid"
      {...props}
      id={id}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
        gap: spacing(gap),
        rowGap: spacing(rowGap ?? gap),
        columnGap: spacing(columnGap ?? gap),
        ...props.style,
      }}
    />
  );
}
export function GridItem({
  fullWidth,
  ...props
}: NativeProps & { fullWidth?: boolean }) {
  return (
    <Part
      name="grid-item"
      {...props}
      style={{ gridColumn: fullWidth ? "1 / -1" : undefined, ...props.style }}
    />
  );
}
export function FormLayout(props: ResponsiveGridProps) {
  return (
    <ResponsiveGrid
      {...props}
      className={cn("mn-form-layout", props.className)}
    />
  );
}
export function SplitLayout({
  aside,
  asideWidth = 320,
  gap = 6,
  collapseBelow = "md",
  children,
  ...props
}: NativeProps & {
  aside: ReactNode;
  asideWidth?: number;
  gap?: number | string;
  collapseBelow?: "md" | "lg";
}) {
  const [id, width] = useNativeContainerWidth(props.id);
  if (!Number.isFinite(asideWidth) || asideWidth <= 0)
    throw new RangeError("asideWidth must be finite and positive");
  const stacked = width < (collapseBelow === "lg" ? 1200 : 768);
  const hasAside = aside !== null && aside !== undefined && aside !== false;
  return (
    <Part
      name="split-layout"
      {...props}
      id={id}
      style={{
        gap: spacing(gap),
        flexDirection: stacked ? "column" : "row",
        ...props.style,
      }}
    >
      <View
        className="mn-split-main"
        style={{ width: stacked ? "100%" : undefined }}
      >
        {children}
      </View>
      {hasAside && (
        <View
          className="mn-split-aside"
          style={{ width: stacked ? "100%" : Math.min(asideWidth, width / 2) }}
        >
          {aside}
        </View>
      )}
    </Part>
  );
}
export function Page({
  maxWidth = 1200,
  ...props
}: NativeProps & { maxWidth?: number | string }) {
  return <Part name="page" {...props} style={{ maxWidth, ...props.style }} />;
}
export function PageHeader({
  title,
  description,
  actions,
  children,
  ...props
}: NativeProps & {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <Part name="page" part="header" {...props}>
      <View>
        <Text className="mn-page-title">{title}</Text>
        {description && <Text className="mn-muted">{description}</Text>}
        {children}
      </View>
      {actions}
    </Part>
  );
}
export function PageSection({
  title,
  description,
  actions,
  icon,
  children,
  ...props
}: NativeProps & {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <Part name="page" part="section" {...props}>
      <View className="mn-page-section-heading">
        {icon}
        <Text>{title}</Text>
        {actions}
      </View>
      {description && <Text className="mn-muted">{description}</Text>}
      {children}
    </Part>
  );
}
export function Toolbar({
  wrap = true,
  density = "medium",
  ...props
}: NativeProps & { wrap?: boolean; density?: string }) {
  return (
    <Part
      name="toolbar"
      role="toolbar"
      {...props}
      className={cn(`mn-density-${density}`, props.className)}
      style={{ flexWrap: wrap ? "wrap" : "nowrap", ...props.style }}
    />
  );
}
export type AppShellSidebarMode = "expanded" | "compact" | "floating";
export interface AppShellNavigationState {
  collapsed: boolean;
  isMobile: boolean;
  closeNavigation: () => void;
  expandNavigation: () => void;
}
export interface AppShellLabels {
  expand: string;
  collapse: string;
  enableFloating: string;
  disableFloating: string;
  openNavigation: string;
  closeNavigation: string;
}
export interface AppShellProps extends NativeProps {
  brand?: ReactNode;
  brandIcon?: ReactNode;
  navigation?: ReactNode | ((state: AppShellNavigationState) => ReactNode);
  navigationLabel?: string;
  navigationKey?: string;
  headerActions?: ReactNode;
  pageNavigation?: ReactNode;
  sidebarMode?: AppShellSidebarMode;
  defaultSidebarMode?: AppShellSidebarMode;
  onSidebarModeChange?: (mode: AppShellSidebarMode) => void;
  labels?: Partial<AppShellLabels>;
}
export function AppShell({
  brand,
  brandIcon,
  navigation,
  navigationLabel,
  navigationKey,
  headerActions,
  pageNavigation,
  children,
  sidebarMode,
  defaultSidebarMode = "expanded",
  onSidebarModeChange,
  labels,
  ...props
}: AppShellProps) {
  const { t } = useI18n();
  const [id, width] = useNativeContainerWidth(props.id);
  const isMobile = width <= 768;
  const [mode, set] = useValue(
      sidebarMode,
      defaultSidebarMode,
      onSidebarModeChange,
    ),
    [mobileOpen, setMobileOpen] = useState(false),
    [floatingOpen, setFloatingOpen] = useState(false);
  useEffect(() => {
    setMobileOpen(false);
    setFloatingOpen(false);
  }, [navigationKey, isMobile]);
  const collapsed =
    !isMobile && mode !== "expanded" && !(mode === "floating" && floatingOpen);
  const closeNavigation = () => {
    setMobileOpen(false);
    setFloatingOpen(false);
  };
  const state: AppShellNavigationState = {
    collapsed,
    isMobile,
    closeNavigation,
    expandNavigation: () => set("expanded"),
  };
  const nav = typeof navigation === "function" ? navigation(state) : navigation;
  const label = (name: keyof AppShellLabels) =>
    labels?.[name] ?? t(`appShell.${name}`);
  const toggle = () => {
    if (isMobile) setMobileOpen(true);
    else if (mode === "floating") setFloatingOpen(!floatingOpen);
    else set(mode === "expanded" ? "compact" : "expanded");
  };
  return (
    <Part
      name="app-shell"
      {...props}
      id={id}
      className={cn(`mn-sidebar-${mode}`, props.className)}
    >
      <View className="mn-app-header">
        <Button
          variant="ghost"
          aria-label={
            isMobile
              ? label("openNavigation")
              : collapsed
                ? label("expand")
                : label("collapse")
          }
          onClick={toggle}
        >
          ☰
        </Button>
        {brandIcon}
        {brand}
        {headerActions}
        {!isMobile && (
          <Button
            variant="ghost"
            aria-label={
              mode === "floating"
                ? label("disableFloating")
                : label("enableFloating")
            }
            aria-pressed={mode === "floating"}
            onClick={() => {
              set(mode === "floating" ? "compact" : "floating");
              setFloatingOpen(false);
            }}
          >
            ⌖
          </Button>
        )}
      </View>
      <View
        className="mn-app-body"
        style={{ position: "relative", flexDirection: "row" }}
      >
        {!isMobile && mode === "floating" && floatingOpen && (
          <View
            className="mn-app-floating-backdrop"
            onClick={() => setFloatingOpen(false)}
          />
        )}{" "}
        {!isMobile && (
          <View
            className="mn-app-sidebar-space"
            style={{ width: mode === "expanded" ? 240 : 64, flexShrink: 0 }}
          >
            <View
              className={cn(
                "mn-app-sidebar",
                mode === "floating" && "mn-app-floating",
              )}
              aria-label={navigationLabel ?? t("appShell.navigation")}
              style={{
                width: collapsed ? 64 : 240,
                position: mode === "floating" ? "absolute" : "relative",
                top: 0,
                bottom: 0,
                zIndex: mode === "floating" ? 20 : undefined,
              }}
            >
              {nav}
            </View>
          </View>
        )}
        <View className="mn-app-main" {...{ role: "main" }}>
          {pageNavigation}
          {children}
        </View>
      </View>
      {isMobile && (
        <Drawer
          open={mobileOpen}
          onOpenChange={setMobileOpen}
          title={navigationLabel ?? t("appShell.navigation")}
          closeLabel={label("closeNavigation")}
          side="left"
        >
          {mobileOpen && nav}
        </Drawer>
      )}
    </Part>
  );
}
