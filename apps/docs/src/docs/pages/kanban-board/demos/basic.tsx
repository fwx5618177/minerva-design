import { useState } from "react";
import {
  Button,
  Card,
  CardDescription,
  CardTitle,
  KanbanBoard,
  KanbanColumn,
  Tag,
} from "minerva-design";

type Status = "todo" | "doing" | "done";
interface Task {
  id: number;
  title: string;
  owner: string;
  status: Status;
}

const COLUMNS: { status: Status; title: string }[] = [
  { status: "todo", title: "To do" },
  { status: "doing", title: "Doing" },
  { status: "done", title: "Done" },
];
const NEXT: Record<Status, Status | undefined> = {
  todo: "doing",
  doing: "done",
  done: undefined,
};
const titleOf = (status: Status) =>
  COLUMNS.find((column) => column.status === status)!.title;

export default function BasicDemo() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Write the onboarding guide",
      owner: "Ada",
      status: "todo",
    },
    { id: 2, title: "Audit color contrast", owner: "Lin", status: "todo" },
    { id: 3, title: "Ship the billing page", owner: "Sam", status: "doing" },
    { id: 4, title: "Set up error tracking", owner: "Ada", status: "done" },
  ]);
  // No drag and drop: cards move with your own actions.
  const advance = (id: number) =>
    setTasks((all) =>
      all.map((task) =>
        task.id === id && NEXT[task.status]
          ? { ...task, status: NEXT[task.status]! }
          : task,
      ),
    );

  return (
    <KanbanBoard aria-label="Sprint 12">
      {COLUMNS.map((column) => {
        const items = tasks.filter((task) => task.status === column.status);
        return (
          <KanbanColumn
            key={column.status}
            title={column.title}
            count={items.length}
          >
            {items.map((task) => (
              <Card key={task.id} padding="small">
                <CardTitle as="h4">{task.title}</CardTitle>
                <CardDescription>
                  <Tag size="small">{task.owner}</Tag>
                </CardDescription>
                {NEXT[task.status] ? (
                  <Button
                    size="small"
                    variant="ghost"
                    onClick={() => advance(task.id)}
                    aria-label={`Move to ${titleOf(NEXT[task.status]!)}: ${task.title}`}
                  >
                    Move to {titleOf(NEXT[task.status]!)}
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
