import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SearchButton from "./SearchButton";

describe("SearchButton", () => {
  it("renders a button with a search icon and default classes", () => {
    const { container } = render(<SearchButton ariaLabel="Search" />);

    const button = screen.getByRole("button", { name: "Search" });
    expect(button).toHaveClass("searchButton", "circle", "primary", "medium");
    expect(button).toBeEnabled();
    expect(container.querySelector("svg.icon")).toBeInTheDocument();
  });

  it("applies shape, variant, size, animation and className", () => {
    render(
      <SearchButton
        ariaLabel="Search"
        shape="rounded"
        variant="warning"
        size="xlarge"
        animation="shake"
        className="mine"
      />,
    );

    expect(screen.getByRole("button")).toHaveClass(
      "rounded",
      "warning",
      "xlarge",
      "shake",
      "mine",
    );
  });

  it("does not add an animation class when animation is none", () => {
    render(<SearchButton ariaLabel="Search" />);

    const button = screen.getByRole("button");
    expect(button).not.toHaveClass("expand");
    expect(button).not.toHaveClass("shrink");
    expect(button).not.toHaveClass("shake");
  });

  it("renders children and forces the square shape", () => {
    render(<SearchButton shape="circle">Find</SearchButton>);

    const button = screen.getByRole("button", { name: "Find" });
    expect(button).toHaveClass("square");
    expect(button).not.toHaveClass("circle");
    expect(screen.getByText("Find")).toHaveClass("children");
  });

  it("applies custom colors", () => {
    const { container } = render(
      <SearchButton
        ariaLabel="Search"
        bgColor="black"
        color="white"
        iconColor="red"
      />,
    );

    expect(screen.getByRole("button")).toHaveStyle({
      backgroundColor: "black",
      color: "white",
      fill: "red",
    });
    expect(container.querySelector("svg")).toHaveAttribute("color", "red");
  });

  it("calls onClick with the click event", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<SearchButton ariaLabel="Search" onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toHaveProperty("type", "click");
  });

  it("is keyboard accessible", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<SearchButton ariaLabel="Search" onClick={onClick} />);

    await user.tab();
    expect(screen.getByRole("button")).toHaveFocus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<SearchButton ariaLabel="Search" onClick={onClick} disabled />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    await user.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it("shows a loader instead of the icon while loading", () => {
    const { container } = render(
      <SearchButton ariaLabel="Search" loading>
        Searching
      </SearchButton>,
    );

    expect(screen.getByRole("button")).toHaveClass("loading");
    expect(container.querySelector(".loader")).toBeInTheDocument();
    expect(container.querySelector("svg")).not.toBeInTheDocument();
    expect(screen.getByText("Searching")).toBeInTheDocument();
  });

  it("ignores clicks and reports busy while loading", async () => {
    const onClick = vi.fn();
    render(<SearchButton ariaLabel="Search" loading onClick={onClick} />);
    const button = screen.getByRole("button", { name: "Search" });
    expect(button).toHaveAttribute("aria-busy", "true");
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
