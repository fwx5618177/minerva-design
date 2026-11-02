import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- CodeBlockLanguages.vue -->

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

// One highlighted block per language; \`code\` holds the text (never parsed
// as HTML), \`language\` picks the grammar and \`show-language\` labels it.

type CodeBlock = HTMLElement & { code?: string };

const samples: Array<[language: string, code: string]> = [
  [
    "ts",
    \`export async function loadBook(id: number): Promise<Book> {
  const response = await fetch(\\\`/api/books/\\\${id}\\\`);
  return response.json(); // typed by the caller
}\`,
  ],
  [
    "css",
    \`.card:hover {
  --card-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
  color: #1f2937 !important;
}\`,
  ],
  [
    "html",
    \`<!-- Sign-up form -->
<form action="/join" method="post">
  <input name="email" type="email" required>
</form>\`,
  ],
  [
    "bash",
    \`# Install and build
export NODE_ENV=production
pnpm add minerva-design && pnpm build --filter "$APP"\`,
  ],
  [
    "python",
    \`@dataclass
class Point:
    def norm(self) -> float:
        return abs(self.x)  # distance to 0\`,
  ],
  [
    "diff",
    \`@@ -1,3 +1,3 @@
 {
-  "theme": "light"
+  "theme": "dark"
 }\`,
  ],
];

const container = ref<HTMLElement>();

onMounted(() => {
  for (const [language, code] of samples) {
    const block = document.createElement("minerva-code-block") as CodeBlock;
    block.setAttribute("language", language);
    block.setAttribute("show-language", "");
    block.setAttribute("aria-label", \`\${language} example\`);
    block.code = code;
    container.value!.append(block);
  }
});

onBeforeUnmount(() => {
  container.value!.replaceChildren();
});
<\/script>

<template>
  <div id="samples" style="display: grid; gap: 12px" ref="container"></div>
</template>
`,angular:`// code-block-languages.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  type AfterViewInit,
  type OnDestroy,
} from "@angular/core";

// One highlighted block per language; \`code\` holds the text (never parsed
// as HTML), \`language\` picks the grammar and \`show-language\` labels it.
type CodeBlock = HTMLElement & { code?: string };

const samples: Array<[language: string, code: string]> = [
  [
    "ts",
    \`export async function loadBook(id: number): Promise<Book> {
  const response = await fetch(\\\`/api/books/\\\${id}\\\`);
  return response.json(); // typed by the caller
}\`,
  ],
  [
    "css",
    \`.card:hover {
  --card-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
  color: #1f2937 !important;
}\`,
  ],
  [
    "html",
    \`<!-- Sign-up form -->
<form action="/join" method="post">
  <input name="email" type="email" required>
</form>\`,
  ],
  [
    "bash",
    \`# Install and build
export NODE_ENV=production
pnpm add minerva-design && pnpm build --filter "$APP"\`,
  ],
  [
    "python",
    \`@dataclass
class Point:
    def norm(self) -> float:
        return abs(self.x)  # distance to 0\`,
  ],
  [
    "diff",
    \`@@ -1,3 +1,3 @@
 {
-  "theme": "light"
+  "theme": "dark"
 }\`,
  ],
];

@Component({
  selector: "app-code-block-languages",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div id="samples" style="display: grid; gap: 12px" #container></div>
  \`,
})
export class CodeBlockLanguagesComponent implements AfterViewInit, OnDestroy {
  @ViewChild("container") container!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    for (const [language, code] of samples) {
      const block = document.createElement("minerva-code-block") as CodeBlock;
      block.setAttribute("language", language);
      block.setAttribute("show-language", "");
      block.setAttribute("aria-label", \`\${language} example\`);
      block.code = code;
      this.container.nativeElement.append(block);
    }
  }

  ngOnDestroy(): void {
    this.container.nativeElement.replaceChildren();
  }
}
`,svelte:`<!-- CodeBlockLanguages.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // One highlighted block per language; \`code\` holds the text (never parsed
  // as HTML), \`language\` picks the grammar and \`show-language\` labels it.

  type CodeBlock = HTMLElement & { code?: string };

  const samples: Array<[language: string, code: string]> = [
    [
      "ts",
      \`export async function loadBook(id: number): Promise<Book> {
    const response = await fetch(\\\`/api/books/\\\${id}\\\`);
    return response.json(); // typed by the caller
  }\`,
    ],
    [
      "css",
      \`.card:hover {
    --card-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
    color: #1f2937 !important;
  }\`,
    ],
    [
      "html",
      \`<!-- Sign-up form -->
  <form action="/join" method="post">
    <input name="email" type="email" required>
  </form>\`,
    ],
    [
      "bash",
      \`# Install and build
  export NODE_ENV=production
  pnpm add minerva-design && pnpm build --filter "$APP"\`,
    ],
    [
      "python",
      \`@dataclass
  class Point:
      def norm(self) -> float:
          return abs(self.x)  # distance to 0\`,
    ],
    [
      "diff",
      \`@@ -1,3 +1,3 @@
   {
  -  "theme": "light"
  +  "theme": "dark"
   }\`,
    ],
  ];

  let container: HTMLElement;

  onMount(() => {
    for (const [language, code] of samples) {
      const block = document.createElement("minerva-code-block") as CodeBlock;
      block.setAttribute("language", language);
      block.setAttribute("show-language", "");
      block.setAttribute("aria-label", \`\${language} example\`);
      block.code = code;
      container.append(block);
    }
    return () => {
      container.replaceChildren();
    };
  });
<\/script>

<div id="samples" style="display: grid; gap: 12px" bind:this={container}></div>
`,solid:`// CodeBlockLanguages.tsx

import { onCleanup, onMount } from "solid-js";

// One highlighted block per language; \`code\` holds the text (never parsed
// as HTML), \`language\` picks the grammar and \`show-language\` labels it.
type CodeBlock = HTMLElement & { code?: string };

const samples: Array<[language: string, code: string]> = [
  [
    "ts",
    \`export async function loadBook(id: number): Promise<Book> {
  const response = await fetch(\\\`/api/books/\\\${id}\\\`);
  return response.json(); // typed by the caller
}\`,
  ],
  [
    "css",
    \`.card:hover {
  --card-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
  color: #1f2937 !important;
}\`,
  ],
  [
    "html",
    \`<!-- Sign-up form -->
<form action="/join" method="post">
  <input name="email" type="email" required>
</form>\`,
  ],
  [
    "bash",
    \`# Install and build
export NODE_ENV=production
pnpm add minerva-design && pnpm build --filter "$APP"\`,
  ],
  [
    "python",
    \`@dataclass
class Point:
    def norm(self) -> float:
        return abs(self.x)  # distance to 0\`,
  ],
  [
    "diff",
    \`@@ -1,3 +1,3 @@
 {
-  "theme": "light"
+  "theme": "dark"
 }\`,
  ],
];

export default function CodeBlockLanguages() {
  let container!: HTMLElement;

  onMount(() => {
    for (const [language, code] of samples) {
      const block = document.createElement("minerva-code-block") as CodeBlock;
      block.setAttribute("language", language);
      block.setAttribute("show-language", "");
      block.setAttribute("aria-label", \`\${language} example\`);
      block.code = code;
      container.append(block);
    }
  });

  onCleanup(() => {
    container.replaceChildren();
  });

  return (
    <div id="samples" style="display: grid; gap: 12px" ref={container}></div>
  );
}
`,html:`<div id="samples" style="display: grid; gap: 12px"></div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // One highlighted block per language; \`code\` holds the text (never parsed
  // as HTML), \`language\` picks the grammar and \`show-language\` labels it.
  const samples = [
    [
      "ts",
      \`export async function loadBook(id: number): Promise<Book> {
    const response = await fetch(\\\`/api/books/\\\${id}\\\`);
    return response.json(); // typed by the caller
  }\`,
    ],
    [
      "css",
      \`.card:hover {
    --card-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
    color: #1f2937 !important;
  }\`,
    ],
    [
      "html",
      \`<!-- Sign-up form -->
  <form action="/join" method="post">
    <input name="email" type="email" required>
  </form>\`,
    ],
    [
      "bash",
      \`# Install and build
  export NODE_ENV=production
  pnpm add minerva-design && pnpm build --filter "$APP"\`,
    ],
    [
      "python",
      \`@dataclass
  class Point:
      def norm(self) -> float:
          return abs(self.x)  # distance to 0\`,
    ],
    [
      "diff",
      \`@@ -1,3 +1,3 @@
   {
  -  "theme": "light"
  +  "theme": "dark"
   }\`,
    ],
  ];

  const container = document.querySelector("#samples");
  for (const [language, code] of samples) {
    const block = document.createElement("minerva-code-block");
    block.setAttribute("language", language);
    block.setAttribute("show-language", "");
    block.setAttribute("aria-label", \`\${language} example\`);
    block.code = code;
    container.append(block);
  }
<\/script>
`}})))()}n();export{t as default};