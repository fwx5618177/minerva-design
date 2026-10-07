import { createRef } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import i18n from "../../config/i18n";
import Avatar from "./Avatar";
import AvatarGroup from "./AvatarGroup";

describe("AvatarGroup", () => {
  it("wraps each child avatar in a group item", () => {
    render(
      <AvatarGroup count={3}>
        <Avatar name="Alice" />
        <Avatar name="Bob" />
      </AvatarGroup>,
    );
    const alice = screen.getByLabelText("Alice");
    const bob = screen.getByLabelText("Bob");
    expect(alice.parentElement).toHaveClass("avatarGroupItem");
    expect(bob.parentElement).toHaveClass("avatarGroupItem");
    expect(alice.parentElement).not.toBe(bob.parentElement);
  });

  it("shows the overflow count and describes it in the label", () => {
    render(
      <AvatarGroup count={5} className="custom">
        <Avatar name="Alice" />
      </AvatarGroup>,
    );
    const group = screen.getByLabelText("Avatar group with 5 more");
    expect(group).toHaveClass("avatarGroup", "custom");
    expect(screen.getByText("+5")).toHaveClass("count");
  });

  it("omits the count badge and its wording when no count is given", () => {
    render(
      <AvatarGroup>
        <Avatar name="Alice" />
      </AvatarGroup>,
    );
    expect(screen.getByLabelText("Avatar group")).toBeInTheDocument();
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
  });

  it("does not render a stray 0 when count is 0", () => {
    render(
      <AvatarGroup count={0}>
        <Avatar name="Alice" />
      </AvatarGroup>,
    );
    const group = screen.getByLabelText("Avatar group");
    expect(group).not.toHaveTextContent("0");
  });

  it("is not a tab stop (non-interactive)", async () => {
    const user = userEvent.setup();
    render(
      <AvatarGroup count={2}>
        <Avatar name="Alice" />
      </AvatarGroup>,
    );
    await user.tab();
    expect(screen.getByLabelText("Avatar group with 2 more")).not.toHaveFocus();
    expect(document.body).toHaveFocus();
  });

  it("is exposed as a labelled group", () => {
    render(
      <AvatarGroup count={2}>
        <Avatar name="Alice" />
      </AvatarGroup>,
    );
    expect(
      screen.getByRole("group", { name: "Avatar group with 2 more" }),
    ).toBeInTheDocument();
  });

  it("forwards ref to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <AvatarGroup ref={ref}>
        <Avatar name="Alice" />
      </AvatarGroup>,
    );
    expect(ref.current).toBe(screen.getByRole("group"));
  });
});

describe("AvatarGroup localization", () => {
  afterEach(() => {
    act(() => {
      i18n.changeLanguage("en");
    });
  });
  it("translates the group label and lets ariaLabel win", () => {
    act(() => {
      i18n.changeLanguage("zh");
    });
    const { rerender } = render(
      <AvatarGroup count={3}>
        <Avatar name="A" />
      </AvatarGroup>,
    );
    expect(
      screen.getByRole("group", { name: "头像组，另有 3 位" }),
    ).toBeInTheDocument();

    rerender(
      <AvatarGroup count={3} ariaLabel="Team">
        <Avatar name="A" />
      </AvatarGroup>,
    );
    expect(screen.getByRole("group", { name: "Team" })).toBeInTheDocument();
  });
});
