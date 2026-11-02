import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- CodeBlockLineNumbers.vue -->

<template>
  <!-- prettier-ignore -->
  <minerva-code-block language="python" show-line-numbers show-language copyable aria-label="Fibonacci">def fibonacci(n: int) -&gt; list[int]:
      """The first n Fibonacci numbers."""
      numbers = [0, 1]
      while len(numbers) &lt; n:
          numbers.append(numbers[-1] + numbers[-2])
      return numbers[:n]

  print(fibonacci(10))</minerva-code-block>
</template>
`,angular:`// code-block-line-numbers.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  selector: "app-code-block-line-numbers",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <!-- prettier-ignore -->
    <minerva-code-block language="python" show-line-numbers show-language copyable aria-label="Fibonacci">def fibonacci(n: int) -&gt; list[int]:
        """The first n Fibonacci numbers."""
        numbers = [0, 1]
        while len(numbers) &lt; n:
            numbers.append(numbers[-1] + numbers[-2])
        return numbers[:n]

    print(fibonacci(10))</minerva-code-block>
  \`,
})
export class CodeBlockLineNumbersComponent {}
`,svelte:`<!-- CodeBlockLineNumbers.svelte -->

<!-- prettier-ignore -->
<minerva-code-block language="python" show-line-numbers show-language copyable aria-label="Fibonacci">def fibonacci(n: int) -&gt; list[int]:
    """The first n Fibonacci numbers."""
    numbers = [0, 1]
    while len(numbers) &lt; n:
        numbers.append(numbers[-1] + numbers[-2])
    return numbers[:n]

print(fibonacci(10))</minerva-code-block>
`,solid:`// CodeBlockLineNumbers.tsx

export default function CodeBlockLineNumbers() {
  return (
    <>
      {/* prettier-ignore */}
      <minerva-code-block language="python" show-line-numbers show-language copyable aria-label="Fibonacci">def fibonacci(n: int) -&gt; list[int]:
          """The first n Fibonacci numbers."""
          numbers = [0, 1]
          while len(numbers) &lt; n:
              numbers.append(numbers[-1] + numbers[-2])
          return numbers[:n]

      print(fibonacci(10))</minerva-code-block>
    </>
  );
}
`,html:`<!-- prettier-ignore -->
<minerva-code-block language="python" show-line-numbers show-language copyable aria-label="Fibonacci">def fibonacci(n: int) -&gt; list[int]:
    """The first n Fibonacci numbers."""
    numbers = [0, 1]
    while len(numbers) &lt; n:
        numbers.append(numbers[-1] + numbers[-2])
    return numbers[:n]

print(fibonacci(10))</minerva-code-block>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";
<\/script>
`}})))()}n();export{t as default};