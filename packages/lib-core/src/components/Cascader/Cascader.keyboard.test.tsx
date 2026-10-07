import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Cascader from "./Cascader";
import type { CascaderOption } from "./types";
import { Modal } from "../Modal";

const options: CascaderOption[] = [
  {
    value: "fiction",
    label: "Fiction",
    children: [
      { value: "fantasy", label: "Fantasy" },
      { value: "scifi", label: "Science fiction" },
    ],
  },
  { value: "poetry", label: "Poetry" },
  { value: "essays", label: "Essays" },
];

const input = () => screen.getByRole("combobox", { name: "Genre" });

describe("Cascader keyboard", () => {
  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
    ["ArrowDown", "{ArrowDown}"],
  ])(
    "%s opens from the Tab-reachable input and focuses the first option",
    async (_, keys) => {
      const user = userEvent.setup();
      render(<Cascader label="Genre" name="genre" options={options} />);
      await user.tab();
      expect(input()).toHaveFocus();
      await user.keyboard(keys);
      expect(input()).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByRole("option", { name: "Fiction" })).toHaveFocus();
    },
  );

  it("Home / End / arrows move within a column, Enter picks a leaf", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Cascader
        label="Genre"
        name="genre"
        options={options}
        onChange={onChange}
      />,
    );
    input().focus();
    await user.keyboard("{Enter}{End}");
    expect(screen.getByRole("option", { name: "Essays" })).toHaveFocus();
    await user.keyboard("{Home}");
    expect(screen.getByRole("option", { name: "Fiction" })).toHaveFocus();
    await user.keyboard("{ArrowRight}{ArrowDown}");
    expect(
      screen.getByRole("option", { name: "Science fiction" }),
    ).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledWith(
      ["fiction", "scifi"],
      expect.any(Array),
    );
    expect(input()).toHaveFocus();
    expect(input()).toHaveAttribute("aria-expanded", "false");
  });

  it("inside a Modal, Escape closes only the dropdown and returns focus to the input", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Modal open onOpenChange={onOpenChange} title="Filter">
        <Cascader label="Genre" name="genre" options={options} />
      </Modal>,
    );
    await waitFor(() => expect(input()).toHaveFocus());
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("option", { name: "Fiction" })).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(input()).toHaveAttribute("aria-expanded", "false");
    expect(input()).toHaveFocus();
    expect(onOpenChange).not.toHaveBeenCalled();
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
