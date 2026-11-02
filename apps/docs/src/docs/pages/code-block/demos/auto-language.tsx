import { useState } from "react";
import { CodeBlock, Textarea } from "minerva-design";

// Code extracted without a language (e.g. an EPUB <pre> without a class):
// language="auto" detects it from the text (detectCodeLanguage of
// minerva-design/core) and the label shows what was detected.
const snippets = [
  `{
  "title": "The Little Prince",
  "year": 1943,
  "tags": ["novella", "classic"]
}`,
  `def word_count(path):
    with open(path) as f:
        return len(f.read().split())

print(word_count("book.txt"))`,
  `SELECT title, COUNT(*) AS readers
FROM books
JOIN reads ON reads.book_id = books.id
GROUP BY title
ORDER BY readers DESC;`,
  `$ mkdir -p out && cd out
$ curl -sSL https://example.com/book.epub -o book.epub
$ unzip -q book.epub | grep -v META-INF`,
  `server:
  port: 8080
  hosts:
    - reader.example.com
    - api.example.com`,
  `It was a dark and stormy night;
the rain fell in torrents.`,
];

export default function AutoLanguageDemo() {
  const [code, setCode] = useState(
    "const total = items.reduce((sum, item) => sum + item.price, 0);",
  );
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {snippets.map((snippet, i) => (
        <CodeBlock
          key={i}
          aria-label={`Snippet ${i + 1}`}
          language="auto"
          showLanguage
        >
          {snippet}
        </CodeBlock>
      ))}
      <Textarea
        aria-label="Code to detect"
        rows={4}
        placeholder="Paste some code"
        value={code}
        onChange={(event) => setCode(event.target.value)}
      />
      <CodeBlock aria-label="Pasted code" language="auto" showLanguage>
        {code}
      </CodeBlock>
    </div>
  );
}
