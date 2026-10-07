// The submitted value is the displayed text; `required` blocks submission
// while empty and form.reset() restores the `value` attribute.
type Option = { value: string; label: string; children?: Option[] };
type Cascader = HTMLElement & { options: Option[] };

export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#shipping")!;
  const result = root.querySelector<HTMLOutputElement>("#result")!;
  root.querySelector<Cascader>("#destination")!.options = [
    {
      value: "fr",
      label: "France",
      children: [
        { value: "paris", label: "Paris" },
        { value: "lyon", label: "Lyon" },
      ],
    },
    {
      value: "jp",
      label: "Japan",
      children: [
        { value: "tokyo", label: "Tokyo" },
        { value: "osaka", label: "Osaka" },
      ],
    },
  ];
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    result.value = `destination = ${new FormData(form).get("destination")}`;
  };
  const onReset = () => (result.value = "");
  form.addEventListener("submit", onSubmit);
  form.addEventListener("reset", onReset);
  return () => {
    form.removeEventListener("submit", onSubmit);
    form.removeEventListener("reset", onReset);
  };
}
