import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type PointerEvent,
} from "react";
import {
  QuadrantChart,
  type QuadrantChartProps,
  type QuadrantCorner,
  type QuadrantPoint,
} from "@minerva/charts";
import {
  QUADRANT_CORNERS,
  QUADRANT_TASK_ICONS,
  applyQuadrantTaskDraft,
  canSaveQuadrantTask,
  editQuadrantTaskDraft,
  moveQuadrantTask,
  newQuadrantTaskDraft,
  placeQuadrantTaskPanel,
  quadrantCountText,
  quadrantLabels,
  quadrantTaskColor,
  quadrantTaskDeleteText,
  quadrantTaskLabels,
  removeQuadrantTask,
  selectionAfterRemove,
  type QuadrantTaskBox,
  type QuadrantTaskDraft,
  type QuadrantTaskLabels,
} from "@minerva/charts/core";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { Input } from "../Input";
import useI18n from "../../hooks/useI18n";
import styles from "./quadrantTaskBoard.module.scss";

export type { QuadrantTaskLabels };

export interface QuadrantTaskBoardProps extends Omit<
  QuadrantChartProps,
  | "onPointDrop"
  | "onQuadrantClick"
  | "onPointDoubleClick"
  | "renderPointActions"
  | "renderQuadrantHeader"
  | "labels"
> {
  /**
   * Called with the next list of tasks after an add, an edit, a delete, a
   * drag and drop or a keyboard move (controlled: pass them back as `points`)
   */
  onPointsChange: (points: QuadrantPoint[]) => void;
  /** Texts of the buttons and panels (localized by default) */
  labels?: Partial<QuadrantTaskLabels>;
}

/** The inline panel: the add / edit form, or the delete confirmation */
type Panel =
  | { kind: "draft"; draft: QuadrantTaskDraft; anchor: QuadrantTaskBox }
  | { kind: "delete"; index: number; anchor: QuadrantTaskBox };

/** Half the size of the box around a task the panel keeps clear */
const DOT = 10;

function ActionIcon({ kind }: { kind: keyof typeof QUADRANT_TASK_ICONS }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={QUADRANT_TASK_ICONS[kind]} />
    </svg>
  );
}

/**
 * Task board on a four-quadrant matrix: an add button per quadrant, edit
 * and delete buttons on the active task, an inline panel anchored at the
 * button or the task to name a task and pick its quadrant, an inline
 * confirmation before a delete, drag and drop and keyboard moves.
 * Controlled: `points` in, `onPointsChange` out.
 */
export function QuadrantTaskBoard({
  points,
  onPointsChange,
  labels,
  ...props
}: QuadrantTaskBoardProps) {
  const { language } = useI18n();
  const locale = props.locale ?? language;
  const [panel, setPanel] = useState<Panel | null>(null);
  const [selection, setSelection] = useState<number | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastPointer = useRef<QuadrantTaskBox | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const id = useId();
  const texts = quadrantTaskLabels(locale, labels);
  const geometry = {
    xDomain: props.xDomain,
    yDomain: props.yDomain,
    xSplit: props.xSplit,
    ySplit: props.ySplit,
    reverseX: props.reverseX,
  };
  const defaults = quadrantLabels(locale);
  const title = (corner: QuadrantCorner) =>
    props.quadrants?.[corner]?.label || defaults[corner];
  const select = setSelection;

  /** Box of an element, relative to the board */
  const boxOf = (el: Element | null | undefined): QuadrantTaskBox | null => {
    const board = boardRef.current;
    if (!el || !board) return null;
    const b = board.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return {
      x: r.left - b.left,
      y: r.top - b.top,
      width: r.width,
      height: r.height,
    };
  };
  /** Box around a task (its anchor in the chart), else the last pointer */
  const pointBox = (index: number): QuadrantTaskBox => {
    const box = boxOf(
      boardRef.current?.querySelector(
        `.minerva-chart-quadrant-point[data-point-index="${index}"]`,
      ),
    );
    if (box)
      return {
        x: box.x - DOT,
        y: box.y - DOT,
        width: 2 * DOT,
        height: 2 * DOT,
      };
    return lastPointer.current ?? { x: 0, y: 0, width: 0, height: 0 };
  };
  const open = (next: Panel) => {
    if (!panel) {
      const active = document.activeElement;
      returnFocus.current = active instanceof HTMLElement ? active : null;
    }
    setPanel(next);
  };
  const close = useCallback(() => {
    setPanel(null);
    const target = returnFocus.current;
    returnFocus.current = null;
    if (target?.isConnected) target.focus();
  }, []);
  const edit = (index: number, anchor = pointBox(index)) => {
    const draft = editQuadrantTaskDraft(geometry, points, index);
    if (draft) open({ kind: "draft", draft, anchor });
  };
  const setDraft = (change: Partial<QuadrantTaskDraft>) =>
    setPanel((old) =>
      old?.kind === "draft"
        ? { ...old, draft: { ...old.draft, ...change } }
        : old,
    );
  const draft = panel?.kind === "draft" ? panel.draft : null;
  const deleting = panel?.kind === "delete" ? panel.index : null;
  const shown =
    panel !== null &&
    (draft
      ? draft.index === null || !!points[draft.index]
      : deleting !== null && !!points[deleting]);
  const save = (event: FormEvent) => {
    event.preventDefault();
    const saved = applyQuadrantTaskDraft(geometry, points, draft);
    if (!saved) return;
    onPointsChange(saved.points);
    select(saved.index);
    close();
  };
  const remove = () => {
    if (deleting !== null && points[deleting]) {
      onPointsChange(removeQuadrantTask(points, deleting));
      select(selectionAfterRemove(selection, deleting));
    }
    close();
  };

  // next to its anchor, inside the board, before the panel is painted
  const anchor = shown ? panel.anchor : null;
  const kind = shown ? panel.kind : null;
  useLayoutEffect(() => {
    const el = panelRef.current;
    const board = boardRef.current;
    if (!el || !board || !anchor) return;
    const place = placeQuadrantTaskPanel(
      anchor,
      { width: el.offsetWidth, height: el.offsetHeight },
      { width: board.clientWidth, height: board.clientHeight },
    );
    el.style.left = `${place.x}px`;
    el.style.top = `${place.y}px`;
    el.style.transformOrigin = `${place.origin.x}px ${place.origin.y}px`;
    el.dataset.placement = place.placement;
  }, [anchor, kind]);

  // the first field (or Cancel) takes the focus when the panel opens
  useEffect(() => {
    if (!anchor) return;
    panelRef.current
      ?.querySelector<HTMLElement>("[data-autofocus]")
      ?.focus({ preventScroll: true });
  }, [anchor, kind]);

  // a press outside the panel closes it, like a popover; so does Escape
  useEffect(() => {
    if (!shown) return;
    const onDown = (event: globalThis.PointerEvent) => {
      const target = event.target as Node | null;
      if (target && panelRef.current?.contains(target)) return;
      setPanel(null);
      returnFocus.current = null;
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      close();
    };
    const el = panelRef.current;
    document.addEventListener("pointerdown", onDown, true);
    el?.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown, true);
      el?.removeEventListener("keydown", onKey);
    };
  }, [shown, kind, close]);

  const trackPointer = (event: PointerEvent) => {
    const board = boardRef.current;
    if (!board) return;
    const b = board.getBoundingClientRect();
    lastPointer.current = {
      x: event.clientX - b.left,
      y: event.clientY - b.top,
      width: 0,
      height: 0,
    };
  };

  return (
    <div
      ref={boardRef}
      className={styles.board}
      data-panel={shown ? panel.kind : undefined}
      onPointerDownCapture={trackPointer}
    >
      <QuadrantChart
        {...props}
        locale={locale}
        points={points}
        selectedIndex={
          props.selectedIndex !== undefined ? props.selectedIndex : selection
        }
        onPointClick={(point, index) => {
          select(index);
          props.onPointClick?.(point, index);
        }}
        onPointDrop={(_point, index, at) => {
          onPointsChange(moveQuadrantTask(points, index, at));
          select(index);
        }}
        onQuadrantClick={(corner, at) =>
          open({
            kind: "draft",
            draft: newQuadrantTaskDraft(geometry, corner, at),
            anchor: lastPointer.current ?? { x: 0, y: 0, width: 0, height: 0 },
          })
        }
        onPointDoubleClick={(_point, index) => edit(index)}
        renderPointActions={(_point, index) => (
          <div
            role="toolbar"
            aria-label={texts.actions}
            className={styles.actions}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <IconButton
              size="small"
              variant="ghost"
              label={texts.edit}
              icon={<ActionIcon kind="edit" />}
              onClick={() => edit(index)}
            />
            <IconButton
              size="small"
              variant="ghost"
              color="danger"
              label={texts.delete}
              icon={<ActionIcon kind="delete" />}
              onClick={() =>
                open({ kind: "delete", index, anchor: pointBox(index) })
              }
            />
          </div>
        )}
        renderQuadrantHeader={(corner, info) => (
          <div className={styles.header} data-corner={corner}>
            {info.region?.badge ? (
              <span className={styles.badge}>{info.region.badge}</span>
            ) : null}
            <span className={styles.title}>{title(corner)}</span>
            {props.showCounts === false ? null : (
              <span className={styles.count}>
                {quadrantCountText(
                  props.showCounts ?? true,
                  info.points,
                  locale,
                )}
              </span>
            )}
            <IconButton
              size="xsmall"
              variant="ghost"
              className={styles.add}
              label={`${texts.add} · ${title(corner)}`}
              icon={<ActionIcon kind="add" />}
              aria-expanded={
                shown && draft?.index === null && draft.quadrant === corner
              }
              onClick={(event) =>
                open({
                  kind: "draft",
                  draft: newQuadrantTaskDraft(geometry, corner),
                  anchor: boxOf(event.currentTarget) ?? {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                  },
                })
              }
            />
          </div>
        )}
      />
      {shown && draft ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-labelledby={`${id}-title`}
          className={styles.panel}
          data-quadrant-task-panel={draft.index === null ? "add" : "edit"}
        >
          <form className={styles.form} onSubmit={save}>
            <h3 id={`${id}-title`} className={styles.panelTitle}>
              {draft.index === null ? texts.add : texts.edit}
            </h3>
            <label className={styles.field}>
              <span>{texts.name}</span>
              <Input
                required
                size="small"
                data-autofocus=""
                value={draft.label}
                aria-label={texts.name}
                onChange={(event) => setDraft({ label: event.target.value })}
              />
            </label>
            <fieldset className={styles.quadrants}>
              <legend>{texts.quadrant}</legend>
              <div className={styles.quadrantGrid}>
                {QUADRANT_CORNERS.map((corner) => (
                  <label
                    key={corner}
                    className={styles.quadrant}
                    data-corner={corner}
                  >
                    <input
                      type="radio"
                      name={`${id}-quadrant`}
                      value={corner}
                      checked={draft.quadrant === corner}
                      onChange={() => setDraft({ quadrant: corner })}
                    />
                    <span
                      className={styles.swatch}
                      style={{
                        background: quadrantTaskColor(props.quadrants, corner),
                      }}
                      aria-hidden="true"
                    />
                    <span className={styles.quadrantName}>{title(corner)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className={styles.footer}>
              <Button
                size="small"
                color="neutral"
                variant="ghost"
                onClick={close}
              >
                {texts.cancel}
              </Button>
              <Button
                size="small"
                type="submit"
                disabled={!canSaveQuadrantTask(draft, points)}
              >
                {texts.save}
              </Button>
            </div>
          </form>
        </div>
      ) : null}
      {shown && deleting !== null ? (
        <div
          ref={panelRef}
          role="alertdialog"
          aria-labelledby={`${id}-title`}
          aria-describedby={`${id}-text`}
          className={styles.panel}
          data-quadrant-task-panel="delete"
        >
          <h3 id={`${id}-title`} className={styles.panelTitle}>
            {texts.delete}
          </h3>
          <p id={`${id}-text`} className={styles.panelText}>
            {quadrantTaskDeleteText(texts, points[deleting])}
          </p>
          <div className={styles.footer}>
            <Button
              size="small"
              color="neutral"
              variant="ghost"
              data-autofocus=""
              onClick={close}
            >
              {texts.cancel}
            </Button>
            <Button size="small" color="danger" onClick={remove}>
              {texts.confirmDelete}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
