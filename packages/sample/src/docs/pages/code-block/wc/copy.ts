// `code` holds the text (never parsed as HTML); the copy button and copy()
// write it to the clipboard. minerva-copy reports the result.
type CodeBlock = HTMLElement & { code?: string; copy(): Promise<boolean> };

export function setup(root: HTMLElement) {
  const block = root.querySelector<CodeBlock>("#payload")!;
  const button = root.querySelector<HTMLElement>("#copy")!;
  const status = root.querySelector<HTMLOutputElement>("#status")!;
  block.code = JSON.stringify(
    { event: "invoice.paid", id: "evt_1042", amount: 12900, currency: "EUR" },
    null,
    2,
  );
  const onCopy = (event: Event) => {
    const { value, success } = (
      event as CustomEvent<{ value: string; success: boolean }>
    ).detail;
    status.value = success ? `Copied ${value.length} characters` : "Failed";
  };
  const onClick = () => void block.copy();
  block.addEventListener("minerva-copy", onCopy);
  button.addEventListener("click", onClick);
  return () => {
    block.removeEventListener("minerva-copy", onCopy);
    button.removeEventListener("click", onClick);
  };
}
