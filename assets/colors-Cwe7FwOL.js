import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- KanbanBoardColors.vue -->

<template>
  <minerva-kanban-board aria-label="Product roadmap" column-width="220" gap="8">
    <minerva-kanban-column heading="Backlog" count="1" color="neutral">
      <minerva-card padding="small">Collect feedback</minerva-card>
    </minerva-kanban-column>
    <minerva-kanban-column heading="Ready" count="1" color="info">
      <minerva-card padding="small">Pricing page copy</minerva-card>
    </minerva-kanban-column>
    <minerva-kanban-column heading="In progress" count="2" color="primary">
      <minerva-card padding="small">Search API</minerva-card>
      <minerva-card padding="small">Avatars</minerva-card>
    </minerva-kanban-column>
    <minerva-kanban-column heading="Review" count="1" color="warning">
      <minerva-card padding="small">Dark mode</minerva-card>
    </minerva-kanban-column>
    <minerva-kanban-column heading="Blocked" count="1" color="danger">
      <minerva-card padding="small">SSO with Okta</minerva-card>
    </minerva-kanban-column>
    <minerva-kanban-column heading="Done" count="1" color="success">
      <minerva-card padding="small">Release 2.4</minerva-card>
    </minerva-kanban-column>
    <minerva-kanban-column heading="Research" count="1" color="#7c3aed">
      <minerva-card padding="small">Interview users</minerva-card>
    </minerva-kanban-column>
  </minerva-kanban-board>
</template>
`,angular:`// kanban-board-colors.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  selector: "app-kanban-board-colors",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-kanban-board
      aria-label="Product roadmap"
      column-width="220"
      gap="8"
    >
      <minerva-kanban-column heading="Backlog" count="1" color="neutral">
        <minerva-card padding="small">Collect feedback</minerva-card>
      </minerva-kanban-column>
      <minerva-kanban-column heading="Ready" count="1" color="info">
        <minerva-card padding="small">Pricing page copy</minerva-card>
      </minerva-kanban-column>
      <minerva-kanban-column heading="In progress" count="2" color="primary">
        <minerva-card padding="small">Search API</minerva-card>
        <minerva-card padding="small">Avatars</minerva-card>
      </minerva-kanban-column>
      <minerva-kanban-column heading="Review" count="1" color="warning">
        <minerva-card padding="small">Dark mode</minerva-card>
      </minerva-kanban-column>
      <minerva-kanban-column heading="Blocked" count="1" color="danger">
        <minerva-card padding="small">SSO with Okta</minerva-card>
      </minerva-kanban-column>
      <minerva-kanban-column heading="Done" count="1" color="success">
        <minerva-card padding="small">Release 2.4</minerva-card>
      </minerva-kanban-column>
      <minerva-kanban-column heading="Research" count="1" color="#7c3aed">
        <minerva-card padding="small">Interview users</minerva-card>
      </minerva-kanban-column>
    </minerva-kanban-board>
  \`,
})
export class KanbanBoardColorsComponent {}
`,svelte:`<!-- KanbanBoardColors.svelte -->

<minerva-kanban-board aria-label="Product roadmap" column-width="220" gap="8">
  <minerva-kanban-column heading="Backlog" count="1" color="neutral">
    <minerva-card padding="small">Collect feedback</minerva-card>
  </minerva-kanban-column>
  <minerva-kanban-column heading="Ready" count="1" color="info">
    <minerva-card padding="small">Pricing page copy</minerva-card>
  </minerva-kanban-column>
  <minerva-kanban-column heading="In progress" count="2" color="primary">
    <minerva-card padding="small">Search API</minerva-card>
    <minerva-card padding="small">Avatars</minerva-card>
  </minerva-kanban-column>
  <minerva-kanban-column heading="Review" count="1" color="warning">
    <minerva-card padding="small">Dark mode</minerva-card>
  </minerva-kanban-column>
  <minerva-kanban-column heading="Blocked" count="1" color="danger">
    <minerva-card padding="small">SSO with Okta</minerva-card>
  </minerva-kanban-column>
  <minerva-kanban-column heading="Done" count="1" color="success">
    <minerva-card padding="small">Release 2.4</minerva-card>
  </minerva-kanban-column>
  <minerva-kanban-column heading="Research" count="1" color="#7c3aed">
    <minerva-card padding="small">Interview users</minerva-card>
  </minerva-kanban-column>
</minerva-kanban-board>
`,solid:`// KanbanBoardColors.tsx

export default function KanbanBoardColors() {
  return (
    <minerva-kanban-board
      aria-label="Product roadmap"
      column-width="220"
      gap="8"
    >
      <minerva-kanban-column heading="Backlog" count="1" color="neutral">
        <minerva-card padding="small">Collect feedback</minerva-card>
      </minerva-kanban-column>
      <minerva-kanban-column heading="Ready" count="1" color="info">
        <minerva-card padding="small">Pricing page copy</minerva-card>
      </minerva-kanban-column>
      <minerva-kanban-column heading="In progress" count="2" color="primary">
        <minerva-card padding="small">Search API</minerva-card>
        <minerva-card padding="small">Avatars</minerva-card>
      </minerva-kanban-column>
      <minerva-kanban-column heading="Review" count="1" color="warning">
        <minerva-card padding="small">Dark mode</minerva-card>
      </minerva-kanban-column>
      <minerva-kanban-column heading="Blocked" count="1" color="danger">
        <minerva-card padding="small">SSO with Okta</minerva-card>
      </minerva-kanban-column>
      <minerva-kanban-column heading="Done" count="1" color="success">
        <minerva-card padding="small">Release 2.4</minerva-card>
      </minerva-kanban-column>
      <minerva-kanban-column heading="Research" count="1" color="#7c3aed">
        <minerva-card padding="small">Interview users</minerva-card>
      </minerva-kanban-column>
    </minerva-kanban-board>
  );
}
`,html:`<minerva-kanban-board aria-label="Product roadmap" column-width="220" gap="8">
  <minerva-kanban-column heading="Backlog" count="1" color="neutral">
    <minerva-card padding="small">Collect feedback</minerva-card>
  </minerva-kanban-column>
  <minerva-kanban-column heading="Ready" count="1" color="info">
    <minerva-card padding="small">Pricing page copy</minerva-card>
  </minerva-kanban-column>
  <minerva-kanban-column heading="In progress" count="2" color="primary">
    <minerva-card padding="small">Search API</minerva-card>
    <minerva-card padding="small">Avatars</minerva-card>
  </minerva-kanban-column>
  <minerva-kanban-column heading="Review" count="1" color="warning">
    <minerva-card padding="small">Dark mode</minerva-card>
  </minerva-kanban-column>
  <minerva-kanban-column heading="Blocked" count="1" color="danger">
    <minerva-card padding="small">SSO with Okta</minerva-card>
  </minerva-kanban-column>
  <minerva-kanban-column heading="Done" count="1" color="success">
    <minerva-card padding="small">Release 2.4</minerva-card>
  </minerva-kanban-column>
  <minerva-kanban-column heading="Research" count="1" color="#7c3aed">
    <minerva-card padding="small">Interview users</minerva-card>
  </minerva-kanban-column>
</minerva-kanban-board>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";
<\/script>
`}})))()}n();export{t as default};