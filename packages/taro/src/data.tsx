import { useH5List } from "./h5";
import { useI18n } from "./theme";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useId,
  type ReactNode,
  type CSSProperties,
} from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  type ITouchEvent,
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import {
  computeFixedColumnLayout,
  matchesAccept,
  formatTime,
  resolveTimeFormat,
  formatHasSeconds,
  parseTimeInput,
  startOfToday,
  secondsOfDay,
  cn,
  getColumnCompare,
  nextSortState,
  type TableSortState,
  getVirtualRange,
  dayKey,
  monthStart,
  addDays,
  resolveSize,
} from "@minerva/core";
import { Button, Input } from "./components";
import { Checkbox, useFieldState } from "./forms";
import { Alert, Empty, LoadingState } from "./display";
import { Pagination, type PaginationProps } from "./navigation";
import { Part, useValue, type NativeProps } from "./shared";
export type { TableSortState } from "@minerva/core";
export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  render?: (row: T, index: number) => ReactNode;
  width?: number | string;
  align?: "left" | "right" | "center";
  ellipsis?: boolean;
  fixed?: "left" | "right";
  sortable?: boolean | ((a: T, b: T) => number);
}
export type TableRowKey = string | number;
export interface TableRowSelection<T> {
  selectedRowKeys?: TableRowKey[];
  defaultSelectedRowKeys?: TableRowKey[];
  onChange?: (keys: TableRowKey[], rows: T[]) => void;
  getCheckboxProps?: (row: T) => { disabled?: boolean };
  getRowLabel?: (row: T, index: number) => string;
}
export interface TableProps<T> extends NativeProps {
  columns: TableColumn<T>[];
  data: T[];
  rowKey?: (row: T, index: number) => TableRowKey;
  emptyText?: ReactNode;
  loading?: boolean;
  loadingRows?: number;
  sortState?: TableSortState | null;
  defaultSortState?: TableSortState | null;
  onSortChange?: (state: TableSortState) => void;
  manualSort?: boolean;
  rowSelection?: TableRowSelection<T>;
  variant?: string;
  size?: string;
  hoverable?: boolean;
  scroll?: { x?: number | string; y?: number | string };
}
const TableHoverContext = createContext(false);
export function TableRoot({
  scroll,
  variant = "simple",
  size = "medium",
  hoverable = false,
  children,
  ...props
}: NativeProps & {
  scroll?: { x?: number | string; y?: number | string };
  variant?: string;
  size?: string;
  hoverable?: boolean;
}) {
  return (
    <TableHoverContext.Provider value={hoverable}>
      <ScrollView
        scrollX
        scrollY={!!scroll?.y}
        style={{
          maxHeight:
            scroll?.y === undefined ? undefined : resolveSize(scroll.y),
        }}
      >
        <Part
          name="table"
          role="table"
          {...props}
          className={cn(
            `mn-table-${variant}`,
            `mn-size-${size}`,
            props.className,
          )}
          style={{
            minWidth:
              scroll?.x === undefined ? undefined : resolveSize(scroll.x),
            ...props.style,
          }}
        >
          {children}
        </Part>
      </ScrollView>
    </TableHoverContext.Provider>
  );
}
export function TableHead(props: NativeProps) {
  return <Part name="table" part="head" role="rowgroup" {...props} />;
}
export function TableBody(props: NativeProps) {
  return <Part name="table" part="body" role="rowgroup" {...props} />;
}
export function TableRow(props: NativeProps) {
  const hover = useContext(TableHoverContext);
  return (
    <Part
      name="table"
      part="row"
      role="row"
      hoverClass={hover ? "mn-table-row-hover" : "none"}
      {...props}
    />
  );
}
export function TableHeader(props: NativeProps) {
  return <Part name="table" part="header" role="columnheader" {...props} />;
}
export function TableCell(props: NativeProps) {
  return <Part name="table" part="cell" role="cell" {...props} />;
}
export function TableCellContent({
  primary,
  secondary,
  monospace,
  maxWidth = 360,
  ...props
}: NativeProps & {
  primary: ReactNode;
  secondary?: ReactNode;
  monospace?: boolean;
  maxWidth?: number | string;
}) {
  return (
    <Part
      name="table-cell-content"
      {...props}
      style={{ maxWidth, ...props.style }}
    >
      <Text className={monospace ? "mn-code" : ""}>{primary}</Text>
      {secondary && <Text className="mn-muted">{secondary}</Text>}
    </Part>
  );
}
export function Table<T>({
  columns,
  data,
  rowKey = (_row, index) => index,
  emptyText,
  loading,
  loadingRows = 5,
  sortState,
  defaultSortState = null,
  onSortChange,
  manualSort,
  rowSelection,
  ...props
}: TableProps<T>) {
  const { t } = useI18n();
  emptyText ??= t("table.empty");
  const [sort, setSort] = useValue<TableSortState | null>(
    sortState,
    defaultSortState,
    (next) => {
      if (next) onSortChange?.(next);
    },
  );
  const [selected, setSelected] = useValue(
    rowSelection?.selectedRowKeys,
    rowSelection?.defaultSelectedRowKeys ?? [],
    (keys) =>
      rowSelection?.onChange?.(
        keys,
        data.filter((row, i) => keys.includes(rowKey(row, i))),
      ),
  );
  const rows = data.map((row, index) => ({
    row,
    index,
    key: rowKey(row, index),
  }));
  if (sort?.order && !manualSort) {
    const col = columns.find((c) => c.key === sort.key),
      compare = col && getColumnCompare(col);
    if (compare)
      rows.sort(
        (a, b) => compare(a.row, b.row) * (sort.order === "descend" ? -1 : 1),
      );
  }
  const enabled = rows
    .filter(({ row }) => !rowSelection?.getCheckboxProps?.(row).disabled)
    .map((r) => r.key);
  const all =
    enabled.length > 0 && enabled.every((key) => selected.includes(key));
  const fixed = computeFixedColumnLayout(columns);
  const cellStyle = (column: TableColumn<T>): CSSProperties => ({
    position: column.fixed ? "sticky" : undefined,
    left:
      column.fixed === "left"
        ? fixed.leftOffsets[column.key] + (rowSelection ? 48 : 0)
        : undefined,
    right:
      column.fixed === "right" ? fixed.rightOffsets[column.key] : undefined,
    zIndex: column.fixed ? 1 : undefined,
    background: column.fixed ? "var(--background-color,#fff)" : undefined,
    width: column.width,
    minWidth: column.width,
    flex: column.width ? "0 0 auto" : "1",
    textAlign: column.align,
    overflow: column.ellipsis ? "hidden" : undefined,
    textOverflow: column.ellipsis ? "ellipsis" : undefined,
    whiteSpace: column.ellipsis ? "nowrap" : undefined,
  });
  return (
    <TableRoot {...props}>
      <TableHead>
        <TableRow>
          {rowSelection && (
            <TableHeader style={{ flex: "0 0 48px" }}>
              <Checkbox
                label={t("table.selectAll")}
                checked={all}
                indeterminate={
                  !all && enabled.some((key) => selected.includes(key))
                }
                disabled={loading || !enabled.length}
                onChange={(checked) =>
                  setSelected(
                    checked
                      ? [...new Set([...selected, ...enabled])]
                      : selected.filter((key) => !enabled.includes(key)),
                  )
                }
              />
            </TableHeader>
          )}
          {columns.map((column) => (
            <TableHeader key={column.key} style={cellStyle(column)}>
              {column.sortable ? (
                <Button
                  variant="ghost"
                  onClick={() => setSort(nextSortState(sort, column.key))}
                >
                  {column.header}
                  {sort?.key === column.key &&
                    sort.order &&
                    (sort.order === "ascend" ? " ↑" : " ↓")}
                </Button>
              ) : (
                column.header
              )}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {loading ? (
          Array.from({ length: loadingRows }, (_, index) => (
            <TableRow key={`skeleton-${index}`} {...{ "aria-hidden": true }}>
              {rowSelection && <TableCell style={{ flex: "0 0 48px" }} />}
              {columns.map((column) => (
                <TableCell key={column.key} style={cellStyle(column)}>
                  <View className="mn-table-skeleton" />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : rows.length ? (
          rows.map(({ row, index, key }) => (
            <TableRow
              key={key}
              className={
                selected.includes(key) ? "mn-table-selected" : undefined
              }
            >
              {rowSelection && (
                <TableCell style={{ flex: "0 0 48px" }}>
                  <Checkbox
                    label={t("table.selectRow", {
                      row: rowSelection.getRowLabel?.(row, index) ?? key,
                    })}
                    checked={selected.includes(key)}
                    disabled={rowSelection.getCheckboxProps?.(row).disabled}
                    onChange={(checked) =>
                      setSelected(
                        checked
                          ? [...selected, key]
                          : selected.filter((v) => v !== key),
                      )
                    }
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  style={{
                    ...cellStyle(column),
                    ...(selected.includes(key) && column.fixed
                      ? {
                          background:
                            "var(--table-selected-bg,var(--selected-color))",
                        }
                      : {}),
                  }}
                >
                  {column.render?.(row, index) ??
                    String((row as Record<string, unknown>)[column.key] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <Empty title={emptyText} />
        )}
      </TableBody>
    </TableRoot>
  );
}
export function DataTable<T>({
  pagination,
  error,
  onRetry,
  retryLabel,
  ...props
}: TableProps<T> & {
  pagination?: PaginationProps;
  error?: ReactNode;
  onRetry?: () => void;
  retryLabel?: string;
}) {
  const { t } = useI18n();
  retryLabel ??= t("table.retry");
  if (error)
    return (
      <Alert
        color="danger"
        action={onRetry && <Button onClick={onRetry}>{retryLabel}</Button>}
      >
        {error}
      </Alert>
    );
  return (
    <Part name="data-table">
      <Table {...props} />
      {pagination && <Pagination {...pagination} />}
    </Part>
  );
}
export interface VirtualListProps<T> extends NativeProps {
  items: T[];
  itemHeight?: number;
  itemPadding?: number;
  maxHeight?: number;
  overscan?: number;
  renderItem: (item: T, index: number) => ReactNode;
  onLoadMore?: () => Promise<void> | void;
  loadMoreThreshold?: number;
  loading?: boolean;
  highPerformance?: boolean;
  onItemClick?: (item: T, index: number, event: ITouchEvent) => void;
}
export function VirtualList<T>({
  items,
  itemHeight,
  itemPadding = 8,
  maxHeight = 320,
  overscan = 5,
  renderItem,
  onLoadMore,
  loadMoreThreshold = 100,
  loading,
  highPerformance = false,
  onItemClick,
  ...props
}: VirtualListProps<T>) {
  const [offset, setOffset] = useState(0),
    [measured, setMeasured] = useState(40);
  const key = useId().replace(/[^a-zA-Z0-9_-]/g, ""),
    id = props.id ?? `mn-virtual-${key}`,
    height = itemHeight && itemHeight > 0 ? itemHeight : measured;
  const pending = useRef(false),
    frame = useRef<ReturnType<typeof setTimeout>>(),
    latestOffset = useRef(0);
  useEffect(
    () => () => {
      if (frame.current) clearTimeout(frame.current);
    },
    [],
  );
  useEffect(() => {
    if (itemHeight !== undefined || !items.length) return;
    let disposed = false;
    const measure = () =>
      Taro.createSelectorQuery?.()
        ?.select(`#${id}-measure`)
        .boundingClientRect((rect) => {
          if (!disposed && rect && "height" in rect && rect.height > 0)
            setMeasured(rect.height);
        })
        .exec();
    measure();
    return () => {
      disposed = true;
    };
  }, [id, itemHeight, items.length]);
  const load = () => {
    if (loading || pending.current || !onLoadMore) return;
    pending.current = true;
    try {
      void Promise.resolve(onLoadMore()).then(
        () => {
          pending.current = false;
        },
        () => {
          pending.current = false;
        },
      );
    } catch (error) {
      pending.current = false;
      throw error;
    }
  };
  const range = getVirtualRange({
    scrollTop: offset,
    viewportHeight: maxHeight,
    itemHeight: height,
    itemCount: items.length,
    overscan,
  });
  return (
    <ScrollView
      id={id}
      scrollY
      className={cn("mn-virtual-list", props.className)}
      style={{
        height: Math.min(maxHeight, items.length * height),
        maxHeight,
        ...props.style,
      }}
      aria-label={props["aria-label"]}
      onScroll={(event) => {
        latestOffset.current = event.detail.scrollTop;
        if (highPerformance) {
          if (!frame.current)
            frame.current = setTimeout(() => {
              frame.current = undefined;
              setOffset(latestOffset.current);
            }, 16);
        } else setOffset(event.detail.scrollTop);
      }}
      lowerThreshold={loadMoreThreshold}
      onScrollToLower={load}
    >
      {itemHeight === undefined && items.length > 0 && (
        <View
          id={`${id}-measure`}
          aria-hidden
          style={{
            position: "absolute",
            visibility: "hidden",
            pointerEvents: "none",
            left: 0,
            right: 0,
            padding: itemPadding,
            boxSizing: "border-box",
          }}
        >
          {renderItem(items[0], 0)}
        </View>
      )}
      <View style={{ height: items.length * height, position: "relative" }}>
        {items.slice(range.start, range.end).map((item, relative) => {
          const index = range.start + relative;
          return (
            <View
              key={
                typeof item === "object" && item !== null && "id" in item
                  ? String(item.id)
                  : index
              }
              className="mn-virtual-list-item"
              style={{
                position: "absolute",
                top: index * height,
                height,
                left: 0,
                right: 0,
                padding: itemPadding,
                boxSizing: "border-box",
              }}
              onClick={(event) => onItemClick?.(item, index, event)}
            >
              {renderItem(item, index)}
            </View>
          );
        })}
      </View>
      {loading && <LoadingState />}
    </ScrollView>
  );
}
export interface MonthCalendarEvent {
  id: string;
  date: string;
  title: string;
}
export interface MonthCalendarProps extends NativeProps {
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  events?: readonly MonthCalendarEvent[];
  onEventClick?: (event: MonthCalendarEvent) => void;
  rangeStart?: string;
  rangeEnd?: string;
  disabled?: boolean;
  showSelectedDayEvents?: boolean;
  previousMonthLabel?: string;
  nextMonthLabel?: string;
  todayLabel?: string;
  locale?: string;
  weekdayLabels?: readonly string[];
  getDayLabel?: (day: string, count: number) => string;
  getEventsLabel?: (day: string) => string;
  emptyEventsText?: string;
  size?: string;
}
export function MonthCalendar({
  month,
  defaultMonth = new Date(),
  onMonthChange,
  value,
  defaultValue = "",
  onChange,
  events = [],
  onEventClick,
  rangeStart,
  rangeEnd,
  disabled,
  showSelectedDayEvents = true,
  previousMonthLabel,
  nextMonthLabel,
  todayLabel,
  locale,
  weekdayLabels,
  getDayLabel,
  getEventsLabel,
  emptyEventsText,
  size = "medium",
  ...props
}: MonthCalendarProps) {
  const { t, language } = useI18n();
  locale ??= language;
  previousMonthLabel ??= t("monthCalendar.previousMonth");
  nextMonthLabel ??= t("monthCalendar.nextMonth");
  todayLabel ??= t("monthCalendar.today");
  weekdayLabels ??= ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map(
    (day) => t(`monthCalendar.weekdays.${day}`),
  );
  emptyEventsText ??= t("monthCalendar.noEvents");
  const [current, setMonth] = useValue(month, defaultMonth, onMonthChange),
    [selected, set] = useValue(value, defaultValue, onChange);
  const start = monthStart(current),
    first = addDays(start, -((start.getDay() + 6) % 7));
  const range =
    rangeStart &&
    rangeEnd &&
    /^\d{4}-\d{2}-\d{2}$/.test(rangeStart) &&
    /^\d{4}-\d{2}-\d{2}$/.test(rangeEnd)
      ? [rangeStart, rangeEnd].sort()
      : undefined;
  const generatedCalendarId = useId();
  const calendarId = props.id ?? generatedCalendarId;
  useH5List(calendarId, {
    selector: ".mn-calendar-day",
    grid: true,
    loop: false,
  });
  const selectedEvents = events.filter((event) => event.date === selected);
  return (
    <Part
      name="month-calendar"
      {...props}
      id={calendarId}
      className={cn(`mn-size-${size}`, props.className)}
    >
      <View className="mn-calendar-toolbar">
        <Button
          variant="ghost"
          aria-label={previousMonthLabel}
          disabled={disabled}
          onClick={() => setMonth(monthStart(current, -1))}
        >
          ‹
        </Button>
        <Text>
          {current.toLocaleDateString(locale, {
            year: "numeric",
            month: "long",
          })}
        </Text>
        <Button
          variant="ghost"
          aria-label={nextMonthLabel}
          disabled={disabled}
          onClick={() => setMonth(monthStart(current, 1))}
        >
          ›
        </Button>
        <Button
          variant="ghost"
          disabled={disabled}
          onClick={() => {
            setMonth(monthStart(new Date()));
            set(dayKey(new Date()));
          }}
        >
          {todayLabel}
        </Button>
      </View>
      <View className="mn-calendar-grid">
        {weekdayLabels.map((label) => (
          <Text key={label}>{label}</Text>
        ))}
        {Array.from({ length: 42 }, (_, i) => {
          const date = addDays(first, i),
            key = dayKey(date),
            count = events.filter((e) => e.date === key).length;
          return (
            <Button
              key={key}
              aria-label={
                getDayLabel?.(key, count) ??
                (count
                  ? t("monthCalendar.dayWithEvents", { date: key, count })
                  : key)
              }
              aria-current={key === dayKey(new Date()) ? "date" : undefined}
              aria-pressed={selected === key}
              disabled={disabled}
              variant={selected === key ? "solid" : "ghost"}
              className={cn(
                "mn-calendar-day",
                date.getMonth() !== current.getMonth() && "mn-muted",
                range && key >= range[0] && key <= range[1] && "mn-in-range",
              )}
              onClick={() => {
                set(key);
                if (
                  date.getMonth() !== current.getMonth() ||
                  date.getFullYear() !== current.getFullYear()
                )
                  setMonth(monthStart(date));
              }}
            >
              {date.getDate()}
              <Text
                aria-hidden
                className={cn(
                  "mn-calendar-event-count",
                  !!count && "mn-has-events",
                )}
              >
                {count ? (count > 99 ? "99+" : count) : " "}
              </Text>
            </Button>
          );
        })}
      </View>
      {showSelectedDayEvents && selected && (
        <Part
          name="month-calendar"
          part="events"
          role="region"
          aria-label={
            getEventsLabel?.(selected) ??
            t("monthCalendar.eventsLabel", { date: selected })
          }
        >
          {selectedEvents.length ? (
            selectedEvents.map((event) =>
              onEventClick ? (
                <Button
                  key={event.id}
                  variant="ghost"
                  disabled={disabled}
                  onClick={() => onEventClick(event)}
                >
                  {event.title}
                </Button>
              ) : (
                <Text key={event.id}>{event.title}</Text>
              ),
            )
          ) : (
            <Text>{emptyEventsText}</Text>
          )}
        </Part>
      )}
    </Part>
  );
}
export interface TimePickerProps extends NativeProps {
  value?: Date | null;
  defaultValue?: Date;
  onChange?: (value: Date | undefined) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  clearable?: boolean;
  placeholder?: string;
  label?: string;
  minTime?: Date;
  maxTime?: Date;
  format?: string;
  use12Hours?: boolean;
  showSecond?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  name?: string;
  size?: "small" | "medium" | "large";
  onOpenChange?: (open: boolean) => void;
}
export function TimePicker({
  value,
  defaultValue,
  onChange,
  disabled,
  readOnly,
  required,
  invalid,
  clearable = true,
  placeholder,
  label,
  minTime,
  maxTime,
  format: formatProp,
  use12Hours = false,
  showSecond = true,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  name = "time-picker",
  size = "medium",
  onOpenChange,
  ...props
}: TimePickerProps) {
  const { t } = useI18n(),
    field = useFieldState();
  const locked = (disabled ?? field.disabled) || (readOnly ?? field.readOnly);
  const [current, set] = useValue<Date | null | undefined>(
    value,
    defaultValue,
    (next) => onChange?.(next ?? undefined),
  );
  const [open, setOpen] = useValue<boolean>(undefined, false, onOpenChange),
    [draft, setDraft] = useState<string | null>(null);
  const format = resolveTimeFormat(
      formatProp ?? (use12Hours ? "hh:mm:ss a" : "HH:mm:ss"),
      showSecond,
    ),
    seconds = formatHasSeconds(format);
  useEffect(() => {
    setDraft(null);
  }, [value, format]);
  useEffect(() => {
    if (locked) setOpen(false);
  }, [locked]);
  const allowed = (next: Date) =>
    (!minTime || secondsOfDay(next) >= secondsOfDay(minTime)) &&
    (!maxTime || secondsOfDay(next) <= secondsOfDay(maxTime));
  const commitDraft = () => {
    if (locked) return;
    if (draft !== null) {
      if (!draft.trim()) {
        if (current) set(undefined);
      } else {
        const parsed = parseTimeInput(draft, format, {
          strict: false,
          base: current ?? undefined,
        });
        if (
          parsed &&
          allowed(parsed) &&
          parsed.getTime() !== current?.getTime()
        )
          set(parsed);
      }
      setDraft(null);
    }
  };
  const base = current ?? startOfToday(),
    hour = base.getHours(),
    minute = base.getMinutes(),
    second = base.getSeconds();
  type Unit = "hour" | "minute" | "second" | "ampm";
  const makeDate = (kind: Unit, n: number) => {
    const next = new Date(base);
    if (kind === "hour")
      next.setHours(use12Hours ? (n % 12) + (hour >= 12 ? 12 : 0) : n);
    else if (kind === "minute") next.setMinutes(n);
    else if (kind === "second") next.setSeconds(n);
    else next.setHours((hour % 12) + (n ? 12 : 0));
    if (!seconds) next.setSeconds(0);
    next.setMilliseconds(0);
    return next;
  };
  const numbers = (limit: number, step: number, start = 0) =>
    Array.from(
      {
        length: Math.ceil(
          limit / (Number.isFinite(step) ? Math.max(1, Math.floor(step)) : 1),
        ),
      },
      (_, i) =>
        start + i * (Number.isFinite(step) ? Math.max(1, Math.floor(step)) : 1),
    );
  const columns: {
    kind: Unit;
    label: string;
    values: number[];
    selected: number;
  }[] = [
    {
      kind: "hour",
      label: t("timePicker.hours"),
      values: numbers(use12Hours ? 12 : 24, hourStep, use12Hours ? 1 : 0),
      selected: use12Hours ? hour % 12 || 12 : hour,
    },
    {
      kind: "minute",
      label: t("timePicker.minutes"),
      values: numbers(60, minuteStep),
      selected: minute,
    },
  ];
  if (seconds)
    columns.push({
      kind: "second",
      label: t("timePicker.seconds"),
      values: numbers(60, secondStep),
      selected: second,
    });
  if (use12Hours)
    columns.push({
      kind: "ampm",
      label: t("timePicker.period"),
      values: [0, 1],
      selected: hour >= 12 ? 1 : 0,
    });
  const blockedUnit = (kind: Unit, n: number) => {
    const candidate = makeDate(kind, n);
    if (kind === "hour")
      return !!(
        (minTime && candidate.getHours() < minTime.getHours()) ||
        (maxTime && candidate.getHours() > maxTime.getHours())
      );
    if (kind === "minute")
      return !!(
        (minTime && hour === minTime.getHours() && n < minTime.getMinutes()) ||
        (maxTime && hour === maxTime.getHours() && n > maxTime.getMinutes())
      );
    return !allowed(candidate);
  };
  return (
    <Part
      name="time-picker"
      {...props}
      className={cn(`mn-size-${size}`, props.className)}
    >
      {label && <Text>{label}</Text>}
      <Input
        id={props.id ?? field.id}
        name={name}
        value={draft ?? (current ? formatTime(current, format) : "")}
        size={size}
        placeholder={placeholder ?? t("timePicker.placeholder")}
        aria-label={label ?? props["aria-label"] ?? t("timePicker.label")}
        aria-labelledby={props["aria-labelledby"]}
        aria-describedby={props["aria-describedby"]}
        aria-expanded={open && !locked}
        disabled={disabled ?? field.disabled}
        readOnly={readOnly ?? field.readOnly}
        required={required ?? field.required}
        invalid={invalid ?? field.invalid}
        onClick={() => {
          if (!locked) setOpen(!open);
        }}
        onChange={(text) => {
          setDraft(text);
          const parsed = parseTimeInput(text, format, {
            strict: true,
            base: current ?? undefined,
          });
          if (parsed && allowed(parsed)) set(parsed);
        }}
        onBlur={commitDraft}
        onConfirm={() => {
          commitDraft();
          setOpen(false);
        }}
      />
      {clearable && current && (
        <Button
          variant="ghost"
          aria-label={t("timePicker.clear")}
          disabled={locked}
          onClick={() => {
            setDraft(null);
            set(undefined);
          }}
        >
          ×
        </Button>
      )}
      {open && !locked && (
        <>
          <View className="mn-time-backdrop" onClick={() => setOpen(false)} />
          <View className="mn-time-panel">
            {columns.map((column) => (
              <ScrollView key={column.kind} scrollY className="mn-time-column">
                <View
                  className="mn-time-options"
                  {...{ role: "listbox" }}
                  aria-label={column.label}
                >
                  {column.values.map((n) => (
                    <Button
                      key={n}
                      variant="ghost"
                      role="option"
                      aria-selected={!!current && column.selected === n}
                      className={cn(
                        "mn-time-option",
                        !!current && column.selected === n && "mn-selected",
                      )}
                      disabled={blockedUnit(column.kind, n)}
                      onClick={() => {
                        setDraft(null);
                        set(makeDate(column.kind, n));
                      }}
                    >
                      {column.kind === "ampm"
                        ? n
                          ? "PM"
                          : "AM"
                        : String(n).padStart(2, "0")}
                    </Button>
                  ))}
                </View>
              </ScrollView>
            ))}
          </View>
        </>
      )}
    </Part>
  );
}
export interface UploadItem {
  id: string;
  name: string;
  size?: number;
  url?: string;
  status?: "uploading" | "done" | "error";
  previewUrl?: string;
  progress?: number;
  error?: string;
}
export type NativeUploadFile = Taro.chooseMessageFile.ChooseFile | File;
export interface UploadLabels {
  select?: ReactNode;
  uploading?: string;
  done?: string;
  failed?: string;
  tooMany?: (max: number) => string;
  invalidType?: (name: string) => string;
  tooLarge?: (name: string) => string;
  retry?: (name: string) => string;
  remove?: (name: string) => string;
}
export interface UploadProps extends NativeProps {
  labels?: UploadLabels;
  onFilesSelected?: (files: NativeUploadFile[]) => void;
  value?: UploadItem[];
  onChange?: (items: UploadItem[]) => void;
  onSelect?: (items: UploadItem[]) => void;
  onRemove?: (item: UploadItem) => void;
  onRetry?: (item: UploadItem) => void;
  onReject?: (message: string) => void;
  label?: string;
  accept?: string;
  multiple?: boolean;
  replace?: boolean;
  maxCount?: number;
  maxSize?: number;
  loading?: boolean;
  disabled?: boolean;
  removable?: boolean;
  retryable?: boolean;
}
export function Upload({
  value = [],
  onChange,
  onSelect,
  onFilesSelected,
  onRemove,
  onRetry,
  onReject,
  labels = {},
  label,
  accept,
  multiple,
  replace,
  maxCount = multiple ? 50 : 1,
  maxSize = Infinity,
  loading,
  disabled,
  removable = true,
  retryable = true,
  ...props
}: UploadProps) {
  const { t } = useI18n();
  const [selectionError, setSelectionError] = useState("");
  const reject = (message: string) => {
    setSelectionError(message);
    onReject?.(message);
  };
  const replacing = replace && !multiple;
  const [choosing, setChoosing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const h5 =
    typeof document !== "undefined" && Taro.getEnv() === Taro.ENV_TYPE.WEB;
  const receive = (nativeFiles: NativeUploadFile[]) => {
    if (disabled || loading || choosing) return;
    if (
      (!multiple && nativeFiles.length > 1) ||
      nativeFiles.length + (replacing ? 0 : value.length) > maxCount
    ) {
      reject(
        labels.tooMany?.(maxCount) ?? t("upload.tooMany", { count: maxCount }),
      );
      return;
    }
    const invalid = nativeFiles.find((file) => {
      const extension = file.name.split(".").pop()?.toLowerCase();
      const mime = file.type?.includes("/")
        ? file.type
        : file.type === "image"
          ? `image/${extension === "jpg" ? "jpeg" : extension}`
          : file.type === "video"
            ? "video/mp4"
            : "";
      return (
        !!accept && !matchesAccept({ name: file.name, type: mime }, accept)
      );
    });
    if (invalid) {
      reject(
        labels.invalidType?.(invalid.name) ??
          t("upload.invalidType", { name: invalid.name }),
      );
      return;
    }
    const oversized = nativeFiles.find((file) => file.size > maxSize);
    if (oversized) {
      reject(
        labels.tooLarge?.(oversized.name) ??
          t("upload.tooLarge", { name: oversized.name }),
      );
      return;
    }

    const files: UploadItem[] = nativeFiles.map((file) => ({
      id: `${"path" in file ? file.path : file.name}-${file.size}`,
      name: file.name,
      size: file.size,
      url: "path" in file ? file.path : undefined,
    }));
    if (!files.length) return;
    setSelectionError("");
    const next = replacing ? files : [...value, ...files];
    onFilesSelected?.(nativeFiles);
    onSelect?.(files);
    onChange?.(next);
  };
  const choose = async () => {
    if (disabled || loading || choosing) return;
    if (h5) {
      inputRef.current?.click();
      return;
    }
    setChoosing(true);
    try {
      const count = Math.max(
        1,
        Math.min(multiple ? 9 : 1, maxCount - (replacing ? 0 : value.length)),
      );
      if (typeof Taro.chooseMessageFile === "function") {
        const result = await Taro.chooseMessageFile({
          count,
          type: "all",
          extension: accept
            ?.split(",")
            .filter((v) => v.trim().startsWith("."))
            .map((v) => v.trim().slice(1)),
        });
        receive(result.tempFiles);
      } else if (
        typeof Taro.chooseMedia === "function" &&
        accept?.split(",").every((v) => /^(image|video)\//.test(v.trim()))
      ) {
        const result = await Taro.chooseMedia({
          count,
          mediaType: accept.includes("video/")
            ? accept.includes("image/")
              ? ["image", "video"]
              : ["video"]
            : ["image"],
        });
        receive(
          result.tempFiles.map((file) => ({
            name: file.tempFilePath.split("/").pop() ?? "file",
            path: file.tempFilePath,
            size: file.size,
            type: file.fileType as "image" | "video",
            time: Date.now(),
          })),
        );
      } else {
        throw new Error(
          "This host does not expose a compatible document picker.",
        );
      }
    } catch (error) {
      if (
        !String((error as { errMsg?: string }).errMsg ?? error).includes(
          "cancel",
        )
      )
        reject(labels.failed ?? t("upload.failed"));
    } finally {
      setChoosing(false);
    }
  };
  return (
    <Part
      name="upload"
      {...{
        onDragOver: (event: React.DragEvent) => event.preventDefault(),
        onDrop: (event: React.DragEvent) => {
          event.preventDefault();
          receive(Array.from(event.dataTransfer.files));
        },
      }}
      role="group"
      aria-label={label}
      aria-busy={!!(loading || choosing)}
      {...props}
    >
      {h5 && (
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled || loading}
          aria-label={label ?? t("upload.select")}
          style={{ display: "none" }}
          onChange={(event) => {
            receive(Array.from(event.currentTarget.files ?? []));
            event.currentTarget.value = "";
          }}
        />
      )}
      {label && <Text className="mn-upload-label">{label}</Text>}
      <Button
        disabled={disabled || (!replacing && value.length >= maxCount)}
        loading={loading || choosing}
        onClick={choose}
      >
        {labels.select ?? t("upload.select")}
      </Button>
      {selectionError && (
        <Text {...{ role: "alert" }} className="mn-error">
          {selectionError}
        </Text>
      )}
      {value.map((item) => (
        <View key={item.id} className="mn-upload-item">
          {item.previewUrl && (
            <Image
              className="mn-upload-preview"
              src={item.previewUrl}
              mode="aspectFill"
            />
          )}
          <Text>{item.name}</Text>
          {item.status === "uploading" && (
            <Text>
              {labels.uploading ?? t("upload.uploading")}
              {item.progress === undefined ? "" : ` ${item.progress}%`}
            </Text>
          )}
          {item.status === "done" && (
            <Text>{labels.done ?? t("upload.done")}</Text>
          )}
          {item.status === "error" && (
            <Text {...{ role: "alert" }}>
              {item.error || labels.failed || t("upload.failed")}
            </Text>
          )}
          {item.status === "error" && retryable && onRetry && (
            <Button
              variant="ghost"
              disabled={disabled || loading || choosing}
              onClick={() => onRetry(item)}
            >
              {labels.retry?.(item.name) ??
                t("upload.retry", { name: item.name })}
            </Button>
          )}
          {removable && (onRemove || onChange) && (
            <Button
              variant="ghost"
              disabled={disabled}
              aria-label={
                labels.remove?.(item.name) ??
                t("upload.remove", { name: item.name })
              }
              onClick={() => {
                onRemove?.(item);
                onChange?.(value.filter((file) => file.id !== item.id));
              }}
            >
              ×
            </Button>
          )}
        </View>
      ))}
    </Part>
  );
}
