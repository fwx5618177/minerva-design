import { CodeBlock } from "@minerva/lib-core";

const log = [
  "2026-10-07T09:12:01Z INFO  request id=7f3a path=/api/books?page=1&size=20&sort=rating",
  "2026-10-07T09:12:02Z WARN  slow query took=1834ms table=reviews",
].join("\n");

export default function NoWrapDemo() {
  return (
    <CodeBlock ariaLabel="Server log" wrap={false} maxHeight={160}>
      {log}
    </CodeBlock>
  );
}
