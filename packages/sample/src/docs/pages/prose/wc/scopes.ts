// Inside a shadow root, the element injects its rules into that root (once),
// so it works in other components too.
export function setup(root: HTMLElement) {
  const host = root.querySelector<HTMLElement>("#host")!;
  const shadow = host.shadowRoot ?? host.attachShadow({ mode: "open" });
  shadow.innerHTML = `<minerva-prose>
    <h4>In a shadow root</h4>
    <ul><li>Lists, <code>code</code> and <a href="https://example.com">links</a></li></ul>
  </minerva-prose>`;
}
