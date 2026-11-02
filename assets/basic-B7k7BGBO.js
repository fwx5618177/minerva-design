import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useState } from "react";
import { Text } from "react-native";
import { Button, Card, KanbanBoard, KanbanColumn } from "minerva-design/native";

type Status = "todo" | "doing" | "done";
const COLUMNS: { status: Status; title: string; color: string }[] = [
  { status: "todo", title: "To do", color: "neutral" },
  { status: "doing", title: "Doing", color: "primary" },
  { status: "done", title: "Done", color: "success" },
];
const NEXT: Record<Status, Status | undefined> = {
  todo: "doing",
  doing: "done",
  done: undefined,
};

export default function Basic() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Write the onboarding guide", status: "todo" as Status },
    { id: 2, title: "Ship the billing page", status: "doing" as Status },
    { id: 3, title: "Set up error tracking", status: "done" as Status },
  ]);
  // Cards move with their own actions here (draggable boards: drag-drop demo).
  const advance = (id: number) =>
    setTasks((all) =>
      all.map((task) =>
        task.id === id && NEXT[task.status]
          ? { ...task, status: NEXT[task.status]! }
          : task,
      ),
    );
  return (
    <KanbanBoard columnWidth={240} height={360}>
      {COLUMNS.map((column) => {
        const items = tasks.filter((task) => task.status === column.status);
        return (
          <KanbanColumn
            key={column.status}
            title={column.title}
            count={items.length}
            color={column.color}
          >
            {items.map((task) => (
              <Card key={task.id} padding="small">
                <Text>{task.title}</Text>
                {NEXT[task.status] ? (
                  <Button
                    size="small"
                    variant="ghost"
                    onPress={() => advance(task.id)}
                  >
                    Move on
                  </Button>
                ) : null}
              </Card>
            ))}
          </KanbanColumn>
        );
      })}
    </KanbanBoard>
  );
}
`})))()}n();export{t as default};