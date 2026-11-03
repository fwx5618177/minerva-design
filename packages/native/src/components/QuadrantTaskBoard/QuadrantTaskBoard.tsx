import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  BackHandler,
  Platform,
  Pressable,
  Text,
  View,
  type LayoutChangeEvent,
} from "react-native";
import { colorMix, parseColor, type ResolvedTokens } from "@minerva/core";
import {
  CANVAS_TOOLTIP_ALPHA,
  QUADRANT_CORNERS,
  applyQuadrantTaskDraft,
  canSaveQuadrantTask,
  editQuadrantTaskDraft,
  moveQuadrantTask,
  newQuadrantTaskDraft,
  placeQuadrantTaskPanel,
  quadrantCenter,
  quadrantCountText,
  quadrantLabels,
  quadrantTaskColor,
  quadrantTaskDeleteText,
  quadrantTaskLabels,
  removeQuadrantTask,
  selectionAfterRemove,
  tooltipColors,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantTaskBox,
  type QuadrantTaskDraft,
  type QuadrantTaskLabels,
} from "@minerva/charts/canvas";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { Icon } from "../../internal/Icon";
import { part } from "../../internal/parts";
import { shadowStyle, textStyle, weight } from "../../internal/styles";
import {
  QuadrantChart,
  type ChartHandle,
  type QuadrantChartProps,
} from "../Chart";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { Input } from "../Input";

export type { QuadrantTaskLabels };

export interface QuadrantTaskBoardProps extends Omit<
  QuadrantChartProps,
  | "onPointDrop"
  | "onQuadrantClick"
  | "renderPointActions"
  | "renderQuadrantHeader"
  | "labels"
> {
  /**
   * Called with the next list of tasks after an add, an edit, a delete, a
   * drag and drop or a "Move to" accessibility action (controlled: pass
   * them back as `points`)
   */
  onPointsChange: (points: QuadrantPoint[]) => void;
  /** Texts of the buttons and panels (localized by default) */
  labels?: Partial<QuadrantTaskLabels>;
}

/** The inline panel: the add / edit form, or the delete confirmation */
type Panel = { session: number; anchor: QuadrantTaskBox } & (
  | { kind: "draft"; draft: QuadrantTaskDraft }
  | { kind: "delete"; index: number }
);

type Size = { width: number; height: number };

/** Half the size of the box around a task the panel keeps clear */
const DOT = 10;
/** Height of the strip of a quadrant holding its header */
const HEADER = 40;
/** Width of the panel (at most the width of the board) */
const PANEL_WIDTH = 288;
const NO_BOX: QuadrantTaskBox = { x: 0, y: 0, width: 0, height: 0 };

const hidden = {
  accessible: false,
  importantForAccessibility: "no-hide-descendants",
  accessibilityElementsHidden: true,
} as const;

const VAR = /^var\(\s*--([\w-]+)\s*(?:,\s*([\s\S]*))?\)$/;

/**
 * A color of the options (`var(--danger-color, #ef4444)`, `red`...) with
 * its variables taken from the tokens, like the chart engine reads them
 */
function resolveColor(value: string, t: ResolvedTokens, depth = 0): string {
  const match = VAR.exec(value.trim());
  if (!match || depth > 8) return value;
  const own = t.css[match[1]!] ?? t.colors[match[1]!];
  if (own) return resolveColor(own, t, depth + 1);
  return match[2] ? resolveColor(match[2], t, depth + 1) : "transparent";
}

/** A token color as a color of the chart engine (channels 0-1) */
const engineColor = (value: string | undefined) => {
  const c = value ? parseColor(value) : undefined;
  return c ? ([c.r / 255, c.g / 255, c.b / 255, c.a] as const) : null;
};

/** Pencil glyph of the edit button (drawn with views: no SVG dependency) */
function EditGlyph({ color, size }: { color: string; size: number }) {
  const stroke = Math.max(1.5, Math.round(size / 9));
  return (
    <View
      {...hidden}
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: size * 0.3,
          height: size * 0.82,
          borderWidth: stroke,
          borderColor: color,
          borderTopLeftRadius: stroke,
          borderTopRightRadius: stroke,
          borderBottomLeftRadius: size * 0.15,
          borderBottomRightRadius: size * 0.15,
          transform: [{ rotate: "45deg" }],
        }}
      />
    </View>
  );
}

/** Trash can glyph of the delete button */
function DeleteGlyph({ color, size }: { color: string; size: number }) {
  const stroke = Math.max(1.5, Math.round(size / 9));
  return (
    <View
      {...hidden}
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: size * 0.32,
          height: size * 0.12,
          borderWidth: stroke,
          borderBottomWidth: 0,
          borderColor: color,
          borderTopLeftRadius: stroke,
          borderTopRightRadius: stroke,
        }}
      />
      <View
        style={{
          width: size * 0.8,
          height: stroke,
          borderRadius: stroke,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          width: size * 0.58,
          height: size * 0.56,
          marginTop: stroke / 2,
          borderWidth: stroke,
          borderTopWidth: 0,
          borderColor: color,
          borderBottomLeftRadius: stroke * 1.5,
          borderBottomRightRadius: stroke * 1.5,
        }}
      />
    </View>
  );
}

/**
 * Task board on a four-quadrant matrix: an add button in each quadrant
 * header, edit and delete buttons next to the selected task, an inline
 * panel anchored at the button or the task to name a task and pick its
 * quadrant, an inline confirmation before a delete, and moves by drag and
 * drop or the "Move to" accessibility actions of the points. Controlled:
 * `points` in, `onPointsChange` out.
 */
export function QuadrantTaskBoard({
  points,
  onPointsChange,
  labels,
  ref,
  ...props
}: QuadrantTaskBoardProps) {
  const { tokens: t, fonts } = useTheme();
  const { language } = useI18n();
  const locale = props.locale ?? language;
  const texts = quadrantTaskLabels(locale, labels);
  const defaults = quadrantLabels(locale);
  const title = (corner: QuadrantCorner) =>
    props.quadrants?.[corner]?.label || defaults[corner];
  const geometry = {
    xDomain: props.xDomain,
    yDomain: props.yDomain,
    xSplit: props.xSplit,
    ySplit: props.ySplit,
    reverseX: props.reverseX,
  };

  const [selection, setSelection] = useState<number | null>(null);
  const [panel, setPanel] = useState<Panel | null>(null);
  const [board, setBoard] = useState<Size | null>(null);
  const [panelSize, setPanelSize] = useState<Size | null>(null);
  const boardRef = useRef<View>(null);
  const addRefs = useRef<Partial<Record<QuadrantCorner, View | null>>>({});
  const sessions = useRef(0);

  // the chart handle maps tasks to pixels; the caller's `ref` gets it too
  const chartRef = useRef<ChartHandle | null>(null);
  const setChart = useCallback(
    (handle: ChartHandle | null) => {
      chartRef.current = handle;
      if (typeof ref === "function") ref(handle);
      else if (ref) ref.current = handle;
    },
    [ref],
  );
  /** A data position in pixels of the board (the chart fills its top left) */
  const pixel = (x: number, y: number) =>
    chartRef.current?.getController()?.toPixel(x, y) ?? null;

  /** Box around a task */
  const pointBox = (index: number): QuadrantTaskBox => {
    const point = points[index];
    const p = point ? pixel(point.x, point.y) : null;
    return p
      ? { x: p.x - DOT, y: p.y - DOT, width: 2 * DOT, height: 2 * DOT }
      : NO_BOX;
  };
  /** A pressed spot of a quadrant, else its center */
  const spotBox = (
    corner: QuadrantCorner,
    at?: { x: number; y: number },
  ): QuadrantTaskBox => {
    const spot = at ?? quadrantCenter(geometry, corner);
    const p = pixel(spot.x, spot.y);
    return p ? { x: p.x, y: p.y, width: 0, height: 0 } : NO_BOX;
  };
  /** The header strip of a quadrant (until its + button is measured) */
  const headerBox = (corner: QuadrantCorner): QuadrantTaskBox => {
    const [x0, x1] = props.xDomain ?? [0, 10];
    const [y0, y1] = props.yDomain ?? [0, 10];
    const split = pixel(
      props.xSplit ?? (x0 + x1) / 2,
      props.ySplit ?? (y0 + y1) / 2,
    );
    const a = pixel(x0, y0);
    const b = pixel(x1, y1);
    if (!split || !a || !b) return spotBox(corner);
    const left = corner.endsWith("Left");
    const minX = Math.min(a.x, b.x);
    const maxX = Math.max(a.x, b.x);
    return {
      x: left ? minX : split.x,
      y: corner.startsWith("top")
        ? Math.min(a.y, b.y)
        : Math.max(a.y, b.y) - HEADER,
      width: left ? split.x - minX : maxX - split.x,
      height: HEADER,
    };
  };

  const open = (next: (session: number) => Panel, measure?: View | null) => {
    const session = ++sessions.current;
    setPanelSize(null);
    setPanel(next(session));
    // the + button, relative to the board (then its box replaces the strip)
    const to = boardRef.current;
    if (measure && to)
      measure.measureLayout(
        to,
        (x, y, width, height) =>
          setPanel((old) =>
            old?.session === session
              ? { ...old, anchor: { x, y, width, height } }
              : old,
          ),
        () => {},
      );
  };
  const close = useCallback(() => setPanel(null), []);
  const openDraft = (
    draft: QuadrantTaskDraft | null,
    anchor: QuadrantTaskBox,
    measure?: View | null,
  ) => {
    if (draft)
      open((session) => ({ session, anchor, kind: "draft", draft }), measure);
  };
  const update = (patch: Partial<QuadrantTaskDraft>) =>
    setPanel((old) =>
      old?.kind === "draft"
        ? { ...old, draft: { ...old.draft, ...patch } }
        : old,
    );

  const draft = panel?.kind === "draft" ? panel.draft : null;
  const deleting = panel?.kind === "delete" ? panel.index : null;
  const shown =
    panel !== null &&
    (draft
      ? draft.index === null || !!points[draft.index]
      : deleting !== null && !!points[deleting]);
  const kind = !shown
    ? undefined
    : draft
      ? draft.index === null
        ? "add"
        : "edit"
      : "delete";

  const save = () => {
    if (!shown || !draft) return;
    const saved = applyQuadrantTaskDraft(geometry, points, draft);
    if (!saved) return;
    onPointsChange(saved.points);
    setSelection(saved.index);
    close();
  };
  const remove = () => {
    if (deleting !== null && points[deleting]) {
      onPointsChange(removeQuadrantTask(points, deleting));
      setSelection(selectionAfterRemove(selection, deleting));
    }
    close();
  };

  // the Android back button closes the panel first
  useEffect(() => {
    if (!shown || Platform.OS !== "android") return;
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        close();
        return true;
      },
    );
    return () => subscription.remove();
  }, [shown, close]);
  // react-native-web forwards onKeyDown to the DOM element: Escape closes
  const keyProps =
    Platform.OS === "web"
      ? ({
          onKeyDown: (event: {
            key?: string;
            nativeEvent?: { key?: string };
          }) => {
            if ((event.nativeEvent?.key ?? event.key) === "Escape") close();
          },
        } as object)
      : undefined;

  // a frosted surface after the theme, like the chart tooltips (no blur)
  const glass = useMemo(
    () =>
      tooltipColors(
        {
          background: engineColor(
            t.colors["surface-elevated-color"] ?? t.colors["surface-color"],
          ),
          axis: engineColor(t.colors["border-color"]),
          text: engineColor(t.colors["text-color"]),
        },
        CANVAS_TOOLTIP_ALPHA,
      ),
    [t],
  );
  const sans = fonts.sans;
  const width = Math.min(PANEL_WIDTH, board?.width ?? PANEL_WIDTH);
  const place =
    shown && board && panelSize
      ? placeQuadrantTaskPanel(panel.anchor, panelSize, board)
      : null;

  const chip = (corner: QuadrantCorner) => {
    const checked = draft?.quadrant === corner;
    return (
      <Pressable
        key={corner}
        accessibilityRole="radio"
        accessibilityLabel={title(corner)}
        accessibilityState={{ checked }}
        onPress={() => update({ quadrant: corner })}
        style={({ pressed }) => ({
          flex: 1,
          minWidth: 0,
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          paddingVertical: 5,
          paddingHorizontal: 8,
          borderWidth: 1,
          borderRadius: t.radius.md,
          borderColor: checked
            ? (colorMix(t.colors["primary-color"], "transparent", 70) ??
              t.colors["primary-color"])
            : (colorMix(t.colors["border-color"], "transparent", 80) ??
              t.colors["border-color"]),
          backgroundColor: checked
            ? colorMix(t.colors["primary-color"], "transparent", 12)
            : pressed
              ? colorMix(t.colors["text-color"], "transparent", 6)
              : colorMix(t.colors["surface-color"], "transparent", 40),
        })}
        {...part("quadrant-task-board", "quadrant", { corner, checked })}
      >
        <View
          {...hidden}
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: resolveColor(
              quadrantTaskColor(props.quadrants, corner),
              t,
            ),
          }}
        />
        <Text
          numberOfLines={1}
          style={[
            textStyle(t, "xs", sans),
            {
              flexShrink: 1,
              fontWeight: weight(t, checked ? "semibold" : "regular"),
            },
          ]}
        >
          {title(corner)}
        </Text>
      </Pressable>
    );
  };

  const panelTitle = (text: string) => (
    <Text
      accessibilityRole="header"
      style={[textStyle(t, "md", sans), { fontWeight: weight(t, "semibold") }]}
      {...part("quadrant-task-board", "panel-title")}
    >
      {text}
    </Text>
  );
  const footer = (confirm: ReactNode) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: t.space["2"],
      }}
      {...part("quadrant-task-board", "panel-footer")}
    >
      <Button size="small" variant="ghost" color="neutral" onPress={close}>
        {texts.cancel}
      </Button>
      {confirm}
    </View>
  );

  return (
    <View
      ref={boardRef}
      onLayout={(event: LayoutChangeEvent) => {
        const { width: w, height: h } = event.nativeEvent.layout;
        setBoard((old) =>
          old?.width === w && old.height === h ? old : { width: w, height: h },
        );
      }}
      {...part("quadrant-task-board", "root", { panel: kind })}
    >
      <QuadrantChart
        {...props}
        ref={setChart}
        locale={locale}
        points={points}
        selectedIndex={
          props.selectedIndex !== undefined ? props.selectedIndex : selection
        }
        onPointClick={(point, index) => {
          setSelection(index);
          props.onPointClick?.(point, index);
        }}
        onPointDrop={(_point, index, at) => {
          onPointsChange(moveQuadrantTask(points, index, at));
          setSelection(index);
        }}
        onQuadrantClick={(corner, at) =>
          openDraft(
            newQuadrantTaskDraft(geometry, corner, at),
            spotBox(corner, at),
          )
        }
        renderPointActions={(_point, index) => (
          <View
            accessibilityRole="toolbar"
            accessibilityLabel={texts.actions}
            style={{
              flexDirection: "row",
              gap: 2,
              padding: 3,
              borderWidth: 1,
              borderColor: t.colors["border-color"],
              borderRadius: t.radius.md,
              backgroundColor:
                t.colors["surface-elevated-color"] ?? t.colors["surface-color"],
              ...shadowStyle(t.shadows.md),
            }}
            {...part("quadrant-task-board", "actions")}
          >
            <IconButton
              size="small"
              variant="ghost"
              label={texts.edit}
              icon={(color, size) => <EditGlyph color={color} size={size} />}
              onPress={() =>
                openDraft(
                  editQuadrantTaskDraft(geometry, points, index),
                  pointBox(index),
                )
              }
            />
            <IconButton
              size="small"
              variant="ghost"
              color="danger"
              label={texts.delete}
              icon={(color, size) => <DeleteGlyph color={color} size={size} />}
              onPress={() => {
                if (!points[index]) return;
                const anchor = pointBox(index);
                open((session) => ({ session, anchor, kind: "delete", index }));
              }}
            />
          </View>
        )}
        renderQuadrantHeader={(corner, info) => {
          const count =
            props.showCounts === false
              ? undefined
              : quadrantCountText(
                  props.showCounts ?? true,
                  info.points,
                  locale,
                );
          return (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                maxWidth: "100%",
                paddingLeft: t.space["2"],
                paddingRight: 2,
                paddingVertical: 2,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: t.colors["border-color"],
                backgroundColor: t.colors["surface-color"],
              }}
              {...part("quadrant-task-board", "header", { corner })}
            >
              {info.region?.badge ? (
                <Text
                  style={[
                    textStyle(t, "xs", sans),
                    {
                      color: t.colors["text-secondary-color"],
                      fontWeight: weight(t, "medium"),
                    },
                  ]}
                >
                  {info.region.badge}
                </Text>
              ) : null}
              <Text
                numberOfLines={1}
                style={[
                  textStyle(t, "xs", sans),
                  { flexShrink: 1, fontWeight: weight(t, "semibold") },
                ]}
              >
                {title(corner)}
              </Text>
              {count !== undefined ? (
                <Text
                  style={[
                    textStyle(t, 11, sans),
                    {
                      minWidth: 20,
                      paddingHorizontal: 6,
                      borderRadius: 999,
                      overflow: "hidden",
                      textAlign: "center",
                      color: t.colors["text-secondary-color"],
                      backgroundColor: t.colors["surface-muted-color"],
                      fontWeight: weight(t, "medium"),
                      fontVariant: ["tabular-nums"],
                    },
                  ]}
                  {...part("quadrant-task-board", "count")}
                >
                  {count}
                </Text>
              ) : null}
              <View
                collapsable={false}
                ref={(view) => {
                  addRefs.current[corner] = view;
                }}
              >
                <IconButton
                  size="xsmall"
                  variant="ghost"
                  label={`${texts.add} · ${title(corner)}`}
                  accessibilityState={{
                    expanded: kind === "add" && draft?.quadrant === corner,
                  }}
                  icon={(color, size) => (
                    <Icon name="plus" size={size} color={color} />
                  )}
                  onPress={() =>
                    openDraft(
                      newQuadrantTaskDraft(geometry, corner),
                      headerBox(corner),
                      addRefs.current[corner],
                    )
                  }
                />
              </View>
            </View>
          );
        }}
      />
      {shown ? (
        <>
          {/* a press outside the panel closes it, like a popover */}
          <Pressable
            accessible={false}
            importantForAccessibility="no"
            onPress={close}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10,
            }}
            {...part("quadrant-task-board", "backdrop")}
          />
          <View
            key={panel.session}
            role={kind === "delete" ? "alertdialog" : "dialog"}
            accessibilityLabel={
              kind === "add"
                ? texts.add
                : kind === "edit"
                  ? texts.edit
                  : texts.delete
            }
            accessibilityViewIsModal={false}
            onLayout={(event: LayoutChangeEvent) => {
              const { width: w, height: h } = event.nativeEvent.layout;
              setPanelSize((old) =>
                old?.width === w && old.height === h
                  ? old
                  : { width: w, height: h },
              );
            }}
            style={{
              position: "absolute",
              left: place?.x ?? 0,
              top: place?.y ?? 0,
              // hidden for the frame before it is measured and placed
              opacity: place ? 1 : 0,
              zIndex: 11,
              width,
              maxWidth: "100%",
              gap: t.space["3"],
              paddingVertical: t.space["3"],
              paddingHorizontal: t.space["4"],
              borderWidth: 1,
              borderColor: glass.border,
              borderRadius: t.radius.lg,
              backgroundColor: glass.background,
              shadowColor: "#0f172a",
              shadowOpacity: 0.2,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 12 },
              elevation: 8,
            }}
            {...keyProps}
            {...part("quadrant-task-board", "panel", {
              kind,
              placement: place?.placement,
            })}
          >
            {draft ? (
              <>
                {panelTitle(draft.index === null ? texts.add : texts.edit)}
                <Input
                  label={texts.name}
                  size="small"
                  autoFocus
                  value={draft.label}
                  onChange={(label) => update({ label })}
                  returnKeyType="done"
                  onSubmitEditing={save}
                />
                <View style={{ gap: t.space["1"] }}>
                  <Text
                    {...hidden}
                    style={[
                      textStyle(t, "xs", sans),
                      {
                        color: t.colors["text-secondary-color"],
                        fontWeight: weight(t, "medium"),
                      },
                    ]}
                  >
                    {texts.quadrant}
                  </Text>
                  <View
                    accessibilityRole="radiogroup"
                    accessibilityLabel={texts.quadrant}
                    style={{ gap: 6 }}
                  >
                    {[
                      QUADRANT_CORNERS.slice(0, 2),
                      QUADRANT_CORNERS.slice(2),
                    ].map((row, i) => (
                      <View key={i} style={{ flexDirection: "row", gap: 6 }}>
                        {row.map(chip)}
                      </View>
                    ))}
                  </View>
                </View>
                {footer(
                  <Button
                    size="small"
                    disabled={!canSaveQuadrantTask(draft, points)}
                    onPress={save}
                  >
                    {texts.save}
                  </Button>,
                )}
              </>
            ) : (
              <>
                <View style={{ gap: t.space["1"] }}>
                  {panelTitle(texts.delete)}
                  <Text
                    style={[
                      textStyle(t, "md", sans),
                      { color: t.colors["text-secondary-color"] },
                    ]}
                  >
                    {quadrantTaskDeleteText(
                      texts,
                      deleting !== null ? points[deleting] : undefined,
                    )}
                  </Text>
                </View>
                {footer(
                  <Button size="small" color="danger" onPress={remove}>
                    {texts.confirmDelete}
                  </Button>,
                )}
              </>
            )}
          </View>
        </>
      ) : null}
    </View>
  );
}
