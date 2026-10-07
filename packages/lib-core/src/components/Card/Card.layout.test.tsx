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
    expect(card).toHaveClass("card", "default");
    expect(card).not.toHaveClass("padded", "interactive");
    expect(card.className).not.toMatch(/pad-/);
    expect(card).toHaveTextContent("content");
  });

  it.each<CardVariant>(["outline", "elevated", "ghost", "filled"])(
    "applies variant %s with the padded layout",
    (variant) => {
      render(
        <Card data-testid="card" variant={variant} padding="none">
          x
        </Card>,
      );
      expect(screen.getByTestId("card")).toHaveClass(
        variant,
        "padded",
        "pad-none",
      );
    },
  );

  it.each(["small", "medium", "large"] as const)(
    "maps padding %s to its padding class",
    (padding) => {
      render(
        <Card data-testid="card" padding={padding}>
          x
        </Card>,
      );
      expect(screen.getByTestId("card")).toHaveClass(
        "padded",
        `pad-${padding}`,
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
    expect(link).toHaveClass("interactive", "extra");
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
      <Card as="button" type="submit" disabled onClick={onClick}>
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
    expect(screen.getByRole("article", { name: "Review" })).toHaveClass("card");
  });
});

describe("Card sections and padding overrides", () => {
  it("renders header/body/footer with their classes and optional padding override", () => {
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
    expect(header).toHaveClass("cardHeader");
    expect(header.className).not.toMatch(/pad-/);
    expect(screen.getByTestId("b")).toHaveClass("cardContent", "pad-large");
    expect(screen.getByTestId("f")).toHaveClass(
      "cardFooter",
      "pad-small",
      "ft",
    );
    expect(screen.getByTestId("b")).not.toHaveAttribute("padding");
  });

  it("renders CardTitle as h3 by default and accepts a heading level override", () => {
    const { rerender } = render(<CardTitle>T</CardTitle>);
    expect(screen.getByRole("heading", { level: 3, name: "T" })).toHaveClass(
      "cardTitle",
    );
    rerender(<CardTitle as="h2">T</CardTitle>);
    expect(
      screen.getByRole("heading", { level: 2, name: "T" }),
    ).toBeInTheDocument();
  });

  it("forwards native attributes and style to every part", () => {
    render(
      <>
        <CardHeader
          data-testid="h"
          id="hd"
          style={{ backgroundColor: "red", opacity: 0.5 }}
        />
        <CardContent
          data-testid="c"
          aria-label="body"
          style={{ color: "blue" }}
        />
        <CardFooter data-testid="f" style={{ color: "green" }} />
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
    expect(refs.header.current).toHaveClass("cardHeader");
    expect(refs.body.current).toHaveClass("cardContent");
    expect(refs.footer.current).toHaveClass("cardFooter");
    expect(refs.title.current?.tagName).toBe("H3");
    expect(refs.desc.current?.tagName).toBe("P");
    expect(screen.getByText("desc")).toHaveClass("cardDescription", "d");
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
