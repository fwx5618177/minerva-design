// Validation belongs to the consumer: `errors` (by row id) shows messages
// under the fields, setCustomValidity() makes the element invalid in forms.
type Entry = { id: string; key: string; value: string };
type Editor = HTMLElement & {
  value: Entry[];
  errors?: Record<string, { key?: string; value?: string }>;
  setCustomValidity(message: string): void;
  updateComplete: Promise<boolean>;
};

export function setup(root: HTMLElement) {
  const editor = root.querySelector<Editor>("#kv-headers")!;
  const status = root.querySelector<HTMLOutputElement>("#kv-headers-status")!;
  const validate = () => {
    const errors: Record<string, { key?: string; value?: string }> = {};
    const seen = new Set<string>();
    for (const { id, key } of editor.value) {
      const name = key.trim().toLowerCase();
      if (!name) errors[id] = { key: "A header name is required." };
      else if (seen.has(name))
        errors[id] = { key: "Duplicate header (names are case-insensitive)." };
      seen.add(name);
    }
    const count = Object.keys(errors).length;
    editor.errors = errors;
    editor.setCustomValidity(count ? "Fix the highlighted headers." : "");
    status.value = count ? `${count} row(s) to fix` : "All headers are valid";
  };
  editor.addEventListener("minerva-input", validate);
  editor.addEventListener("minerva-change", validate);
  void editor.updateComplete.then(validate);
  return () => {
    editor.removeEventListener("minerva-input", validate);
    editor.removeEventListener("minerva-change", validate);
  };
}
