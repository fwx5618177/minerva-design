import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import i18n from "../../config/i18n";
import { Flashcard } from ".";

const card = () => screen.getByRole("button", { name: /^Flashcard/ });
const face = (part: string) =>
  document.querySelector<HTMLElement>(`[data-part="${part}"]`)!;

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Flashcard", () => {
  it("renders a toggle button showing the front", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Flashcard ref={ref} front="Capital of France?" back="Paris" />);
    expect(ref.current).toHaveAttribute("data-minerva", "flashcard");
    expect(card()).toHaveAccessibleName("Flashcard, showing Question");
    expect(card()).toHaveAccessibleDescription("Capital of France?");
    expect(card()).toHaveAttribute("aria-pressed", "false");
    expect(card()).toHaveAttribute("tabindex", "0");
    expect(face("front")).toHaveTextContent("QuestionCapital of France?");
    expect(face("front")).not.toHaveAttribute("aria-hidden");
    expect(face("back")).toHaveAttribute("aria-hidden", "true");
    expect(face("back")).toHaveAttribute("inert");
    expect(face("back")).toHaveAttribute("aria-live", "polite");
    expect(ref.current).toHaveAttribute("data-state", "inactive");
    expect(ref.current).toHaveAttribute("data-variant", "elevated");
    expect(ref.current).toHaveAttribute("data-size", "medium");
    expect(ref.current!.style.getPropertyValue("--flashcard-min-height")).toBe(
      "12rem",
    );
  });

  it("flips on click, Enter and Space", async () => {
    const user = userEvent.setup();
    const onFlippedChange = vi.fn();
    render(<Flashcard front="Q" back="A" onFlippedChange={onFlippedChange} />);
    await user.click(card());
    expect(onFlippedChange).toHaveBeenLastCalledWith(true);
    expect(card()).toHaveAttribute("aria-pressed", "true");
    expect(card()).toHaveAccessibleName("Flashcard, showing Answer");
    expect(card()).toHaveAccessibleDescription("A");
    expect(face("front")).toHaveAttribute("inert");
    expect(face("back")).not.toHaveAttribute("aria-hidden");
    await user.keyboard("{Enter}");
    expect(card()).toHaveAttribute("aria-pressed", "false");
    await user.keyboard(" ");
    expect(card()).toHaveAttribute("aria-pressed", "true");
    expect(onFlippedChange).toHaveBeenCalledTimes(3);
  });

  it("ignores clicks on interactive content inside a face", async () => {
    const user = userEvent.setup();
    const onLink = vi.fn((event: React.MouseEvent) => event.preventDefault());
    render(
      <Flashcard
        front={
          <span>
            See{" "}
            <a href="#docs" onClick={onLink}>
              docs
            </a>{" "}
            <strong>now</strong>
          </span>
        }
        back="A"
      />,
    );
    await user.click(screen.getByText("docs"));
    expect(onLink).toHaveBeenCalled();
    expect(card()).toHaveAttribute("aria-pressed", "false");
    await user.click(screen.getByText("now"));
    expect(card()).toHaveAttribute("aria-pressed", "true");
  });

  it("ignores keys from inner elements and key repeats", async () => {
    const user = userEvent.setup();
    render(<Flashcard front={<button type="button">inner</button>} back="A" />);
    screen.getByRole("button", { name: "inner" }).focus();
    await user.keyboard(" ");
    expect(card()).toHaveAttribute("aria-pressed", "false");
    card().focus();
    await user.keyboard("{Enter>3/}");
    expect(card()).toHaveAttribute("aria-pressed", "true");
  });

  it("supports the controlled mode", async () => {
    const user = userEvent.setup();
    const Controlled = () => {
      const [flipped, setFlipped] = useState(true);
      return (
        <>
          <Flashcard
            front="Q"
            back="A"
            flipped={flipped}
            onFlippedChange={setFlipped}
            footer={
              <button type="button" onClick={() => setFlipped(false)}>
                Next
              </button>
            }
          />
          <output>{String(flipped)}</output>
        </>
      );
    };
    render(<Controlled />);
    expect(card()).toHaveAttribute("aria-pressed", "true");
    expect(face("footer")).toContainElement(
      screen.getByRole("button", { name: "Next" }),
    );
    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(card()).toHaveAttribute("aria-pressed", "false");
    await user.click(card());
    expect(screen.getByRole("status")).toHaveTextContent("true");
  });

  it("does not flip while disabled", async () => {
    const user = userEvent.setup();
    const onFlippedChange = vi.fn();
    render(
      <Flashcard
        front="Q"
        back="A"
        disabled
        onFlippedChange={onFlippedChange}
      />,
    );
    expect(card()).toHaveAttribute("aria-disabled", "true");
    expect(card()).toHaveAttribute("tabindex", "-1");
    await user.click(card());
    expect(onFlippedChange).not.toHaveBeenCalled();
    expect(card().closest("[data-part=root]")).toHaveAttribute(
      "data-disabled",
      "",
    );
  });

  it("is a group without flipOnClick", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <Flashcard front="Q" back="A" flipOnClick={false} showHint />,
    );
    const group = screen.getByRole("group", {
      name: "Flashcard, showing Question",
    });
    expect(group).not.toHaveAttribute("tabindex");
    expect(group).not.toHaveAttribute("aria-pressed");
    expect(document.querySelector("[data-part=hint]")).toBeNull();
    await user.click(group);
    expect(face("back")).toHaveAttribute("aria-hidden", "true");
    rerender(<Flashcard front="Q" back="A" flipOnClick={false} flipped />);
    expect(face("back")).not.toHaveAttribute("aria-hidden");
  });

  it("customizes labels, hint, size, variant, axis and height", () => {
    render(
      <Flashcard
        front="Q"
        back="A"
        frontLabel="Term"
        backLabel={null}
        hint="Tap me"
        showHint
        variant="outline"
        size="large"
        axis="x"
        minHeight={200}
        aria-label="Vocabulary"
        className="custom"
      />,
    );
    expect(screen.getByRole("button", { name: "Vocabulary" })).toBeVisible();
    expect(face("front")).toHaveTextContent("TermQTap me");
    expect(face("back")).toHaveTextContent(/^A$/);
    const root = document.querySelector<HTMLElement>("[data-part=root]")!;
    expect(root).toHaveClass("custom");
    expect(root).toHaveAttribute("data-variant", "outline");
    expect(root).toHaveAttribute("data-size", "large");
    expect(root.style.getPropertyValue("--flashcard-min-height")).toBe("200px");
  });

  it("translates the default labels", async () => {
    await i18n.changeLanguage("zh");
    try {
      render(<Flashcard front="Q" back="A" showHint />);
      expect(screen.getByRole("button")).toHaveAccessibleName(
        "抽认卡，当前为问题",
      );
      expect(face("front")).toHaveTextContent("问题Q点击或按空格键翻转");
    } finally {
      await i18n.changeLanguage("en");
    }
  });

  it("warns when controlled without a handler", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Flashcard front="Q" back="A" flipped />);
    const messages = [...error.mock.calls, ...warn.mock.calls].flat().join();
    expect(messages).toMatch(/Flashcard.*onFlippedChange/);
  });
});
