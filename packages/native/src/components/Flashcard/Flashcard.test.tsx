import { fireEvent, render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { describe, expect, it, vi } from "vitest";
import { Flashcard, flashcardMinHeight } from "./Flashcard";

const card = () => screen.getByRole("button");

describe("Flashcard (native)", () => {
  it("renders a button showing the front, the back hidden", async () => {
    await render(<Flashcard front="Capital of France?" back="Paris" />);
    expect(card()).toHaveAccessibleName(/Question.*Capital of France\?/);
    expect(card()).not.toBeSelected();
    expect(screen.getByText("Capital of France?")).toBeVisible();
    expect(screen.queryByText("Paris")).toBeNull();
    expect(
      screen.getByText("Paris", { includeHiddenElements: true }),
    ).toBeTruthy();
  });

  it("flips on press and reports it", async () => {
    const onFlippedChange = vi.fn();
    await render(
      <Flashcard front="Q" back="A" onFlippedChange={onFlippedChange} />,
    );
    await fireEvent.press(card());
    expect(onFlippedChange).toHaveBeenLastCalledWith(true);
    expect(card()).toBeSelected();
    expect(screen.getByText("A")).toBeVisible();
    expect(screen.queryByText("Q")).toBeNull();
    await fireEvent.press(card());
    expect(onFlippedChange).toHaveBeenLastCalledWith(false);
    expect(card()).not.toBeSelected();
  });

  it("keeps a controlled state and renders the footer", async () => {
    const onFlippedChange = vi.fn();
    await render(
      <Flashcard
        front="Q"
        back="A"
        flipped
        onFlippedChange={onFlippedChange}
        footer={<Text>Rate</Text>}
      />,
    );
    expect(card()).toBeSelected();
    await fireEvent.press(card());
    expect(onFlippedChange).toHaveBeenCalledWith(false);
    expect(card()).toBeSelected();
    expect(screen.getByText("Rate")).toBeTruthy();
  });

  it("does not flip while disabled; is no button without flipOnClick", async () => {
    const onFlippedChange = vi.fn();
    const view = await render(
      <Flashcard
        front="Q"
        back="A"
        disabled
        onFlippedChange={onFlippedChange}
      />,
    );
    expect(card()).toBeDisabled();
    await fireEvent.press(card());
    expect(onFlippedChange).not.toHaveBeenCalled();
    await view.rerender(
      <Flashcard front="Q" back="A" flipOnClick={false} showHint />,
    );
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.queryByText("Click or press Space to flip")).toBeNull();
  });

  it("customizes labels and hint", async () => {
    await render(
      <Flashcard
        front="Q"
        back="A"
        frontLabel="Term"
        backLabel={null}
        hint="Tap to flip"
        showHint
        variant="outline"
        size="large"
        axis="x"
        accessibilityLabel="Vocabulary"
      />,
    );
    expect(card()).toHaveAccessibleName("Vocabulary");
    expect(screen.getByText("Term")).toBeTruthy();
    expect(screen.getByText("Tap to flip")).toBeTruthy();
    expect(
      screen.queryByText("Answer", { includeHiddenElements: true }),
    ).toBeNull();
  });

  it("centres plain text but stretches rich content to the label's edge", async () => {
    await render(
      <Flashcard
        front="Q"
        back={<Text testID="rich">A</Text>}
        defaultFlipped
      />,
    );
    const wrapperOf = (node: { parent: unknown }) =>
      (node.parent as { props: { style?: { alignItems?: string } } }).props;
    expect(
      wrapperOf(screen.getByText("Q", { includeHiddenElements: true })).style,
    ).toMatchObject({ alignItems: "center" });
    expect(wrapperOf(screen.getByTestId("rich")).style).toMatchObject({
      alignItems: "stretch",
    });
  });

  it("converts minHeight", () => {
    expect(flashcardMinHeight(100)).toBe(100);
    expect(flashcardMinHeight("12rem")).toBe(192);
    expect(flashcardMinHeight("150px")).toBe(150);
    expect(flashcardMinHeight("auto")).toBe(192);
  });
});
