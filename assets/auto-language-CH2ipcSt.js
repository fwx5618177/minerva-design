import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- CodeBlockAutoLanguage.vue -->

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

// Code without a known language (e.g. an EPUB <pre> without a class):
// language="auto" detects it from \`code\` (detectCodeLanguage of
// minerva-design/core); \`show-language\` labels the detected language.

type CodeBlock = HTMLElement & { code?: string };

const snippets = [
  \`{
  "title": "The Little Prince",
  "year": 1943
}\`,
  \`def word_count(path):
    with open(path) as f:
        return len(f.read().split())\`,
  \`SELECT title, COUNT(*) AS readers
FROM books
GROUP BY title
ORDER BY readers DESC;\`,
  \`server:
  port: 8080
  hosts:
    - reader.example.com\`,
  \`It was a dark and stormy night;
the rain fell in torrents.\`,
];

const container = ref<HTMLElement>();

onMounted(() => {
  snippets.forEach((code, i) => {
    const block = document.createElement("minerva-code-block") as CodeBlock;
    block.setAttribute("language", "auto");
    block.setAttribute("show-language", "");
    block.setAttribute("aria-label", \`Snippet \${i + 1}\`);
    block.code = code;
    container.value!.append(block);
  });
});

onBeforeUnmount(() => {
  container.value!.replaceChildren();
});
<\/script>

<template>
  <div id="snippets" style="display: grid; gap: 12px" ref="container"></div>
</template>
`,angular:`// code-block-auto-language.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  type AfterViewInit,
  type OnDestroy,
} from "@angular/core";

// Code without a known language (e.g. an EPUB <pre> without a class):
// language="auto" detects it from \`code\` (detectCodeLanguage of
// minerva-design/core); \`show-language\` labels the detected language.
type CodeBlock = HTMLElement & { code?: string };

const snippets = [
  \`{
  "title": "The Little Prince",
  "year": 1943
}\`,
  \`def word_count(path):
    with open(path) as f:
        return len(f.read().split())\`,
  \`SELECT title, COUNT(*) AS readers
FROM books
GROUP BY title
ORDER BY readers DESC;\`,
  \`server:
  port: 8080
  hosts:
    - reader.example.com\`,
  \`It was a dark and stormy night;
the rain fell in torrents.\`,
];

@Component({
  selector: "app-code-block-auto-language",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div id="snippets" style="display: grid; gap: 12px" #container></div>
  \`,
})
export class CodeBlockAutoLanguageComponent
  implements AfterViewInit, OnDestroy
{
  @ViewChild("container") container!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    snippets.forEach((code, i) => {
      const block = document.createElement("minerva-code-block") as CodeBlock;
      block.setAttribute("language", "auto");
      block.setAttribute("show-language", "");
      block.setAttribute("aria-label", \`Snippet \${i + 1}\`);
      block.code = code;
      this.container.nativeElement.append(block);
    });
  }

  ngOnDestroy(): void {
    this.container.nativeElement.replaceChildren();
  }
}
`,svelte:`<!-- CodeBlockAutoLanguage.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // Code without a known language (e.g. an EPUB <pre> without a class):
  // language="auto" detects it from \`code\` (detectCodeLanguage of
  // minerva-design/core); \`show-language\` labels the detected language.

  type CodeBlock = HTMLElement & { code?: string };

  const snippets = [
    \`{
    "title": "The Little Prince",
    "year": 1943
  }\`,
    \`def word_count(path):
      with open(path) as f:
          return len(f.read().split())\`,
    \`SELECT title, COUNT(*) AS readers
  FROM books
  GROUP BY title
  ORDER BY readers DESC;\`,
    \`server:
    port: 8080
    hosts:
      - reader.example.com\`,
    \`It was a dark and stormy night;
  the rain fell in torrents.\`,
  ];

  let container: HTMLElement;

  onMount(() => {
    snippets.forEach((code, i) => {
      const block = document.createElement("minerva-code-block") as CodeBlock;
      block.setAttribute("language", "auto");
      block.setAttribute("show-language", "");
      block.setAttribute("aria-label", \`Snippet \${i + 1}\`);
      block.code = code;
      container.append(block);
    });
    return () => {
      container.replaceChildren();
    };
  });
<\/script>

<div id="snippets" style="display: grid; gap: 12px" bind:this={container}></div>
`,solid:`// CodeBlockAutoLanguage.tsx

import { onCleanup, onMount } from "solid-js";

// Code without a known language (e.g. an EPUB <pre> without a class):
// language="auto" detects it from \`code\` (detectCodeLanguage of
// minerva-design/core); \`show-language\` labels the detected language.
type CodeBlock = HTMLElement & { code?: string };

const snippets = [
  \`{
  "title": "The Little Prince",
  "year": 1943
}\`,
  \`def word_count(path):
    with open(path) as f:
        return len(f.read().split())\`,
  \`SELECT title, COUNT(*) AS readers
FROM books
GROUP BY title
ORDER BY readers DESC;\`,
  \`server:
  port: 8080
  hosts:
    - reader.example.com\`,
  \`It was a dark and stormy night;
the rain fell in torrents.\`,
];

export default function CodeBlockAutoLanguage() {
  let container!: HTMLElement;

  onMount(() => {
    snippets.forEach((code, i) => {
      const block = document.createElement("minerva-code-block") as CodeBlock;
      block.setAttribute("language", "auto");
      block.setAttribute("show-language", "");
      block.setAttribute("aria-label", \`Snippet \${i + 1}\`);
      block.code = code;
      container.append(block);
    });
  });

  onCleanup(() => {
    container.replaceChildren();
  });

  return (
    <div id="snippets" style="display: grid; gap: 12px" ref={container}></div>
  );
}
`,html:`<div id="snippets" style="display: grid; gap: 12px"></div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // Code without a known language (e.g. an EPUB <pre> without a class):
  // language="auto" detects it from \`code\` (detectCodeLanguage of
  // minerva-design/core); \`show-language\` labels the detected language.
  const snippets = [
    \`{
    "title": "The Little Prince",
    "year": 1943
  }\`,
    \`def word_count(path):
      with open(path) as f:
          return len(f.read().split())\`,
    \`SELECT title, COUNT(*) AS readers
  FROM books
  GROUP BY title
  ORDER BY readers DESC;\`,
    \`server:
    port: 8080
    hosts:
      - reader.example.com\`,
    \`It was a dark and stormy night;
  the rain fell in torrents.\`,
  ];

  const container = document.querySelector("#snippets");
  snippets.forEach((code, i) => {
    const block = document.createElement("minerva-code-block");
    block.setAttribute("language", "auto");
    block.setAttribute("show-language", "");
    block.setAttribute("aria-label", \`Snippet \${i + 1}\`);
    block.code = code;
    container.append(block);
  });
<\/script>
`}})))()}n();export{t as default};