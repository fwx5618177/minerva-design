// `options` is a JS property; `minerva-change` reports the selected path.
type Option = { value: string; label: string; children?: Option[] };
type Cascader = HTMLElement & { options: Option[] };

export function setup(root: HTMLElement) {
  const cascader = root.querySelector<Cascader>("#region")!;
  const result = root.querySelector<HTMLOutputElement>("#result")!;
  cascader.options = [
    {
      value: "zhejiang",
      label: "Zhejiang",
      children: [
        {
          value: "hangzhou",
          label: "Hangzhou",
          children: [
            { value: "xihu", label: "West Lake" },
            { value: "binjiang", label: "Binjiang" },
          ],
        },
        { value: "ningbo", label: "Ningbo" },
      ],
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
      children: [
        {
          value: "nanjing",
          label: "Nanjing",
          children: [{ value: "zhonghuamen", label: "Zhonghuamen" }],
        },
        { value: "suzhou", label: "Suzhou" },
      ],
    },
  ];
  const onChange = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: string[] }>).detail;
    result.value = value.length ? `Path: ${value.join(" > ")}` : "Cleared";
  };
  cascader.addEventListener("minerva-change", onChange);
  return () => cascader.removeEventListener("minerva-change", onChange);
}
