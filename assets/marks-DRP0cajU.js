import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- CodeBlockMarks.vue -->

<script setup lang="ts">
import { ref } from "vue";

// \`marks\` lays saved highlights over the syntax colors (offsets into
// \`code\`); getSelectionRange() maps the user's selection to such offsets and
// minerva-mark-click reports the clicked mark (here: removes it).

interface CodeMark {
  start: number;
  end: number;
  color?: string;
  id?: string;
  title?: string;
}
type CodeBlock = HTMLElement & {
  code?: string;
  marks?: CodeMark[];
  getSelectionRange(): { start: number; end: number; text: string } | null;
};

const block = ref<CodeBlock>();
const statusText = ref("");

const blockCode = \`export async function fetchUser(id: string) {
  const response = await fetch(\\\`/api/users/\\\${id}\\\`);
  if (!response.ok) throw new Error("Request failed");
  return response.json();
}\`;
const blockMarks = [
  { id: "n1", start: 71, end: 96, title: "Template literal URL" },
  {
    id: "n2",
    start: 104,
    end: 116,
    color: "danger",
    title: "Check the status",
  },
];
// keep the selection: do not move the focus on press
const keepSelection = (event: Event) => event.preventDefault();
const onHighlight = () => {
  const range = block.value!.getSelectionRange();
  if (!range) {
    statusText.value = "Select some code first";
    return;
  }
  block.value!.marks = [
    ...(block.value!.marks ?? []),
    {
      id: \`n\${Date.now()}\`,
      start: range.start,
      end: range.end,
      color: "success",
    },
  ];
  statusText.value = \`Highlighted “\${range.text}” (\${range.start}–\${range.end})\`;
};
const onClear = () => (block.value!.marks = []);
const onMarkClick = (event: Event) => {
  const { mark } = (event as CustomEvent<{ mark: CodeMark }>).detail;
  block.value!.marks = (block.value!.marks ?? []).filter(
    (m) => m.id !== mark.id,
  );
  statusText.value = \`Removed \${mark.title ?? "highlight"}\`;
};
<\/script>

<template>
  <minerva-code-block
    id="annotated"
    language="ts"
    show-line-numbers
    copyable
    clickable-marks
    aria-label="Annotated function"
    ref="block"
    :code.prop="blockCode"
    :marks.prop="blockMarks"
    @minerva-mark-click="onMarkClick"
  ></minerva-code-block>
  <p style="display: flex; gap: 8px; align-items: center">
    <minerva-button
      id="highlight"
      size="small"
      variant="outline"
      @mousedown="keepSelection"
      @click="onHighlight"
      >Highlight selection</minerva-button
    >
    <minerva-button id="clear" size="small" variant="ghost" @click="onClear"
      >Clear</minerva-button
    >
    <output id="status">{{ statusText }}</output>
  </p>
</template>
`,angular:`// code-block-marks.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from "@angular/core";

// \`marks\` lays saved highlights over the syntax colors (offsets into
// \`code\`); getSelectionRange() maps the user's selection to such offsets and
// minerva-mark-click reports the clicked mark (here: removes it).
interface CodeMark {
  start: number;
  end: number;
  color?: string;
  id?: string;
  title?: string;
}
type CodeBlock = HTMLElement & {
  code?: string;
  marks?: CodeMark[];
  getSelectionRange(): { start: number; end: number; text: string } | null;
};

@Component({
  selector: "app-code-block-marks",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-code-block
      id="annotated"
      language="ts"
      show-line-numbers
      copyable
      clickable-marks
      aria-label="Annotated function"
      #block
      [code]="blockCode"
      [marks]="blockMarks"
      (minerva-mark-click)="onMarkClick($event)"
    ></minerva-code-block>
    <p style="display: flex; gap: 8px; align-items: center">
      <minerva-button
        id="highlight"
        size="small"
        variant="outline"
        (mousedown)="keepSelection($event)"
        (click)="onHighlight($event)"
        >Highlight selection</minerva-button
      >
      <minerva-button
        id="clear"
        size="small"
        variant="ghost"
        (click)="onClear($event)"
        >Clear</minerva-button
      >
      <output id="status">{{ statusText }}</output>
    </p>
  \`,
})
export class CodeBlockMarksComponent {
  @ViewChild("block") block!: ElementRef<CodeBlock>;
  statusText = "";

  blockCode = \`export async function fetchUser(id: string) {
    const response = await fetch(\\\`/api/users/\\\${id}\\\`);
    if (!response.ok) throw new Error("Request failed");
    return response.json();
  }\`;
  blockMarks = [
    { id: "n1", start: 71, end: 96, title: "Template literal URL" },
    {
      id: "n2",
      start: 104,
      end: 116,
      color: "danger",
      title: "Check the status",
    },
  ];
  // keep the selection: do not move the focus on press
  keepSelection = (event: Event) => event.preventDefault();
  onHighlight = () => {
    const range = this.block.nativeElement.getSelectionRange();
    if (!range) {
      this.statusText = "Select some code first";
      return;
    }
    this.block.nativeElement.marks = [
      ...(this.block.nativeElement.marks ?? []),
      {
        id: \`n\${Date.now()}\`,
        start: range.start,
        end: range.end,
        color: "success",
      },
    ];
    this.statusText = \`Highlighted “\${range.text}” (\${range.start}–\${range.end})\`;
  };
  onClear = () => (this.block.nativeElement.marks = []);
  onMarkClick = (event: Event) => {
    const { mark } = (event as CustomEvent<{ mark: CodeMark }>).detail;
    this.block.nativeElement.marks = (
      this.block.nativeElement.marks ?? []
    ).filter((m) => m.id !== mark.id);
    this.statusText = \`Removed \${mark.title ?? "highlight"}\`;
  };
}
`,svelte:`<!-- CodeBlockMarks.svelte -->

<script lang="ts">
  // \`marks\` lays saved highlights over the syntax colors (offsets into
  // \`code\`); getSelectionRange() maps the user's selection to such offsets and
  // minerva-mark-click reports the clicked mark (here: removes it).

  interface CodeMark {
    start: number;
    end: number;
    color?: string;
    id?: string;
    title?: string;
  }
  type CodeBlock = HTMLElement & {
    code?: string;
    marks?: CodeMark[];
    getSelectionRange(): { start: number; end: number; text: string } | null;
  };

  let block: CodeBlock;
  let statusText = $state("");

  const blockCode = \`export async function fetchUser(id: string) {
    const response = await fetch(\\\`/api/users/\\\${id}\\\`);
    if (!response.ok) throw new Error("Request failed");
    return response.json();
  }\`;
  const blockMarks = [
    { id: "n1", start: 71, end: 96, title: "Template literal URL" },
    {
      id: "n2",
      start: 104,
      end: 116,
      color: "danger",
      title: "Check the status",
    },
  ];
  // keep the selection: do not move the focus on press
  const keepSelection = (event: Event) => event.preventDefault();
  const onHighlight = () => {
    const range = block.getSelectionRange();
    if (!range) {
      statusText = "Select some code first";
      return;
    }
    block.marks = [
      ...(block.marks ?? []),
      {
        id: \`n\${Date.now()}\`,
        start: range.start,
        end: range.end,
        color: "success",
      },
    ];
    statusText = \`Highlighted “\${range.text}” (\${range.start}–\${range.end})\`;
  };
  const onClear = () => (block.marks = []);
  const onMarkClick = (event: Event) => {
    const { mark } = (event as CustomEvent<{ mark: CodeMark }>).detail;
    block.marks = (block.marks ?? []).filter((m) => m.id !== mark.id);
    statusText = \`Removed \${mark.title ?? "highlight"}\`;
  };
<\/script>

<minerva-code-block
  id="annotated"
  language="ts"
  show-line-numbers
  copyable
  clickable-marks
  aria-label="Annotated function"
  bind:this={block}
  code={blockCode}
  marks={blockMarks}
  onminerva-mark-click={onMarkClick}
></minerva-code-block>
<p style="display: flex; gap: 8px; align-items: center">
  <minerva-button
    id="highlight"
    size="small"
    variant="outline"
    onmousedown={keepSelection}
    onclick={onHighlight}
  >Highlight selection</minerva-button>
  <minerva-button id="clear" size="small" variant="ghost" onclick={onClear}>Clear</minerva-button>
  <output id="status">{statusText}</output>
</p>
`,solid:`// CodeBlockMarks.tsx

import { createSignal } from "solid-js";

// \`marks\` lays saved highlights over the syntax colors (offsets into
// \`code\`); getSelectionRange() maps the user's selection to such offsets and
// minerva-mark-click reports the clicked mark (here: removes it).
interface CodeMark {
  start: number;
  end: number;
  color?: string;
  id?: string;
  title?: string;
}
type CodeBlock = HTMLElement & {
  code?: string;
  marks?: CodeMark[];
  getSelectionRange(): { start: number; end: number; text: string } | null;
};

export default function CodeBlockMarks() {
  let block!: CodeBlock;
  const [statusText, setStatusText] = createSignal("");

  const blockCode = \`export async function fetchUser(id: string) {
    const response = await fetch(\\\`/api/users/\\\${id}\\\`);
    if (!response.ok) throw new Error("Request failed");
    return response.json();
  }\`;
  const blockMarks = [
    { id: "n1", start: 71, end: 96, title: "Template literal URL" },
    {
      id: "n2",
      start: 104,
      end: 116,
      color: "danger",
      title: "Check the status",
    },
  ];
  // keep the selection: do not move the focus on press
  const keepSelection = (event: Event) => event.preventDefault();
  const onHighlight = () => {
    const range = block.getSelectionRange();
    if (!range) {
      setStatusText("Select some code first");
      return;
    }
    block.marks = [
      ...(block.marks ?? []),
      {
        id: \`n\${Date.now()}\`,
        start: range.start,
        end: range.end,
        color: "success",
      },
    ];
    setStatusText(\`Highlighted “\${range.text}” (\${range.start}–\${range.end})\`);
  };
  const onClear = () => (block.marks = []);
  const onMarkClick = (event: Event) => {
    const { mark } = (event as CustomEvent<{ mark: CodeMark }>).detail;
    block.marks = (block.marks ?? []).filter((m) => m.id !== mark.id);
    setStatusText(\`Removed \${mark.title ?? "highlight"}\`);
  };

  return (
    <>
      <minerva-code-block
        id="annotated"
        language="ts"
        show-line-numbers
        copyable
        clickable-marks
        aria-label="Annotated function"
        ref={block}
        prop:code={blockCode}
        prop:marks={blockMarks}
        on:minerva-mark-click={onMarkClick}
      ></minerva-code-block>
      <p style="display: flex; gap: 8px; align-items: center">
        <minerva-button
          id="highlight"
          size="small"
          variant="outline"
          on:mousedown={keepSelection}
          on:click={onHighlight}
        >
          Highlight selection
        </minerva-button>
        <minerva-button
          id="clear"
          size="small"
          variant="ghost"
          on:click={onClear}
        >
          Clear
        </minerva-button>
        <output id="status">{statusText()}</output>
      </p>
    </>
  );
}
`,html:`<minerva-code-block
  id="annotated"
  language="ts"
  show-line-numbers
  copyable
  clickable-marks
  aria-label="Annotated function"
></minerva-code-block>
<p style="display: flex; gap: 8px; align-items: center">
  <minerva-button id="highlight" size="small" variant="outline"
    >Highlight selection</minerva-button
  >
  <minerva-button id="clear" size="small" variant="ghost">Clear</minerva-button>
  <output id="status"></output>
</p>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // \`marks\` lays saved highlights over the syntax colors (offsets into
  // \`code\`); getSelectionRange() maps the user's selection to such offsets and
  // minerva-mark-click reports the clicked mark (here: removes it).
  const block = document.querySelector("#annotated");
  const highlight = document.querySelector("#highlight");
  const clear = document.querySelector("#clear");
  const status = document.querySelector("#status");
  block.code = \`export async function fetchUser(id: string) {
    const response = await fetch(\\\`/api/users/\\\${id}\\\`);
    if (!response.ok) throw new Error("Request failed");
    return response.json();
  }\`;
  block.marks = [
    { id: "n1", start: 71, end: 96, title: "Template literal URL" },
    {
      id: "n2",
      start: 104,
      end: 116,
      color: "danger",
      title: "Check the status",
    },
  ];
  // keep the selection: do not move the focus on press
  const keepSelection = (event) => event.preventDefault();
  const onHighlight = () => {
    const range = block.getSelectionRange();
    if (!range) {
      status.value = "Select some code first";
      return;
    }
    block.marks = [
      ...(block.marks ?? []),
      {
        id: \`n\${Date.now()}\`,
        start: range.start,
        end: range.end,
        color: "success",
      },
    ];
    status.value = \`Highlighted “\${range.text}” (\${range.start}–\${range.end})\`;
  };
  const onClear = () => (block.marks = []);
  const onMarkClick = (event) => {
    const { mark } = event.detail;
    block.marks = (block.marks ?? []).filter((m) => m.id !== mark.id);
    status.value = \`Removed \${mark.title ?? "highlight"}\`;
  };
  highlight.addEventListener("mousedown", keepSelection);
  highlight.addEventListener("click", onHighlight);
  clear.addEventListener("click", onClear);
  block.addEventListener("minerva-mark-click", onMarkClick);
<\/script>
`}})))()}n();export{t as default};