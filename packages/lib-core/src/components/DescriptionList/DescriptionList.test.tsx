// Ported from @novel-isr/ui src/components/DescriptionList/__test__/DescriptionList.test.tsx
// and the DescriptionList part of src/components/__test__/ReadingPrimitives.test.tsx
import { createRef } from "react";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { compile } from "sass";
import { describe, expect, it } from "vitest";
import DescriptionList from "./DescriptionList";

const items = [
  { key: "author", label: "Author", value: "Lu Xun" },
  { key: "words", label: "Words", value: 0 },
  { key: "status", label: <strong>Status</strong>, value: <em>Ongoing</em> },
];

describe("DescriptionList", () => {
  it("renders a dl with one dt/dd pair per item in order", () => {
    const { container } = render(<DescriptionList items={items} />);
    const dl = container.querySelector("dl")!;
    expect(dl).toHaveClass("descriptionList", "ui-description-list");
    const rows = dl.querySelectorAll(":scope > .ui-description-row");
    expect(rows).toHaveLength(3);
    expect(
      Array.from(dl.querySelectorAll("dt"), (node) => node.textContent),
    ).toEqual(["Author", "Words", "Status"]);
    expect(
      Array.from(dl.querySelectorAll("dd"), (node) => node.textContent),
    ).toEqual(["Lu Xun", "0", "Ongoing"]);
    for (const row of rows) {
      expect(row).toHaveClass("row");
      expect(row.children[0]?.tagName).toBe("DT");
      expect(row.children[1]?.tagName).toBe("DD");
    }
  });

  it("accepts rich ReactNode labels and values", () => {
    render(<DescriptionList items={items} />);
    expect(screen.getByText("Status").tagName).toBe("STRONG");
    expect(screen.getByText("Ongoing").tagName).toBe("EM");
  });

  it("renders account metadata as labeled fields, including a real zero", () => {
    const { container } = render(
      <DescriptionList
        items={[
          {
            key: "id",
            label: "Account ID",
            value: <code>12345678-1234-4234-8234-123456789012</code>,
          },
          { key: "keys", label: "Passkeys", value: 0 },
        ]}
      />,
    );
    expect(
      [...container.querySelectorAll("dt")].map((el) => el.textContent),
    ).toEqual(["Account ID", "Passkeys"]);
    expect(
      [...container.querySelectorAll("dd")].map((el) => el.textContent),
    ).toEqual(["12345678-1234-4234-8234-123456789012", "0"]);
  });

  it("renders an empty list without rows", () => {
    const { container } = render(<DescriptionList items={[]} />);
    expect(container.querySelector("dl")).toBeEmptyDOMElement();
  });

  it("forwards ref, className and native attributes", () => {
    const ref = createRef<HTMLDListElement>();
    render(
      <DescriptionList
        ref={ref}
        items={items}
        className="consumer"
        aria-label="Book facts"
        data-testid="dl"
      />,
    );
    const dl = screen.getByTestId("dl");
    expect(ref.current).toBe(dl);
    expect(dl).toHaveClass("ui-description-list", "consumer");
    expect(dl).toHaveAttribute("aria-label", "Book facts");
    expect(dl).not.toHaveAttribute("items");
  });

  it("stacks rows on narrow screens and wraps long values", () => {
    const css = compile(
      join(import.meta.dirname, "descriptionList.module.scss"),
    ).css;
    expect(css).toMatch(
      /\.row\s*\{[^}]*grid-template-columns:\s*minmax\(7rem, 24%\) minmax\(0, 1fr\)/,
    );
    expect(css).toMatch(
      /\.row dt,\s*\.row dd\s*\{[^}]*overflow-wrap:\s*anywhere/,
    );
    expect(css).toMatch(
      /@media \(max-width: 30rem\)\s*\{\s*\.row\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\)/,
    );
  });
});
