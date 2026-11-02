import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
import { CodeBlock } from "minerva-design/vue";
const code = \`def fibonacci(n: int) -> list[int]:
    """The first n Fibonacci numbers."""
    numbers = [0, 1]
    while len(numbers) < n:
        numbers.append(numbers[-1] + numbers[-2])
    return numbers[:n]

print(fibonacci(10))\`;
<\/script>
<template>
  <CodeBlock
    :code="code"
    language="python"
    show-line-numbers
    show-language
    copyable
    aria-label="Fibonacci"
  />
</template>
`})))()}n();export{t as default};