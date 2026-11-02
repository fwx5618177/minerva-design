import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as M from "./index";

const card = () => document.querySelector<HTMLElement>('[data-part="card"]')!;
const face = (part: string) =>
  document.querySelector<HTMLElement>(`[data-part="${part}"]`)!;

describe("Taro Flashcard", () => {
  it("renders a toggle button showing the front", () => {
    render(<M.Flashcard front="Capital of France?" back="Paris" />);
    expect(card()).toHaveAttribute("role", "button");
    expect(card()).toHaveAttribute("aria-pressed", "false");
    expect(card()).toHaveAttribute("aria-label", "Flashcard, showing Question");
    expect(face("root")).toHaveClass("mn-flashcard", "mn-variant-elevated");
    expect(face("root")).toHaveAttribute("data-state", "inactive");
    expect(face("front")).toHaveTextContent("QuestionCapital of France?");
    expect(face("back")).toHaveAttribute("aria-hidden", "true");
    expect(face("back")).toHaveClass("mn-hidden-face");
    expect(face("back")).toHaveAttribute("aria-live", "polite");
    expect(face("root").style.getPropertyValue("--flashcard-min-height")).toBe(
      "12rem",
    );
  });

  it("flips on tap, Enter and Space", () => {
    const onFlippedChange = vi.fn();
    render(
      <M.Flashcard front="Q" back="A" onFlippedChange={onFlippedChange} />,
    );
    fireEvent.click(card());
    expect(onFlippedChange).toHaveBeenLastCalledWith(true);
    expect(card()).toHaveAttribute("aria-pressed", "true");
    expect(card()).toHaveAttribute("aria-label", "Flashcard, showing Answer");
    expect(face("root")).toHaveClass("mn-flipped");
    expect(face("front")).toHaveAttribute("aria-hidden", "true");
    fireEvent.keyDown(card(), { key: "Enter" });
    expect(card()).toHaveAttribute("aria-pressed", "false");
    fireEvent.keyDown(card(), { key: " " });
    fireEvent.keyDown(card(), { key: " ", repeat: true });
    expect(card()).toHaveAttribute("aria-pressed", "true");
    expect(onFlippedChange).toHaveBeenCalledTimes(3);
  });

  it("ignores taps on interactive face content; renders the footer", () => {
    render(
      <M.Flashcard
        front={
          <span>
            <a href="#docs">docs</a> <b>now</b>
          </span>
        }
        back="A"
        footer={<button type="button">Good</button>}
      />,
    );
    fireEvent.click(screen.getByText("docs"));
    expect(card()).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(screen.getByText("now"));
    expect(card()).toHaveAttribute("aria-pressed", "true");
    expect(face("footer")).toHaveTextContent("Good");
  });

  it("keeps a controlled state; does not flip while disabled", () => {
    const onFlippedChange = vi.fn();
    const { rerender } = render(
      <M.Flashcard
        front="Q"
        back="A"
        flipped
        onFlippedChange={onFlippedChange}
      />,
    );
    fireEvent.click(card());
    expect(onFlippedChange).toHaveBeenCalledWith(false);
    expect(card()).toHaveAttribute("aria-pressed", "true");
    rerender(<M.Flashcard front="Q" back="A" disabled />);
    expect(card()).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(card());
    expect(card()).toHaveAttribute("aria-pressed", "false");
    expect(face("root")).toHaveAttribute("data-disabled", "");
  });

  it("is a group without flipOnClick and customizes the look", () => {
    render(
      <M.Flashcard
        front="Q"
        back="A"
        flipOnClick={false}
        showHint
        frontLabel="Term"
        backLabel=""
        variant="outline"
        size="large"
        axis="x"
        minHeight={200}
      />,
    );
    expect(card()).toHaveAttribute("role", "group");
    expect(card()).not.toHaveAttribute("aria-pressed");
    expect(document.querySelector('[data-part="hint"]')).toBeNull();
    expect(face("front")).toHaveTextContent("TermQ");
    expect(face("back")).toHaveTextContent(/^A$/);
    expect(face("root")).toHaveClass(
      "mn-variant-outline",
      "mn-size-large",
      "mn-axis-x",
    );
    expect(face("root").style.getPropertyValue("--flashcard-min-height")).toBe(
      "200px",
    );
  });
});
