import React, { createRef } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import i18n from "../../config/i18n";
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

  describe("regressions", () => {
    it("has an accessible name by default when icon-only", () => {
      const { container } = render(<SearchButton />);
      expect(
        screen.getByRole("button", { name: "Search" }),
      ).toBeInTheDocument();
      expect(container.querySelector("svg")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });

    it("uses the visible text as name when it has children", () => {
      render(<SearchButton>Find</SearchButton>);
      expect(screen.getByRole("button", { name: "Find" })).toBeInTheDocument();
    });

    it("only contains phrasing content (no <div> inside the button)", () => {
      render(<SearchButton loading />);
      expect(screen.getByRole("button").querySelector("div")).toBeNull();
    });

    it("does not submit its form while loading", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
      render(
        <form onSubmit={onSubmit}>
          <SearchButton type="submit" loading />
        </form>,
      );
      await user.click(screen.getByRole("button"));
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it("forwards the ref to the <button>", () => {
      const ref = createRef<HTMLButtonElement>();
      render(<SearchButton ref={ref} />);
      expect(ref.current).toBe(screen.getByRole("button"));
    });
  });
});

describe("SearchButton localization", () => {
  afterEach(() => {
    act(() => {
      i18n.changeLanguage("en");
    });
  });
  it("translates the icon-only label and lets ariaLabel win", () => {
    act(() => {
      i18n.changeLanguage("zh");
    });
    const { rerender } = render(<SearchButton />);
    expect(screen.getByRole("button", { name: "搜索" })).toBeInTheDocument();

    rerender(<SearchButton ariaLabel="Find" />);
    expect(screen.getByRole("button", { name: "Find" })).toBeInTheDocument();
  });
});
