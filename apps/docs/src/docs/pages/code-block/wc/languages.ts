// One highlighted block per language; `code` holds the text (never parsed
// as HTML), `language` picks the grammar and `show-language` labels it.
type CodeBlock = HTMLElement & { code?: string };

const samples: Array<[language: string, code: string]> = [
  [
    "ts",
    `export async function loadBook(id: number): Promise<Book> {
  const response = await fetch(\`/api/books/\${id}\`);
  return response.json(); // typed by the caller
}`,
  ],
  [
    "css",
    `.card:hover {
  --card-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
  color: #1f2937 !important;
}`,
  ],
  [
    "html",
    `<!-- Sign-up form -->
<form action="/join" method="post">
  <input name="email" type="email" required>
</form>`,
  ],
  [
    "bash",
    `# Install and build
export NODE_ENV=production
pnpm add minerva-design && pnpm build --filter "$APP"`,
  ],
  [
    "python",
    `@dataclass
class Point:
    def norm(self) -> float:
        return abs(self.x)  # distance to 0`,
  ],
  [
    "diff",
    `@@ -1,3 +1,3 @@
 {
-  "theme": "light"
+  "theme": "dark"
 }`,
  ],
];

export function setup(root: HTMLElement) {
  const container = root.querySelector<HTMLElement>("#samples")!;
  for (const [language, code] of samples) {
    const block = document.createElement("minerva-code-block") as CodeBlock;
    block.setAttribute("language", language);
    block.setAttribute("show-language", "");
    block.setAttribute("aria-label", `${language} example`);
    block.code = code;
    container.append(block);
  }
  return () => container.replaceChildren();
}
