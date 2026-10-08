// Keyboard audit (WAI-ARIA combobox + tag removal) with real user-event keys.
import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TagInput, type TagInputProps } from ".";

function App({ onChange, ...props }: Partial<TagInputProps>) {
  const [value, setValue] = useState<readonly string[]>(["React", "Vue"]);
  return (
    <TagInput
      value={value}
      onChange={(next) => {
        setValue(next);
        onChange?.(next);
      }}
      aria-label="Tags"
      {...props}
    />
  );
}

const field = () => screen.getByRole("combobox", { name: "Tags" });
const tagLabels = () =>
  Array.from(document.querySelectorAll(".label")).map((el) => el.textContent);

describe("TagInput keyboard", () => {
  it("reaches each tag's remove button, then the input, then the add / clear buttons", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.tab();
    expect(screen.getByRole("button", { name: "Remove React" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Remove Vue" })).toHaveFocus();
    await user.tab();
    expect(field()).toHaveFocus();
    // The add button is disabled while the draft is empty: skipped.
    await user.tab();
    expect(screen.getByRole("button", { name: "Clear tags" })).toHaveFocus();
  });

  it("removes a tag with Enter / Space on its remove button and returns focus to the input", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.tab();
    await user.keyboard("{Enter}");
    expect(tagLabels()).toEqual(["Vue"]);
    expect(field()).toHaveFocus();

    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Remove Vue" })).toHaveFocus();
    await user.keyboard(" ");
    expect(tagLabels()).toEqual([]);
    expect(field()).toHaveFocus();
  });

  it("adds the typed draft with Enter", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<App onChange={onChange} />);
    await user.click(field());
    await user.keyboard("  Svelte {Enter}");
    expect(onChange).toHaveBeenLastCalledWith(["React", "Vue", "Svelte"]);
    expect(field()).toHaveValue("");
    expect(field()).toHaveFocus();
  });

  it("removes the last tag with Backspace only when the draft is empty", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<App onChange={onChange} />);
    await user.click(field());
    await user.keyboard("ab{Backspace}");
    expect(field()).toHaveValue("a");
    expect(onChange).not.toHaveBeenCalled();

    await user.keyboard("{Backspace}");
    expect(field()).toHaveValue("");
    expect(onChange).not.toHaveBeenCalled();

    await user.keyboard("{Backspace}");
    expect(onChange).toHaveBeenLastCalledWith(["React"]);
    await user.keyboard("{Backspace}");
    expect(onChange).toHaveBeenLastCalledWith([]);
    expect(tagLabels()).toEqual([]);
    // Nothing left to remove.
    await user.keyboard("{Backspace}");
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("does not remove tags with Backspace when read-only", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<App onChange={onChange} readOnly />);
    await user.tab();
    expect(field()).toHaveFocus();
    await user.keyboard("{Backspace}");
    expect(onChange).not.toHaveBeenCalled();
    expect(tagLabels()).toEqual(["React", "Vue"]);
  });

  it("is not reachable when disabled", async () => {
    const user = userEvent.setup();
    render(<App disabled />);
    await user.tab();
    expect(document.body).toHaveFocus();
  });
});

describe("TagInput separators", () => {
  it("commits the text before a typed comma by default and keeps Enter", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<App onChange={onChange} />);
    await user.click(field());
    await user.keyboard(" Svelte ,Sol");
    expect(onChange).toHaveBeenLastCalledWith(["React", "Vue", "Svelte"]);
    expect(field()).toHaveValue("Sol");
    await user.keyboard("id{Enter}");
    expect(onChange).toHaveBeenLastCalledWith([
      "React",
      "Vue",
      "Svelte",
      "Solid",
    ]);
    // Empty pieces and duplicates are ignored.
    await user.keyboard(", ,Vue,");
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(field()).toHaveValue("");
  });

  it("splits on custom separators only", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<App onChange={onChange} separators={[";"]} />);
    await user.click(field());
    await user.keyboard("a,b");
    expect(onChange).not.toHaveBeenCalled();
    expect(field()).toHaveValue("a,b");
    await user.keyboard(";");
    expect(onChange).toHaveBeenLastCalledWith(["React", "Vue", "a,b"]);
    expect(field()).toHaveValue("");
  });

  it("does not commit on Enter when Enter is not a separator", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<App onChange={onChange} separators={[","]} />);
    await user.click(field());
    await user.keyboard("Svelte{Enter}");
    expect(onChange).not.toHaveBeenCalled();
    expect(field()).toHaveValue("Svelte");
    await user.keyboard(",");
    expect(onChange).toHaveBeenLastCalledWith(["React", "Vue", "Svelte"]);
  });

  it("splits pasted text into several tags in one change", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<App onChange={onChange} separators={[",", ";"]} />);
    await user.click(field());
    await user.paste("a, b; c");
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(["React", "Vue", "a", "b", "c"]);
    expect(field()).toHaveValue("");
    expect(tagLabels()).toEqual(["React", "Vue", "a", "b", "c"]);
  });

  it("splits pasted text on line breaks when Enter is a separator", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<App onChange={onChange} />);
    await user.click(field());
    await user.paste("a\nb\r\nc");
    expect(onChange).toHaveBeenLastCalledWith(["React", "Vue", "a", "b", "c"]);
  });

  it("dedupes pasted tags against existing tags and each other", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<App onChange={onChange} />);
    await user.click(field());
    await user.paste(" React , x,, x ,Vue,y ");
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(["React", "Vue", "x", "y"]);
    // Nothing new: no change at all.
    await user.paste("React,Vue");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("lets a paste without separators through as plain text", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<App onChange={onChange} />);
    await user.click(field());
    await user.paste("a; b");
    expect(onChange).not.toHaveBeenCalled();
    expect(field()).toHaveValue("a; b");
  });

  it("does not add pasted or typed tags when read-only", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<App onChange={onChange} readOnly />);
    await user.click(field());
    await user.paste("a,b");
    await user.keyboard("c,");
    expect(onChange).not.toHaveBeenCalled();
    expect(tagLabels()).toEqual(["React", "Vue"]);
  });
});
