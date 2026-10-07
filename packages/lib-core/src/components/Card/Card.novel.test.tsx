// Ported from @novel-isr/ui src/components/Card/__test__/Card.test.tsx
import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";
import type { CardVariant } from "./types";

describe("Card (padded layout and polymorphic root)", () => {
  it("renders a div with default variant classes and no padding class", () => {
    render(<Card data-testid="card">content</Card>);
    const card = screen.getByTestId("card");
    expect(card.tagName).toBe("DIV");
    expect(card).toHaveClass(
      "card",
      "default",
      "ui-card",
      "ui-card-variant-default",
    );
    expect(card).not.toHaveClass(
      "padded",
      "interactive",
      "ui-card-interactive",
    );
    expect(card.className).not.toMatch(/ui-card-padding-/);
    expect(card).toHaveTextContent("content");
  });

  it.each<[CardVariant, string]>([
    ["outlined", "outline"],
    ["elevated", "elevated"],
    ["subtle", "subtle"],
    ["ghost", "ghost"],
    ["shadow", "shadow"],
    ["filled", "filled"],
  ])("applies variant %s with hook ui-card-variant-%s", (variant, hook) => {
    render(
      <Card data-testid="card" variant={variant} padding="none">
        x
      </Card>,
    );
    expect(screen.getByTestId("card")).toHaveClass(
      variant,
      "padded",
      "pad-none",
      `ui-card-variant-${hook}`,
      "ui-card-padding-none",
    );
  });

  it.each([
    ["small", "sm"],
    ["medium", "md"],
    ["large", "lg"],
  ] as const)(
    "maps padding %s to the ui-card-padding-%s hook",
    (padding, hook) => {
      render(
        <Card data-testid="card" padding={padding}>
          x
        </Card>,
      );
      expect(screen.getByTestId("card")).toHaveClass(
        "padded",
        `pad-${padding}`,
        `ui-card-padding-${hook}`,
      );
    },
  );

  it("renders as an interactive link with anchor attributes", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Card
        ref={ref}
        as="a"
        href="/books/1"
        target="_blank"
        rel="noreferrer"
        interactive
        className="extra"
      >
        Book
      </Card>,
    );
    const link = screen.getByRole("link", { name: "Book" });
    expect(ref.current).toBe(link);
    expect(link).toHaveAttribute("href", "/books/1");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
    expect(link).toHaveClass("interactive", "ui-card-interactive", "extra");
    expect(link).not.toHaveAttribute("interactive");
    expect(link).not.toHaveAttribute("type");
  });

  it("renders as a button that responds to clicks and respects disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { rerender } = render(
      <Card as="button" onClick={onClick}>
        Pick
      </Card>,
    );
    const button = screen.getByRole("button", { name: "Pick" });
    expect(button).toHaveAttribute("type", "button");
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);

    rerender(
      <Card as="button" htmlType="submit" disabled onClick={onClick}>
        Pick
      </Card>,
    );
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("type", "submit");
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders as a semantic article", () => {
    render(
      <Card as="article" aria-label="Review">
        r
      </Card>,
    );
    expect(screen.getByRole("article", { name: "Review" })).toHaveClass(
      "ui-card",
    );
  });
});

describe("Card sections (hooks and padding overrides)", () => {
  it("renders header/body/footer with hook classes and optional padding override", () => {
    render(
      <Card padding="medium">
        <CardHeader data-testid="h">
          <CardTitle>Title</CardTitle>
          <CardDescription>Desc</CardDescription>
        </CardHeader>
        <CardContent data-testid="b" padding="large">
          Body
        </CardContent>
        <CardFooter data-testid="f" padding="small" className="ft">
          Footer
        </CardFooter>
      </Card>,
    );
    const header = screen.getByTestId("h");
    expect(header).toHaveClass("cardHeader", "ui-card-header");
    expect(header.className).not.toMatch(/ui-card-padding-|pad-/);
    expect(screen.getByTestId("b")).toHaveClass(
      "ui-card-body",
      "pad-large",
      "ui-card-padding-lg",
    );
    expect(screen.getByTestId("f")).toHaveClass(
      "ui-card-footer",
      "pad-small",
      "ui-card-padding-sm",
      "ft",
    );
    expect(screen.getByTestId("b")).not.toHaveAttribute("padding");
  });

  it("renders CardTitle as h3 by default and accepts a heading level override", () => {
    const { rerender } = render(<CardTitle>T</CardTitle>);
    expect(screen.getByRole("heading", { level: 3, name: "T" })).toHaveClass(
      "ui-card-title",
    );
    rerender(<CardTitle as="h2">T</CardTitle>);
    expect(
      screen.getByRole("heading", { level: 2, name: "T" }),
    ).toBeInTheDocument();
  });

  it("forwards native attributes and merges style with bgColor/textColor", () => {
    render(
      <>
        <CardHeader
          data-testid="h"
          id="hd"
          bgColor="red"
          style={{ opacity: 0.5 }}
        />
        <CardContent data-testid="c" aria-label="body" textColor="blue" />
        <CardFooter
          data-testid="f"
          style={{ color: "green" }}
          textColor="blue"
        />
        <CardDescription data-testid="d" id="desc" />
        <CardTitle data-testid="t" id="title" />
      </>,
    );
    expect(screen.getByTestId("h")).toHaveAttribute("id", "hd");
    expect(screen.getByTestId("h").style.backgroundColor).toBe("red");
    expect(screen.getByTestId("h").style.opacity).toBe("0.5");
    expect(screen.getByTestId("c")).toHaveAttribute("aria-label", "body");
    expect(screen.getByTestId("c").style.color).toBe("blue");
    expect(screen.getByTestId("f").style.color).toBe("green");
    expect(screen.getByTestId("d")).toHaveAttribute("id", "desc");
    expect(screen.getByTestId("t")).toHaveAttribute("id", "title");
  });

  it("renders CardDescription as a paragraph and forwards refs on all parts", () => {
    const refs = {
      header: createRef<HTMLDivElement>(),
      body: createRef<HTMLDivElement>(),
      footer: createRef<HTMLDivElement>(),
      title: createRef<HTMLHeadingElement>(),
      desc: createRef<HTMLParagraphElement>(),
    };
    render(
      <>
        <CardHeader ref={refs.header} />
        <CardContent ref={refs.body} />
        <CardFooter ref={refs.footer} />
        <CardTitle ref={refs.title}>t</CardTitle>
        <CardDescription ref={refs.desc} className="d">
          desc
        </CardDescription>
      </>,
    );
    expect(refs.header.current).toHaveClass("ui-card-header");
    expect(refs.body.current).toHaveClass("ui-card-body");
    expect(refs.footer.current).toHaveClass("ui-card-footer");
    expect(refs.title.current?.tagName).toBe("H3");
    expect(refs.desc.current?.tagName).toBe("P");
    expect(screen.getByText("desc")).toHaveClass("ui-card-description", "d");
  });
});

describe("Card native prop forwarding", () => {
  it("forwards role, style, aria/data attributes, id, tabIndex and handlers to the root and parts", async () => {
    const user = userEvent.setup();
    const onKeyDown = vi.fn();
    const onClick = vi.fn();
    const onPartClick = vi.fn();
    render(
      <Card
        role="toolbar"
        aria-label="Actions"
        id="c"
        data-k="v"
        tabIndex={0}
        style={{ width: 200 }}
        onKeyDown={onKeyDown}
        onClick={onClick}
      >
        <CardHeader role="group" aria-label="hd" onClick={onPartClick} />
        <CardContent data-testid="c-body" tabIndex={-1} />
        <CardFooter data-testid="c-foot" style={{ opacity: 0.5 }} />
        <CardTitle data-testid="c-title" style={{ color: "red" }} />
        <CardDescription data-testid="c-desc" onClick={onPartClick} />
      </Card>,
    );
    const root = screen.getByRole("toolbar", { name: "Actions" });
    expect(root).toHaveAttribute("id", "c");
    expect(root).toHaveAttribute("data-k", "v");
    expect(root).toHaveAttribute("tabindex", "0");
    expect(root.style.width).toBe("200px");
    root.focus();
    await user.keyboard("{Enter}");
    expect(onKeyDown).toHaveBeenCalledOnce();
    await user.click(screen.getByRole("group", { name: "hd" }));
    await user.click(screen.getByTestId("c-desc"));
    expect(onPartClick).toHaveBeenCalledTimes(2);
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(screen.getByTestId("c-body")).toHaveAttribute("tabindex", "-1");
    expect(screen.getByTestId("c-foot").style.opacity).toBe("0.5");
    expect(screen.getByTestId("c-title").style.color).toBe("red");
  });
});
