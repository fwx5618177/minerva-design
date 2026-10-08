import { Table, VStack, type TableColumn } from "@minerva/lib-core";
import "@minerva/lib-web-components";

interface Book {
  id: number;
  title: string;
  author: string;
  score: number;
}

const books: Book[] = [
  { id: 1, title: "Dune", author: "Frank Herbert", score: 9.1 },
  { id: 2, title: "Solaris", author: "Stanisław Lem", score: 8.7 },
  { id: 3, title: "Hyperion", author: "Dan Simmons", score: 8.9 },
];

const columns: TableColumn<Book>[] = [
  { key: "title", header: "Title" },
  { key: "author", header: "Author" },
  { key: "score", header: "Score", align: "right" },
];

const css = `
.ledger [data-minerva="data-table"][data-part="header-cell"],
.ledger minerva-data-table::part(header-cell) {
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 12px;
  color: var(--primary-color);
}
/* ::part() only takes user-action pseudo-classes (:hover, :focus-visible...):
   keep structural ones (:nth-child) in a React-only rule */
.ledger [data-minerva="data-table"][data-part="row"]:nth-child(even) [data-part="cell"] {
  background: color-mix(in srgb, var(--primary-color) 6%, transparent);
}
.ledger [data-minerva="data-table"][data-part="row"]:hover [data-part="cell"],
.ledger minerva-data-table::part(row):hover {
  background: color-mix(in srgb, var(--primary-color) 14%, transparent);
}
`;

export default function RestyleTable() {
  return (
    <VStack className="ledger" gap={24}>
      <style>{css}</style>
      <Table
        aria-label="Books (React)"
        columns={columns}
        data={books}
        rowKey={(book) => book.id}
      />
      <minerva-data-table
        aria-label="Books (Web Component)"
        row-key="id"
        columns={columns}
        rows={books}
      />
    </VStack>
  );
}
