// `value` is an array of { id, key, value } rows; `minerva-change` fires when
// a field is committed (blur) or a row is added / removed.
type Entry = { id: string; key: string; value: string };
type Editor = HTMLElement & {
  value: Entry[];
  updateComplete: Promise<boolean>;
};

export function setup(root: HTMLElement) {
  const editor = root.querySelector<Editor>("#kv-env")!;
  const output = root.querySelector<HTMLPreElement>("#kv-env-json")!;
  const show = () => {
    const pairs = editor.value.map(({ key, value }) => [key, value]);
    output.textContent = JSON.stringify(Object.fromEntries(pairs), null, 2);
  };
  editor.addEventListener("minerva-change", show);
  void editor.updateComplete.then(show);
  return () => editor.removeEventListener("minerva-change", show);
}
