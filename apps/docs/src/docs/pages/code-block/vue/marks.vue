<script setup lang="ts">
import { ref } from "vue";
import { Button, CodeBlock, type CodeMark } from "minerva-design/vue";
import { getCodeSelectionRange } from "minerva-design/core";

const code = `def fibonacci(n: int) -> list[int]:
    """The first n Fibonacci numbers."""
    numbers = [0, 1]
    while len(numbers) < n:
        numbers.append(numbers[-1] + numbers[-2])
    return numbers[:n]

print(fibonacci(10))`;

// offsets are UTF-16 offsets into `code` (e.g. from getCodeSelectionRange)
const marks = ref<CodeMark[]>([
  { id: "doc", start: 40, end: 76, color: "info", title: "Docstring" },
  { id: "sum", start: 149, end: 174, title: "The recurrence" },
]);
const container = ref<HTMLElement>();
const status = ref("");

function highlightSelection() {
  const range = container.value && getCodeSelectionRange(container.value);
  if (!range) {
    status.value = "Select some code first";
    return;
  }
  marks.value = [
    ...marks.value,
    {
      id: `n${Date.now()}`,
      start: range.start,
      end: range.end,
      color: "success",
    },
  ];
  status.value = `Highlighted “${range.text}” (${range.start}–${range.end})`;
}

function remove(mark: CodeMark) {
  marks.value = marks.value.filter((m) => m.id !== mark.id);
  status.value = `Removed ${mark.title ?? "highlight"}`;
}
</script>
<template>
  <div style="display: grid; gap: 8px">
    <div ref="container">
      <CodeBlock
        :code="code"
        language="python"
        show-line-numbers
        copyable
        aria-label="Annotated Fibonacci"
        :marks="marks"
        @mark-click="remove"
      />
    </div>
    <div style="display: flex; gap: 8px; align-items: center">
      <Button
        size="small"
        variant="outline"
        @mousedown.prevent
        @click="highlightSelection"
      >
        Highlight selection
      </Button>
      <Button size="small" variant="ghost" @click="marks = []">Clear</Button>
      <output>{{ status }}</output>
    </div>
  </div>
</template>
