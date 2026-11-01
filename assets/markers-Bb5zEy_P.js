import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- WeekStripMarkers.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// markers is a property: a number shows a count badge (99+ above 99), true
// a dot. getDayLabel (a property too) customizes the accessible names.

type Marker = number | boolean;
type WeekStripElement = HTMLElement & {
  value?: string;
  markers?: Record<string, Marker>;
  getDayLabel?: (day: string, marker: Marker | undefined) => string;
};

const pad = (n: number) => String(n).padStart(2, "0");
const inDays = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())}\`;
};

const tasks = ref<WeekStripElement>();
const sunday = ref<WeekStripElement>();

const markers = {
  [inDays(-1)]: 2,
  [inDays(0)]: 3,
  [inDays(1)]: true,
  [inDays(3)]: 1,
};
const sundayGetDayLabel = (day, marker) =>
  typeof marker === "number"
    ? \`\${day}: \${marker} tasks\`
    : marker
      ? \`\${day}: reminder\`
      : day;

onMounted(() => {
  for (const strip of [tasks.value!, sunday.value!]) {
    strip.value = inDays(0);
    strip.markers = markers;
  }
});
<\/script>

<template>
  <div style="display: grid; gap: 24px; max-width: 480px">
    <minerva-week-strip id="tasks" ref="tasks"></minerva-week-strip>
    <minerva-week-strip
      id="sunday"
      first-day-of-week="0"
      aria-label="Tasks this week (Sunday first)"
      ref="sunday"
      :getDayLabel.prop="sundayGetDayLabel"
    ></minerva-week-strip>
  </div>
</template>
`,angular:`// week-strip-markers.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  type AfterViewInit,
} from "@angular/core";

// markers is a property: a number shows a count badge (99+ above 99), true
// a dot. getDayLabel (a property too) customizes the accessible names.
type Marker = number | boolean;
type WeekStripElement = HTMLElement & {
  value?: string;
  markers?: Record<string, Marker>;
  getDayLabel?: (day: string, marker: Marker | undefined) => string;
};

const pad = (n: number) => String(n).padStart(2, "0");
const inDays = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())}\`;
};

@Component({
  selector: "app-week-strip-markers",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 24px; max-width: 480px">
      <minerva-week-strip id="tasks" #tasks></minerva-week-strip>
      <minerva-week-strip
        id="sunday"
        first-day-of-week="0"
        aria-label="Tasks this week (Sunday first)"
        #sunday
        [getDayLabel]="sundayGetDayLabel"
      ></minerva-week-strip>
    </div>
  \`,
})
export class WeekStripMarkersComponent implements AfterViewInit {
  @ViewChild("tasks") tasks!: ElementRef<WeekStripElement>;
  @ViewChild("sunday") sunday!: ElementRef<WeekStripElement>;

  markers = {
    [inDays(-1)]: 2,
    [inDays(0)]: 3,
    [inDays(1)]: true,
    [inDays(3)]: 1,
  };
  sundayGetDayLabel = (day, marker) =>
    typeof marker === "number"
      ? \`\${day}: \${marker} tasks\`
      : marker
        ? \`\${day}: reminder\`
        : day;

  ngAfterViewInit(): void {
    for (const strip of [this.tasks.nativeElement, this.sunday.nativeElement]) {
      strip.value = inDays(0);
      strip.markers = this.markers;
    }
  }
}
`,svelte:`<!-- WeekStripMarkers.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // markers is a property: a number shows a count badge (99+ above 99), true
  // a dot. getDayLabel (a property too) customizes the accessible names.

  type Marker = number | boolean;
  type WeekStripElement = HTMLElement & {
    value?: string;
    markers?: Record<string, Marker>;
    getDayLabel?: (day: string, marker: Marker | undefined) => string;
  };

  const pad = (n: number) => String(n).padStart(2, "0");
  const inDays = (offset: number) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())}\`;
  };

  let tasks: WeekStripElement;
  let sunday: WeekStripElement;

  const markers = {
    [inDays(-1)]: 2,
    [inDays(0)]: 3,
    [inDays(1)]: true,
    [inDays(3)]: 1,
  };
  const sundayGetDayLabel = (day, marker) =>
    typeof marker === "number"
      ? \`\${day}: \${marker} tasks\`
      : marker
        ? \`\${day}: reminder\`
        : day;

  onMount(() => {
    for (const strip of [tasks, sunday]) {
      strip.value = inDays(0);
      strip.markers = markers;
    }
  });
<\/script>

<div style="display: grid; gap: 24px; max-width: 480px">
  <minerva-week-strip id="tasks" bind:this={tasks}></minerva-week-strip>
  <minerva-week-strip
    id="sunday"
    first-day-of-week="0"
    aria-label="Tasks this week (Sunday first)"
    bind:this={sunday}
    getDayLabel={sundayGetDayLabel}
  ></minerva-week-strip>
</div>
`,solid:`// WeekStripMarkers.tsx

import { onMount } from "solid-js";

// markers is a property: a number shows a count badge (99+ above 99), true
// a dot. getDayLabel (a property too) customizes the accessible names.
type Marker = number | boolean;
type WeekStripElement = HTMLElement & {
  value?: string;
  markers?: Record<string, Marker>;
  getDayLabel?: (day: string, marker: Marker | undefined) => string;
};

const pad = (n: number) => String(n).padStart(2, "0");
const inDays = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())}\`;
};

export default function WeekStripMarkers() {
  let tasks!: WeekStripElement;
  let sunday!: WeekStripElement;

  const markers = {
    [inDays(-1)]: 2,
    [inDays(0)]: 3,
    [inDays(1)]: true,
    [inDays(3)]: 1,
  };
  const sundayGetDayLabel = (day, marker) =>
    typeof marker === "number"
      ? \`\${day}: \${marker} tasks\`
      : marker
        ? \`\${day}: reminder\`
        : day;

  onMount(() => {
    for (const strip of [tasks, sunday]) {
      strip.value = inDays(0);
      strip.markers = markers;
    }
  });

  return (
    <div style="display: grid; gap: 24px; max-width: 480px">
      <minerva-week-strip id="tasks" ref={tasks}></minerva-week-strip>
      <minerva-week-strip
        id="sunday"
        first-day-of-week="0"
        aria-label="Tasks this week (Sunday first)"
        ref={sunday}
        prop:getDayLabel={sundayGetDayLabel}
      ></minerva-week-strip>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 24px; max-width: 480px">
  <minerva-week-strip id="tasks"></minerva-week-strip>
  <minerva-week-strip
    id="sunday"
    first-day-of-week="0"
    aria-label="Tasks this week (Sunday first)"
  ></minerva-week-strip>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // markers is a property: a number shows a count badge (99+ above 99), true
  // a dot. getDayLabel (a property too) customizes the accessible names.
  const pad = (n) => String(n).padStart(2, "0");
  const inDays = (offset) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())}\`;
  };

  const markers = {
    [inDays(-1)]: 2,
    [inDays(0)]: 3,
    [inDays(1)]: true,
    [inDays(3)]: 1,
  };
  const tasks = document.querySelector("#tasks");
  const sunday = document.querySelector("#sunday");
  for (const strip of [tasks, sunday]) {
    strip.value = inDays(0);
    strip.markers = markers;
  }
  sunday.getDayLabel = (day, marker) =>
    typeof marker === "number"
      ? \`\${day}: \${marker} tasks\`
      : marker
        ? \`\${day}: reminder\`
        : day;
<\/script>
`}})))()}n();export{t as default};