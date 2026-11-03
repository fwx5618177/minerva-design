import { useState } from "react";
import { Text } from "react-native";
import {
  Card,
  DashboardColumns,
  DashboardCard,
  DashboardColumn,
  type DashboardCardMove,
} from "minerva-design/native";
import { moveDashboardCard } from "minerva-design/core";

type Status = "todo" | "doing" | "done";
interface Task {
  id: string;
  title: string;
}

const COLUMNS: { status: Status; title: string }[] = [
  { status: "todo", title: "To do" },
  { status: "doing", title: "Doing" },
  { status: "done", title: "Done" },
];

export default function DragDrop() {
  const [lists, setLists] = useState<Record<Status, Task[]>>({
    todo: [
      { id: "guide", title: "Write the onboarding guide" },
      { id: "contrast", title: "Audit color contrast" },
    ],
    doing: [{ id: "billing", title: "Ship the billing page" }],
    done: [{ id: "errors", title: "Set up error tracking" }],
  });
  // Long press a card, drag it and lift the finger; screen readers get
  // "Move up / Move down / Move to <column>" actions on each card.
  const onCardMove = (move: DashboardCardMove) =>
    setLists(
      (current) =>
        moveDashboardCard(current, move, (task) => task.id) as Record<
          Status,
          Task[]
        >,
    );
  return (
    <DashboardColumns
      columnWidth={240}
      height={360}
      draggable
      onCardMove={onCardMove}
    >
      {COLUMNS.map((column) => (
        <DashboardColumn
          key={column.status}
          value={column.status}
          title={column.title}
          count={lists[column.status].length}
        >
          {lists[column.status].map((task) => (
            <DashboardCard key={task.id} value={task.id} label={task.title}>
              <Card padding="small">
                <Text>{task.title}</Text>
              </Card>
            </DashboardCard>
          ))}
        </DashboardColumn>
      ))}
    </DashboardColumns>
  );
}
