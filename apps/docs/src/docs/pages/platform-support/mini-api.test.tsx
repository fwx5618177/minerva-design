// @vitest-environment happy-dom
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, expect, it } from "vitest";
import MiniApi from "./mini-api";
import { setupI18n, SiteProviders } from "../../../test/utils";
import taro from "../../api.taro.mini.generated.json";
import uni from "../../api.uni.mini.generated.json";
import weapp from "../../api.weapp.mini.generated.json";

beforeAll(setupI18n);
it("documents the actual event and state conventions of each renderer", () => {
  expect(taro.Button.events.some((p) => p.name === "onClick")).toBe(true);
  expect(uni.Input.props.some((p) => p.name === "modelValue")).toBe(true);
  expect(uni.Input.events.some((p) => p.name === "update:modelValue")).toBe(
    true,
  );
  expect(weapp.Button.events.some((p) => p.name === "click")).toBe(true);
  expect(uni.ThemeProvider.methods.some((p) => p.name === "setTheme")).toBe(
    true,
  );
  expect(JSON.stringify(weapp)).not.toContain("WechatMiniprogram");
  expect(weapp.Button.entry).toBe("minerva-design/button/index");
  expect(weapp.Cascader.methods.some((p) => p.name === "configure")).toBe(true);
  for (const api of [taro, uni, weapp])
    expect(api).not.toHaveProperty("MonacoCodeEditor");
});
it("switches real platform API tables through library controls", async () => {
  const user = userEvent.setup();
  render(
    <SiteProviders>
      <MiniApi />
    </SiteProviders>,
  );
  const props = await screen.findByRole("table", { name: "Properties" });
  expect(props).toHaveAttribute("data-minerva", "data-table");
  expect(
    within(await screen.findByRole("table", { name: "Events" })).getByText(
      "onClick",
    ),
  ).toBeInTheDocument();
  await user.click(screen.getByRole("combobox", { name: "API platform" }));
  await user.click(screen.getByRole("option", { name: "uni-app" }));
  await waitFor(() =>
    expect(
      screen.getByRole("combobox", { name: "API component" }),
    ).toBeEnabled(),
  );
  await user.click(screen.getByRole("combobox", { name: "API component" }));
  await user.click(screen.getByRole("option", { name: /^Input$/ }));
  expect(await screen.findByText("update:modelValue")).toBeInTheDocument();
  await user.click(screen.getByRole("combobox", { name: "API platform" }));
  await user.click(screen.getByRole("option", { name: "WeChat" }));
  expect(
    await screen.findByText(/minerva-design\/input\/index/),
  ).toBeInTheDocument();
});
