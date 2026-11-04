# DashboardColumns

Des colonnes de cartes sur un tableau de bord, une par étape d’un workflow, d’un pipeline ou par statut (À faire / En cours / Terminé) : des colonnes de même largeur avec un titre, un compteur et une couleur d’accent, des cartes empilées et un défilement horizontal. Avec draggable, les DashboardCard se déplacent entre les colonnes et au sein d’une colonne à la souris, au toucher ou au clavier ; le tableau reste contrôlé (onCardMove).

Package: minerva-design@1.20.5

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

## DashboardCard

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "DashboardCard"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "type": "string",
    "required": true,
    "description": "Key of the card, reported as `cardKey` by a draggable board",
    "typeText": "string"
  },
  {
    "name": "label",
    "type": "string",
    "required": false,
    "description": "Name of the card in the drag announcements and, when draggable, its\naccessible name",
    "typeText": "string"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "description": "Content of the card",
    "typeText": "any"
  }
]
```

## DashboardColumn

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "DashboardColumn"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "title",
    "type": "string",
    "required": false,
    "description": "Title of the column (also its accessible name; or the `title` slot)",
    "typeText": "string"
  },
  {
    "name": "value",
    "type": "string",
    "required": false,
    "description": "Key of the column, reported as `fromColumn` / `toColumn` by a draggable\nboard (columns without one take no cards)",
    "typeText": "string"
  },
  {
    "name": "count",
    "type": "number",
    "required": false,
    "description": "Number of items shown as a badge next to the title (and announced with\nthe title); omit to hide the badge",
    "typeText": "number"
  },
  {
    "name": "color",
    "type": "DashboardColumnColor",
    "required": false,
    "description": "Accent of the column (a dot before the title): a theme color or any CSS color",
    "typeText": "DashboardColumnColor"
  },
  {
    "name": "description",
    "type": "string",
    "required": false,
    "description": "Supporting text under the header (or the `description` slot)",
    "typeText": "string"
  },
  {
    "name": "empty",
    "type": "string",
    "required": false,
    "description": "Text shown when the column has no cards (or the `empty` slot)",
    "typeText": "string"
  },
  {
    "name": "aria-label",
    "type": "string",
    "required": false,
    "description": "Accessible name of the column",
    "typeText": "string"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "description": "The cards: each is wrapped in a role=\"listitem\"",
    "typeText": "any"
  },
  {
    "name": "title",
    "type": "any",
    "description": "Rich title (replaces the `title` text)",
    "typeText": "any"
  },
  {
    "name": "actions",
    "type": "any",
    "description": "Header controls on the end side (e.g. an add button)",
    "typeText": "any"
  },
  {
    "name": "description",
    "type": "any",
    "description": "Supporting text under the header",
    "typeText": "any"
  },
  {
    "name": "empty",
    "type": "any",
    "description": "Content shown when there are no cards",
    "typeText": "any"
  },
  {
    "name": "footer",
    "type": "any",
    "description": "Footer below the cards (e.g. an \"Add card\" button)",
    "typeText": "any"
  }
]
```

## DashboardColumns

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "DashboardColumns"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "columnWidth",
    "type": "DashboardLength",
    "required": false,
    "description": "Width of every column (a number is pixels). With `fill` it is the\nminimum width: columns stretch equally when they fit",
    "typeText": "DashboardLength"
  },
  {
    "name": "fill",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Stretches the columns equally to fill the board when they fit",
    "typeText": "boolean"
  },
  {
    "name": "gap",
    "type": "DashboardLength",
    "required": false,
    "description": "Space between the columns (a number is pixels)",
    "typeText": "DashboardLength"
  },
  {
    "name": "height",
    "type": "DashboardLength",
    "required": false,
    "description": "Height of the board: the column bodies scroll vertically within it",
    "typeText": "DashboardLength"
  },
  {
    "name": "maxHeight",
    "type": "DashboardLength",
    "required": false,
    "description": "Maximum height of the board: the column bodies scroll vertically within it",
    "typeText": "DashboardLength"
  },
  {
    "name": "draggable",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Lets the DashboardCard children of keyed columns (`value`) be dragged\nbetween and within columns (mouse, touch long press, keyboard); the\nboard emits `card-move` and the app moves the card in its data",
    "typeText": "boolean"
  },
  {
    "name": "canDrop",
    "type": "((move: DashboardCardMove) => boolean)",
    "required": false,
    "description": "Whether a card may be dropped at a position: refused positions show no\ndrop indicator and the keyboard skips them",
    "typeText": "((move: DashboardCardMove) => boolean)"
  },
  {
    "name": "aria-label",
    "type": "string",
    "required": false,
    "description": "Accessible name of the board region",
    "typeText": "string"
  },
  {
    "name": "aria-labelledby",
    "type": "string",
    "required": false,
    "description": "Id of an element naming the board (instead of aria-label)",
    "typeText": "string"
  }
]
```

### events

```json
[
  {
    "name": "card-move",
    "type": "[move: DashboardCardMove]",
    "typeText": "[move: DashboardCardMove]",
    "parameters": [
      {
        "name": "move",
        "position": 0,
        "typeText": "DashboardCardMove",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "description": "The columns (DashboardColumn)",
    "typeText": "any"
  }
]
```

## CSS variables

```json
{
  "css:DashboardColumns": {
    "kind": "cssVars",
    "source": "react/src/components/DashboardColumns",
    "vars": [
      {
        "name": "--dashboard-column-width",
        "description": "Width of the columns (defaults to 18rem; the columnWidth prop sets it; with fill it is the minimum width)"
      },
      {
        "name": "--dashboard-gap",
        "description": "Space between the columns (defaults to 0.75rem; the gap prop sets it)"
      },
      {
        "name": "--dashboard-column-background",
        "description": "Background of a column (defaults to --surface-muted-color)"
      },
      {
        "name": "--dashboard-column-border-color",
        "description": "Border color of a column (defaults to --border-color)"
      },
      {
        "name": "--dashboard-column-radius",
        "description": "Corner radius of a column (defaults to --radius-lg)"
      },
      {
        "name": "--dashboard-column-color",
        "description": "Accent of a column: the dot before the title (the color prop sets it for a custom CSS color)"
      },
      {
        "name": "--dashboard-card-gap",
        "description": "Space between the cards of a column (defaults to --space-2)"
      },
      {
        "name": "--dashboard-count-background",
        "description": "Background of the count badge (defaults to --surface-color)"
      },
      {
        "name": "--dashboard-count-color",
        "description": "Text color of the count badge (defaults to --text-secondary-color)"
      },
      {
        "name": "--dashboard-drop-indicator-color",
        "description": "Color of the drop line and of the column a dragged card would land in (defaults to --primary-color)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/dashboard-columns/vue/basic.vue

```vue
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

```

## Example: colors

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/dashboard-columns/vue/colors.vue

```vue
<script setup lang="ts">
import { Card, DashboardColumns, DashboardColumn } from "minerva-design/vue";

const columns = [
  { title: "Backlog", color: "neutral", cards: ["Collect feedback"] },
  { title: "Ready", color: "info", cards: ["Pricing page copy"] },
  { title: "In progress", color: "primary", cards: ["Search API", "Avatars"] },
  { title: "Review", color: "warning", cards: ["Dark mode"] },
  { title: "Blocked", color: "danger", cards: ["SSO with Okta"] },
  { title: "Done", color: "success", cards: ["Release 2.4"] },
  { title: "Research", color: "#7c3aed", cards: ["Interview users"] },
];
</script>
<template>
  <DashboardColumns aria-label="Product roadmap" :column-width="220" :gap="8">
    <DashboardColumn
      v-for="column in columns"
      :key="column.title"
      :title="column.title"
      :count="column.cards.length"
      :color="column.color"
    >
      <Card v-for="card in column.cards" :key="card" padding="small">{{
        card
      }}</Card>
    </DashboardColumn>
  </DashboardColumns>
</template>

```

## Example: drag-drop

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/dashboard-columns/vue/drag-drop.vue

```vue
<script setup lang="ts">
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
</script>
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
        column.status === 'doing' ? `At most ${limit} cards` : undefined
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

```

## Example: empty-actions

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/dashboard-columns/vue/empty-actions.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  Button,
  Card,
  DashboardColumns,
  DashboardColumn,
} from "minerva-design/vue";

const ideas = ref<string[]>([]);
const add = () => ideas.value.push(`Idea ${ideas.value.length + 1}`);
</script>
<template>
  <DashboardColumns aria-label="Ideas" fill>
    <DashboardColumn
      title="Ideas"
      :count="ideas.length"
      description="Anything worth exploring"
      empty="No ideas yet: use Add to create one."
    >
      <template #actions>
        <Button size="small" variant="ghost" @click="add">Add</Button>
      </template>
      <Card v-for="idea in ideas" :key="idea" padding="small">{{ idea }}</Card>
      <template v-if="ideas.length" #footer>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          @click="ideas = []"
          >Clear column</Button
        >
      </template>
    </DashboardColumn>
    <DashboardColumn title="Archived" :count="0" />
  </DashboardColumns>
</template>

```

## Example: fixed-height

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/dashboard-columns/vue/fixed-height.vue

```vue
<script setup lang="ts">
import { Card, DashboardColumns, DashboardColumn } from "minerva-design/vue";

const cards = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, index) => `${prefix} ${index + 1}`);
const columns = [
  { title: "Inbox", color: "info", cards: cards("Ticket", 12) },
  { title: "Triaged", color: "warning", cards: cards("Bug", 5) },
  { title: "Fixed", color: "success", cards: cards("Fix", 8) },
];
</script>
<template>
  <DashboardColumns aria-label="Support queue" :height="320">
    <DashboardColumn
      v-for="column in columns"
      :key="column.title"
      :title="column.title"
      :count="column.cards.length"
      :color="column.color"
    >
      <Card v-for="card in column.cards" :key="card" padding="small">{{
        card
      }}</Card>
    </DashboardColumn>
  </DashboardColumns>
</template>

```
