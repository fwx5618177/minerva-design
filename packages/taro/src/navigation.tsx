import { useH5List } from "./h5";
import {
  Children,
  isValidElement,
  createContext,
  useContext,
  useId,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import Taro from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import {
  cn,
  getTabsTabStop,
  getPaginationItems,
  getPaginationVisibleRange,
} from "@minerva/core";
import { useI18n } from "./theme";
import { Button, Input } from "./components";
import { Part, useValue, type NativeProps } from "./shared";
export interface TabsProps extends NativeProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  variant?: string;
  color?: string;
  activationMode?: "automatic" | "manual";
  dir?: "ltr" | "rtl";
}
const TabsContext = createContext({
  value: "",
  set: (() => {}) as (value: string) => void,
  id: "tabs",
  tabStop: undefined as string | undefined,
  color: "primary",
  activationMode: "automatic" as "automatic" | "manual",
  dir: undefined as "ltr" | "rtl" | undefined,
  orientation: "horizontal" as "horizontal" | "vertical",
});
export function Tabs({
  value,
  defaultValue = "",
  onChange,
  orientation = "horizontal",
  variant = "line",
  color = "primary",
  dir,
  activationMode = "automatic",
  children,
  ...props
}: TabsProps) {
  const [current, set] = useValue(value, defaultValue, onChange);
  const id = useId();
  return (
    <TabsContext.Provider
      value={{
        value: current,
        set,
        id,
        tabStop: undefined,
        color,
        orientation,
        activationMode,
        dir,
      }}
    >
      <Part
        name="tabs"
        {...props}
        style={{ direction: dir, ...props.style }}
        className={cn(
          `mn-direction-${orientation}`,
          `mn-tabs-${variant}`,
          props.className,
        )}
      >
        {children}
      </Part>
    </TabsContext.Provider>
  );
}
function collectNativeTabs(
  children: ReactNode,
): { value: string; disabled?: boolean }[] {
  return Children.toArray(children).flatMap((child) => {
    if (
      !isValidElement<{
        value?: string;
        disabled?: boolean;
        children?: ReactNode;
      }>(child) ||
      child.type === Tabs
    )
      return [];
    if (child.type === Tab && child.props.value !== undefined)
      return [{ value: child.props.value, disabled: child.props.disabled }];
    return collectNativeTabs(child.props.children);
  });
}
export function TabList({
  children,
  loop = true,
  ...props
}: NativeProps & { loop?: boolean }) {
  const tabs = useContext(TabsContext);
  const generatedListId = useId();
  const listId = props.id ?? generatedListId;
  useH5List(listId, {
    selector: '[role="tab"]',
    orientation: tabs.orientation,
    dir: tabs.dir,
    loop,
    automatic: tabs.activationMode === "automatic",
  });
  const stop = getTabsTabStop(collectNativeTabs(children), tabs.value)?.value;
  return (
    <TabsContext.Provider value={{ ...tabs, tabStop: stop }}>
      <Part
        name="tabs"
        part="list"
        role="tablist"
        {...props}
        id={listId}
        aria-orientation={tabs.orientation}
        style={{
          flexDirection: tabs.orientation === "vertical" ? "column" : "row",
          ...props.style,
        }}
      >
        {children}
      </Part>
    </TabsContext.Provider>
  );
}
export function Tab({
  value,
  disabled,
  children,
  ...props
}: NativeProps & { value: string; disabled?: boolean; color?: string }) {
  const tabs = useContext(TabsContext);
  return (
    <Button
      {...props}
      variant="ghost"
      color={props.color ?? tabs.color}
      {...{ role: "tab" }}
      id={`${tabs.id}-tab-${value}`}
      aria-controls={`${tabs.id}-panel-${value}`}
      aria-selected={tabs.value === value}
      {...{ tabIndex: tabs.tabStop === value ? 0 : -1 }}
      disabled={disabled}
      className={cn(
        "mn-tab",
        tabs.value === value && "mn-selected",
        props.className,
      )}
      onClick={() => tabs.set(value)}
    >
      {children}
    </Button>
  );
}
export function TabPanel({
  value,
  forceMount,
  children,
  ...props
}: NativeProps & { value: string; forceMount?: boolean }) {
  const tabs = useContext(TabsContext);
  if (tabs.value !== value && !forceMount) return null;
  return (
    <Part
      name="tabs"
      part="panel"
      role="tabpanel"
      {...props}
      id={`${tabs.id}-panel-${value}`}
      aria-labelledby={`${tabs.id}-tab-${value}`}
      style={{
        display: tabs.value === value ? undefined : "none",
        ...props.style,
      }}
    >
      {children}
    </Part>
  );
}
export interface StepsItem {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  status?: "wait" | "process" | "finish" | "error";
}
export interface StepsProps extends NativeProps {
  items: StepsItem[];
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
}
export function Steps({
  items,
  value,
  defaultValue = 0,
  onChange,
  readOnly = false,
  ...props
}: StepsProps) {
  const { t } = useI18n();
  const [current, set] = useValue(value, defaultValue, onChange);
  return (
    <Part
      name="steps"
      {...props}
      aria-label={props["aria-label"] ?? t("steps.label")}
    >
      {items.map((item, i) => (
        <View
          key={i}
          className={cn(
            "mn-step",
            i === current && "mn-selected",
            i < current && "mn-complete",
            item.status && `mn-status-${item.status}`,
          )}
        >
          <Button
            variant="ghost"
            aria-label={typeof item.title === "string" ? item.title : undefined}
            aria-current={i === current ? "step" : undefined}
            disabled={readOnly || item.disabled}
            onClick={() => set(i)}
          >
            {item.icon ?? (
              <Text className="mn-step-number">
                {i < current ? "✓" : i + 1}
              </Text>
            )}
            {item.title}
          </Button>
          {item.description && <Text>{item.description}</Text>}
        </View>
      ))}
    </Part>
  );
}
const PageTabsContext = createContext({
  value: "",
  set: (() => {}) as (value: string) => void,
  itemId: (value: string) => value,
});
export function PageTabs({
  activeValue = "",
  onChange,
  children,
  actions,
  scrollLeftLabel,
  scrollRightLabel,
  dir,
  ...props
}: NativeProps & {
  activeValue?: string;
  onChange?: (value: string) => void;
  actions?: ReactNode;
  scrollLeftLabel?: string;
  scrollRightLabel?: string;
  dir?: "ltr" | "rtl";
}) {
  const { t } = useI18n();
  const key = useId().replace(/[^a-zA-Z0-9_-]/g, ""),
    id = props.id ?? `mn-pages-${key}`,
    itemId = (value: string) =>
      `${id}-item-${Array.from(value)
        .map((ch) => ch.codePointAt(0)!.toString(16))
        .join("-")}`;
  const [size, setSize] = useState({ width: 0, content: 0 }),
    [offset, setOffset] = useState(0),
    [target, setTarget] = useState("");
  const current = useRef({ offset, size });
  current.current = { offset, size };
  const signature = Children.toArray(children)
    .map((child) =>
      isValidElement<{ value?: string }>(child)
        ? (child.props.value ?? child.key)
        : "",
    )
    .join("|");
  useEffect(() => {
    let cancelled = false;
    setTarget("");
    void Taro.nextTick(() => {
      if (!cancelled && activeValue) setTarget(itemId(activeValue));
    });
    return () => {
      cancelled = true;
    };
  }, [activeValue, signature, id]);
  useEffect(() => {
    let disposed = false;
    const measure = () => {
      const query = Taro.createSelectorQuery?.();
      if (!query) return;
      let width = 0,
        content = 0;
      query
        .select(`#${id}-scroll`)
        .boundingClientRect((rect) => {
          if (rect && "width" in rect) width = rect.width;
        })
        .select(`#${id}-content`)
        .boundingClientRect((rect) => {
          if (rect && "width" in rect) content = rect.width;
        })
        .exec(() => {
          if (!disposed && width > 0) setSize({ width, content });
        });
    };
    measure();
    Taro.onWindowResize?.(measure);
    return () => {
      disposed = true;
      Taro.offWindowResize?.(measure);
    };
  }, [id, signature]);
  const max = Math.max(0, size.content - size.width),
    rtl = (dir ?? props.style?.direction) === "rtl";
  const scroll = (amount: number) => {
    setTarget("");
    setOffset(Math.max(0, Math.min(max, offset + amount * size.width * 0.8)));
  };
  return (
    <PageTabsContext.Provider
      value={{ value: activeValue, set: onChange ?? (() => {}), itemId }}
    >
      <Part
        name="page-tabs"
        role="navigation"
        {...props}
        id={id}
        style={{ direction: dir, ...props.style }}
      >
        {max > 1 && (
          <Button
            variant="ghost"
            aria-label={
              rtl
                ? (scrollRightLabel ?? t("pageTabs.scrollRight"))
                : (scrollLeftLabel ?? t("pageTabs.scrollLeft"))
            }
            disabled={offset <= 1}
            onClick={() => scroll(-1)}
          >
            {rtl ? "›" : "‹"}
          </Button>
        )}
        <ScrollView
          id={`${id}-scroll`}
          scrollX
          scrollLeft={rtl ? -offset : offset}
          scrollIntoView={target}
          scrollIntoViewAlignment="nearest"
          className="mn-page-tabs-scroll"
          onScroll={(event) => {
            setOffset(Math.abs(event.detail.scrollLeft));
            if (event.detail.scrollWidth && current.current.size.width)
              setSize({
                width: current.current.size.width,
                content: event.detail.scrollWidth,
              });
          }}
        >
          <View
            id={`${id}-content`}
            className="mn-page-tabs-content"
            {...{ role: "tablist" }}
          >
            {children}
          </View>
        </ScrollView>
        {max > 1 && (
          <Button
            variant="ghost"
            aria-label={
              rtl
                ? (scrollLeftLabel ?? t("pageTabs.scrollLeft"))
                : (scrollRightLabel ?? t("pageTabs.scrollRight"))
            }
            disabled={offset >= max - 1}
            onClick={() => scroll(1)}
          >
            {rtl ? "‹" : "›"}
          </Button>
        )}
        {actions}
      </Part>
    </PageTabsContext.Provider>
  );
}
export function PageTab({
  value,
  label,
  active,
  disabled,
  icon,
  action,
  closable,
  closeLabel,
  onClose,
  onClick,
  onSelect,
  ...props
}: NativeProps & {
  value: string;
  label: ReactNode;
  active?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  action?: ReactNode;
  closable?: boolean;
  closeLabel?: string;
  onClose?: () => void;
  onClick?: () => void;
  onSelect?: () => void;
}) {
  const { t } = useI18n();
  closeLabel ??= t("pageTabs.close", {
    label: typeof label === "string" ? label : value,
  });
  const context = useContext(PageTabsContext);
  return (
    <View className="mn-page-tab" id={context.itemId(value)} data-value={value}>
      <Button
        {...props}
        {...{ role: "tab" }}
        variant="ghost"
        disabled={disabled}
        aria-selected={active ?? context.value === value}
        aria-current={(active ?? context.value === value) ? "page" : undefined}
        onClick={() => {
          context.set(value);
          onClick?.();
          onSelect?.();
        }}
      >
        {icon}
        {label}
      </Button>
      {action}
      {closable && (
        <Button
          variant="ghost"
          aria-label={closeLabel}
          disabled={disabled}
          onClick={onClose}
        >
          ×
        </Button>
      )}
    </View>
  );
}
export interface PaginationLabels {
  prev?: string;
  next?: string;
  previous?: string;
  jumpPrev?: string;
  jumpNext?: string;
  page?: (page: number) => string;
  jumpTo?: ReactNode;
  jumpToInput?: string;
  pageSize?: string;
  pageSizeOption?: (size: number) => string;
  currentPage?: string;
  total?: (total: number) => string;
  nav?: string;
}
export interface PaginationProps extends NativeProps {
  current?: number;
  defaultCurrent?: number;
  total?: number;
  pageSize?: number;
  defaultPageSize?: number;
  onChange?: (page: number, pageSize: number) => void;
  onPageSizeChange?: (size: number) => void;
  disabled?: boolean;
  siblingCount?: number;
  boundaryCount?: number;
  showTotal?: boolean | ((total: number, range: [number, number]) => ReactNode);
  totalRender?: (total: number, range: [number, number]) => ReactNode;
  itemRender?: (
    page: number,
    type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
  ) => ReactNode;
  showQuickJumper?: boolean;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
  hideEdges?: boolean;
  hideNumbers?: boolean;
  simple?: boolean;
  responsive?: boolean;
  size?: "small" | "medium" | "large";
  shape?: "circle" | "rounded" | "square";
  variant?: "solid" | "outline" | "ghost";
  labels?: PaginationLabels;
  icons?: {
    prev?: ReactNode;
    next?: ReactNode;
    jumpPrev?: ReactNode;
    jumpNext?: ReactNode;
  };
}
export function Pagination({
  current,
  defaultCurrent = 1,
  total = 0,
  pageSize,
  defaultPageSize = 10,
  onChange,
  onPageSizeChange,
  disabled,
  siblingCount,
  boundaryCount,
  showTotal,
  totalRender,
  itemRender,
  showQuickJumper,
  showSizeChanger,
  pageSizeOptions = [10, 20, 50, 100],
  hideEdges = false,
  hideNumbers,
  simple,
  responsive,
  size: visualSize = "medium",
  shape = "rounded",
  variant = "solid",
  labels,
  icons,
  ...props
}: PaginationProps) {
  const { t } = useI18n();
  const [rawSize, setSize] = useValue(pageSize, defaultPageSize),
    [rawPage, setPage] = useValue(current, defaultCurrent);
  const size =
    Number.isFinite(rawSize) && rawSize > 0 ? Math.floor(rawSize) : 10;
  const safeTotal = Number.isFinite(total) ? Math.max(0, Math.floor(total)) : 0,
    count = Math.max(1, Math.ceil(safeTotal / size)),
    safe = Math.min(
      count,
      Math.max(1, Number.isFinite(rawPage) ? Math.floor(rawPage) : 1),
    );
  const [jump, setJump] = useState<string | null>(null);
  useEffect(() => setJump(null), [safe]);
  const change = (next: number) => {
    if (disabled || !Number.isFinite(next)) return;
    const target = Math.min(count, Math.max(1, Math.floor(next)));
    if (target === safe) return;
    setPage(target);
    onChange?.(target, size);
  };
  const resize = (next: number) => {
    if (disabled || !Number.isFinite(next) || next <= 0) return;
    const requested = Math.floor(next);
    if (requested === size && safe === 1) return;
    setSize(requested);
    setPage(1);
    onPageSizeChange?.(requested);
    onChange?.(1, requested);
  };
  const range = getPaginationVisibleRange(safe, size, safeTotal);
  const totalContent =
    typeof showTotal === "function"
      ? showTotal(safeTotal, range)
      : (totalRender?.(safeTotal, range) ??
        labels?.total?.(safeTotal) ??
        t("pagination.total", { total: safeTotal }));
  const items = getPaginationItems({
    page: safe,
    totalPages: count,
    siblingCount,
    boundaryCount,
    hideEdges,
  });
  const pageInput = (
    <Input
      aria-label={labels?.currentPage ?? t("pagination.currentPage")}
      value={jump ?? String(safe)}
      disabled={disabled}
      type="number"
      onChange={setJump}
      onConfirm={() => {
        if (jump !== null && jump.trim()) change(Number(jump));
        setJump(null);
      }}
      onBlur={() => {
        if (jump !== null && jump.trim()) change(Number(jump));
        setJump(null);
      }}
    />
  );
  return (
    <Part
      name="pagination"
      role="navigation"
      {...props}
      aria-label={props["aria-label"] ?? labels?.nav ?? t("pagination.nav")}
      className={cn(responsive && "mn-pagination-responsive", props.className)}
    >
      {showTotal && <Text>{totalContent}</Text>}
      {items.map((item) => {
        if (item.kind === "ellipsis")
          return simple || hideNumbers ? null : <Text key={item.key}>…</Text>;
        if (
          (simple || hideNumbers) &&
          item.kind !== "prev" &&
          item.kind !== "next"
        )
          return null;
        const kind = item.kind;
        const label =
          kind === "page"
            ? (labels?.page?.(item.page) ??
              t("pagination.page", { page: item.page }))
            : kind === "prev"
              ? (labels?.previous ?? labels?.prev ?? t("pagination.prev"))
              : kind === "next"
                ? (labels?.next ?? t("pagination.next"))
                : kind === "jump-prev"
                  ? (labels?.jumpPrev ?? t("pagination.jumpPrev"))
                  : (labels?.jumpNext ?? t("pagination.jumpNext"));
        const icon =
          kind === "prev"
            ? (icons?.prev ?? "‹")
            : kind === "next"
              ? (icons?.next ?? "›")
              : kind === "jump-prev"
                ? (icons?.jumpPrev ?? "«")
                : kind === "jump-next"
                  ? (icons?.jumpNext ?? "»")
                  : item.page;
        return (
          <Button
            key={item.key}
            size={visualSize}
            shape={shape}
            variant={kind === "page" && item.page === safe ? variant : "ghost"}
            className={kind === "page" ? "mn-pagination-number" : ""}
            aria-label={label}
            aria-current={
              kind === "page" && item.page === safe ? "page" : undefined
            }
            disabled={disabled || item.page < 1 || item.page > count}
            onClick={() => change(item.page)}
          >
            {itemRender ? itemRender(item.page, kind) : icon}
          </Button>
        );
      })}
      {simple ? (
        <View className="mn-pagination-counter">
          {pageInput}
          <Text>/ {count}</Text>
        </View>
      ) : hideNumbers ? (
        <Text>
          {safe} / {count}
        </Text>
      ) : null}
      {showQuickJumper && !simple && (
        <View className="mn-pagination-jumper">
          <Text>{labels?.jumpTo ?? t("pagination.jumpTo")}</Text>
          <Input
            aria-label={labels?.jumpToInput ?? t("pagination.jumpToInput")}
            type="number"
            disabled={disabled}
            onConfirm={(event) => change(Number(event.detail.value))}
          />
        </View>
      )}
      {showSizeChanger && (
        <Part
          name="pagination"
          part="sizes"
          role="group"
          aria-label={labels?.pageSize ?? t("pagination.pageSize")}
        >
          {pageSizeOptions
            .filter((n) => Number.isFinite(n) && n > 0 && Number.isInteger(n))
            .map((n) => (
              <Button
                key={n}
                size={visualSize}
                variant={size === n ? "solid" : "ghost"}
                disabled={disabled}
                aria-label={
                  labels?.pageSizeOption?.(n) ??
                  t("pagination.pageSizeOption", { size: n })
                }
                onClick={() => resize(n)}
              >
                {n}
              </Button>
            ))}
        </Part>
      )}
    </Part>
  );
}
export interface NavTreeItem {
  id: string;
  label: ReactNode;
  href?: string;
  disabled?: boolean;
  icon?: ReactNode;
  children?: NavTreeItem[];
}
export interface NavTreeSection {
  id?: string;
  title?: ReactNode;
  label?: ReactNode;
  items: NavTreeItem[];
}
export interface NavTreeItemState {
  active: boolean;
  ancestorActive: boolean;
  expanded: boolean;
  depth: number;
  collapsed: boolean;
  hasChildren: boolean;
  disabled: boolean;
  className: string;
}
export interface NavTreeProps extends NativeProps {
  sections: NavTreeSection[];
  activeId?: string;
  onSelect?: (item: NavTreeItem) => void;
  onItemSelect?: (item: NavTreeItem) => void;
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  onExpandedChange?: (ids: string[]) => void;
  collapsed?: boolean;
  wrapLabels?: boolean;
  renderLink?: (
    item: NavTreeItem,
    content: ReactNode,
    state: NavTreeItemState,
  ) => ReactNode;
}
function activeAncestors(items: NavTreeItem[], active?: string): string[] {
  for (const item of items) {
    if (item.id === active) return [];
    if (item.children) {
      if (item.children.some((child) => child.id === active)) return [item.id];
      const ancestors = activeAncestors(item.children, active);
      if (ancestors.length) return [item.id, ...ancestors];
    }
  }
  return [];
}
export function NavTree({
  sections,
  activeId,
  onSelect,
  onItemSelect,
  expandedIds,
  defaultExpandedIds = [],
  onExpandedChange,
  collapsed = false,
  wrapLabels = false,
  renderLink,
  ...props
}: NavTreeProps) {
  const { t } = useI18n();
  const [expanded, set] = useValue(
    expandedIds,
    defaultExpandedIds,
    onExpandedChange,
  );
  const [explicitlyCollapsed, setCollapsed] = useState<Set<string>>(
    () => new Set(),
  );
  const ancestors = new Set(
    activeAncestors(
      sections.flatMap((section) => section.items),
      activeId,
    ),
  );
  const items = (nodes: NavTreeItem[], depth = 0): ReactNode =>
    nodes.map((item) => {
      const hasChildren = !!item.children?.length,
        active = item.id === activeId,
        ancestorActive = ancestors.has(item.id),
        isExpanded =
          hasChildren &&
          (expanded.includes(item.id) ||
            (ancestorActive && !explicitlyCollapsed.has(item.id)));
      const className = cn(
        "mn-nav-tree-item",
        active && "mn-selected",
        wrapLabels && "mn-nav-tree-wrap",
      );
      const state: NavTreeItemState = {
        active,
        ancestorActive,
        expanded: isExpanded,
        depth,
        collapsed,
        hasChildren,
        disabled: !!item.disabled,
        className,
      };
      const content = (
        <>
          {item.icon}
          {!collapsed && item.label}
        </>
      );
      const activate = () => {
        if (item.disabled) return;
        if (hasChildren) {
          const closed = new Set(explicitlyCollapsed);
          if (isExpanded) closed.add(item.id);
          else closed.delete(item.id);
          setCollapsed(closed);
          set(
            isExpanded
              ? expanded.filter((id) => id !== item.id)
              : [...new Set([...expanded, item.id])],
          );
        } else onSelect?.(item);
        onItemSelect?.(item);
      };
      return (
        <View key={item.id} className="mn-nav-tree-node">
          {!hasChildren && renderLink ? (
            <View
              {...{ role: "treeitem" }}
              aria-selected={active}
              aria-disabled={item.disabled}
              onClick={activate}
            >
              {renderLink(item, content, state)}
            </View>
          ) : (
            <Button
              variant="ghost"
              {...{ role: "treeitem" }}
              className={className}
              aria-selected={active}
              aria-expanded={hasChildren ? isExpanded : undefined}
              disabled={item.disabled}
              onClick={activate}
            >
              {content}
            </Button>
          )}
          {hasChildren && isExpanded && !collapsed && (
            <View {...{ role: "group" }} className="mn-nav-tree-children">
              {items(item.children!, depth + 1)}
            </View>
          )}
        </View>
      );
    });
  return (
    <Part
      name="nav-tree"
      role="tree"
      {...props}
      aria-label={props["aria-label"] ?? t("navTree.label")}
    >
      {sections.map((section, index) => (
        <View key={section.id ?? index}>
          {!collapsed && (section.title ?? section.label)}
          {items(section.items)}
        </View>
      ))}
    </Part>
  );
}
