import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- FlashcardReducedDisabled.vue -->

<script setup lang="ts">
import { ref } from "vue";

// With flip-on-click="false" the card is not a button: only the flipped
// property (or attribute) turns it. Under prefers-reduced-motion every card
// crossfades instead of rotating.

const card = ref<HTMLElement & { flipped: boolean }>();
const toggleText = ref("Reveal answer");

const onClick = () => {
  card.value!.flipped = !card.value!.flipped;
  toggleText.value = card.value!.flipped ? "Hide answer" : "Reveal answer";
};
<\/script>

<template>
  <div
    style="
      display: grid;
      gap: 16px;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    "
  >
    <minerva-flashcard
      front="Disabled"
      back="Never shown by a click"
      disabled
      min-height="140"
    ></minerva-flashcard>
    <minerva-flashcard
      id="manual"
      front='flip-on-click="false"'
      back="Flipped by the button below"
      flip-on-click="false"
      front-label=""
      back-label=""
      min-height="140"
      ref="card"
    >
      <minerva-button slot="footer" size="small" id="toggle" @click="onClick">{{
        toggleText
      }}</minerva-button>
    </minerva-flashcard>
  </div>
</template>
`,angular:`// flashcard-reduced-disabled.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from "@angular/core";

// With flip-on-click="false" the card is not a button: only the flipped
// property (or attribute) turns it. Under prefers-reduced-motion every card
// crossfades instead of rotating.

@Component({
  selector: "app-flashcard-reduced-disabled",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div
      style="
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      "
    >
      <minerva-flashcard
        front="Disabled"
        back="Never shown by a click"
        disabled
        min-height="140"
      ></minerva-flashcard>
      <minerva-flashcard
        id="manual"
        front='flip-on-click="false"'
        back="Flipped by the button below"
        flip-on-click="false"
        front-label=""
        back-label=""
        min-height="140"
        #card
      >
        <minerva-button
          slot="footer"
          size="small"
          id="toggle"
          (click)="onClick($event)"
          >{{ toggleText }}</minerva-button
        >
      </minerva-flashcard>
    </div>
  \`,
})
export class FlashcardReducedDisabledComponent {
  @ViewChild("card") card!: ElementRef<HTMLElement & { flipped: boolean }>;
  toggleText = "Reveal answer";

  onClick = () => {
    this.card.nativeElement.flipped = !this.card.nativeElement.flipped;
    this.toggleText = this.card.nativeElement.flipped
      ? "Hide answer"
      : "Reveal answer";
  };
}
`,svelte:`<!-- FlashcardReducedDisabled.svelte -->

<script lang="ts">
  // With flip-on-click="false" the card is not a button: only the flipped
  // property (or attribute) turns it. Under prefers-reduced-motion every card
  // crossfades instead of rotating.

  let card: HTMLElement & { flipped: boolean };
  let toggleText = $state("Reveal answer");

  const onClick = () => {
    card.flipped = !card.flipped;
    toggleText = card.flipped ? "Hide answer" : "Reveal answer";
  };
<\/script>

<div
  style="
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  "
>
  <minerva-flashcard
    front="Disabled"
    back="Never shown by a click"
    disabled
    min-height="140"
  ></minerva-flashcard>
  <minerva-flashcard
    id="manual"
    front='flip-on-click="false"'
    back="Flipped by the button below"
    flip-on-click="false"
    front-label=""
    back-label=""
    min-height="140"
    bind:this={card}
  >
    <minerva-button
      slot="footer"
      size="small"
      id="toggle"
      onclick={onClick}
    >{toggleText}</minerva-button>
  </minerva-flashcard>
</div>
`,solid:`// FlashcardReducedDisabled.tsx

import { createSignal } from "solid-js";

// With flip-on-click="false" the card is not a button: only the flipped
// property (or attribute) turns it. Under prefers-reduced-motion every card
// crossfades instead of rotating.

export default function FlashcardReducedDisabled() {
  let card!: HTMLElement & { flipped: boolean };
  const [toggleText, setToggleText] = createSignal("Reveal answer");

  const onClick = () => {
    card.flipped = !card.flipped;
    setToggleText(card.flipped ? "Hide answer" : "Reveal answer");
  };

  return (
    <div
      style="
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      "
    >
      <minerva-flashcard
        front="Disabled"
        back="Never shown by a click"
        disabled
        min-height="140"
      ></minerva-flashcard>
      <minerva-flashcard
        id="manual"
        front='flip-on-click="false"'
        back="Flipped by the button below"
        flip-on-click="false"
        front-label=""
        back-label=""
        min-height="140"
        ref={card}
      >
        <minerva-button
          slot="footer"
          size="small"
          id="toggle"
          on:click={onClick}
        >
          {toggleText()}
        </minerva-button>
      </minerva-flashcard>
    </div>
  );
}
`,html:`<div
  style="
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  "
>
  <minerva-flashcard
    front="Disabled"
    back="Never shown by a click"
    disabled
    min-height="140"
  ></minerva-flashcard>
  <minerva-flashcard
    id="manual"
    front='flip-on-click="false"'
    back="Flipped by the button below"
    flip-on-click="false"
    front-label=""
    back-label=""
    min-height="140"
  >
    <minerva-button slot="footer" size="small" id="toggle"
      >Reveal answer</minerva-button
    >
  </minerva-flashcard>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // With flip-on-click="false" the card is not a button: only the flipped
  // property (or attribute) turns it. Under prefers-reduced-motion every card
  // crossfades instead of rotating.
  const card = document.querySelector("#manual");
  const toggle = document.querySelector("#toggle");
  const onClick = () => {
    card.flipped = !card.flipped;
    toggle.textContent = card.flipped ? "Hide answer" : "Reveal answer";
  };
  toggle.addEventListener("click", onClick);
<\/script>
`}})))()}n();export{t as default};