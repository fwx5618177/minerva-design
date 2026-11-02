import { useState, type FormEvent } from "react";
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
  quadrantCountText,
  quadrantLabels,
  quadrantTaskDeleteText,
  quadrantTaskLabels,
  removeQuadrantTask,
  selectionAfterRemove,
  type QuadrantTaskDraft,
  type QuadrantTaskLabels,
} from "@minerva/charts/core";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { Input } from "../Input";
import { Select, SelectItem } from "../Select";
import { Modal, ModalBody, ModalFooter } from "../Modal";
import { ConfirmDialog } from "../Confirm";
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
  /** Texts of the buttons and dialogs (localized by default) */
  labels?: Partial<QuadrantTaskLabels>;
}

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
 * and delete buttons on the active task, a dialog to name a task and pick
 * its quadrant, a confirmation before a delete, drag and drop and keyboard
 * moves. Controlled: `points` in, `onPointsChange` out.
 */
export function QuadrantTaskBoard({
  points,
  onPointsChange,
  labels,
  ...props
}: QuadrantTaskBoardProps) {
  const { language } = useI18n();
  const locale = props.locale ?? language;
  const [draft, setDraft] = useState<QuadrantTaskDraft | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [selection, setSelection] = useState<number | null>(null);
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
  const edit = (index: number) =>
    setDraft(editQuadrantTaskDraft(geometry, points, index));
  const save = (event: FormEvent) => {
    event.preventDefault();
    const saved = applyQuadrantTaskDraft(geometry, points, draft);
    if (!saved) return;
    onPointsChange(saved.points);
    select(saved.index);
    setDraft(null);
  };
  const open =
    draft !== null && (draft.index === null || !!points[draft.index]);

  return (
    <div className={styles.board}>
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
          setDraft(newQuadrantTaskDraft(geometry, corner, at))
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
              onClick={() => setDeleting(index)}
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
              onClick={() => setDraft(newQuadrantTaskDraft(geometry, corner))}
            />
          </div>
        )}
      />
      <Modal
        open={open}
        onOpenChange={(next) => {
          if (!next) setDraft(null);
        }}
        title={draft?.index === null ? texts.add : texts.edit}
        size="small"
      >
        <form onSubmit={save}>
          <ModalBody className={styles.form}>
            <label className={styles.field}>
              <span>{texts.name}</span>
              <Input
                required
                value={draft?.label ?? ""}
                aria-label={texts.name}
                onChange={(event) => {
                  const label = event.target.value;
                  setDraft((old) => old && { ...old, label });
                }}
              />
            </label>
            <label className={styles.field}>
              <span>{texts.quadrant}</span>
              <Select
                value={draft?.quadrant ?? "topLeft"}
                aria-label={texts.quadrant}
                onChange={(corner) =>
                  setDraft(
                    (old) =>
                      old && { ...old, quadrant: corner as QuadrantCorner },
                  )
                }
              >
                {QUADRANT_CORNERS.map((corner) => (
                  <SelectItem key={corner} value={corner}>
                    {title(corner)}
                  </SelectItem>
                ))}
              </Select>
            </label>
          </ModalBody>
          <ModalFooter>
            <Button
              color="neutral"
              variant="outline"
              onClick={() => setDraft(null)}
            >
              {texts.cancel}
            </Button>
            <Button
              type="submit"
              disabled={!canSaveQuadrantTask(draft, points)}
            >
              {texts.save}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
      <ConfirmDialog
        open={deleting !== null && !!points[deleting]}
        onOpenChange={(next) => {
          if (!next) setDeleting(null);
        }}
        title={texts.delete}
        description={quadrantTaskDeleteText(
          texts,
          deleting === null ? undefined : points[deleting],
        )}
        cancelLabel={texts.cancel}
        color="danger"
        onConfirm={() => {
          if (deleting !== null && points[deleting]) {
            onPointsChange(removeQuadrantTask(points, deleting));
            select(selectionAfterRemove(selection, deleting));
          }
          setDeleting(null);
        }}
      />
    </div>
  );
}
