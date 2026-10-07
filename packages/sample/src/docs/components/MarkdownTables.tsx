import React from "react";
import styles from "./docs.module.scss";

/** Inline `code` -> <code>; everything else stays text. */
const inline = (text: string): React.ReactNode[] =>
  text
    .split(/(`[^`]+`)/g)
    .map((part, i) =>
      part.startsWith("`") && part.endsWith("`") ? (
        <code key={i}>{part.slice(1, -1)}</code>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      ),
    );

const cells = (row: string) =>
  row
    .trim()
    .replace(/^\||\|$/g, "")
    .split(/(?<!\\)\|/)
    .map((cell) => cell.trim());

interface Section {
  title: string;
  header: string[];
  rows: string[][];
}

/** The "## heading + table" sections of a Markdown document. */
const tableSections = (markdown: string): Section[] => {
  const sections: Section[] = [];
  let title = "";
  let current: Section | null = null;
  for (const line of markdown.split("\n")) {
    if (line.startsWith("## ")) {
      title = line.slice(3).trim();
      current = null;
    } else if (line.startsWith("|")) {
      if (/^\|[\s|:-]+\|$/.test(line.trim())) continue;
      if (!current) {
        current = { title, header: cells(line), rows: [] };
        sections.push(current);
      } else {
        current.rows.push(cells(line));
      }
    } else if (line.trim() === "") {
      current = null;
    }
  }
  return sections;
};

/** Renders the tables of a Markdown document (the migration mapping). */
const MarkdownTables: React.FC<{ markdown: string; only?: string[] }> = ({
  markdown,
  only,
}) => (
  <>
    {tableSections(markdown)
      .filter((s) => !only || only.some((title) => s.title.startsWith(title)))
      .map((section, index) => (
        <section
          key={`${section.title}-${index}`}
          className={styles.section}
          aria-label={section.title}
        >
          <h3>{section.title}</h3>
          <div
            className={styles.tableWrapper}
            tabIndex={0}
            role="region"
            aria-label={section.title}
          >
            <table className={styles.propsTable}>
              <thead>
                <tr>
                  {section.header.map((cell) => (
                    <th key={cell} scope="col">
                      {inline(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (
                      <td key={c}>{inline(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
  </>
);

export default MarkdownTables;
