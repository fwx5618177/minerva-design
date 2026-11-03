<script setup lang="ts">
import { ref } from "vue";
import {
  Button,
  Card,
  CardDescription,
  CardTitle,
  DashboardColumns,
  DashboardColumn,
  Tag,
} from "minerva-design/vue";

type Status = "todo" | "doing" | "done";
const columns: { status: Status; title: string }[] = [
  { status: "todo", title: "To do" },
  { status: "doing", title: "Doing" },
  { status: "done", title: "Done" },
];
const next: Record<Status, Status | undefined> = {
  todo: "doing",
  doing: "done",
  done: undefined,
};
const titleOf = (status: Status) =>
  columns.find((column) => column.status === status)!.title;
const tasks = ref([
  { id: 1, title: "Write the onboarding guide", owner: "Ada", status: "todo" },
  { id: 2, title: "Audit color contrast", owner: "Lin", status: "todo" },
  { id: 3, title: "Ship the billing page", owner: "Sam", status: "doing" },
  { id: 4, title: "Set up error tracking", owner: "Ada", status: "done" },
] as { id: number; title: string; owner: string; status: Status }[]);
const itemsOf = (status: Status) =>
  tasks.value.filter((task) => task.status === status);
// Cards move with their own actions here (draggable boards: drag-drop demo).
const advance = (id: number) => {
  const task = tasks.value.find((item) => item.id === id);
  if (task && next[task.status]) task.status = next[task.status]!;
};
</script>
<template>
  <DashboardColumns aria-label="Sprint 12">
    <DashboardColumn
      v-for="column in columns"
      :key="column.status"
      :title="column.title"
      :count="itemsOf(column.status).length"
    >
      <Card
        v-for="task in itemsOf(column.status)"
        :key="task.id"
        padding="small"
      >
        <CardTitle as="h4">{{ task.title }}</CardTitle>
        <CardDescription
          ><Tag size="small">{{ task.owner }}</Tag></CardDescription
        >
        <Button
          v-if="next[task.status]"
          size="small"
          variant="ghost"
          :aria-label="`Move to ${titleOf(next[task.status]!)}: ${task.title}`"
          @click="advance(task.id)"
          >Move to {{ titleOf(next[task.status]!) }}</Button
        >
      </Card>
    </DashboardColumn>
  </DashboardColumns>
</template>
