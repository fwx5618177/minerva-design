import { fireEvent, render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { describe, expect, it } from "vitest";
import { resolveTokens } from "@minerva/core";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { getByRoleDeep, queryPart } from "../../../test/queries";
import {
  Avatar,
  AvatarGroup,
  getAvatarColor,
  getAvatarInitials,
  type AvatarSize,
} from "./Avatar";

const light = resolveTokens({ mode: "light", design: { preset: "touch" } });

describe("Avatar", () => {
  it("shows initials on a deterministic token color, named after the person", async () => {
    await render(<Avatar name="Ada Lovelace" />);
    const avatar = screen.getByRole("image", { name: "Ada Lovelace" });
    expect(screen.getByText("AL")).toBeTruthy();
    const color = getAvatarColor("Ada Lovelace");
    expect(getAvatarColor("Ada Lovelace")).toBe(color);
    expect(avatar).toHaveStyle({
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: light.colors[`${color}-color-subtle`],
    });
  });

  it("computes initials", () => {
    expect(getAvatarInitials("ada")).toBe("A");
    expect(getAvatarInitials(" Grace  Brewster Hopper ")).toBe("GB");
    expect(getAvatarInitials("张三")).toBe("张");
    expect(getAvatarInitials("")).toBe("");
  });

  it("renders the image, and falls back to the initials when it fails", async () => {
    await render(<Avatar src="https://x.test/a.png" name="Bo Li" alt="Bo" />);
    const image = queryPart("image", "avatar");
    expect([image?.props.source].flat()[0]).toEqual({
      uri: "https://x.test/a.png",
    });
    expect(screen.getByRole("image", { name: "Bo" })).toBeTruthy();
    await fireEvent(image!, "error");
    expect(queryPart("image", "avatar")).toBeNull();
    expect(screen.getByText("BL")).toBeTruthy();
  });

  it("uses the localized default label and a custom fallback", async () => {
    await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <Avatar fallback={<Text>?</Text>} />
      </MinervaProvider>,
    );
    expect(screen.getByRole("image", { name: "头像" })).toBeTruthy();
    expect(screen.getByText("?", { includeHiddenElements: true })).toBeTruthy();
  });

  it("is hidden when decorative (alt='')", async () => {
    await render(<Avatar name="Ann" alt="" />);
    expect(screen.queryByRole("image")).toBeNull();
  });

  it.each<[AvatarSize, number]>([
    ["xsmall", 24],
    ["small", 32],
    ["large", 64],
    ["xxlarge", 96],
    [40, 40],
  ])("size %s", async (size, px) => {
    await render(<Avatar name="X" size={size} />);
    expect(screen.getByRole("image")).toHaveStyle({ width: px, height: px });
  });

  it.each([
    ["rounded", light.radius.lg],
    ["square", light.radius.sm],
  ] as const)("shape %s", async (shape, borderRadius) => {
    await render(<Avatar name="X" shape={shape} />);
    expect(screen.getByRole("image")).toHaveStyle({ borderRadius });
  });
});

describe("AvatarGroup", () => {
  it("shows max avatars with a +N indicator and a labelled group", async () => {
    await render(
      <AvatarGroup max={2} size="small">
        <Avatar name="A A" />
        <Avatar name="B B" />
        <Avatar name="C C" />
        <Avatar name="D D" />
      </AvatarGroup>,
    );
    expect(
      getByRoleDeep("group", { name: "Avatar group with 2 more" }),
    ).toBeTruthy();
    expect(screen.getAllByRole("image")).toHaveLength(2);
    expect(screen.getByRole("image", { name: "A A" })).toHaveStyle({
      width: 32,
    });
    expect(
      screen.getByText("+2", { includeHiddenElements: true }),
    ).toBeTruthy();
    expect(screen.queryByText("+2")).toBeNull();
  });

  it("adds count, overlaps by spacing and localizes the label", async () => {
    await render(
      <MinervaProvider locale={{ language: "fr" }}>
        <AvatarGroup count={3} spacing={10}>
          <Avatar name="A" />
          <Avatar name="B" />
        </AvatarGroup>
      </MinervaProvider>,
    );
    const items = screen.getAllByRole("image");
    expect(items).toHaveLength(2);
    const group = getByRoleDeep("group");
    expect(group.props.accessibilityLabel).toMatch(/3/);
    const second = items[1].parent;
    expect(second).toHaveStyle({ marginLeft: -10 });
  });

  it("without overflow uses the plain label", async () => {
    await render(
      <AvatarGroup>
        <Avatar name="A" />
      </AvatarGroup>,
    );
    expect(getByRoleDeep("group", { name: "Avatar group" })).toBeTruthy();
  });
});
