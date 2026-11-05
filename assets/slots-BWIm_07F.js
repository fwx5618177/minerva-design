import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- ListSlots.vue -->

<script setup lang="ts">
// The list adds no row command: actions are regular controls in the
// \`actions\` slot. Dividers follow the remaining rows.

const onClick = (event: MouseEvent) => {
  const button = (event.target as Element).closest('[slot="actions"]');
  button?.closest("minerva-list-item")?.remove();
};
<\/script>

<template>
  <minerva-list
    id="members"
    style="width: 100%; max-width: 460px"
    @click="onClick"
  >
    <minerva-list-item>
      <span slot="icon">👩‍💼</span>
      Jane Cooper
      <span slot="secondary">Owner · <em>jane@example.com</em></span>
      <minerva-button slot="actions" size="small" variant="ghost" color="danger"
        >Remove</minerva-button
      >
    </minerva-list-item>
    <minerva-list-item>
      <span slot="icon">🧑‍💻</span>
      Wade Warren
      <span slot="secondary">Developer · <em>wade@example.com</em></span>
      <minerva-button slot="actions" size="small" variant="ghost" color="danger"
        >Remove</minerva-button
      >
    </minerva-list-item>
    <minerva-list-item>
      <span slot="icon">🎨</span>
      Esther Howard
      <span slot="secondary">Designer · <em>esther@example.com</em></span>
      <minerva-button slot="actions" size="small" variant="ghost" color="danger"
        >Remove</minerva-button
      >
    </minerva-list-item>
  </minerva-list>
</template>
`,angular:`// list-slots.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// The list adds no row command: actions are regular controls in the
// \`actions\` slot. Dividers follow the remaining rows.

@Component({
  selector: "app-list-slots",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-list
      id="members"
      style="width: 100%; max-width: 460px"
      (click)="onClick($event)"
    >
      <minerva-list-item>
        <span slot="icon">👩‍💼</span>
        Jane Cooper
        <span slot="secondary">Owner · <em>jane&#64;example.com</em></span>
        <minerva-button
          slot="actions"
          size="small"
          variant="ghost"
          color="danger"
          >Remove</minerva-button
        >
      </minerva-list-item>
      <minerva-list-item>
        <span slot="icon">🧑‍💻</span>
        Wade Warren
        <span slot="secondary">Developer · <em>wade&#64;example.com</em></span>
        <minerva-button
          slot="actions"
          size="small"
          variant="ghost"
          color="danger"
          >Remove</minerva-button
        >
      </minerva-list-item>
      <minerva-list-item>
        <span slot="icon">🎨</span>
        Esther Howard
        <span slot="secondary">Designer · <em>esther&#64;example.com</em></span>
        <minerva-button
          slot="actions"
          size="small"
          variant="ghost"
          color="danger"
          >Remove</minerva-button
        >
      </minerva-list-item>
    </minerva-list>
  \`,
})
export class ListSlotsComponent {
  onClick = (event: MouseEvent) => {
    const button = (event.target as Element).closest('[slot="actions"]');
    button?.closest("minerva-list-item")?.remove();
  };
}
`,svelte:`<!-- ListSlots.svelte -->

<script lang="ts">
  // The list adds no row command: actions are regular controls in the
  // \`actions\` slot. Dividers follow the remaining rows.

  const onClick = (event: MouseEvent) => {
    const button = (event.target as Element).closest('[slot="actions"]');
    button?.closest("minerva-list-item")?.remove();
  };
<\/script>

<minerva-list
  id="members"
  style="width: 100%; max-width: 460px"
  onclick={onClick}
>
  <minerva-list-item>
    <span slot="icon">👩‍💼</span>
    Jane Cooper
    <span slot="secondary">Owner · <em>jane@example.com</em></span>
    <minerva-button slot="actions" size="small" variant="ghost" color="danger"
      >Remove</minerva-button>
  </minerva-list-item>
  <minerva-list-item>
    <span slot="icon">🧑‍💻</span>
    Wade Warren
    <span slot="secondary">Developer · <em>wade@example.com</em></span>
    <minerva-button slot="actions" size="small" variant="ghost" color="danger"
      >Remove</minerva-button>
  </minerva-list-item>
  <minerva-list-item>
    <span slot="icon">🎨</span>
    Esther Howard
    <span slot="secondary">Designer · <em>esther@example.com</em></span>
    <minerva-button slot="actions" size="small" variant="ghost" color="danger"
      >Remove</minerva-button>
  </minerva-list-item>
</minerva-list>
`,solid:`// ListSlots.tsx

// The list adds no row command: actions are regular controls in the
// \`actions\` slot. Dividers follow the remaining rows.

export default function ListSlots() {
  const onClick = (event: MouseEvent) => {
    const button = (event.target as Element).closest('[slot="actions"]');
    button?.closest("minerva-list-item")?.remove();
  };

  return (
    <minerva-list
      id="members"
      style="width: 100%; max-width: 460px"
      on:click={onClick}
    >
      <minerva-list-item>
        <span slot="icon">👩‍💼</span>
        Jane Cooper
        <span slot="secondary">
          Owner · <em>jane@example.com</em>
        </span>
        <minerva-button
          slot="actions"
          size="small"
          variant="ghost"
          color="danger"
        >
          Remove
        </minerva-button>
      </minerva-list-item>
      <minerva-list-item>
        <span slot="icon">🧑‍💻</span>
        Wade Warren
        <span slot="secondary">
          Developer · <em>wade@example.com</em>
        </span>
        <minerva-button
          slot="actions"
          size="small"
          variant="ghost"
          color="danger"
        >
          Remove
        </minerva-button>
      </minerva-list-item>
      <minerva-list-item>
        <span slot="icon">🎨</span>
        Esther Howard
        <span slot="secondary">
          Designer · <em>esther@example.com</em>
        </span>
        <minerva-button
          slot="actions"
          size="small"
          variant="ghost"
          color="danger"
        >
          Remove
        </minerva-button>
      </minerva-list-item>
    </minerva-list>
  );
}
`,html:`<minerva-list id="members" style="width: 100%; max-width: 460px">
  <minerva-list-item>
    <span slot="icon">👩‍💼</span>
    Jane Cooper
    <span slot="secondary">Owner · <em>jane@example.com</em></span>
    <minerva-button slot="actions" size="small" variant="ghost" color="danger"
      >Remove</minerva-button
    >
  </minerva-list-item>
  <minerva-list-item>
    <span slot="icon">🧑‍💻</span>
    Wade Warren
    <span slot="secondary">Developer · <em>wade@example.com</em></span>
    <minerva-button slot="actions" size="small" variant="ghost" color="danger"
      >Remove</minerva-button
    >
  </minerva-list-item>
  <minerva-list-item>
    <span slot="icon">🎨</span>
    Esther Howard
    <span slot="secondary">Designer · <em>esther@example.com</em></span>
    <minerva-button slot="actions" size="small" variant="ghost" color="danger"
      >Remove</minerva-button
    >
  </minerva-list-item>
</minerva-list>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // The list adds no row command: actions are regular controls in the
  // \`actions\` slot. Dividers follow the remaining rows.
  const list = document.querySelector("#members");
  const onClick = (event) => {
    const button = event.target.closest('[slot="actions"]');
    button?.closest("minerva-list-item")?.remove();
  };
  list.addEventListener("click", onClick);
<\/script>
`}})))()}n();export{t as default};