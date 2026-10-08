import { createRef } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import i18n from "../../config/i18n";
import Badge from "./Badge";

describe("Badge", () => {
  it("renders a status badge with default classes", () => {
    render(<Badge content={5} aria-label="5 notifications" />);
    const badge = screen.getByRole("status", { name: "5 notifications" });
    expect(badge).toHaveTextContent("5");
    expect(badge).toHaveClass("badge", "primary", "medium", "standalone");
    expect(badge).not.toHaveClass("dot", "top-right");
  });

  it("renders a zero count", () => {
    render(<Badge content={0} />);
    expect(screen.getByRole("status")).toHaveTextContent("0");
  });

  it("wraps element children and shows content on the badge", () => {
    render(
      <Badge content={3}>
        <button type="button">Inbox</button>
      </Badge>,
    );
    const button = screen.getByRole("button", { name: "Inbox" });
    expect(button.parentElement).toHaveClass("content");
    expect(screen.getByRole("status")).toHaveTextContent("3");
  });

  it("falls back to a default label for element children without content", () => {
    render(
      <Badge>
        <span>Icon</span>
      </Badge>,
    );
    expect(screen.getByRole("status")).toHaveTextContent("Badge");
  });

  it("renders as an empty dot when dot is set", () => {
    render(<Badge dot content={9} />);
    const badge = screen.getByRole("status");
    expect(badge).toHaveClass("dot");
    expect(badge).toBeEmptyDOMElement();
  });

  it.each([
    ["success", "small", "bottom-left"],
    ["danger", "large", "top-left"],
    ["neutral", "medium", "bottom-right"],
  ] as const)(
    "applies color %s, size %s and position %s",
    (color, size, position) => {
      render(
        <Badge
          content="x"
          color={color}
          size={size}
          position={position}
          className="custom"
        >
          <span>Icon</span>
        </Badge>,
      );
      expect(screen.getByRole("status")).toHaveClass(
        color,
        size,
        position,
        "custom",
      );
    },
  );

  it("renders an icon before the content", () => {
    render(<Badge content="Pro" icon={<svg data-testid="star" />} />);
    const icon = screen.getByTestId("star");
    expect(icon.parentElement).toHaveClass("icon");
    expect(screen.getByRole("status")).toHaveTextContent("Pro");
  });

  it("applies custom border radius and width", () => {
    render(<Badge content="1" borderRadius="2px" borderWidth="3px" />);
    const badge = screen.getByRole("status");
    expect(badge.style.borderRadius).toBe("2px");
    expect(badge.style.borderWidth).toBe("3px");
    expect(badge.style.backgroundColor).toBe("");
    expect(badge.style.color).toBe("");
  });

  it("is not a tab stop (non-interactive)", async () => {
    const user = userEvent.setup();
    render(<Badge content={1} aria-label="One" />);
    await user.tab();
    expect(screen.getByRole("status", { name: "One" })).not.toHaveFocus();
    expect(document.body).toHaveFocus();
  });

  describe("regressions", () => {
    it("renders a standalone badge inline, outside the positioned wrapper", () => {
      const { container } = render(
        <p>
          Inbox <Badge content={5} /> messages
        </p>,
      );
      const badge = screen.getByRole("status");
      const paragraph = container.querySelector("p") as HTMLElement;
      expect(badge.parentElement).toBe(paragraph);
      expect(container.querySelector(".badgeWrapper")).not.toBeInTheDocument();
      expect(badge).toHaveClass("standalone");
      // position classes are what absolutely position an attached badge
      expect(badge).not.toHaveClass(
        "top-right",
        "top-left",
        "bottom-right",
        "bottom-left",
      );
    });

    it("keeps the positioned wrapper when attached to children", () => {
      render(
        <Badge content={2} position="bottom-left">
          <span>Icon</span>
        </Badge>,
      );
      const badge = screen.getByRole("status");
      expect(badge.parentElement).toHaveClass("badgeWrapper");
      expect(badge).toHaveClass("bottom-left");
      expect(badge).not.toHaveClass("standalone");
    });

    it("renders text children once, as a standalone badge", () => {
      render(<Badge>New</Badge>);
      expect(screen.getAllByText("New")).toHaveLength(1);
      expect(screen.getByRole("status")).toHaveTextContent("New");
      expect(screen.getByRole("status")).toHaveClass("standalone");
    });

    it("forwards the ref to the root element", () => {
      const standalone = createRef<HTMLElement>();
      const { rerender } = render(<Badge ref={standalone} content={1} />);
      expect(standalone.current).toBe(screen.getByRole("status"));

      const attached = createRef<HTMLElement>();
      rerender(
        <Badge ref={attached} content={1}>
          <span>Icon</span>
        </Badge>,
      );
      expect(attached.current).toHaveClass("badgeWrapper");
    });
  });
});

describe("Badge localization", () => {
  afterEach(() => {
    act(() => {
      i18n.changeLanguage("en");
    });
  });
  it("translates the fallback content of an attached badge", () => {
    act(() => {
      i18n.changeLanguage("zh");
    });
    render(
      <Badge>
        <span>Inbox</span>
      </Badge>,
    );
    expect(screen.getByRole("status")).toHaveTextContent("徽标");
  });
});

describe("Badge as a status dot", () => {
  it.each(["success", "warning", "danger", "info", "neutral"] as const)(
    "renders a standalone %s dot announced by its aria-label",
    (color) => {
      render(<Badge dot color={color} aria-label={`${color} status`} />);
      const dot = screen.getByRole("status", { name: `${color} status` });
      expect(dot).toHaveClass("badge", "dot", "standalone", color);
      expect(dot).toBeEmptyDOMElement();
    },
  );

  it("can be decorative next to a visible status label", () => {
    const { container } = render(
      <span>
        <Badge dot color="success" role="presentation" />
        Online
      </span>,
    );
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(container.querySelector(".dot")).toHaveClass("success");
  });
});
