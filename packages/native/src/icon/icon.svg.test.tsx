// Icon through the real react-native-svg (icon.test.tsx mocks it to inspect
// the props): native svg views, one path view per path, accessibility.
import { render, screen } from "@testing-library/react-native";
import { describe, expect, it } from "vitest";
import { searchIcon } from "@minerva/icons/core";
import { hostElements } from "../../test/queries";
import { Icon } from "./Icon";

const ofType = (type: string) =>
  hostElements().filter((el) => el.type === type);

describe("Icon on react-native-svg", () => {
  it("renders a native svg view with one path per icon path", async () => {
    await render(<Icon icon={searchIcon} size={32} testID="icon" />);
    expect(ofType("RNSVGSvgView")).toHaveLength(1);
    expect(ofType("RNSVGPath").map((p) => p.props.d)).toEqual([
      ...searchIcon.paths,
    ]);
    expect(
      screen.getByTestId("icon", { includeHiddenElements: true }),
    ).toBeTruthy();
    expect(screen.queryByRole("image")).toBeNull();
  });

  it("is an image named by its title", async () => {
    await render(<Icon icon={searchIcon} title="Search" />);
    expect(screen.getByRole("image", { name: "Search" })).toBeTruthy();
  });
});
