import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useState } from "react";
import { Text } from "react-native";
import {
  Card,
  KanbanBoard,
  KanbanCard,
  KanbanColumn,
  type KanbanCardMove,
} from "minerva-design/native";
import { moveKanbanCard } from "minerva-design/core";

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
  const onCardMove = (move: KanbanCardMove) =>
    setLists(
      (current) =>
        moveKanbanCard(current, move, (task) => task.id) as Record<
          Status,
          Task[]
        >,
    );
  return (
    <KanbanBoard
      columnWidth={240}
      height={360}
      draggable
      onCardMove={onCardMove}
    >
      {COLUMNS.map((column) => (
        <KanbanColumn
          key={column.status}
          value={column.status}
          title={column.title}
          count={lists[column.status].length}
        >
          {lists[column.status].map((task) => (
            <KanbanCard key={task.id} value={task.id} label={task.title}>
              <Card padding="small">
                <Text>{task.title}</Text>
              </Card>
            </KanbanCard>
          ))}
        </KanbanColumn>
      ))}
    </KanbanBoard>
  );
}
`})))()}n();export{t as default};