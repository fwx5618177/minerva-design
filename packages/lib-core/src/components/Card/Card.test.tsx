import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import MemoCard, {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";

describe("Card", () => {
  it("renders a composed card with all subcomponents", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );

    expect(
      screen.getByRole("heading", { level: 3, name: "Title" }),
    ).toHaveClass("cardTitle");
    expect(screen.getByText("Description").tagName).toBe("P");
    expect(screen.getByText("Description")).toHaveClass("cardDescription");
    expect(screen.getByText("Body")).toHaveClass("cardContent");
    expect(screen.getByText("Footer")).toHaveClass("cardFooter");
  });

  it("applies the default variant class", () => {
    render(<Card>content</Card>);

    expect(screen.getByText("content")).toHaveClass("card", "default");
  });

  it.each(["outline", "elevated", "filled", "ghost"] as const)(
    "applies the %s variant class",
    (variant) => {
      render(<Card variant={variant}>content</Card>);

      expect(screen.getByText("content")).toHaveClass("card", variant);
    },
  );

  it("applies a custom className", () => {
    render(<Card className="mine">content</Card>);

    expect(screen.getByText("content")).toHaveClass("card", "mine");
  });

  it("leaves out the sections that are not composed", () => {
    const { container } = render(
      <Card>
        <CardContent>Only content</CardContent>
      </Card>,
    );

    expect(container.querySelector(".cardHeader")).toBeNull();
    expect(container.querySelector(".cardFooter")).toBeNull();
    expect(screen.getByText("Only content")).toHaveClass("cardContent");
  });

  it("default export is the memoized Card and renders the same", () => {
    render(<MemoCard variant="elevated">memo</MemoCard>);

    expect(screen.getByText("memo")).toHaveClass("card", "elevated");
  });

  it("applies custom colors to header, content and footer via style", () => {
    render(
      <>
        <CardHeader
          style={{ backgroundColor: "red", color: "blue" }}
          className="h"
        >
          header
        </CardHeader>
        <CardContent style={{ backgroundColor: "green", color: "white" }}>
          content
        </CardContent>
        <CardFooter style={{ backgroundColor: "black", color: "yellow" }}>
          footer
        </CardFooter>
      </>,
    );

    const header = screen.getByText("header");
    expect(header).toHaveClass("cardHeader", "h");
    expect(header).toHaveStyle({
      backgroundColor: "red",
      color: "blue",
    });
    expect(screen.getByText("content")).toHaveStyle({
      backgroundColor: "green",
      color: "white",
    });
    expect(screen.getByText("footer")).toHaveStyle({
      backgroundColor: "black",
      color: "yellow",
    });
  });

  it.each(["fadeIn", "slideIn", "zoomIn"] as const)(
    "applies the %s animation class to CardContent",
    (animation) => {
      render(<CardContent animation={animation}>animated</CardContent>);

      expect(screen.getByText("animated")).toHaveClass(animation);
    },
  );

  it("passes custom className to title and description", () => {
    render(
      <>
        <CardTitle className="t">Title</CardTitle>
        <CardDescription className="d">Desc</CardDescription>
      </>,
    );

    expect(screen.getByRole("heading", { name: "Title" })).toHaveClass("t");
    expect(screen.getByText("Desc")).toHaveClass("d");
  });

  it("keeps interactive children usable", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Card>
        <CardFooter>
          <button onClick={onClick}>Action</button>
        </CardFooter>
      </Card>,
    );

    await user.click(screen.getByRole("button", { name: "Action" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("forwards refs of Card and every subcomponent to their DOM nodes", () => {
    const refs = {
      card: createRef<HTMLDivElement>(),
      memo: createRef<HTMLDivElement>(),
      header: createRef<HTMLDivElement>(),
      title: createRef<HTMLHeadingElement>(),
      description: createRef<HTMLParagraphElement>(),
      content: createRef<HTMLDivElement>(),
      footer: createRef<HTMLDivElement>(),
    };
    render(
      <>
        <Card ref={refs.card}>
          <CardHeader ref={refs.header}>
            <CardTitle ref={refs.title}>Title</CardTitle>
            <CardDescription ref={refs.description}>Desc</CardDescription>
          </CardHeader>
          <CardContent ref={refs.content}>Body</CardContent>
          <CardFooter ref={refs.footer}>Foot</CardFooter>
        </Card>
        <MemoCard ref={refs.memo}>Memo</MemoCard>
      </>,
    );
    expect(refs.card.current).toHaveClass("card");
    expect(refs.memo.current).toHaveTextContent("Memo");
    expect(refs.header.current).toHaveClass("cardHeader");
    expect(refs.title.current).toBe(
      screen.getByRole("heading", { name: "Title" }),
    );
    expect(refs.description.current?.tagName).toBe("P");
    expect(refs.content.current).toHaveClass("cardContent");
    expect(refs.footer.current).toHaveClass("cardFooter");
  });
});
