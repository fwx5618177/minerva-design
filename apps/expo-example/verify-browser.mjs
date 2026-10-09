import { chromium } from "@playwright/test";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 430, height: 932 } });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
await page.goto(process.env.MINERVA_EXPO_URL ?? "http://127.0.0.1:8417");
await page.getByText("Advanced components", { exact: true }).click();
await page.getByRole("button", { name: "Name", exact: true }).click();
await page.getByRole("checkbox", { name: "Select row a", exact: true }).check();
await page.getByLabel("Component search", { exact: true }).fill("But");
await page.getByRole("button", { name: "Button", exact: true }).click();
if (
  (await page.getByLabel("Component search", { exact: true }).inputValue()) !==
  "Button"
)
  throw Error("Autocomplete selection did not commit");
await page.getByRole("combobox", { name: "Region", exact: true }).click();
await page.getByRole("button", { name: "China", exact: true }).click();
await page.getByRole("button", { name: "Shanghai", exact: true }).click();
await page.getByRole("button", { name: "Format JSON", exact: true }).click();
if (
  !(
    await page.getByLabel("JSON settings", { exact: true }).inputValue()
  ).includes("9007199254740993")
)
  throw Error("JSON formatting lost integer precision");
await page.getByRole("button", { name: "Open menu", exact: true }).click();
await page.getByRole("button", { name: "More", exact: true }).click();
await page.getByRole("button", { name: "Archive", exact: true }).click();
await page.getByRole("button", { name: "Details", exact: true }).click();
await page.getByRole("button", { name: "Done", exact: true }).click();
await page.getByRole("button", { name: "Commands", exact: true }).click();
await page.getByLabel("Search commands", { exact: true }).fill("pref");
await page
  .getByRole("dialog", { name: "Command palette", exact: true })
  .getByRole("button", { name: "Settings", exact: true })
  .click();
await page
  .getByRole("button", { name: "Confirm archive", exact: true })
  .click();
await page.getByRole("button", { name: "Archive", exact: true }).click();
await page.getByText("Archived", { exact: true }).waitFor();
const [chooser] = await Promise.all([
  page.waitForEvent("filechooser"),
  page.getByRole("button", { name: "Select files", exact: true }).click(),
]);
await chooser.setFiles({
  name: "example.txt",
  mimeType: "text/plain",
  buffer: Buffer.from("native upload picker smoke"),
});
await page.getByText("example.txt", { exact: true }).waitFor();
await page
  .getByRole("button", { name: "Remove example.txt", exact: true })
  .click();
await page.getByRole("button", { name: "Overview", exact: true }).count();
await page.locator('iframe[title="Document preview"]').scrollIntoViewIfNeeded();
await page
  .frameLocator('iframe[title="Document preview"]')
  .getByRole("heading", { name: "Welcome" })
  .waitFor();
await page.screenshot({
  path: "/tmp/minerva-native-advanced.png",
  fullPage: true,
});
await page.getByRole("button", { name: "Back", exact: true }).click();
await page.getByText("Virtual list", { exact: true }).click();
await page.getByRole("button", { name: "Record 0", exact: true }).click();
await page.getByText("Selected row 0", { exact: true }).waitFor();
if (await page.getByText("Record 9999", { exact: true }).count())
  throw Error("FlatList rendered its entire dataset");
await page.screenshot({ path: "/tmp/minerva-native-virtual.png" });
await page.getByRole("button", { name: "Back", exact: true }).click();
await page.getByText("Document preview", { exact: true }).click();
const documentFrame = page.frameLocator('iframe[title="Local document"]');
await documentFrame
  .getByRole("heading", { name: "Preview loaded", exact: true })
  .waitFor();
if (await documentFrame.locator("a[href]").count())
  throw Error("Document adapter retained external navigation");
await page
  .getByRole("button", { name: "Update document", exact: true })
  .click();
await documentFrame
  .getByRole("heading", { name: "Updated document", exact: true })
  .waitFor();
if (errors.length) throw Error(errors.join("\n"));
console.log(
  "Expo browser flows passed: table, autocomplete, cascader, JSON, menu, popover, command, confirm, system file picker, HTML document, 10k-row FlatList.",
);
await browser.close();
