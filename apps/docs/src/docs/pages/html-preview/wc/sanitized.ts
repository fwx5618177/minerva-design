// Scripts, event handlers and remote resources are removed (DOMPurify +
// CSP in a sandboxed iframe): edit the source, nothing runs.
type Preview = HTMLElement & { html: string };

export function setup(root: HTMLElement) {
  const source = root.querySelector<HTMLTextAreaElement>("#source")!;
  const preview = root.querySelector<Preview>("#preview")!;
  source.value = [
    '<p style="color: crimson">Styled text stays.</p>',
    "<script>alert('removed')</script>",
    '<img src="x" onerror="alert(\'removed\')" alt="Broken image">',
    "<button onclick=\"alert('removed')\">Inert button</button>",
  ].join("\n");
  const sync = () => (preview.html = source.value);
  sync();
  source.addEventListener("input", sync);
  return () => source.removeEventListener("input", sync);
}
