import { describe, expect, it } from "vitest";
import { miniSupport } from "../../tools/generate-contracts.mjs";

describe("mini platform support metadata", () => {
  it.each(["uni", "weapp"])(
    "maps only verified %s compound parts to parent data APIs",
    (platform) => {
      for (const name of [
        "DescriptionItem",
        "MenuItem",
        "MenuCheckboxItem",
        "MenuRadioItem",
        "MenuGroup",
        "MenuLabel",
        "MenuSeparator",
      ]) {
        const support = miniSupport(platform, name);
        expect(support.status, name).toBe("n/a");
        expect(support.notes, name).toContain(
          name === "DescriptionItem" ? "DescriptionList.items" : "Menu.items",
        );
        expect(support.notes, name).not.toContain("Unsupported");
      }
      expect(miniSupport(platform, "UnknownComponent")).toEqual({
        status: "planned",
      });
      expect(miniSupport(platform, "MenuCheckboxItem").notes).toContain(
        "checked/defaultChecked",
      );
      expect(miniSupport(platform, "MenuRadioItem").notes).toContain(
        "value/defaultValue",
      );
      expect(miniSupport(platform, "MenuLabel").notes).toContain("items: []");
    },
  );

  it("keeps Taro's existing composition exports supported", () => {
    expect(miniSupport("taro", "MenuCheckboxItem").status).toBe("beta");
    expect(miniSupport("taro", "DescriptionItem").status).toBe("beta");
  });

  it.each(["taro", "uni"])(
    "distinguishes official %s compiler evidence from device validation",
    (platform) => {
      const support = miniSupport(platform, "Button");
      expect(support.notes).toContain("SDK compilation fixture pass");
      expect(support.notes).toContain("H5 Chromium");
      expect(support.notes).toContain(
        "Physical-device E2E and other native targets are not verified",
      );
    },
  );

  it("retains the limits of WeChat simulator and automation evidence", () => {
    const support = miniSupport("weapp", "Button");
    expect(support.notes).toContain("simulator, not on a physical device");
    expect(support.notes).toContain("controlled input remains unverified");
    expect(support.notes).toContain("automator page RPC timed out");
    expect(miniSupport("weapp", "MonacoCodeEditor").status).toBe("n/a");
  });
});
