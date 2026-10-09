import { describe, expect, it } from "vitest";
import {
  angularSupport,
  generateContracts,
  readValueExports,
} from "../../tools/generate-contracts.mjs";

const contracts = generateContracts();
const support = (name: string) =>
  contracts.find((contract) => contract.name === name)!.platforms.angular;
describe("Angular support evidence", () => {
  it("does not mark unexported or removed APIs as implemented", () => {
    expect(angularSupport("ImaginaryComponent").status).toBe("planned");
    expect(angularSupport("Table", new Set()).status).toBe("planned");
    expect(
      angularSupport("ToastProvider", new Set(["MnToastService"])).status,
    ).toBe("planned");
    expect(angularSupport("MonacoCodeEditor", new Set()).status).toBe(
      "planned",
    );
  });
  it("finds the optional Monaco entry without requiring it in the main barrel", () => {
    expect(
      readValueExports(["packages/angular/src/index.ts"]).has(
        "MnMonacoCodeEditor",
      ),
    ).toBe(false);
    expect(
      readValueExports(["packages/angular/monaco/index.ts"]).has(
        "MnMonacoCodeEditor",
      ),
    ).toBe(true);
    expect(support("MonacoCodeEditor").status).toBe("beta");
    expect(support("MonacoCodeEditor").notes).toContain(
      "minerva-design/angular/monaco",
    );
  });
  it.each([
    ["Table", "MnDataTable"],
    ["TableRoot", "MnTableRoot"],
    ["TableHead", "MnTableHead"],
    ["TableBody", "MnTableBody"],
    ["TableHeader", "MnTableHeader"],
    ["TableRow", "MnTableRow"],
    ["TableCell", "MnTableCell"],
    ["ConfigProvider", "MnConfig"],
    ["ThemeProvider", "provideMinerva"],
    ["ToastProvider", "MnToastService"],
    ["ConfirmProvider", "MnConfirmProvider"],
    ["TooltipProvider", "MnTooltipProvider"],
    ["ModalRoot", "MnModal"],
    ["ModalContent", "MnModal"],
    ["DrawerRoot", "MnDrawer"],
    ["DrawerContent", "MnDrawer"],
    ["TabList", "MnTabs"],
    ["PopoverContent", "MnPopover"],
    ["PopoverTrigger", "MnPopover"],
    ["PopoverAnchor", "MnPopoverAnchor"],
    ["PopoverClose", "MnPopoverClose"],
    ["DescriptionItem", "MnDescriptionList"],
    ["MenuItem", "MnMenu"],
    ["MenuCheckboxItem", "MnMenu"],
    ["MenuRadioItem", "MnMenu"],
    ["MenuGroup", "MnMenu"],
    ["MenuLabel", "MnMenu"],
    ["MenuSeparator", "MnMenu"],
  ])("records the actual Angular API for %s", (name, api) => {
    const parts = [
      "DescriptionItem",
      "ModalRoot",
      "ModalContent",
      "DrawerRoot",
      "DrawerContent",
      "TabList",
      "PopoverTrigger",
      "PopoverContent",
      "MenuItem",
      "MenuCheckboxItem",
      "MenuRadioItem",
      "MenuGroup",
      "MenuLabel",
      "MenuSeparator",
    ];
    expect(support(name).status).toBe(parts.includes(name) ? "n/a" : "beta");
    expect(support(name).notes).toContain(api);
  });
  it("describes the data-driven equivalents instead of claiming standalone item exports", () => {
    expect(support("MenuRadioItem").notes).toContain("radioValues");
    expect(support("MenuGroup").notes).toContain('type: "group"');
    expect(support("DescriptionItem").notes).toContain("items");
    expect(support("Table").notes).toContain("rows");
  });
});
