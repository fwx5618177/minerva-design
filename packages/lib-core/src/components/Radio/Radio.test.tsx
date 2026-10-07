import { createRef, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Radio from "./Radio";

describe("Radio", () => {
  it("renders a radio labelled by its label", () => {
    render(<Radio label="Option A" value="a" />);

    const radio = screen.getByRole("radio", { name: "Option A" });
    expect(radio).not.toBeChecked();
    expect(radio).toHaveAttribute("value", "a");
  });

  it("checks on click and calls onChange with checked state and event", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Radio label="Option A" onChange={onChange} />);

    await user.click(screen.getByRole("radio"));

    expect(screen.getByRole("radio")).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      true,
      expect.objectContaining({ type: "change" }),
    );
  });

  it("checks when clicking the label text", async () => {
    const user = userEvent.setup();
    render(<Radio label="Clickable label" />);

    await user.click(screen.getByText("Clickable label"));

    expect(screen.getByRole("radio")).toBeChecked();
  });

  it("respects defaultChecked", () => {
    render(<Radio label="Default" defaultChecked />);

    expect(screen.getByRole("radio")).toBeChecked();
  });

  it("is uncontrolled with defaultChecked={false} and can be checked by the user", async () => {
    const user = userEvent.setup();
    render(<Radio label="Default off" defaultChecked={false} />);

    await user.click(screen.getByRole("radio"));

    expect(screen.getByRole("radio")).toBeChecked();
  });

  it("lets a defaultChecked radio be unchecked by a sibling with the same name", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Radio label="First" name="grp" value="1" defaultChecked />
        <Radio label="Second" name="grp" value="2" />
      </>,
    );

    await user.click(screen.getByRole("radio", { name: "Second" }));

    expect(screen.getByRole("radio", { name: "Second" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "First" })).not.toBeChecked();
  });

  it("follows the checked prop when controlled", async () => {
    const user = userEvent.setup();
    const Wrapper = () => {
      const [selected, setSelected] = useState<string>("a");
      return (
        <>
          <Radio
            label="A"
            name="ctl"
            value="a"
            checked={selected === "a"}
            onChange={() => setSelected("a")}
          />
          <Radio
            label="B"
            name="ctl"
            value="b"
            checked={selected === "b"}
            onChange={() => setSelected("b")}
          />
        </>
      );
    };
    render(<Wrapper />);

    expect(screen.getByRole("radio", { name: "A" })).toBeChecked();
    await user.click(screen.getByRole("radio", { name: "B" }));
    expect(screen.getByRole("radio", { name: "B" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "A" })).not.toBeChecked();
  });

  it("does not check or call onChange when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Radio label="Disabled" disabled onChange={onChange} />);

    const radio = screen.getByRole("radio");
    expect(radio).toBeDisabled();
    await user.click(radio);

    expect(radio).not.toBeChecked();
    expect(onChange).not.toHaveBeenCalled();
    expect(radio.closest("label")).toHaveClass("disabled");
  });

  it("forwards name and required to the input", () => {
    render(<Radio label="Req" name="choice" required />);

    const radio = screen.getByRole("radio");
    expect(radio).toHaveAttribute("name", "choice");
    expect(radio).toBeRequired();
  });

  it("applies size, type and className classes to the wrapper", () => {
    const { container } = render(
      <Radio label="Styled" size="large" type="success" className="mine" />,
    );

    expect(container.firstChild).toHaveClass(
      "radioWrapper",
      "large",
      "success",
      "mine",
    );
  });

  it("applies custom color and bgColor to the radio mark", () => {
    const { container } = render(
      <Radio label="Colors" color="red" bgColor="blue" />,
    );

    expect(container.querySelector(".radioMark")).toHaveStyle({
      color: "red",
      backgroundColor: "blue",
    });
  });

  it("renders helper text when not in error", () => {
    render(<Radio label="Help" helperText="Pick one" errorMessage="Bad" />);

    expect(screen.getByText("Pick one")).toHaveClass("helperText");
    expect(screen.queryByText("Bad")).not.toBeInTheDocument();
  });

  it("renders error message and icon when in error", () => {
    const { container } = render(
      <Radio
        label="Err"
        error
        helperText="Pick one"
        errorMessage="Selection required"
        errorIcon={<span data-testid="err-icon" />}
      />,
    );

    expect(screen.getByText("Selection required")).toHaveClass("errorText");
    expect(screen.queryByText("Pick one")).not.toBeInTheDocument();
    expect(screen.getByTestId("err-icon")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("error");
  });

  it("forwards the ref to the input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Radio label="Ref" ref={ref} />);

    expect(ref.current).toBe(screen.getByRole("radio"));
  });

  it("never emits undefined or stray whitespace in class names", () => {
    const { container, rerender } = render(<Radio label="Defaults" />);
    const assertClean = () => {
      container.querySelectorAll("[class]").forEach((el) => {
        const cls = el.getAttribute("class") ?? "";
        expect(cls).not.toMatch(/undefined|null|false/);
        expect(cls).toBe(cls.trim());
        expect(cls).not.toMatch(/\s{2,}/);
      });
    };
    assertClean();
    expect(container.firstElementChild).toHaveClass("radioWrapper", "medium");

    rerender(
      <Radio
        label="All"
        size="small"
        type="primary"
        disabled
        error
        errorMessage="Bad"
        className="mine"
      />,
    );
    assertClean();
    expect(container.firstElementChild).toHaveClass(
      "radioWrapper",
      "small",
      "primary",
      "error",
      "mine",
    );
  });

  describe("regressions", () => {
    it("links helper text / error message and flags errors", () => {
      const { rerender } = render(
        <Radio label="Yes" value="y" helperText="Recommended" />,
      );
      const radio = screen.getByRole("radio", { name: "Yes" });
      expect(radio).toHaveAccessibleDescription("Recommended");
      expect(radio).not.toHaveAttribute("aria-invalid");

      rerender(
        <Radio
          label="Yes"
          value="y"
          helperText="Recommended"
          error
          errorMessage="Required"
        />,
      );
      expect(radio).toHaveAccessibleDescription("Required");
      expect(radio).toHaveAttribute("aria-invalid", "true");
    });

    it("supports ariaLabel when there is no visible label", () => {
      render(<Radio value="y" ariaLabel="Yes" />);
      expect(screen.getByRole("radio", { name: "Yes" })).toBeInTheDocument();
    });
  });
});
