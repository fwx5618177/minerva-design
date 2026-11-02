import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// \`marks\` lays saved highlights over the syntax colors (offsets into
// \`code\`); getSelectionRange() maps the user's selection to such offsets and
// minerva-mark-click reports the clicked mark (here: removes it).
interface CodeMark {
  start: number;
  end: number;
  color?: string;
  id?: string;
  title?: string;
}
type CodeBlock = HTMLElement & {
  code?: string;
  marks?: CodeMark[];
  getSelectionRange(): { start: number; end: number; text: string } | null;
};

export function setup(root: HTMLElement) {
  const block = root.querySelector<CodeBlock>("#annotated")!;
  const highlight = root.querySelector<HTMLElement>("#highlight")!;
  const clear = root.querySelector<HTMLElement>("#clear")!;
  const status = root.querySelector<HTMLOutputElement>("#status")!;
  block.code = \`export async function fetchUser(id: string) {
  const response = await fetch(\\\`/api/users/\\\${id}\\\`);
  if (!response.ok) throw new Error("Request failed");
  return response.json();
}\`;
  block.marks = [
    { id: "n1", start: 71, end: 96, title: "Template literal URL" },
    {
      id: "n2",
      start: 104,
      end: 116,
      color: "danger",
      title: "Check the status",
    },
  ];
  // keep the selection: do not move the focus on press
  const keepSelection = (event: Event) => event.preventDefault();
  const onHighlight = () => {
    const range = block.getSelectionRange();
    if (!range) {
      status.value = "Select some code first";
      return;
    }
    block.marks = [
      ...(block.marks ?? []),
      {
        id: \`n\${Date.now()}\`,
        start: range.start,
        end: range.end,
        color: "success",
      },
    ];
    status.value = \`Highlighted “\${range.text}” (\${range.start}–\${range.end})\`;
  };
  const onClear = () => (block.marks = []);
  const onMarkClick = (event: Event) => {
    const { mark } = (event as CustomEvent<{ mark: CodeMark }>).detail;
    block.marks = (block.marks ?? []).filter((m) => m.id !== mark.id);
    status.value = \`Removed \${mark.title ?? "highlight"}\`;
  };
  highlight.addEventListener("mousedown", keepSelection);
  highlight.addEventListener("click", onHighlight);
  clear.addEventListener("click", onClear);
  block.addEventListener("minerva-mark-click", onMarkClick);
  return () => {
    highlight.removeEventListener("mousedown", keepSelection);
    highlight.removeEventListener("click", onHighlight);
    clear.removeEventListener("click", onClear);
    block.removeEventListener("minerva-mark-click", onMarkClick);
  };
}
`})))()}n();export{t as default};