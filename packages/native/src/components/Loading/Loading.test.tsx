import { render, screen } from "@testing-library/react-native";
import { resolveTokens } from "@minerva/core";
import { describe, expect, it } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { queryPart } from "../../../test/queries";
import { Loading, Spinner } from "./Loading";

const light = resolveTokens({ design: { preset: "touch" } });

describe("Loading", () => {
  it("is a busy progressbar named by its default label", async () => {
    await render(<Loading />);
    const bar = screen.getByRole("progressbar", { name: "Loading..." });
    expect(bar).toBeBusy();
    expect(screen.getByText("Loading...")).toBeTruthy();
    expect(bar.props.dataSet).toMatchObject({ size: "medium" });
  });

  it("custom label, or none (named by common.loading)", async () => {
    const { rerender } = await render(<Loading label="Fetching" />);
    expect(screen.getByRole("progressbar", { name: "Fetching" })).toBeTruthy();
    await rerender(<Spinner label={null} />);
    expect(screen.getByRole("progressbar", { name: "Loading" })).toBeTruthy();
    expect(screen.queryByText("Loading...")).toBeNull();
  });

  it("localized texts", async () => {
    await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <Loading label={null} />
      </MinervaProvider>,
    );
    expect(screen.getByRole("progressbar", { name: "加载中" })).toBeTruthy();
  });

  it.each(["small", "medium", "large"] as const)(
    "renders the %s size",
    async (size) => {
      await render(<Loading size={size} />);
      expect(queryPart("indicator")!.props.size).toBe(
        size === "large" ? "large" : "small",
      );
    },
  );

  it("token colors and vertical layout", async () => {
    await render(
      <MinervaProvider theme="light">
        <Loading color="success" vertical />
      </MinervaProvider>,
    );
    expect(queryPart("indicator")!.props.color).toBe(
      light.colors["success-color"],
    );
    expect(screen.getByRole("progressbar")).toHaveStyle({
      flexDirection: "column",
    });
  });

  it("overlay mode masks its container", async () => {
    await render(
      <MinervaProvider theme="dark">
        <Loading overlay />
      </MinervaProvider>,
    );
    const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });
    expect(queryPart("overlay", "loading")).toHaveStyle({
      backgroundColor: dark.colors["overlay-color"],
    });
  });
});
