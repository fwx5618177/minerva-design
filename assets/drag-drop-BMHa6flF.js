import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
import { ref } from "vue";
import {
  Card,
  CardDescription,
  CardTitle,
  DashboardColumns,
  DashboardCard,
  DashboardColumn,
  Tag,
  type DashboardCardMove,
} from "minerva-design/vue";
import { moveDashboardCard } from "minerva-design/core";

type Status = "todo" | "doing" | "done";
interface Task {
  id: string;
  title: string;
  owner: string;
}

const columns: { status: Status; title: string }[] = [
  { status: "todo", title: "To do" },
  { status: "doing", title: "Doing" },
  { status: "done", title: "Done" },
];
/** Work in progress limit of "Doing" */
const limit = 2;
const lists = ref<Record<Status, Task[]>>({
  todo: [
    { id: "guide", title: "Write the onboarding guide", owner: "Ada" },
    { id: "contrast", title: "Audit color contrast", owner: "Lin" },
    { id: "search", title: "Index the docs search", owner: "Sam" },
  ],
  doing: [{ id: "billing", title: "Ship the billing page", owner: "Sam" }],
  done: [{ id: "errors", title: "Set up error tracking", owner: "Ada" }],
});
// The board is controlled: it emits the move, the app applies it.
const onCardMove = (move: DashboardCardMove) => {
  lists.value = moveDashboardCard(
    lists.value,
    move,
    (task) => task.id,
  ) as Record<Status, Task[]>;
};
// A full "Doing" column takes no more cards (it can still be reordered).
const canDrop = (move: DashboardCardMove) =>
  move.toColumn !== "doing" ||
  move.fromColumn === "doing" ||
  lists.value.doing.length < limit;
<\/script>
<template>
  <DashboardColumns
    aria-label="Sprint 12"
    draggable
    :can-drop="canDrop"
    @card-move="onCardMove"
  >
    <DashboardColumn
      v-for="column in columns"
      :key="column.status"
      :value="column.status"
      :title="column.title"
      :count="lists[column.status].length"
      :description="
        column.status === 'doing' ? \`At most \${limit} cards\` : undefined
      "
    >
      <DashboardCard
        v-for="task in lists[column.status]"
        :key="task.id"
        :value="task.id"
        :label="task.title"
      >
        <Card padding="small">
          <CardTitle as="h4">{{ task.title }}</CardTitle>
          <CardDescription
            ><Tag size="small">{{ task.owner }}</Tag></CardDescription
          >
        </Card>
      </DashboardCard>
    </DashboardColumn>
  </DashboardColumns>
</template>
`})))()}n();export{t as default};