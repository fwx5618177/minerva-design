import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import i18n from "../../config/i18n";
import Alert from "./Alert";

/** Alerts are role="alert" (danger / warning) or role="status" (info / success) */
const getAlert = () => {
  const found = [
    ...screen.queryAllByRole("alert"),
    ...screen.queryAllByRole("status"),
  ];
  if (found.length !== 1) throw new Error(`Found ${found.length} alerts`);
  return found[0];
};
const queryAlert = () =>
  screen.queryByRole("alert") ?? screen.queryByRole("status");

describe("Alert", () => {
  it("renders title and content with role status for info", () => {
    render(<Alert title="Heads up">Something happened</Alert>);
    const alert = screen.getByRole("status");
    expect(alert).toHaveTextContent("Heads up");
    expect(alert).toHaveTextContent("Something happened");
  });

  it("applies default color, variant and size", () => {
    render(<Alert>Body</Alert>);
    const alert = getAlert();
    expect(alert).toHaveClass(
      "alert",
      "info",
      "subtle",
      "medium",
      "rounded",
      "withIcon",
      "withAnimation",
      "animation-slideIn",
    );
  });

  it.each(["info", "success", "warning", "danger"] as const)(
    "renders %s color with a labelled icon",
    (color) => {
      render(<Alert color={color}>Body</Alert>);
      const alert = getAlert();
      expect(alert).toHaveClass(color);
      expect(
        screen.getByRole("img", { name: `${color} icon` }),
      ).toBeInTheDocument();
    },
  );

  it("applies size, variant and boolean style props", () => {
    render(
      <Alert
        size="large"
        variant="outline"
        banner
        elevation
        rounded={false}
        className="custom"
      >
        Body
      </Alert>,
    );
    const alert = getAlert();
    expect(alert).toHaveClass(
      "large",
      "outline",
      "banner",
      "withElevation",
      "custom",
    );
    expect(alert).not.toHaveClass("rounded");
  });

  it("hides the icon when showIcon is false", () => {
    render(<Alert showIcon={false}>Body</Alert>);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(getAlert()).not.toHaveClass("withIcon");
  });

  it("renders a custom icon", () => {
    render(<Alert icon={<span data-testid="custom-icon" />}>Body</Alert>);
    expect(screen.getByRole("img", { name: "info icon" })).toContainElement(
      screen.getByTestId("custom-icon"),
    );
  });

  it("disables animation classes when animation is false", () => {
    render(
      <Alert animation={false} animationName="zoom">
        Body
      </Alert>,
    );
    const alert = getAlert();
    expect(alert).not.toHaveClass("withAnimation");
    expect(alert).not.toHaveClass("animation-zoom");
  });

  it("uses the given animation name", () => {
    render(<Alert animationName="bounce">Body</Alert>);
    expect(getAlert()).toHaveClass("animation-bounce");
  });

  it("merges style and borderRadius", () => {
    render(
      <Alert style={{ color: "red" }} borderRadius={12}>
        Body
      </Alert>,
    );
    const alert = getAlert();
    expect(alert.style.color).toBe("red");
    expect(alert.style.borderRadius).toBe("12px");
  });

  it("renders the action area", () => {
    render(<Alert action={<button type="button">Undo</button>}>Body</Alert>);
    expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument();
  });

  it("does not render a close button unless closable", () => {
    render(<Alert>Body</Alert>);
    expect(
      screen.queryByRole("button", { name: "Close" }),
    ).not.toBeInTheDocument();
  });

  it("closes and calls onClose with the click event", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Alert closable onClose={onClose}>
        Body
      </Alert>,
    );
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose.mock.calls[0][0]).toHaveProperty("type", "click");
    expect(queryAlert()).not.toBeInTheDocument();
  });

  it("closes via keyboard activation", async () => {
    const user = userEvent.setup();
    render(<Alert closable>Body</Alert>);
    screen.getByRole("button", { name: "Close" }).focus();
    await user.keyboard("{Enter}");
    expect(queryAlert()).not.toBeInTheDocument();
  });

  it("renders a custom close icon", () => {
    render(
      <Alert closable closeIcon={<span data-testid="x" />}>
        Body
      </Alert>,
    );
    expect(screen.getByRole("button", { name: "Close" })).toContainElement(
      screen.getByTestId("x"),
    );
  });

  describe("collapsible", () => {
    it("toggles content and aria-expanded, calling onExpand", async () => {
      const user = userEvent.setup();
      const onExpand = vi.fn();
      render(
        <Alert title="Title" collapsible onExpand={onExpand}>
          Details
        </Alert>,
      );
      const toggle = screen.getByRole("button", { name: "Collapse" });
      expect(toggle).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByText("Details")).toBeInTheDocument();
      expect(getAlert()).toHaveClass("collapsible", "expanded");

      await user.click(toggle);
      expect(onExpand).toHaveBeenLastCalledWith(false);
      expect(screen.queryByText("Details")).not.toBeInTheDocument();
      const expandBtn = screen.getByRole("button", { name: "Expand" });
      expect(expandBtn).toHaveAttribute("aria-expanded", "false");
      expect(getAlert()).not.toHaveClass("expanded");

      await user.click(expandBtn);
      expect(onExpand).toHaveBeenLastCalledWith(true);
      expect(onExpand).toHaveBeenCalledTimes(2);
      expect(screen.getByText("Details")).toBeInTheDocument();
    });

    it("respects defaultExpanded=false", () => {
      render(
        <Alert title="Title" collapsible defaultExpanded={false}>
          Details
        </Alert>,
      );
      expect(screen.queryByText("Details")).not.toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Expand" })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });

    it("calls onExpand exactly once per toggle under StrictMode", async () => {
      const user = userEvent.setup();
      const onExpand = vi.fn();
      render(
        <React.StrictMode>
          <Alert title="Title" collapsible onExpand={onExpand}>
            Details
          </Alert>
        </React.StrictMode>,
      );
      await user.click(screen.getByRole("button", { name: "Collapse" }));
      expect(onExpand).toHaveBeenCalledTimes(1);
      expect(onExpand).toHaveBeenCalledWith(false);
    });

    it("does not render a toggle without a title", () => {
      render(<Alert collapsible>Details</Alert>);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("keeps the content visible without a title, even if defaultExpanded is false", () => {
      render(
        <Alert collapsible defaultExpanded={false}>
          Details
        </Alert>,
      );
      expect(screen.getByText("Details")).toBeInTheDocument();
    });

    it("honors the controlled expanded prop on every render", async () => {
      const user = userEvent.setup();
      const onExpand = vi.fn();
      const { rerender } = render(
        <Alert title="Title" collapsible expanded={false} onExpand={onExpand}>
          Details
        </Alert>,
      );
      expect(screen.queryByText("Details")).not.toBeInTheDocument();

      // The parent does not update `expanded`: the content stays collapsed
      await user.click(screen.getByRole("button", { name: "Expand" }));
      expect(onExpand).toHaveBeenCalledExactlyOnceWith(true);
      expect(screen.queryByText("Details")).not.toBeInTheDocument();

      rerender(
        <Alert title="Title" collapsible expanded onExpand={onExpand}>
          Details
        </Alert>,
      );
      expect(screen.getByText("Details")).toBeInTheDocument();
    });

    it("works as a controlled component driven by onExpand", async () => {
      const user = userEvent.setup();
      const Controlled = () => {
        const [expanded, setExpanded] = React.useState(false);
        return (
          <React.StrictMode>
            <Alert
              title={`State: ${expanded}`}
              collapsible
              expanded={expanded}
              onExpand={setExpanded}
            >
              Details
            </Alert>
          </React.StrictMode>
        );
      };
      render(<Controlled />);
      await user.click(screen.getByRole("button", { name: "Expand" }));
      expect(screen.getByText("State: true")).toBeInTheDocument();
      expect(screen.getByText("Details")).toBeInTheDocument();
    });

    it("links the toggle to the content with aria-controls", () => {
      render(
        <Alert title="Title" collapsible>
          Details
        </Alert>,
      );
      const toggle = screen.getByRole("button", { name: "Collapse" });
      const contentId = toggle.getAttribute("aria-controls");
      expect(contentId).toBeTruthy();
      expect(document.getElementById(contentId as string)).toHaveTextContent(
        "Details",
      );
    });

    it("does not submit an enclosing form when toggled", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
      render(
        <form onSubmit={onSubmit}>
          <Alert title="Title" collapsible>
            Details
          </Alert>
        </form>,
      );
      await user.click(screen.getByRole("button", { name: "Collapse" }));
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  it("applies borderRadius={0}", () => {
    render(<Alert borderRadius={0}>Body</Alert>);
    expect(getAlert().style.borderRadius).toBe("0px");
  });

  it.each([
    ["danger", "alert"],
    ["warning", "alert"],
    ["info", "status"],
    ["success", "status"],
  ] as const)("%s color uses role=%s", (color, role) => {
    render(<Alert color={color}>Body</Alert>);
    expect(screen.getByRole(role)).toHaveTextContent("Body");
  });

  it("forwards ref to the root element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Alert ref={ref}>Body</Alert>);
    expect(ref.current).toBe(getAlert());
  });
});

describe("Alert localization", () => {
  afterEach(() => {
    act(() => {
      i18n.changeLanguage("en");
    });
  });
  it("translates the default labels with the library language", () => {
    act(() => {
      i18n.changeLanguage("zh");
    });
    render(
      <Alert title="Title" color="success" closable collapsible>
        Body
      </Alert>,
    );
    expect(screen.getByRole("button", { name: "关闭" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "收起" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "成功图标" })).toBeInTheDocument();
  });

  it("lets the label props win over the translation", () => {
    act(() => {
      i18n.changeLanguage("fr");
    });
    render(
      <Alert
        title="Title"
        closable
        collapsible
        defaultExpanded={false}
        closeLabel="Dismiss"
        expandLabel="Show more"
        iconLabel="Notice"
      >
        Body
      </Alert>,
    );
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Show more" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Notice" })).toBeInTheDocument();
  });
});
