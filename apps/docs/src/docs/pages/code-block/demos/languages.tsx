import { CodeBlock } from "minerva-design";

const samples = [
  {
    language: "ts",
    code: `interface Book {
  id: number;
  title: string;
}

export async function loadBook(id: number): Promise<Book> {
  const response = await fetch(\`/api/books/\${id}\`);
  return response.json(); // typed by the caller
}`,
  },
  {
    language: "css",
    code: `.card:hover {
  --card-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
  padding: 1rem 1.5rem;
  color: #1f2937 !important;
}`,
  },
  {
    language: "html",
    code: `<!-- Sign-up form -->
<form action="/join" method="post">
  <input name="email" type="email" required>
  <button type="submit">Join &amp; continue</button>
</form>`,
  },
  {
    language: "bash",
    code: `# Install and build
export NODE_ENV=production
pnpm add minerva-design && pnpm build --filter "$APP"`,
  },
  {
    language: "python",
    code: `@dataclass
class Point:
    x: float = 0.0

    def norm(self) -> float:
        return abs(self.x)  # distance to 0`,
  },
  {
    language: "diff",
    code: `--- a/config.json
+++ b/config.json
@@ -1,3 +1,3 @@
 {
-  "theme": "light"
+  "theme": "dark"
 }`,
  },
];

export default function LanguagesDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {samples.map(({ language, code }) => (
        <CodeBlock
          key={language}
          aria-label={`${language} example`}
          language={language}
          showLanguage
        >
          {code}
        </CodeBlock>
      ))}
    </div>
  );
}
