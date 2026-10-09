// Public, non-mutating migration smoke flows. No account login or backend writes.
import { chromium, expect } from "@playwright/test";

const [front, admin] = process.argv.slice(2);
if (!front || !admin)
  throw new Error(
    "Usage: node tools/migrations/verify-browser.mjs <front-origin> <admin-origin>",
  );
const origins = [new URL(front), new URL(admin)];
const loopback = origins.every((url) =>
  ["127.0.0.1", "localhost", "[::1]"].includes(url.hostname),
);
const browser = await chromium.launch();
const context = await browser.newContext({ ignoreHTTPSErrors: loopback });
const errors = [];
context.on("page", (page) =>
  page.on("pageerror", (error) => errors.push(error.message)),
);
try {
  const publicPage = await context.newPage();
  await publicPage.goto(new URL("/zh-CN/about", front).href);
  const search = publicPage.getByRole("combobox");
  await search.fill("Minerva migration");
  await expect(search).toHaveValue("Minerva migration");
  await publicPage.getByRole("button", { name: "外观", exact: true }).click();
  await publicPage.getByRole("button", { name: "深色", exact: true }).click();
  await expect(publicPage.locator("html")).toHaveAttribute(
    "data-theme",
    "dark",
  );
  await publicPage.keyboard.press("Escape");
  await publicPage.getByRole("button", { name: "登录", exact: true }).click();
  await expect(publicPage).toHaveURL(/\/zh-CN\/login/);
  await expect(publicPage.locator('input[type="password"]')).toBeVisible();

  const adminPage = await context.newPage();
  await adminPage.goto(admin);
  await adminPage.getByRole("button", { name: "暗", exact: true }).click();
  await expect(adminPage.locator("html")).toHaveAttribute("data-theme", "dark");
  await adminPage
    .getByPlaceholder("name@company.com 或 handle")
    .fill("migration-check");
  const password = adminPage.getByPlaceholder("输入账号密码");
  await password.fill("local-display-check");
  await expect(password).toHaveAttribute("type", "password");
  await adminPage
    .getByRole("button", { name: "Show password", exact: true })
    .click();
  await expect(password).toHaveAttribute("type", "text");
  await expect(password).toHaveValue("local-display-check");
  expect(errors).toEqual([]);
  console.log(
    "Packed migration smoke passed: search, themes, login navigation, controlled fields, password visibility; zero page errors.",
  );
} finally {
  await browser.close();
}
