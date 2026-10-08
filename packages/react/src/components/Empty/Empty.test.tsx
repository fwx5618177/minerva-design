import { createRef } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import i18n from "../../config/i18n";
import Empty from "./Empty";

describe("Empty", () => {
  it("renders a status region with the default description", () => {
    render(<Empty />);

    const status = screen.getByRole("status", { name: "No Data" });
    expect(status).toBeInTheDocument();
    expect(status).toHaveClass("empty");
    expect(screen.getByText("No Data")).toHaveClass("description");
  });

  it("uses a custom description as text and accessible name", () => {
    render(<Empty description="Nothing here" />);

    expect(
      screen.getByRole("status", { name: "Nothing here" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  it("omits the description element when description is empty", () => {
    const { container } = render(<Empty description="" />);

    expect(container.querySelector(".description")).toBeNull();
  });

  it("renders the default inbox icon when useSvg is false", () => {
    const { container } = render(<Empty />);

    const icon = container.querySelector(".iconWrapper svg");
    expect(icon).toHaveClass("defaultIcon");
    expect(icon).not.toHaveAttribute("viewBox", "0 0 64 41");
  });

  it("renders the built-in illustration when useSvg is true", () => {
    const { container } = render(<Empty useSvg />);

    const icon = container.querySelector(".iconWrapper svg");
    expect(icon).toHaveAttribute("viewBox", "0 0 64 41");
    expect(icon).toHaveClass("defaultIcon");
  });

  it("renders a custom icon instead of the defaults", () => {
    const { container } = render(
      <Empty useSvg icon={<span data-testid="custom-icon">icon</span>} />,
    );

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(container.querySelector(".iconWrapper svg")).toBeNull();
  });

  it("renders children in a footer and lets them be interactive", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { container } = render(
      <Empty>
        <button type="button" onClick={onClick}>
          Create
        </button>
      </Empty>,
    );

    const button = screen.getByRole("button", { name: "Create" });
    expect(container.querySelector(".footer")).toContainElement(button);

    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not render a footer without children", () => {
    const { container } = render(<Empty />);

    expect(container.querySelector(".footer")).toBeNull();
  });

  it("applies showShadow and custom className", () => {
    render(<Empty showShadow className="custom" />);

    const status = screen.getByRole("status");
    expect(status).toHaveClass("empty", "showShadow", "custom");
  });

  it("does not apply showShadow class by default", () => {
    render(<Empty />);

    expect(screen.getByRole("status")).not.toHaveClass("showShadow");
  });

  it("applies size props as inline styles, with style taking precedence (also for colors)", () => {
    render(
      <Empty
        width="200px"
        height="100px"
        style={{
          width: "300px",
          margin: "4px",
          backgroundColor: "rgb(255, 0, 0)",
          color: "rgb(0, 0, 255)",
        }}
      />,
    );

    const status = screen.getByRole("status");
    expect(status).toHaveStyle({
      width: "300px",
      height: "100px",
      backgroundColor: "rgb(255, 0, 0)",
      color: "rgb(0, 0, 255)",
      margin: "4px",
    });
  });

  it("names the region from a ReactNode description instead of [object Object]", () => {
    render(
      <Empty
        description={
          <span>
            No <strong>results</strong>
          </span>
        }
      />,
    );
    expect(
      screen.getByRole("status", { name: "No results" }),
    ).toBeInTheDocument();
  });

  it("hides the default icons from assistive technologies", () => {
    const { container, rerender } = render(<Empty />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    rerender(<Empty useSvg />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("forwards ref to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Empty ref={ref} />);
    expect(ref.current).toBe(screen.getByRole("status"));
  });
});

describe("Empty localization", () => {
  afterEach(() => {
    act(() => {
      i18n.changeLanguage("en");
    });
  });
  it("translates the default description", () => {
    act(() => {
      i18n.changeLanguage("zh");
    });
    render(<Empty />);
    expect(
      screen.getByRole("status", { name: "暂无数据" }),
    ).toBeInTheDocument();
  });

  it("keeps a custom description and still hides a null one", () => {
    act(() => {
      i18n.changeLanguage("fr");
    });
    const { rerender } = render(<Empty description="Nothing here" />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();

    rerender(<Empty description={null} />);
    expect(screen.queryByText("Aucune donnée")).not.toBeInTheDocument();
  });
});
