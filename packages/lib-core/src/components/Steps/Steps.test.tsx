import { createRef } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import i18n from "../../config/i18n";
import Steps from "./Steps";
import type { StepsItem } from "./types";

const items: StepsItem[] = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "Review" },
  { value: "publish", label: "Publish" },
];

describe("Steps", () => {
  it("renders a labelled ordered list with numbered steps", () => {
    render(<Steps items={items} value="draft" onChange={() => {}} />);
    const list = screen.getByRole("list", { name: "Steps" });
    expect(list.tagName).toBe("OL");
    expect(list).toHaveClass("steps");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    const buttons = screen.getAllByRole("button");
    expect(buttons.map((b) => b.textContent)).toEqual([
      "1Draft",
      "2Review",
      "3Publish",
    ]);
    expect(buttons[0].querySelector(".number")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(buttons[0]).toHaveAttribute("type", "button");
    expect(screen.getByRole("button", { name: "Review" })).toBeInTheDocument();
  });

  it("marks earlier steps complete and the current one current", () => {
    render(
      <Steps
        items={items}
        value="review"
        onChange={() => {}}
        ariaLabel="Publishing"
        className="c"
      />,
    );
    expect(screen.getByRole("list", { name: "Publishing" })).toHaveClass("c");
    const [first, second, third] = screen.getAllByRole("listitem");
    expect(first).toHaveClass("step", "complete");
    expect(first).not.toHaveClass("current");
    expect(second).toHaveClass("current");
    expect(second).not.toHaveClass("complete");
    expect(third).not.toHaveClass("current");
    expect(third).not.toHaveClass("complete");
    expect(screen.getByRole("button", { name: "Review" })).toHaveAttribute(
      "aria-current",
      "step",
    );
    expect(screen.getByRole("button", { name: "Draft" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("does not fire onChange when re-selecting the current step", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Steps items={items} value="review" onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Review" }));
    expect(onChange).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Draft" }));
    expect(onChange).toHaveBeenCalledWith("draft");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("supports keyboard activation and skips disabled steps in tab order", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Steps
        items={[
          ...items.slice(0, 2),
          { value: "publish", label: "Publish", disabled: true },
        ]}
        value="draft"
        onChange={onChange}
      />,
    );
    await user.tab();
    expect(screen.getByRole("button", { name: "Draft" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Review" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledWith("review");
    await user.tab();
    expect(screen.getByRole("button", { name: "Publish" })).not.toHaveFocus();
    expect(screen.getByRole("button", { name: "Publish" })).toBeDisabled();
  });

  it("ignores clicks on native disabled steps", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Steps
        value="draft"
        onChange={onChange}
        items={[
          { value: "draft", label: "Draft" },
          { value: "review", label: "Review" },
          { value: "published", label: "Published", disabled: true },
        ]}
      />,
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("aria-current", "step");
    await user.click(buttons[1]);
    await user.click(buttons[2]);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("review");
  });

  it("renders read-only (all buttons disabled) without onChange", () => {
    render(<Steps items={items} value="review" />);
    screen
      .getAllByRole("button")
      .forEach((button) => expect(button).toBeDisabled());
    expect(screen.getByRole("button", { name: "Review" })).toHaveAttribute(
      "aria-current",
      "step",
    );
  });

  it("can be forced read-only or interactive", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <Steps items={items} value="review" onChange={onChange} readOnly />,
    );
    screen
      .getAllByRole("button")
      .forEach((button) => expect(button).toBeDisabled());

    rerender(<Steps items={items} defaultValue="draft" readOnly={false} />);
    await user.click(screen.getByRole("button", { name: "Publish" }));
    expect(screen.getByRole("button", { name: "Publish" })).toHaveAttribute(
      "aria-current",
      "step",
    );
  });

  it("moves the current step on its own when uncontrolled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Steps items={items} defaultValue="draft" onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Publish" }));
    expect(onChange).toHaveBeenCalledWith("publish");
    expect(screen.getAllByRole("listitem")[1]).toHaveClass("complete");
  });

  it("marks no step current when value matches nothing", () => {
    render(<Steps items={items} value="unknown" onChange={() => {}} />);
    screen.getAllByRole("listitem").forEach((li) => {
      expect(li).not.toHaveClass("current");
      expect(li).not.toHaveClass("complete");
    });
    screen
      .getAllByRole("button")
      .forEach((button) => expect(button).not.toHaveAttribute("aria-current"));
  });

  it("forwards ref and native attributes; aria-label overrides the default", () => {
    const ref = createRef<HTMLOListElement>();
    render(
      <Steps
        ref={ref}
        items={items}
        value="draft"
        id="flow"
        aria-label="Workflow"
      />,
    );
    const list = screen.getByRole("list", { name: "Workflow" });
    expect(ref.current).toBe(list);
    expect(list).toHaveAttribute("id", "flow");
  });
});

describe("Steps localization", () => {
  afterEach(() => {
    act(() => {
      i18n.changeLanguage("en");
    });
  });

  it("translates the default list label", () => {
    act(() => {
      i18n.changeLanguage("zh");
    });
    render(<Steps items={items} value="draft" />);
    expect(screen.getByRole("list", { name: "步骤" })).toBeInTheDocument();
  });
});
