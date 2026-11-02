import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// Code without a known language (e.g. an EPUB <pre> without a class):
// language="auto" detects it from \`code\` (detectCodeLanguage of
// minerva-design/core); \`show-language\` labels the detected language.
type CodeBlock = HTMLElement & { code?: string };

const snippets = [
  \`{
  "title": "The Little Prince",
  "year": 1943
}\`,
  \`def word_count(path):
    with open(path) as f:
        return len(f.read().split())\`,
  \`SELECT title, COUNT(*) AS readers
FROM books
GROUP BY title
ORDER BY readers DESC;\`,
  \`server:
  port: 8080
  hosts:
    - reader.example.com\`,
  \`It was a dark and stormy night;
the rain fell in torrents.\`,
];

export function setup(root: HTMLElement) {
  const container = root.querySelector<HTMLElement>("#snippets")!;
  snippets.forEach((code, i) => {
    const block = document.createElement("minerva-code-block") as CodeBlock;
    block.setAttribute("language", "auto");
    block.setAttribute("show-language", "");
    block.setAttribute("aria-label", \`Snippet \${i + 1}\`);
    block.code = code;
    container.append(block);
  });
  return () => container.replaceChildren();
}
`})))()}n();export{t as default};