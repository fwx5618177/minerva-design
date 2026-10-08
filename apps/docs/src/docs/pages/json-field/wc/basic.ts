// The status line appears on blur; `minerva-change` fires on blur and after
// formatting. The element's validity (badInput) reflects the JSON syntax.
type JsonField = HTMLElement & {
  validity?: ValidityState;
  validationMessage: string;
};

export function setup(root: HTMLElement) {
  const field = root.querySelector<JsonField>("#jf-config")!;
  const output = root.querySelector<HTMLOutputElement>("#jf-config-state")!;
  const onChange = () => {
    output.value = field.validity?.valid
      ? "Committed valid JSON"
      : field.validationMessage;
  };
  field.addEventListener("minerva-change", onChange);
  return () => field.removeEventListener("minerva-change", onChange);
}
