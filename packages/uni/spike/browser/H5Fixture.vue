<script setup lang="ts">
import { ref } from "vue";
import OverlayLifecycle from "./OverlayLifecycle.vue";
import {
  Modal,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  HtmlPreview,
} from "../../src";
import { MonacoCodeEditor } from "../../src/monaco";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
(globalThis as any).MonacoEnvironment = { getWorker: () => new EditorWorker() };
const code = ref("hello");
</script>
<template>
  <main>
    <button id="outside">Outside</button
    ><Modal title="Isolation"
      ><template #trigger>Open modal</template><button>First</button
      ><button>Last</button></Modal
    ><Popover modal
      ><PopoverTrigger as-child
        ><button id="authored">Open popover</button></PopoverTrigger
      ><PopoverContent portal
        ><button>Popover first</button
        ><PopoverClose>Close popover</PopoverClose></PopoverContent
      ></Popover
    ><HtmlPreview
      title="Sandbox"
      html="<p>Safe preview</p><script>parent.compromised=true</script>"
    /><MonacoCodeEditor
      v-model="code"
      :monaco="monaco"
      label="Source"
      :height="200"
    /><output id="code">{{ code }}</output>
    <OverlayLifecycle />
  </main>
</template>
