import { useState } from "react";
import {
  Card,
  CardDescription,
  CardTitle,
  KanbanBoard,
  KanbanCard,
  KanbanColumn,
  Tag,
  type KanbanCardMove,
} from "minerva-design";
import { moveKanbanCard } from "minerva-design/core";

type Status = "todo" | "doing" | "done";
interface Task {
  id: string;
  title: string;
  owner: string;
}

const COLUMNS: { status: Status; title: string }[] = [
  { status: "todo", title: "To do" },
  { status: "doing", title: "Doing" },
  { status: "done", title: "Done" },
];
/** Work in progress limit of "Doing" */
const LIMIT = 2;

export default function DragDropDemo() {
  const [lists, setLists] = useState<Record<Status, Task[]>>({
    todo: [
      { id: "guide", title: "Write the onboarding guide", owner: "Ada" },
      { id: "contrast", title: "Audit color contrast", owner: "Lin" },
      { id: "search", title: "Index the docs search", owner: "Sam" },
    ],
    doing: [{ id: "billing", title: "Ship the billing page", owner: "Sam" }],
    done: [{ id: "errors", title: "Set up error tracking", owner: "Ada" }],
  });

  // The board is controlled: it reports the move, the app applies it.
  const onCardMove = (move: KanbanCardMove) =>
    setLists(
      (current) =>
        moveKanbanCard(current, move, (task) => task.id) as Record<
          Status,
          Task[]
        >,
    );
  // A full "Doing" column takes no more cards (it can still be reordered).
  const canDrop = (move: KanbanCardMove) =>
    move.toColumn !== "doing" ||
    move.fromColumn === "doing" ||
    lists.doing.length < LIMIT;

  return (
    <KanbanBoard
      aria-label="Sprint 12"
      draggable
      onCardMove={onCardMove}
      canDrop={canDrop}
    >
      {COLUMNS.map((column) => (
        <KanbanColumn
          key={column.status}
          value={column.status}
          title={column.title}
          count={lists[column.status].length}
          description={
            column.status === "doing" ? `At most ${LIMIT} cards` : undefined
          }
        >
          {lists[column.status].map((task) => (
            <KanbanCard key={task.id} value={task.id} label={task.title}>
              <Card padding="small">
                <CardTitle as="h4">{task.title}</CardTitle>
                <CardDescription>
                  <Tag size="small">{task.owner}</Tag>
                </CardDescription>
              </Card>
            </KanbanCard>
          ))}
        </KanbanColumn>
      ))}
    </KanbanBoard>
  );
}
