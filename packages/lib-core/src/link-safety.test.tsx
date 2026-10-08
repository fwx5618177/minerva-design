// Links built from props / data never render a `javascript:` / `vbscript:`
// URL (same rule as @minerva/lib-web-components, core's `sanitizeUrl`), and
// `target="_blank"` gets `rel="noopener noreferrer"` unless a rel is given.
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Card, NavTree, TextLink } from "./index";
import { resetWarnings } from "./internal/devWarnings";

const UNSAFE = ["javascript:alert(1)", " JavaScript:alert(1)", "vbscript:x"];

afterEach(() => {
  vi.restoreAllMocks();
  resetWarnings();
});

const silence = () => vi.spyOn(console, "error").mockImplementation(() => {});

describe("link safety", () => {
  it.each(UNSAFE)("TextLink drops %j with a dev warning", (href) => {
    const error = silence();
    render(<TextLink href={href}>Docs</TextLink>);
    const a = screen.getByText("Docs").closest("a")!;
    expect(a).not.toHaveAttribute("href");
    expect(error).toHaveBeenCalledWith(
      expect.stringContaining("[minerva] TextLink: blocked an unsafe link URL"),
    );
  });

  it.each(UNSAFE)("Card as a link drops %j", (href) => {
    silence();
    render(
      <Card as="a" href={href} data-testid="card">
        x
      </Card>,
    );
    expect(screen.getByTestId("card")).not.toHaveAttribute("href");
  });

  it.each(UNSAFE)("NavTree items drop %j", (href) => {
    silence();
    render(
      <NavTree
        sections={[
          {
            id: "s",
            items: [
              { id: "a", label: "Evil", href },
              { id: "b", label: "Ok", href: "/ok" },
            ],
          },
        ]}
      />,
    );
    expect(screen.getByText("Evil").closest("a")).not.toHaveAttribute("href");
    expect(screen.getByRole("link", { name: "Ok" })).toHaveAttribute(
      "href",
      "/ok",
    );
  });

  it("keeps safe URLs and does not warn", () => {
    const error = silence();
    render(
      <>
        <TextLink href="/docs">Docs</TextLink>
        <TextLink href="mailto:a@example.com">Mail</TextLink>
        <Card as="a" href="https://example.com" data-testid="card">
          x
        </Card>
      </>,
    );
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute(
      "href",
      "/docs",
    );
    expect(screen.getByRole("link", { name: "Mail" })).toHaveAttribute(
      "href",
      "mailto:a@example.com",
    );
    expect(screen.getByTestId("card")).toHaveAttribute(
      "href",
      "https://example.com",
    );
    expect(error).not.toHaveBeenCalled();
  });

  it('adds rel="noopener noreferrer" to target="_blank" links without a rel', () => {
    render(
      <>
        <TextLink href="/a" target="_blank">
          A
        </TextLink>
        <TextLink href="/b" target="_blank" rel="author">
          B
        </TextLink>
        <TextLink href="/c">C</TextLink>
        <Card as="a" href="/d" target="_blank" data-testid="card">
          D
        </Card>
      </>,
    );
    expect(screen.getByRole("link", { name: "A" })).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
    expect(screen.getByRole("link", { name: "B" })).toHaveAttribute(
      "rel",
      "author",
    );
    expect(screen.getByRole("link", { name: "C" })).not.toHaveAttribute("rel");
    expect(screen.getByTestId("card")).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
  });

  it("asChild keeps the child's own href and rel", () => {
    render(
      <TextLink asChild>
        <a href="/router" rel="next">
          Router
        </a>
      </TextLink>,
    );
    const a = screen.getByRole("link", { name: "Router" });
    expect(a).toHaveAttribute("href", "/router");
    expect(a).toHaveAttribute("rel", "next");
  });
});
