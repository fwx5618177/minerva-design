// Long lines scroll horizontally with no-wrap; max-height caps the block.
// The region is focusable, so it scrolls with the keyboard too.
type CodeBlock = HTMLElement & { code?: string };

export function setup(root: HTMLElement) {
  const lines = Array.from(
    { length: 20 },
    (_, i) =>
      `[12:00:${String(i).padStart(2, "0")}] step ${i + 1}/20 ok ` +
      "-- compiled packages/web-components/src/components with no warnings",
  ).join("\n");
  root.querySelector<CodeBlock>("#log")!.code = lines;
  root.querySelector<CodeBlock>("#wrapped")!.code = lines;
}
