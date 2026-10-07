import { CodeBlock } from "@minerva/lib-core";

const payload = JSON.stringify(
  { id: 42, title: "The Three-Body Problem", tags: ["sci-fi", "classic"] },
  null,
  2,
);

export default function BasicDemo() {
  return <CodeBlock aria-label="Response payload">{payload}</CodeBlock>;
}
