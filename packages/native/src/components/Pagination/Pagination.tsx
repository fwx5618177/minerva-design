import type { ReactNode } from "react";
import {
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import {
  createPaginationMachine,
  getPaginationItems,
  getPaginationVisibleRange,
  getTotalPages,
  type PaginationItem,
} from "@minerva/core";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import { Icon } from "../../internal/Icon";
import { useMachine } from "../../internal/useMachine";
import {
  colorRole,
  hitSlopFor,
  textStyle,
  weight,
} from "../../internal/styles";

export type PaginationSize = "small" | "medium" | "large";
export type PaginationShape = "circle" | "rounded" | "square";
export type PaginationVariant = "ghost" | "outline" | "solid";

export interface PaginationProps extends Omit<ViewProps, "style" | "children"> {
  /** Current page (1-based, controlled); update it in onChange */
  current?: number;
  /**
   * Initial page when uncontrolled (current not set)
   * @default 1
   */
  defaultCurrent?: number;
  /**
   * Total number of items
   * @default 0
   */
  total?: number;
  /** Number of items per page (controlled); update it in onChange */
  pageSize?: number;
  /**
   * Initial number of items per page when uncontrolled (pageSize not set)
   * @default 10
   */
  defaultPageSize?: number;
  /** Called with the requested page and page size */
  onChange?: (page: number, pageSize: number) => void;
  /**
   * Disables the pagination
   * @default false
   */
  disabled?: boolean;
  /**
   * Pagination size (page items of the `--control-height-xs|sm|md`
   * heights; touch areas always reach 44pt)
   * @default "medium"
   */
  size?: PaginationSize;
  /**
   * Shape of the page items
   * @default "rounded"
   */
  shape?: PaginationShape;
  /**
   * Visual style of the page items: `solid` (current page filled with the
   * primary color), `outline` (current page bordered) or `ghost` (tinted)
   * @default "solid"
   */
  variant?: PaginationVariant;
  /**
   * Simple mode: prev / next buttons around a "2 / 5" counter (best on
   * narrow phone screens)
   * @default false
   */
  simple?: boolean;
  /**
   * Pages shown on each side of the current page; setting it (or
   * boundaryCount) switches to the compact list with ellipses (try 1 on
   * phones)
   */
  siblingCount?: number;
  /** Pages always shown at both ends of the compact list */
  boundaryCount?: number;
  /**
   * Hides the prev / next buttons
   * @default false
   */
  hideEdges?: boolean;
  /**
   * Replaces the page buttons with a read-only "current / total" counter,
   * keeping the prev / next buttons
   * @default false
   */
  hideNumbers?: boolean;
  /**
   * Shows the total number of items ("Total N items", localized); a
   * function renders it from the total and the `[first, last]` item range
   * @default false
   */
  showTotal?: boolean | ((total: number, range: [number, number]) => ReactNode);
  /** Style of the container */
  style?: StyleProp<ViewStyle>;
}

const HEIGHT_STEP = { small: "xs", medium: "sm", large: "md" } as const;

/**
 * Pagination: prev / next buttons and the page list (numbers, jump items,
 * ellipses) on the pagination machine of @minerva/core, or a compact
 * "2 / 5" counter (`simple`, `hideNumbers`). A labelled navigation region;
 * every item is a labelled 44pt touch target.
 */
export function Pagination({
  current,
  defaultCurrent = 1,
  total = 0,
  pageSize,
  defaultPageSize = 10,
  onChange,
  disabled = false,
  size = "medium",
  shape = "rounded",
  variant = "solid",
  simple = false,
  siblingCount,
  boundaryCount,
  hideEdges = false,
  hideNumbers = false,
  showTotal = false,
  accessibilityLabel,
  style,
  ...rest
}: PaginationProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: tr } = useI18n();
  const [state, send] = useMachine(createPaginationMachine, {
    page: current,
    defaultPage: defaultCurrent,
    pageSize,
    defaultPageSize,
    total,
    disabled,
    onChange,
  });
  const totalPages = getTotalPages(total, state.pageSize);
  const page = Math.min(Math.max(1, state.page), totalPages);
  const primary = colorRole(t, "primary");
  const height = t.sizes[`control-height-${HEIGHT_STEP[size]}`];
  const fontSize =
    size === "small"
      ? t.fontSize.sm
      : size === "large"
        ? t.fontSize.lg
        : t.fontSize.md;
  const radius =
    shape === "circle"
      ? height / 2
      : shape === "square"
        ? t.radius.none
        : t.radius.md;
  const font = fonts.sans ? { fontFamily: fonts.sans } : null;

  const itemStyle = (
    selected: boolean,
    pressed: boolean,
    inactive: boolean,
  ): ViewStyle => {
    const base: ViewStyle = {
      minWidth: height,
      height,
      paddingHorizontal: t.space["1"],
      borderRadius: radius,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
      opacity: inactive ? 0.4 : 1,
    };
    if (selected) {
      return {
        ...base,
        ...(variant === "solid"
          ? { backgroundColor: primary.solid, borderColor: primary.solid }
          : variant === "outline"
            ? { backgroundColor: "transparent", borderColor: primary.solid }
            : { backgroundColor: primary.subtle, borderColor: primary.subtle }),
      };
    }
    return {
      ...base,
      backgroundColor: pressed ? t.colors["hover-color"] : "transparent",
      borderColor:
        variant === "ghost" ? "transparent" : t.colors["border-color"],
    };
  };
  const itemText = (selected: boolean) => ({
    color: selected
      ? variant === "solid"
        ? primary.onSolid
        : primary.text
      : t.colors["text-color"],
    fontSize,
    fontWeight: weight(t, selected ? "semibold" : "regular"),
    fontVariant: ["tabular-nums" as const],
    ...font,
  });

  const go = (item: PaginationItem) => {
    if (item.kind === "prev") send({ type: "PREV" });
    else if (item.kind === "next") send({ type: "NEXT" });
    else send({ type: "GOTO", page: item.page });
  };

  const renderItem = (item: PaginationItem) => {
    if (item.kind === "ellipsis") {
      return (
        <View
          key={item.key}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          {...part("pagination", "ellipsis")}
          style={{
            minWidth: height * 0.75,
            height,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ color: t.colors["text-muted-color"], fontSize, ...font }}
          >
            …
          </Text>
        </View>
      );
    }
    const selected = item.kind === "page" && item.page === page;
    const edge = item.kind === "prev" || item.kind === "next";
    const inactive =
      disabled ||
      (item.kind === "prev" && page <= 1) ||
      (item.kind === "next" && page >= totalPages);
    const label =
      item.kind === "prev"
        ? tr("pagination.prev")
        : item.kind === "next"
          ? tr("pagination.next")
          : item.kind === "jump-prev"
            ? tr("pagination.jumpPrev")
            : item.kind === "jump-next"
              ? tr("pagination.jumpNext")
              : tr("pagination.page", { page: item.page });
    return (
      <Pressable
        key={item.key}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ selected, disabled: inactive }}
        aria-selected={selected}
        aria-disabled={inactive}
        disabled={inactive}
        onPress={() => go(item)}
        hitSlop={hitSlopFor(t, height, height)}
        {...part(
          "pagination",
          edge ? item.kind : item.kind === "page" ? "item" : "jump",
          {
            selected,
            disabled: inactive,
          },
        )}
        style={({ pressed }) =>
          itemStyle(selected, pressed && !inactive, inactive && !selected)
        }
      >
        {edge ? (
          <Icon
            name={item.kind === "prev" ? "chevron-left" : "chevron-right"}
            size={Math.round(fontSize * 1.05)}
            color={t.colors["text-color"]}
          />
        ) : (
          <Text allowFontScaling={false} style={itemText(selected)}>
            {item.kind === "page" ? item.page : "•••"}
          </Text>
        )}
      </Pressable>
    );
  };

  const compact = simple || hideNumbers;
  const items = getPaginationItems({
    page,
    totalPages,
    siblingCount,
    boundaryCount,
    hideEdges,
  });
  const edges = items.filter((i) => i.kind === "prev" || i.kind === "next");
  const range = getPaginationVisibleRange(page, state.pageSize, total);

  const counter = (
    <View
      accessible
      accessibilityLabel={tr("paginationSimple.pageOf", {
        page,
        total: totalPages,
      })}
      accessibilityLiveRegion="polite"
      {...part("pagination", "counter")}
      style={{
        paddingHorizontal: t.space["3"],
        minHeight: height,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          ...textStyle(t, "md", fonts.sans),
          fontSize,
          fontVariant: ["tabular-nums"],
        }}
      >
        <Text
          style={{ color: primary.text, fontWeight: weight(t, "semibold") }}
        >
          {page}
        </Text>
        <Text style={{ color: t.colors["text-secondary-color"] }}>
          {" / "}
          {totalPages}
        </Text>
      </Text>
    </View>
  );

  return (
    <View
      role="navigation"
      accessibilityLabel={accessibilityLabel ?? tr("pagination.nav")}
      {...part("pagination", "root", {
        size,
        shape,
        variant,
        simple: compact,
        disabled,
      })}
      {...rest}
      style={[
        {
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: t.space["1"],
          rowGap: t.space["2"],
        },
        style,
      ]}
    >
      {showTotal ? (
        <View
          {...part("pagination", "total")}
          style={{ marginRight: t.space["2"] }}
        >
          {typeof showTotal === "function" ? (
            showTotal(total, range)
          ) : (
            <Text
              style={{
                ...textStyle(t, "sm", fonts.sans),
                color: t.colors["text-secondary-color"],
              }}
            >
              {tr("pagination.total", { total })}
            </Text>
          )}
        </View>
      ) : null}
      {compact ? (
        <>
          {edges[0] ? renderItem(edges[0]) : null}
          {counter}
          {edges[1] ? renderItem(edges[1]) : null}
        </>
      ) : (
        items.map(renderItem)
      )}
    </View>
  );
}
